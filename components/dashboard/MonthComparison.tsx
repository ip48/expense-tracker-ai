'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency } from '@/utils/formatters';

export default function MonthComparison() {
  const { monthComparison } = useExpenses();

  const getMonthName = (offset: number = 0) => {
    const date = new Date();
    date.setMonth(date.getMonth() + offset);
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  const currentMonthName = getMonthName();
  const previousMonthName = getMonthName(-1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Month Comparison</h2>

      {monthComparison.previousMonth === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No data from previous month</p>
          <p className="text-sm text-gray-400 mt-2">
            Add expenses to see month-over-month trends
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">{currentMonthName}</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(monthComparison.currentMonth)}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">{previousMonthName}</p>
              <p className="text-xl font-semibold text-gray-700">
                {formatCurrency(monthComparison.previousMonth)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-4 border-t border-gray-200">
            {monthComparison.percentageChange === 0 ? (
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-600">No change</p>
                <p className="text-sm text-gray-500">Same as last month</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {monthComparison.isIncrease ? (
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  )}
                  <span
                    className={`text-2xl font-bold ${
                      monthComparison.isIncrease ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {Math.abs(monthComparison.percentageChange).toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {monthComparison.isIncrease ? 'Increase' : 'Decrease'} from last month
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
