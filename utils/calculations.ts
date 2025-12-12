import { Expense, ExpenseCategory, ExpenseSummary, MonthComparison, QuickInsights, CategoryBudget } from '@/types';

export const calculateSummary = (expenses: Expense[]): ExpenseSummary => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthlySpending = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const categoryBreakdown: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach(expense => {
    categoryBreakdown[expense.category] += expense.amount;
  });

  const topCategory = Object.entries(categoryBreakdown).reduce(
    (top, [category, amount]) => {
      if (!top || amount > top.amount) {
        return { category: category as ExpenseCategory, amount };
      }
      return top;
    },
    null as { category: ExpenseCategory; amount: number } | null
  );

  return {
    totalSpending,
    monthlySpending,
    categoryBreakdown,
    topCategory: topCategory && topCategory.amount > 0 ? topCategory : null,
  };
};

export const filterExpenses = (
  expenses: Expense[],
  filters: {
    startDate?: string;
    endDate?: string;
    category?: ExpenseCategory | 'All';
    searchTerm?: string;
  }
): Expense[] => {
  return expenses.filter(expense => {
    if (filters.startDate && expense.date < filters.startDate) return false;
    if (filters.endDate && expense.date > filters.endDate) return false;
    if (filters.category && filters.category !== 'All' && expense.category !== filters.category) return false;
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        expense.description.toLowerCase().includes(searchLower) ||
        expense.category.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};

export const sortExpensesByDate = (expenses: Expense[], ascending = false): Expense[] => {
  return [...expenses].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors: Record<ExpenseCategory, string> = {
    Food: 'bg-green-100 text-green-800 border-green-200',
    Transportation: 'bg-blue-100 text-blue-800 border-blue-200',
    Entertainment: 'bg-purple-100 text-purple-800 border-purple-200',
    Shopping: 'bg-pink-100 text-pink-800 border-pink-200',
    Bills: 'bg-orange-100 text-orange-800 border-orange-200',
    Other: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[category];
};

// Budget-related calculations
export const calculateBudgetStatus = (
  categorySpending: number,
  budgetLimit: number
): {
  percentage: number;
  remaining: number;
  status: 'safe' | 'warning' | 'danger';
} => {
  const percentage = budgetLimit > 0 ? (categorySpending / budgetLimit) * 100 : 0;
  const remaining = budgetLimit - categorySpending;

  let status: 'safe' | 'warning' | 'danger' = 'safe';
  if (percentage >= 90) {
    status = 'danger';
  } else if (percentage >= 75) {
    status = 'warning';
  }

  return { percentage, remaining, status };
};

export const getCategoryBudgetProgress = (
  expenses: Expense[],
  budgets: CategoryBudget[]
): Array<{
  category: ExpenseCategory;
  spent: number;
  limit: number;
  remaining: number;
  percentage: number;
  status: 'safe' | 'warning' | 'danger';
}> => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Calculate current month spending by category
  const monthlySpendingByCategory: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .forEach(expense => {
      monthlySpendingByCategory[expense.category] += expense.amount;
    });

  // Map budgets to progress objects
  return budgets.map(budget => {
    const spent = monthlySpendingByCategory[budget.category];
    const { percentage, remaining, status } = calculateBudgetStatus(spent, budget.monthlyLimit);

    return {
      category: budget.category,
      spent,
      limit: budget.monthlyLimit,
      remaining,
      percentage,
      status,
    };
  });
};

// Month comparison calculations
export const getPreviousMonthSpending = (expenses: Expense[]): number => {
  const now = new Date();
  const previousMonth = now.getMonth() - 1;
  const previousYear = previousMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
  const adjustedPreviousMonth = previousMonth < 0 ? 11 : previousMonth;

  return expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === adjustedPreviousMonth &&
        expenseDate.getFullYear() === previousYear
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
};

export const calculateMonthComparison = (expenses: Expense[]): MonthComparison => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthSpending = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const previousMonthSpending = getPreviousMonthSpending(expenses);

  const percentageChange =
    previousMonthSpending > 0
      ? ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) * 100
      : 0;

  return {
    currentMonth: currentMonthSpending,
    previousMonth: previousMonthSpending,
    percentageChange,
    isIncrease: currentMonthSpending > previousMonthSpending,
  };
};

// Quick insights calculations
export const getMostFrequentCategory = (expenses: Expense[]): ExpenseCategory | null => {
  if (expenses.length === 0) return null;

  const categoryCounts: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach(expense => {
    categoryCounts[expense.category]++;
  });

  const topCategory = Object.entries(categoryCounts).reduce(
    (top, [category, count]) => {
      if (!top || count > top.count) {
        return { category: category as ExpenseCategory, count };
      }
      return top;
    },
    null as { category: ExpenseCategory; count: number } | null
  );

  return topCategory && topCategory.count > 0 ? topCategory.category : null;
};

export const calculateQuickInsights = (expenses: Expense[]): QuickInsights => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Get current month expenses
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Average daily spend (current month)
  const daysElapsedInMonth = now.getDate();
  const monthlySpending = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageDailySpend = daysElapsedInMonth > 0 ? monthlySpending / daysElapsedInMonth : 0;

  // Largest expense (all time)
  const largestExpense =
    expenses.length > 0
      ? expenses.reduce((largest, expense) => {
          return expense.amount > largest.amount ? expense : largest;
        })
      : null;

  // Days since last expense
  let daysSinceLastExpense = 0;
  if (expenses.length > 0) {
    const sortedExpenses = sortExpensesByDate(expenses, false);
    const lastExpenseDate = new Date(sortedExpenses[0].date);
    const diffTime = Math.abs(now.getTime() - lastExpenseDate.getTime());
    daysSinceLastExpense = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  // Most frequent category (all time)
  const mostFrequentCategory = getMostFrequentCategory(expenses);

  return {
    averageDailySpend,
    largestExpense: largestExpense
      ? {
          amount: largestExpense.amount,
          description: largestExpense.description,
          category: largestExpense.category,
        }
      : null,
    daysSinceLastExpense,
    mostFrequentCategory,
  };
};
