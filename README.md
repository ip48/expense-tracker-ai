# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Add Expenses**: Create new expenses with date, amount, category, and description
- **Edit Expenses**: Update existing expense details
- **Delete Expenses**: Remove expenses with confirmation prompt
- **Data Persistence**: All data stored in browser localStorage

### Dashboard & Analytics
- **Summary Cards**: View total spending, monthly spending, and top category at a glance
- **Category Breakdown**: Visual breakdown of spending by category with percentages
- **Recent Expenses**: Quick view of your 5 most recent expenses
- **Spending Chart**: Bar chart showing spending distribution across categories
- **6-Month Trend**: Historical view of spending patterns over the last 6 months

### Search & Filter
- **Text Search**: Search expenses by description or category
- **Category Filter**: Filter expenses by specific category
- **Date Range Filter**: Filter expenses by start and end date
- **Combined Filters**: Use multiple filters simultaneously

### Export
- **CSV Export**: Export filtered expenses to CSV format for external analysis

### Design
- **Modern UI**: Clean, professional interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Real-time validation with helpful error messages
- **Visual Feedback**: Loading states, hover effects, and smooth transitions

## Categories

The app supports the following expense categories:
- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Other

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Storage**: Browser localStorage
- **Icons**: Emoji-based

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production

To create a production build:

```bash
npm run build
npm start
```

## Usage Guide

### Adding an Expense

1. Click "Add Expense" in the navigation bar
2. Fill in the required fields:
   - **Date**: Select the date of the expense (defaults to today)
   - **Category**: Choose from the predefined categories
   - **Amount**: Enter the expense amount in USD
   - **Description**: Provide a brief description (minimum 3 characters)
3. Click "Add Expense" to save

### Viewing Expenses

1. Navigate to the "Expenses" page from the navigation bar
2. View all expenses in a sortable table
3. Use filters to narrow down results:
   - Search by description
   - Filter by category
   - Set date range

### Editing an Expense

1. Go to the Expenses page
2. Click "Edit" on the expense you want to modify
3. Update the fields as needed
4. Click "Update Expense" to save changes

### Deleting an Expense

1. Go to the Expenses page
2. Click "Delete" on the expense you want to remove
3. Click "Confirm" to permanently delete (or "Cancel" to abort)

### Exporting Data

1. Go to the Expenses page
2. Apply any filters if desired (export will only include filtered results)
3. Click "Export CSV" button
4. The CSV file will download automatically with format: `expenses_YYYY-MM-DD.csv`

### Dashboard Analytics

The Dashboard provides:
- **Summary Cards**: Quick overview of your spending
- **Category Breakdown**: See where your money goes
- **Recent Expenses**: Latest 5 transactions
- **Spending Chart**: Visual representation by category
- **6-Month Trend**: Track spending patterns over time

## Project Structure

```
expense-tracker-ai/
├── app/                          # Next.js app directory
│   ├── add-expense/             # Add expense page
│   ├── expenses/                # Expenses list page
│   │   └── [id]/edit/          # Edit expense page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Dashboard page
├── components/                   # React components
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── CategoryBreakdown.tsx
│   │   ├── MonthlyTrend.tsx
│   │   ├── RecentExpenses.tsx
│   │   ├── SpendingChart.tsx
│   │   └── SummaryCards.tsx
│   ├── expenses/                # Expense-specific components
│   │   ├── ExpenseFilters.tsx
│   │   ├── ExpenseForm.tsx
│   │   └── ExpenseList.tsx
│   └── ui/                      # Shared UI components
│       └── Navigation.tsx
├── lib/                         # React context and state
│   └── ExpenseContext.tsx
├── types/                       # TypeScript type definitions
│   └── index.ts
├── utils/                       # Utility functions
│   ├── calculations.ts          # Summary and filter calculations
│   ├── export.ts                # CSV export functionality
│   ├── formatters.ts            # Currency and date formatters
│   └── storage.ts               # localStorage utilities
└── package.json
```

## Data Storage

All expense data is stored in your browser's localStorage. This means:

- ✅ Data persists between sessions
- ✅ No server required
- ✅ Complete privacy (data never leaves your browser)
- ⚠️ Data is specific to the browser/device you're using
- ⚠️ Clearing browser data will delete all expenses

## Browser Support

This application works best in modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

Potential features for future versions:
- Multiple currency support
- Budget tracking and alerts
- Recurring expenses
- Receipt image uploads
- Cloud sync and backup
- Advanced analytics and insights
- Custom categories
- Multiple user accounts

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please check the documentation or create an issue in the project repository.
