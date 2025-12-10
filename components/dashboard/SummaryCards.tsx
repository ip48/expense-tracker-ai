'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency } from '@/utils/formatters';

export default function SummaryCards() {
  const { summary } = useExpenses();

  const cards = [
    {
      title: 'Total Spending',
      value: formatCurrency(summary.totalSpending),
      description: 'All-time expenses',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'This Month',
      value: formatCurrency(summary.monthlySpending),
      description: 'Current month spending',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Top Category',
      value: summary.topCategory ? summary.topCategory.category : 'None',
      description: summary.topCategory
        ? formatCurrency(summary.topCategory.amount)
        : 'No expenses yet',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
