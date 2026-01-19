import React from "react";
import Breakfast from "../Meal/Breakfast";
import Lunch from "../Meal/Lunch";
import Dinner from "../Meal/Dinner";
import { RecipesByMeal, DayMealSelection, WeekMealSelection } from "../../static/Type";

interface DayProps {
    day: number;
    recipes: RecipesByMeal;
    selectedRecipe: DayMealSelection;
    setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>;
}

function Day({ day, recipes, selectedRecipe, setSelectedRecipes }: DayProps) {
    // Add defensive checks to prevent errors during initial render
    const safeRecipes = recipes || { breakfast: [], lunch: [], dinner: [] };
    const safeSelectedRecipe = selectedRecipe || { breakfast: [], lunch: [], dinner: [] };

    return (
        <>
            <div className="dayContainer">
                <h4>Day {day}</h4>
                <Breakfast
                    recipes={safeRecipes.breakfast}
                    selectedRecipe={safeSelectedRecipe.breakfast}
                    day={day}
                    setSelectedRecipes={setSelectedRecipes}
                />
                <Lunch
                    recipes={safeRecipes.lunch}
                    selectedRecipe={safeSelectedRecipe.lunch}
                    day={day}
                    setSelectedRecipes={setSelectedRecipes}
                />
                <Dinner
                    recipes={safeRecipes.dinner}
                    selectedRecipe={safeSelectedRecipe.dinner}
                    day={day}
                    setSelectedRecipes={setSelectedRecipes}
                />
            </div>
        </>
    );
}

export default Day;
