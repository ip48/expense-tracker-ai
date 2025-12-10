'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency } from '@/utils/formatters';
import { ExpenseCategory } from '@/types';

export default function SpendingChart() {
  const { summary } = useExpenses();

  const chartData = Object.entries(summary.categoryBreakdown)
    .map(([category, amount]) => ({
      category: category as ExpenseCategory,
      amount,
      percentage:
        summary.totalSpending > 0 ? (amount / summary.totalSpending) * 100 : 0,
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);

  const getCategoryColorBar = (category: ExpenseCategory): string => {
    const colors: Record<ExpenseCategory, string> = {
      Food: 'bg-green-500',
      Transportation: 'bg-blue-500',
      Entertainment: 'bg-purple-500',
      Shopping: 'bg-pink-500',
      Bills: 'bg-orange-500',
      Other: 'bg-gray-500',
    };
    return colors[category];
  };

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Spending Chart</h2>
      <div className="space-y-4">
        {chartData.map(({ category, amount, percentage }) => (
          <div key={category} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{category}</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(amount)}
              </span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className={`h-full ${getCategoryColorBar(
                  category
                )} transition-all duration-500 flex items-center justify-end pr-3`}
                style={{ width: `${(amount / maxAmount) * 100}%` }}
              >
                <span className="text-white text-xs font-semibold">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
