# Project Rules

## No workflow delegation

**Do all work directly in this session. Never launch a workflow, run_workflow call, or delegate to a sub-agent for this project.**

This applies to every task: implementation, investigation, code changes, file edits, build checks, and anything else. Work through it directly, step by step, in the current session.

## Brand name

The platform is called **ituwa**. Never write "gohperAI", "Kora", or "[BRAND_NAME]" anywhere in code, copy, or comments.

## Direct working style

- Read the relevant files first, then make the changes.
- Run `pnpm tsc --noEmit` after significant changes to confirm no type errors.
- Report what was changed and what still needs to be done.
