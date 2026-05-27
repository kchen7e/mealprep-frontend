# MealPrep Frontend

React 19 + TypeScript + Vite frontend for the MealPrep application — browse recipes, plan weekly meals, and generate shopping lists for local supermarkets.

**Version:** 0.4.0 | **Node:** 22+ | **UI Library:** Ant Design 5

## Overview

A single-page application where users register, select recipes for each meal slot across a 7-day week, then generate an aggregated shopping list with ingredient quantities. Recipe images are served from the backend via MinIO. Authentication uses JWT tokens stored in cookies.

## Quick Start

**Prerequisites:** Node.js 22+, backend running on `http://localhost:8080`

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. The dev server hot-reloads on changes.

## Environment Variables

Configure in `.env` (git-ignored):

```
VITE_MEALPREP_BACKEND_PROTOCOL=http
VITE_MEALPREP_BACKEND_HOSTNAME=localhost
VITE_MEALPREP_BACKEND_PORT=8080
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `build/` |
| `npm run preview` | Preview production build locally |
| `npm run format` | Format source with Prettier |

## Project Structure

```
src/
  main.tsx                      # React entry point
  App.tsx                       # Root component, renders Week
  service/
    BackendAPI.ts               # Axios HTTP client, exports BACKEND_BASE
    RecipeService.ts            # Recipe fetch + cache logic
    UserService.ts              # User auth + profile operations
  components/
    Calendar/
      Week.tsx                  # Main orchestrator — owns selectedRecipes state
      Day.tsx                   # Single day (breakfast/lunch/dinner slots)
    Meal/
      Breakfast.tsx             # Wraps BreakfastMenu
      Lunch.tsx                 # Wraps LunchMenu
      Dinner.tsx               # Wraps DinnerMenu
    Menu/
      BreakfastMenu.tsx         # Breakfast recipe grid in modal
      LunchMenu.tsx             # Lunch recipe grid in modal
      DinnerMenu.tsx            # Dinner recipe grid in modal
      ModalMenu.tsx             # Reusable Ant Design modal wrapper
      Recipe.tsx                # Selectable recipe card with image
    Account/
      Account.tsx               # View/edit profile, logout
      AccountRegister.tsx       # Login/register modal
      CountryDropDown.tsx       # Country picker with flags
    ShoppingList/
      ModalShoppingList.tsx     # Aggregated shopping list table
  static/
    Type.d.ts                   # All TypeScript interfaces and types
    constants.ts                # Defaults, country list, config
```

## Component Hierarchy

```
App
  Week                              (state: selectedRecipes, recipeData)
    Account / AccountRegister       (state: userInfo, auth token in cookies)
    ModalShoppingList               (fetches POST /api/shopping/get)
    Day × 7
      Breakfast → BreakfastMenu → ModalMenu → Recipe[]
      Lunch     → LunchMenu     → ModalMenu → Recipe[]
      Dinner    → DinnerMenu    → ModalMenu → Recipe[]
```

## State Flow

- **Week.tsx** owns the canonical `selectedRecipes: WeekMealSelection` — a map of day index to `DayMealSelection` (each meal slot holds `RecipeRef[]`).
- Selection state is passed down through props; mutations call `setSelectedRecipes` directly.
- **Recipe data** is cached in `localStorage` with a 5-minute refresh interval.
- **Auth tokens** persist in cookies (`js-cookie`, 30-day expiry). On page load, `Account` reads cookies to auto-login.
- **Shopping list** caches the last-fetched result in `sessionStorage` keyed by the current selection.

## Backend API Dependency

The frontend expects these backend endpoints:

| Endpoint | Used By |
|---|---|
| `GET /api/recipe/get/all` | Recipe loading |
| `GET /api/recipe/{name}/image` | Recipe card images |
| `POST /api/shopping/get` | Shopping list generation |
| `POST /api/user/register` | Account registration |
| `POST /api/user/get` | Login |
| `PATCH /api/user/update` | Profile updates |
| `POST /api/user/logout` | Logout |

All API calls have a 5-second timeout and degrade gracefully when the backend is unavailable.
