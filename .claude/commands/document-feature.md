# Purpose
Generate both technical documentation for developers and user-friendly guides for the new feature: $ARGUMENTS

## Developer Documentation
Technical specs, API details, implementation notes

## User Documentation
Simple guide with screenshot placeholders, step-by-step instructions

## Process
* Analyze the relevant code files for: $ARGUMENTS
* Auto-detect if the feature is frontend/backend/full-stack and adjust documentation accordingly
* Generate two separate documentation files:
  - `docs/dev/{feature}-implementation.md`
  - `docs/user/how-to-{feature}.md`
* Follow the project's existing documentation patterns
* Include screenshot placeholders in user docs (e.g., `![Step description](./screenshots/{feature}/step1.png)`)
* Auto-link to related existing documentation

## Example Usage
```bash
/document-feature password-reset
```

Generates:
1. `docs/dev/password-reset-implementation.md`
2. `docs/user/how-to-reset-password.md`