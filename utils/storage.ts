import { Expense, BudgetSettings, CategoryBudget, ExpenseCategory } from '@/types';

const STORAGE_KEY = 'expense-tracker-data';

export const storage = {
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  addExpense: (expense: Expense): Expense[] => {
    const expenses = storage.getExpenses();
    const updatedExpenses = [...expenses, expense];
    storage.saveExpenses(updatedExpenses);
    return updatedExpenses;
  },

  updateExpense: (id: string, updatedExpense: Expense): Expense[] => {
    const expenses = storage.getExpenses();
    const updatedExpenses = expenses.map(exp =>
      exp.id === id ? updatedExpense : exp
    );
    storage.saveExpenses(updatedExpenses);
    return updatedExpenses;
  },

  deleteExpense: (id: string): Expense[] => {
    const expenses = storage.getExpenses();
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    storage.saveExpenses(updatedExpenses);
    return updatedExpenses;
  },

  clearAllExpenses: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};

const BUDGET_STORAGE_KEY = 'expense-tracker-budgets';

export const budgetStorage = {
  getBudgets: (): BudgetSettings => {
    if (typeof window === 'undefined') {
      return { budgets: [], lastUpdated: new Date().toISOString() };
    }

    try {
      const data = localStorage.getItem(BUDGET_STORAGE_KEY);
      return data ? JSON.parse(data) : { budgets: [], lastUpdated: new Date().toISOString() };
    } catch (error) {
      console.error('Error reading budgets from localStorage:', error);
      return { budgets: [], lastUpdated: new Date().toISOString() };
    }
  },

  saveBudgets: (budgets: CategoryBudget[]): void => {
    if (typeof window === 'undefined') return;

    try {
      const budgetSettings: BudgetSettings = {
        budgets,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgetSettings));
    } catch (error) {
      console.error('Error writing budgets to localStorage:', error);
    }
  },

  updateCategoryBudget: (category: ExpenseCategory, limit: number): void => {
    const settings = budgetStorage.getBudgets();
    const existingBudgetIndex = settings.budgets.findIndex(b => b.category === category);

    if (existingBudgetIndex >= 0) {
      settings.budgets[existingBudgetIndex].monthlyLimit = limit;
    } else {
      settings.budgets.push({ category, monthlyLimit: limit });
    }

    budgetStorage.saveBudgets(settings.budgets);
  },

  removeCategoryBudget: (category: ExpenseCategory): void => {
    const settings = budgetStorage.getBudgets();
    const updatedBudgets = settings.budgets.filter(b => b.category !== category);
    budgetStorage.saveBudgets(updatedBudgets);
  },
};
