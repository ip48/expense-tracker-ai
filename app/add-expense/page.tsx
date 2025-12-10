import Navigation from '@/components/ui/Navigation';
import ExpenseForm from '@/components/expenses/ExpenseForm';

export default function AddExpensePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExpenseForm mode="add" />
      </div>
    </main>
  );
}
