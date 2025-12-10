'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getCategoryColor } from '@/utils/calculations';
import Link from 'next/link';

export default function RecentExpenses() {
  const { expenses } = useExpenses();
  const recentExpenses = expenses.slice(0, 5);

  if (recentExpenses.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Expenses</h2>
        <p className="text-gray-500 text-center py-8">No expenses yet. Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
        <Link
          href="/expenses"
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View all →
        </Link>
      </div>
      <div className="space-y-4">
        {recentExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(expense.category)}`}>
                  {expense.category}
                </span>
                <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
              </div>
              <p className="text-gray-900 font-medium">{expense.description}</p>
            </div>
            <div className="text-right ml-4">
              <p className="text-lg font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
