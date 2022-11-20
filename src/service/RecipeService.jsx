import { Recipes, MyRecipes } from "../static/static";
import {downloadRecipes} from "./BackendAPI"



function getRecipes(month, country) {
    const downloadedRecipes = downloadRecipes();
    Recipes.length = 0;
    Recipes.push(..downloadedRecipes);
}

function getMyRecipes(userName, token) {
    const downloadedRecipes = downloadMyRecipes();
    MyRecipes.length = 0;
    MyRecipes.push(..downloadedRecipes);
}


