'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, ExpenseFormData, ExpenseSummary, CategoryBudget, MonthComparison, QuickInsights, ExpenseCategory } from '@/types';
import { storage, budgetStorage } from '@/utils/storage';
import { calculateSummary, sortExpensesByDate, calculateMonthComparison, calculateQuickInsights, getCategoryBudgetProgress } from '@/utils/calculations';

interface ExpenseContextType {
  expenses: Expense[];
  summary: ExpenseSummary;
  isLoading: boolean;
  addExpense: (formData: ExpenseFormData) => void;
  updateExpense: (id: string, formData: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
  budgets: CategoryBudget[];
  budgetProgress: Array<{
    category: ExpenseCategory;
    spent: number;
    limit: number;
    remaining: number;
    percentage: number;
    status: 'safe' | 'warning' | 'danger';
  }>;
  monthComparison: MonthComparison;
  quickInsights: QuickInsights;
  setBudget: (category: ExpenseCategory, limit: number) => void;
  removeBudget: (category: ExpenseCategory) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<CategoryBudget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedExpenses = storage.getExpenses();
    const loadedBudgets = budgetStorage.getBudgets();
    setExpenses(sortExpensesByDate(loadedExpenses));
    setBudgets(loadedBudgets.budgets);
    setIsLoading(false);
  }, []);

  const addExpense = (formData: ExpenseFormData) => {
    const newExpense: Expense = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: formData.date,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      createdAt: new Date().toISOString(),
    };

    const updatedExpenses = storage.addExpense(newExpense);
    setExpenses(sortExpensesByDate(updatedExpenses));
  };

  const updateExpense = (id: string, formData: ExpenseFormData) => {
    const existingExpense = expenses.find(exp => exp.id === id);
    if (!existingExpense) return;

    const updatedExpense: Expense = {
      ...existingExpense,
      date: formData.date,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
    };

    const updatedExpenses = storage.updateExpense(id, updatedExpense);
    setExpenses(sortExpensesByDate(updatedExpenses));
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = storage.deleteExpense(id);
    setExpenses(sortExpensesByDate(updatedExpenses));
  };

  const getExpenseById = (id: string): Expense | undefined => {
    return expenses.find(exp => exp.id === id);
  };

  const setBudget = (category: ExpenseCategory, limit: number) => {
    budgetStorage.updateCategoryBudget(category, limit);
    const updatedBudgets = budgetStorage.getBudgets();
    setBudgets(updatedBudgets.budgets);
  };

  const removeBudget = (category: ExpenseCategory) => {
    budgetStorage.removeCategoryBudget(category);
    const updatedBudgets = budgetStorage.getBudgets();
    setBudgets(updatedBudgets.budgets);
  };

  const summary = calculateSummary(expenses);
  const budgetProgress = getCategoryBudgetProgress(expenses, budgets);
  const monthComparison = calculateMonthComparison(expenses);
  const quickInsights = calculateQuickInsights(expenses);

  const value: ExpenseContextType = {
    expenses,
    summary,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    budgets,
    budgetProgress,
    monthComparison,
    quickInsights,
    setBudget,
    removeBudget,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
