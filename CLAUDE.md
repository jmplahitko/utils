# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development

```bash
npm run build        # Compiles TypeScript to dist/ via tsc
npm test             # Run all tests (vitest run)
npm run test:watch   # Run tests in watch mode (vitest)
npx vitest run tests/array/head.test.ts   # Run a single test file
```

No linter is configured. Tests are organized under `tests/` mirroring the `src/` module structure.

## Architecture

This is an ES module TypeScript utility library (`@jmplahitko/utils`) organized into 12 functional modules, each with a barrel `index.ts` that re-exports default exports as named exports:

```
src/
├── _internal/       # Shared internals (throwError, simpleCompare, createMap)
├── array/           # head, rest, pivot, shuffle, slice, split, dedup, set operations
├── async/           # Promise-based pipeline (createPipe with Symbol.iterator)
├── boolean/         # toBoolean
├── dom/             # getBaseHref, getCurrentRoutePath, nodeExistsIn
├── factories/       # copy (deep clone), identity, makeCSV, ExportFactory
├── function/        # curry (up to 7 args, with overflow mode)
├── number/          # Curried arithmetic (add, subtract, multiply, divide, or)
├── object/          # deepGet, diff, merge, pick, prune, selectNonEmpties/NonNulls
├── parse/           # float, int, matchPath, queryString, getMemberPath
├── platform/        # getPlatform (wraps detect-browser)
├── predicate/       # 26 type-guard predicates (isString, isEmpty, equals, etc.)
├── string/          # camelize, capitalize, leftPad, compilePath, etc.
├── global.d.ts      # Global type: Selector<T>
└── index.ts         # Root barrel re-exporting all modules
```

## Key Patterns

- **Export convention:** Each utility is a default export from its own file. Barrel files re-export as named: `export { default as foo } from './foo'`.
- **Non-destructive operations:** `merge`, `copy`, `pick`, `prune` never mutate inputs.
- **Currying:** Many number operations and `equals` use `curry()` from the function module. The curry implementation supports variadic overflow mode (`curry(fn, true)`).
- **Type guards:** Predicate functions return `val is Type` for TypeScript narrowing.
- **Error prefix:** Internal errors use `ui.framework.utils.*` prefix via `_internal/throwError`.
- **Deep clone (`copy`):** Handles TypedArrays, ArrayBuffers, Dates, RegExp, Blobs, DOM nodes. Uses mutual recursion (`copyElement`/`copyRecurse`) with parallel tracking arrays for circular reference detection.
- **Strict mode is off** (`strict: false` in tsconfig) — this is legacy code; don't enable strict without fixing all resulting errors.

## Dependencies

- **detect-browser** — used only in `platform/getPlatform.ts`
- **path-to-regexp** (v6.x) — used in `parse/matchPath.ts` and `string/compilePath.ts`. Do not upgrade to v7+; the API has breaking changes incompatible with this code.
