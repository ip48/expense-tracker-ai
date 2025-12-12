'use client';

import { useState } from 'react';
import { ExpenseCategory } from '@/types';
import { useExpenses } from '@/lib/ExpenseContext';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BudgetModal({ isOpen, onClose }: BudgetModalProps) {
  const { budgets, setBudget, removeBudget } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('Food');
  const [budgetAmount, setBudgetAmount] = useState<string>('');

  const categories: ExpenseCategory[] = [
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(budgetAmount);
    if (amount > 0) {
      setBudget(selectedCategory, amount);
      setBudgetAmount('');
      onClose();
    }
  };

  const handleRemove = (category: ExpenseCategory) => {
    removeBudget(category);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Budgets</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ExpenseCategory)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Budget ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                placeholder="Enter budget amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Set Budget
            </button>
          </form>

          {budgets.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Budgets</h3>
              <div className="space-y-2">
                {budgets.map((budget) => (
                  <div
                    key={budget.category}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-gray-800">{budget.category}</span>
                      <span className="text-gray-600 ml-2">
                        ${budget.monthlyLimit.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(budget.category)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {budgets.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No budgets set yet. Set your first budget above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
