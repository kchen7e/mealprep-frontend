// User-related types
interface UserInfo {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    token: string;
}

// Recipe-related types
interface Recipe {
    recipeName: string;
    displayName: string;
    ingredients: string[];
    seasonality: string[];
    mealType: string[];
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'dessert';

interface RecipesByMeal {
    breakfast: Recipe[];
    lunch: Recipe[];
    dinner: Recipe[];
    snacks: Recipe[];
    dessert: Recipe[];
}

interface RecipeData {
    data: RecipesByMeal;
    lastRetrieval: string;
}

// Country-related types
interface CountryOption {
    key: string;
    value: string;
    flag: string;
    label: string;
}

// Day selection types (for meal planning)
interface DayMealSelection {
    breakfast: Recipe[];
    lunch: Recipe[];
    dinner: Recipe[];
}

interface WeekMealSelection {
    [dayIndex: number]: DayMealSelection;
}

// API response types
interface ApiResponse<T> {
    data: T;
    status: number;
}

interface LoginResponse {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    token: string;
}

interface RegistrationResponse {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    token: string;
}

// Shopping list types
interface ShoppingListItem {
    [ingredient: string]: number | string;
}

interface ShoppingListResponse {
    [key: string]: any;
}

// Configuration types
type RefreshInterval = number;

// Export all types for use across the application
export type {
    UserInfo,
    Recipe,
    MealType,
    RecipesByMeal,
    RecipeData,
    CountryOption,
    DayMealSelection,
    WeekMealSelection,
    ApiResponse,
    LoginResponse,
    RegistrationResponse,
    ShoppingListItem,
    ShoppingListResponse,
    RefreshInterval
};