'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, ExpenseFormData, ExpenseSummary } from '@/types';
import { storage } from '@/utils/storage';
import { calculateSummary, sortExpensesByDate } from '@/utils/calculations';

interface ExpenseContextType {
  expenses: Expense[];
  summary: ExpenseSummary;
  isLoading: boolean;
  addExpense: (formData: ExpenseFormData) => void;
  updateExpense: (id: string, formData: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedExpenses = storage.getExpenses();
    setExpenses(sortExpensesByDate(loadedExpenses));
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

  const summary = calculateSummary(expenses);

  const value: ExpenseContextType = {
    expenses,
    summary,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
