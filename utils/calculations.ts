import { Expense, ExpenseCategory, ExpenseSummary } from '@/types';

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
