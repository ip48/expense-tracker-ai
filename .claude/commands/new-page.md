# Create New Page

Scaffold a new page/route following project conventions.

## Instructions

Takes one argument: the route name (e.g., "settings", "profile", "analytics")

1. **Create page file**:
   - Create `app/[route-name]/page.tsx`
   - Use this template structure:
     ```tsx
     import Navigation from '@/components/ui/Navigation';

     export default function [RouteName]Page() {
       return (
         <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
           <Navigation />
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="mb-8">
               <h1 className="text-4xl font-bold text-gray-900 mb-2">[Page Title]</h1>
               <p className="text-gray-600">[Page description]</p>
             </div>

             {/* Page content goes here */}
             <div className="card">
               <p>Content coming soon...</p>
             </div>
           </div>
         </main>
       );
     }
     ```

2. **Remind about Navigation**:
   - Tell user they need to manually add route to Navigation.tsx if desired
   - Show example of what to add to the links array

3. **Summary**:
   - Confirm what was created
   - Show next steps

## Example Usage
- `/new-page settings` → creates app/settings/page.tsx
- `/new-page user-profile` → creates app/user-profile/page.tsx
