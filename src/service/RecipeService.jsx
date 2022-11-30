// import { Recipes, MyRecipes } from "../static/static";
import {downloadRecipes} from "./BackendAPI";

export async function getRecipes(recipeData) {
    if (
        !recipeData.lastRetrieval ||
        Math.round(Date.now() / 1000) - +recipeData.lastRetrieval > 600000
    ) {
        console.log("pulling data now");
        await downloadRecipes().then((response) => {
            recipeData.data.breakfast.length = 0;
            recipeData.data.lunch.length = 0;
            recipeData.data.dinner.length = 0;
            recipeData.data.snacks.length = 0;
            recipeData.data.dessert.length = 0;
            if (response.data) {
                response.data.forEach((recipe) => {
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
                recipeData.lastRetrieval = Math.round(Date.now() / 1000);
            }
        });
    }

    return recipeData;
}

function getMyRecipes(userName, token) {
    const downloadedRecipes = downloadRecipes();
    const myRecipes = [];
    myRecipes.push(...downloadedRecipes);
}
