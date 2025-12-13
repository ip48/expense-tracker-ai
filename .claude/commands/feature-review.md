# Feature Review

Review a specific feature, component, or file for code quality, bugs, and improvements.

## Instructions

Takes one argument: feature/component/file name to review

### 1. Locate the Code
- Find the main file(s) related to the feature
- If feature name is ambiguous, ask for clarification
- Example: `feature-review MonthlyInsights` → find MonthlyInsights.tsx

### 2. Read and Analyze
- Read the component/feature code
- Read related files (types, utilities, etc.) if needed
- Understand what the code does

### 3. Review for:
- **Bugs**: Logic errors, edge cases, potential crashes
- **Best Practices**: React patterns, TypeScript usage, proper hooks
- **Performance**: Unnecessary re-renders, expensive calculations
- **Code Quality**: Readability, maintainability, organization
- **Project Conventions**: Following CLAUDE.md guidelines
- **Security**: Potential vulnerabilities, input validation
- **Accessibility**: Missing aria labels, keyboard navigation

### 4. Provide Feedback
- ✅ What's done well
- ⚠️ Issues found (with severity: critical/moderate/minor)
- 💡 Suggestions for improvement
- 🔧 Specific code examples for fixes (if applicable)

### 5. Summary
- Overall assessment
- Priority fixes (if any)
- Optional improvements

## Example Usage
- `/feature-review MonthlyInsights`
- `/feature-review BudgetTracker`
- `/feature-review utils/calculations`
