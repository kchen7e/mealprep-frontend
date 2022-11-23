// import { Recipes, MyRecipes } from "../static/static";
import {downloadRecipes} from "./BackendAPI";

function getRecipes(month, country) {
    const downloadedRecipes = downloadRecipes();

    const recipes = [];
    recipes.push(...downloadedRecipes);
}

function getMyRecipes(userName, token) {
    const downloadedRecipes = downloadRecipes();
    const myRecipes = [];
    myRecipes.push(...downloadedRecipes);
}
