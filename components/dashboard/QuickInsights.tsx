'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency } from '@/utils/formatters';

export default function QuickInsights() {
  const { quickInsights } = useExpenses();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Avg Daily Spend</h3>
          <svg
            className="w-6 h-6 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-3xl font-bold">{formatCurrency(quickInsights.averageDailySpend)}</p>
        <p className="text-xs opacity-75 mt-1">This month</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Largest Expense</h3>
          <svg
            className="w-6 h-6 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        {quickInsights.largestExpense ? (
          <>
            <p className="text-3xl font-bold">
              {formatCurrency(quickInsights.largestExpense.amount)}
            </p>
            <p className="text-xs opacity-75 mt-1 truncate">
              {quickInsights.largestExpense.description}
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold">$0.00</p>
            <p className="text-xs opacity-75 mt-1">No expenses yet</p>
          </>
        )}
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Days Since Last</h3>
          <svg
            className="w-6 h-6 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-3xl font-bold">{quickInsights.daysSinceLastExpense}</p>
        <p className="text-xs opacity-75 mt-1">
          {quickInsights.daysSinceLastExpense === 0
            ? 'Expense added today'
            : quickInsights.daysSinceLastExpense === 1
            ? 'Day ago'
            : 'Days ago'}
        </p>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Top Category</h3>
          <svg
            className="w-6 h-6 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </div>
        {quickInsights.mostFrequentCategory ? (
          <>
            <p className="text-2xl font-bold">{quickInsights.mostFrequentCategory}</p>
            <p className="text-xs opacity-75 mt-1">Most frequent</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">None</p>
            <p className="text-xs opacity-75 mt-1">No expenses yet</p>
          </>
        )}
      </div>
    </div>
  );
}
