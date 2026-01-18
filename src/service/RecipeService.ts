import { downloadRecipes } from "./BackendAPI";
import { REFRESH_INTERVAL } from "../static/constants";
import type { RecipeData, Recipe } from "../static/Type.d";

export async function getRecipes(recipeData: RecipeData) {
    if (
        !recipeData.lastRetrieval ||
        Math.round(Date.now() / 1000) - +recipeData.lastRetrieval > REFRESH_INTERVAL
    ) {
        await downloadRecipes().then((response) => {
            recipeData.data.breakfast.length = 0;
            recipeData.data.lunch.length = 0;
            recipeData.data.dinner.length = 0;
            recipeData.data.snacks.length = 0;
            recipeData.data.dessert.length = 0;
            if (response.data) {
                response.data.forEach((recipe: Recipe) => {
                    if (recipe.mealType.includes("BREAKFAST")) {
                        recipeData.data.breakfast.push(recipe);
                    }
                    if (recipe.mealType.includes("LUNCH")) {
                        recipeData.data.lunch.push(recipe);
                    }
                    if (recipe.mealType.includes("DINNER")) {
                        recipeData.data.dinner.push(recipe);
                    }
                    if (recipe.mealType.includes("SNACKS")) {
                        recipeData.data.snacks.push(recipe);
                    }
                    if (recipe.mealType.includes("DESSERT")) {
                        recipeData.data.dessert.push(recipe);
                    }
                    if (!recipe.mealType || recipe.mealType.length === 0) {
                        recipeData.data.dinner.push(recipe);
                    }
                });
                recipeData.lastRetrieval = String(Math.round(Date.now() / 1000));
            }
        });
    }

    return recipeData;
}

function getMyRecipes(_userName: string, _token: string) {
    const downloadedRecipes = downloadRecipes();
    const myRecipes: Recipe[] = [];
    // TODO: This function is incomplete - downloadRecipes returns a Promise
    console.log(downloadedRecipes, myRecipes);
}
