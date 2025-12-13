# Review and Commit

Review code for issues, then create a git commit if everything looks good.

## Instructions

### 1. Run Automated Checks (in parallel)
- TypeScript: `tsc --noEmit`
- Linter: `npm run lint`
- Build: `npm run build`

### 2. Review Results
- ✅ If all checks pass: proceed to commit
- ❌ If issues found:
  - Report errors clearly
  - Ask if user wants to fix issues or commit anyway

### 3. Create Commit (if proceeding)
- Run `git status` and `git diff` to see changes
- Run `git log --oneline -5` to see commit style
- Draft clear commit message
- Stage relevant files
- Commit with format:
  ```
  [Short descriptive title]

  - [Bullet point of change 1]
  - [Bullet point of change 2]

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```
- Use HEREDOC for commit message
- Run `git status` to verify

### 4. Summary
- Show what was committed
- Remind user to push when ready

## Important Notes
- Do NOT push (user does this manually)
- Do NOT commit secrets (.env, credentials)
- User can choose to commit even if checks fail
