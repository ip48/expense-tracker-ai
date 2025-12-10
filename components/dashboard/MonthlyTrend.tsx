'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency } from '@/utils/formatters';

export default function MonthlyTrend() {
  const { expenses } = useExpenses();

  const getLast6Months = () => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      });
    }

    return months;
  };

  const months = getLast6Months();

  const monthlyData = months.map(({ year, month, label }) => {
    const total = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { label, total };
  });

  const maxAmount = Math.max(...monthlyData.map((d) => d.total), 1);

  if (monthlyData.every((d) => d.total === 0)) {
    return null;
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">6-Month Trend</h2>
      <div className="space-y-4">
        {monthlyData.map(({ label, total }) => (
          <div key={label} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{label}</span>
              <span className="font-semibold text-gray-900">{formatCurrency(total)}</span>
            </div>
            <div className="relative h-6 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                style={{ width: `${total > 0 ? (total / maxAmount) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
