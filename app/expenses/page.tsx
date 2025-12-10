import Navigation from '@/components/ui/Navigation';
import ExpenseList from '@/components/expenses/ExpenseList';

export default function ExpensesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Expenses</h1>
          <p className="text-gray-600">View and manage all your expenses</p>
        </div>

        <ExpenseList />
      </div>
    </main>
  );
}
