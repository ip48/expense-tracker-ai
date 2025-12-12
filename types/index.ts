export type ExpenseCategory =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string;
}

export interface ExpenseFormData {
  date: string;
  amount: string;
  category: ExpenseCategory;
  description: string;
}

export interface ExpenseSummary {
  totalSpending: number;
  monthlySpending: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
  topCategory: {
    category: ExpenseCategory;
    amount: number;
  } | null;
}

export interface FilterOptions {
  startDate?: string;
  endDate?: string;
  category?: ExpenseCategory | 'All';
  searchTerm?: string;
}

export interface CategoryBudget {
  category: ExpenseCategory;
  monthlyLimit: number;
}

export interface BudgetSettings {
  budgets: CategoryBudget[];
  lastUpdated: string;
}

export interface MonthComparison {
  currentMonth: number;
  previousMonth: number;
  percentageChange: number;
  isIncrease: boolean;
}

export interface QuickInsights {
  averageDailySpend: number;
  largestExpense: {
    amount: number;
    description: string;
    category: ExpenseCategory;
  } | null;
  daysSinceLastExpense: number;
  mostFrequentCategory: ExpenseCategory | null;
}
