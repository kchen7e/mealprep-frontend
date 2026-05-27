import React from "react";
import LunchMenu from "../Menu/LunchMenu";
import type { Recipe, RecipeRef, WeekMealSelection } from "../../static/Type";

interface LunchProps {
    day: number;
    recipes: Recipe[];
    selectedRecipe: RecipeRef[];
    setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>;
}

function Lunch(props: LunchProps) {
    function renderContent() {
        return (
            <LunchMenu
                day={props.day}
                recipes={props.recipes}
                selectedRecipe={props.selectedRecipe}
                setSelectedRecipes={props.setSelectedRecipes}
            />
        );
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Lunch;
