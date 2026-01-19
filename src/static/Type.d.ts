// User-related types
interface UserInfo {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
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

type MealType = "breakfast" | "lunch" | "dinner" | "snacks" | "dessert";

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

interface DayMealSelection {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
    dessert: string[];
}

type WeekMealSelection = {
    [dayIndex in 0 | 1 | 2 | 3 | 4 | 5 | 6]: DayMealSelection;
};

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

// Export all types
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
    RefreshInterval,
};
