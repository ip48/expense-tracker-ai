Review the current code changes and create a git commit if everything looks good.

## Workflow

1. **Run automated checks** (in parallel)
   - TypeScript: `tsc --noEmit`
   - Linter: `npm run lint`
   - Build: `npm run build`

2. **Review results**
   - ✅ All checks pass → proceed to commit
   - ❌ Issues found → report clearly and ask if user wants to:
     - Fix issues first, or
     - Commit anyway

3. **Create commit** (if proceeding)
   - Run `git status` and `git diff` to see changes
   - Run `git log --oneline -5` to match commit style
   - Draft clear commit message
   - Stage relevant files with `git add`
   - Commit using HEREDOC format:
     ```
     git commit -m "$(cat <<'EOF'
     [Short descriptive title]

     - [Bullet point of change 1]
     - [Bullet point of change 2]

     🤖 Generated with [Claude Code](https://claude.com/claude-code)

     Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
     EOF
     )"
     ```
   - Verify with `git status`

4. **Summary**
   - Show what was committed
   - Remind user to push manually when ready

## Important
- Do NOT push automatically (user does this)
- Do NOT commit secrets (.env, credentials)
- User can commit even if checks fail
