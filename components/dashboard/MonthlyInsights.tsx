'use client';

import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency } from '@/utils/formatters';
import { ExpenseCategory } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const getCategoryEmoji = (category: ExpenseCategory): string => {
  const emojis: Record<ExpenseCategory, string> = {
    Food: '🍔',
    Transportation: '🚗',
    Entertainment: '🎬',
    Shopping: '🛍️',
    Bills: '📄',
    Other: '📦',
  };
  return emojis[category];
};

const CHART_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#95E1D3'];

export default function MonthlyInsights() {
  const { summary, expenses, budgets } = useExpenses();

  // Get top 3 categories by spending
  const topCategories = Object.entries(summary.categoryBreakdown)
    .map(([category, amount]) => ({
      category: category as ExpenseCategory,
      amount,
    }))
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  // Prepare data for Recharts
  const chartData = topCategories.map((item, index) => ({
    name: item.category,
    value: item.amount,
    color: CHART_COLORS[index],
  }));

  // Calculate budget streak using daily allowance method
  // Daily Allowance = Monthly Budget ÷ Days in Month
  // Streak = Consecutive days where daily spending ≤ Daily Allowance
  const calculateBudgetStreak = (): number => {
    if (budgets.length === 0) return 0;

    const totalMonthlyBudget = budgets.reduce((sum, b) => sum + b.monthlyLimit, 0);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Calculate days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dailyAllowance = totalMonthlyBudget / daysInMonth;

    let streak = 0;

    // Check each day going backwards from today
    for (let i = 0; i < daysInMonth; i++) {
      const checkDate = new Date(now);
      checkDate.setDate(checkDate.getDate() - i);

      // Only check days in current month
      if (checkDate.getMonth() !== currentMonth || checkDate.getFullYear() !== currentYear) {
        break;
      }

      // Get spending for this specific day only
      const dayStart = new Date(checkDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(checkDate);
      dayEnd.setHours(23, 59, 59, 999);

      const dailySpending = expenses
        .filter(exp => {
          const expDate = new Date(exp.date);
          return expDate >= dayStart && expDate <= dayEnd;
        })
        .reduce((sum, exp) => sum + exp.amount, 0);

      // If daily spending is under daily allowance, increment streak
      if (dailySpending <= dailyAllowance) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const budgetStreak = calculateBudgetStreak();

  return (
    <div className="card">
      {topCategories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No expense data available yet</p>
          <p className="text-sm text-gray-400 mt-2">Start adding expenses to see your insights</p>
        </div>
      ) : (
        <>
          {/* Donut Chart */}
          <div className="flex justify-center mb-8">
            <div className="relative" style={{ width: 280, height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-sm font-medium text-gray-600">Spending</div>
                <div className="text-lg font-bold text-gray-900">{formatCurrency(summary.monthlySpending)}</div>
              </div>
            </div>
          </div>

          {/* Top 3 Categories */}
          <div className="space-y-4 mb-8">
            {topCategories.map((item, index) => (
              <div key={item.category} className="flex items-center gap-3">
                {/* Color bar */}
                <div
                  className="w-1 h-12 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[index] }}
                />

                {/* Category info */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-2xl">{getCategoryEmoji(item.category)}</span>
                  <span className="font-semibold text-gray-800">{item.category}:</span>
                  <span className="font-bold text-gray-900 text-lg">{formatCurrency(item.amount)}</span>
                </div>
              </div>
            ))}
            <div className="text-right text-xs text-gray-500 italic pt-2">
              Top 3!
            </div>
          </div>

          {/* Budget Streak */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              Budget Streak
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600">
                  {budgetStreak}
                </div>
                <div className="text-gray-700 font-medium mt-1">days!</div>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-full px-6 py-2">
                <div className="w-16 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12"></div>
                </div>
              </div>
            </div>
            {budgets.length === 0 && (
              <p className="text-xs text-gray-500 text-center mt-3">
                Set budgets to track your streak
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
