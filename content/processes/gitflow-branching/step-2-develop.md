# Step 2: Develop the Feature

**Role:** Developer
**Tools:** IDE, Git

---

## Best Practices

- Write **clean, self-documenting code**.
- Follow the project's **coding standards**.
- Add **unit tests** alongside implementation.
- Commit frequently with clear messages.

## Commit Strategy

Use small, logical commits:

```bash
git add src/auth/
git commit -m "feat(auth): implement JWT token generation"

git add tests/auth/
git commit -m "test(auth): add unit tests for JWT generation"
```

## Running Tests Locally

```bash
# Unit tests
npm run test

# With coverage
npm run test:coverage

# Watch mode during development
npm run test:watch
```

## Self-Review Checklist

Before opening a pull request or pushing for review:

- [ ] All new code has tests
- [ ] Tests pass locally
- [ ] No debug logs / commented-out code
- [ ] Linting passes (`npm run lint`)
- [ ] You've read your own diff
