import { Expense } from '@/types';
import { formatCurrency, formatDate } from './formatters';

export const exportToCSV = (expenses: Expense[]): void => {
  const headers = ['Date', 'Category', 'Description', 'Amount'];
  const rows = expenses.map(expense => [
    formatDate(expense.date),
    expense.category,
    expense.description,
    expense.amount.toString(),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
