'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency } from '@/utils/formatters';
import { getCategoryColor } from '@/utils/calculations';
import { ExpenseCategory } from '@/types';

export default function CategoryBreakdown() {
  const { summary } = useExpenses();

  const categories = Object.entries(summary.categoryBreakdown)
    .map(([category, amount]) => ({
      category: category as ExpenseCategory,
      amount,
      percentage: summary.totalSpending > 0
        ? (amount / summary.totalSpending) * 100
        : 0,
    }))
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  if (categories.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Spending by Category</h2>
        <p className="text-gray-500 text-center py-8">No expenses to display</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Spending by Category</h2>
      <div className="space-y-4">
        {categories.map(({ category, amount, percentage }) => (
          <div key={category}>
            <div className="flex justify-between items-center mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(amount)} ({percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
