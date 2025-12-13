# Expense Tracker AI

Demo expense tracking app with budget management and analytics.

## Development Philosophy
- **Keep it simple**: This is a demo project - avoid over-engineering
- **Use established libraries**: Prefer battle-tested libraries (like Recharts) over custom implementations
- **Question anomalies**: If something seems off (empty files, weird references), ask before proceeding

## Architecture
- **Client-side only**: All components use 'use client' - no server-side rendering for data
- **No database**: LocalStorage only (utils/storage.ts) - don't build complex persistence
- **USD hardcoded**: Currency formatting is US dollars only - no internationalization planned