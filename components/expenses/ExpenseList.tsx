'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExpenses } from '@/lib/ExpenseContext';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getCategoryColor, filterExpenses } from '@/utils/calculations';
import { exportToCSV, exportToMarkdown } from '@/utils/export';
import { ExpenseCategory } from '@/types';
import ExpenseFilters from './ExpenseFilters';

export default function ExpenseList() {
  const router = useRouter();
  const { expenses, deleteExpense } = useExpenses();

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<ExpenseCategory | 'All'>('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredExpenses = filterExpenses(expenses, {
    searchTerm,
    category: category === 'All' ? undefined : category,
    startDate,
    endDate,
  });

  const totalFiltered = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setDeleteConfirm(null);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredExpenses);
  };

  const handleExportMarkdown = () => {
    exportToMarkdown(filteredExpenses);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory('All');
    setStartDate('');
    setEndDate('');
  };

  const handleEdit = (id: string) => {
    router.push(`/expenses/${id}/edit`);
  };

  return (
    <div>
      <ExpenseFilters
        searchTerm={searchTerm}
        category={category}
        startDate={startDate}
        endDate={endDate}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategory}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onReset={handleReset}
      />

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              All Expenses ({filteredExpenses.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {formatCurrency(totalFiltered)}
            </p>
          </div>
          {filteredExpenses.length > 0 && (
            <div className="flex gap-2">
              <button onClick={handleExportCSV} className="btn-secondary text-sm">
                📊 CSV
              </button>
              <button onClick={handleExportMarkdown} className="btn-secondary text-sm">
                📝 Markdown
              </button>
            </div>
          )}
        </div>

        {filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {expenses.length === 0
                ? 'No expenses yet. Start tracking your spending!'
                : 'No expenses match your filters.'}
            </p>
            {expenses.length === 0 && (
              <button
                onClick={() => router.push('/add-expense')}
                className="btn-primary"
              >
                Add Your First Expense
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {formatDate(expense.date)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                          expense.category
                        )}`}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{expense.description}</td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(expense.id)}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          Edit
                        </button>
                        {deleteConfirm === expense.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(expense.id)}
                              className="text-red-600 hover:text-red-700 font-medium text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-gray-600 hover:text-gray-700 font-medium text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(expense.id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
