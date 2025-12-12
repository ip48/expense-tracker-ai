'use client';

import { useState } from 'react';
import { useExpenses } from '@/lib/ExpenseContext';
import BudgetModal from './BudgetModal';
import { formatCurrency } from '@/utils/formatters';

export default function BudgetTracker() {
  const { budgetProgress } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: 'safe' | 'warning' | 'danger') => {
    switch (status) {
      case 'safe':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: 'safe' | 'warning' | 'danger') => {
    switch (status) {
      case 'safe':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'danger':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Budget Tracker</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Manage Budgets
          </button>
        </div>

        {budgetProgress.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No budgets set yet</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Click to create your first budget
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {budgetProgress.map((progress) => (
              <div key={progress.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{progress.category}</span>
                  <span className={`text-sm font-medium ${getStatusTextColor(progress.status)}`}>
                    {progress.spent >= progress.limit ? 'Over Budget' :
                     progress.status === 'warning' ? 'Warning' :
                     'On Track'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    {formatCurrency(progress.spent)} of {formatCurrency(progress.limit)}
                  </span>
                  <span className={getStatusTextColor(progress.status)}>
                    {progress.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getStatusColor(progress.status)}`}
                    style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                  />
                </div>
                {progress.remaining > 0 ? (
                  <p className="text-xs text-gray-500">
                    {formatCurrency(progress.remaining)} remaining
                  </p>
                ) : (
                  <p className="text-xs text-red-600 font-medium">
                    {formatCurrency(Math.abs(progress.remaining))} over budget
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
