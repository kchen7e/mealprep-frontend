export function downloadRecipes() {
    const breakfastRecipes = [];
    const lunchRecipes = [];
    const dinnerRecipes = [];
    const recipes = {
        breakfast: breakfastRecipes,
        lunch: lunchRecipes,
        dinner: dinnerRecipes,
    };

    return recipes;
}
