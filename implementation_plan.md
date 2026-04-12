# Architecture Refactor Plan

This plan aims to refactor the repository into a clean, reusable, and maintainable project structure, eliminating structural debt, scattering issues, and improving separation of concerns.

## Brief Audit of Current Issues

1. **Scattered Component Structure:** The repository arbitrarily splits components between `src/components/custom`, `src/components/layouts`, `src/modules/.../components`. It's hard to know where a piece of logic or UI lives.
2. **Hardcoded Data Mingled with UI:** Files like `AppSidebar.vue`, `SearchTable.vue`, and `search-table.vue` inject huge arrays of raw static data directly into their components, violating separation of concerns and massively inflating component files.
3. **Inconsistent Naming and Collisions:** We have `SearchTable.vue` (a massive TanStack-based data table for accounts) in `components/custom` and `search-table.vue` (a simple hardcoded invoices table) in `modules/dashboard`. It introduces confusion and redundancy. `Screen` suffix is used inconsistently.
4. **Lack of Core Structural Folders:** The app is missing designated spaces for `types`, `constants`, `layouts`, and `utils`. The `modules` structure acts as a pseudo-pages directory, which adds extra layers that bring no real architectural value for this scale of app.

## Proposed Changes

We will transition to a more traditional, scalable Vue 3 structure.

### `src/types`

We will extract all TypeScript definitions from inline components into a unified types directory.

#### [NEW] src/types/index.ts (Define `AccountData`, `InvoiceData`, `SidebarData`, etc.)

### `src/constants`

We will move all hardcoded dummy data out of the `.vue` files.

#### [NEW] src/constants/navigation.ts (Sidebar `data.navMain`, `data.teams`, etc.)

#### [NEW] src/constants/mockData.ts (Mock invoices and accounts for the tables)

### `src/layouts`

Dedicated layouts structure (moving out of `components/layouts/` and `components/custom/`).

#### [NEW] src/layouts/DefaultLayout.vue

#### [NEW] src/layouts/NoMenuLayout.vue

#### [NEW] src/layouts/components/AppSidebar.vue

#### [NEW] src/layouts/components/NavHeader.vue

#### [NEW] src/layouts/components/NavMain.vue

#### [NEW] src/layouts/components/NavUser.vue

#### [NEW] src/layouts/components/TeamSwitcher.vue

#### [NEW] src/layouts/components/NavCalendar.vue

#### [NEW] src/layouts/components/NavProjects.vue

#### [DELETE] src/components/layouts/DefaultLayout.vue

#### [DELETE] src/components/layouts/NoMenuLayout.vue

#### [DELETE] src/components/custom/AppSidebar.vue

#### [DELETE] src/components/custom/NavHeader.vue

#### [DELETE] src/components/custom/NavMain.vue

#### [DELETE] src/components/custom/NavUser.vue

#### [DELETE] src/components/custom/TeamSwitcher.vue

#### [DELETE] src/components/custom/NavCalendar.vue

#### [DELETE] src/components/custom/NavProjects.vue

### `src/components/common` (Replacing `custom`)

Generic, pure presentational components decoupled from specific app logic.

#### [NEW] src/components/common/GlobalSearchInput.vue

#### [NEW] src/components/common/InputSearch.vue

#### [NEW] src/components/common/BoxButton.vue

#### [NEW] src/components/common/DataTable.vue (Refactored `SearchTable.vue` to be reusable via props)

#### [DELETE] src/components/custom/GlobalSearchInput.vue

#### [DELETE] src/components/custom/InputSearch.vue

#### [DELETE] src/components/custom/BoxButton.vue

#### [DELETE] src/components/custom/SearchTable.vue

### `src/views` (Replacing `modules`)

Page-level layouting component views.

#### [NEW] src/views/auth/SignInView.vue (Extracting `modules/auth/pages/SignInScreen.vue`)

#### [NEW] src/views/auth/components/LoginForm.vue (Extracting `modules/auth/components/LoginForm.vue`)

#### [NEW] src/views/dashboard/OverviewView.vue (Extracting `modules/dashboard/pages/OverviewScreen.vue`)

#### [NEW] src/views/dashboard/components/InvoicesTable.vue (Renaming `modules/dashboard/components/search-table.vue`)

#### [NEW] src/views/error/NotFoundView.vue (Extracting `components/error/NotFoundScreen.vue`)

#### [DELETE] src/modules/auth/pages/SignInScreen.vue

#### [DELETE] src/modules/auth/components/LoginForm.vue

#### [DELETE] src/modules/dashboard/pages/OverviewScreen.vue

#### [DELETE] src/modules/dashboard/components/search-table.vue

#### [DELETE] src/components/error/NotFoundScreen.vue

### `src/utils`

Move `src/lib/utils.ts` to standard `src/utils/index.ts` to stay consistent with Vite/Vue patterns.

#### [NEW] src/utils/index.ts

#### [DELETE] src/lib/utils.ts

### `src/router`

Update all paths inside `src/router/index.ts` to reflect the new structure.

#### [MODIFY] src/router/index.ts

> [!WARNING]
> This is a large, destructive refactor that touches layout structure, core components, and routers. I will ensure imports are fully updated in `components.json`, `tsconfig.json`, and all `.vue` script blocks.

## Open Questions

None at this time. Unless you prefer a different folder stricture than standard Vue `views`/`components`/`layouts`, this plan should fully fulfill your requests.

## Verification Plan

### Automated Tests

Run `npm run build` or `npx vue-tsc --noEmit` if typescript checking is enabled to look for import resolution errors.

### Manual Verification

Review file paths, inspect the `router/index.ts` for clean paths, and visually inspect a few updated files to ensure separation of concerns.
