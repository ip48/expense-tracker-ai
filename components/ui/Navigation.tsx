'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/expenses', label: 'Expenses', icon: '💰' },
    { href: '/add-expense', label: 'Add Expense', icon: '➕' },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">💸</span>
              <span className="text-xl font-bold text-gray-900">Expense Tracker</span>
            </Link>
          </div>
          <div className="flex gap-2 sm:gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">{link.icon}</span>
                <span className="text-sm sm:text-base">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
