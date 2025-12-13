Create a new page/route for: $ARGUMENTS

## Workflow

1. **Create the page file first**
   - Location: `app/$ARGUMENTS/page.tsx`
   - Follow the pattern from existing pages:
     - `app/expenses/page.tsx` - standard layout with title/description
     - `app/insights/page.tsx` - narrower layout (max-w-4xl)
     - `app/add-expense/page.tsx` - minimal (no title section)
   - Copy structure from the most appropriate example

2. **Ask about navigation**
   - After creating the page, ask user: "Add this route to the navigation menu?"
   - If yes: Update `components/ui/Navigation.tsx` links array with:
     ```tsx
     { href: '/$ARGUMENTS', label: 'Label', icon: '📊' }
     ```
   - If no: Skip navigation update

3. **Confirm completion**
   - Show what was created
   - Confirm whether navigation was updated
   - List file path(s) modified
