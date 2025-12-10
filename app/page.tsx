import Navigation from '@/components/ui/Navigation';
import SummaryCards from '@/components/dashboard/SummaryCards';
import CategoryBreakdown from '@/components/dashboard/CategoryBreakdown';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import SpendingChart from '@/components/dashboard/SpendingChart';
import MonthlyTrend from '@/components/dashboard/MonthlyTrend';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your expenses and manage your finances</p>
        </div>

        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CategoryBreakdown />
          <RecentExpenses />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart />
          <MonthlyTrend />
        </div>
      </div>
    </main>
  );
}
