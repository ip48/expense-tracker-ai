'use client';

import { useParams, useRouter } from 'next/navigation';
import { useExpenses } from '@/lib/ExpenseContext';
import Navigation from '@/components/ui/Navigation';
import ExpenseForm from '@/components/expenses/ExpenseForm';

export default function EditExpensePage() {
  const params = useParams();
  const router = useRouter();
  const { getExpenseById } = useExpenses();

  const expenseId = params.id as string;
  const expense = getExpenseById(expenseId);

  if (!expense) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card text-center">
            <p className="text-gray-600 mb-4">Expense not found</p>
            <button onClick={() => router.push('/expenses')} className="btn-primary">
              Back to Expenses
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExpenseForm expense={expense} mode="edit" />
      </div>
    </main>
  );
}
