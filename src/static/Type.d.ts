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
    imageUrl?: string;
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

interface RecipeRef {
    recipeName: string;
    displayName: string;
}

interface DayMealSelection {
    breakfast: RecipeRef[];
    lunch: RecipeRef[];
    dinner: RecipeRef[];
    snacks: RecipeRef[];
    dessert: RecipeRef[];
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
interface UnitData {
    measure: number;
    type: string;
}

interface ShoppingListItem {
    [ingredient: string]: UnitData;
}

interface ShoppingListFoodItem {
    foodName: string;
    displayName: string;
    quantity: number;
    purchaseUnit: string;
    foundAt: string | null;
    originalIngredient: string;
    unmatched: boolean;
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
    RecipeRef,
    MealType,
    RecipesByMeal,
    RecipeData,
    CountryOption,
    DayMealSelection,
    WeekMealSelection,
    ApiResponse,
    LoginResponse,
    RegistrationResponse,
    UnitData,
    ShoppingListItem,
    ShoppingListFoodItem,
    ShoppingListResponse,
    RefreshInterval,
};
