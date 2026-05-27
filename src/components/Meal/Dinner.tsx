import React from "react";
import DinnerMenu from "../Menu/DinnerMenu";
import type { Recipe, RecipeRef, WeekMealSelection } from "../../static/Type";

interface DinnerProps {
    day: number;
    recipes: Recipe[];
    selectedRecipe: RecipeRef[];
    setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>;
}

function Dinner(props: DinnerProps) {
    function renderContent() {
        return (
            <DinnerMenu
                day={props.day}
                recipes={props.recipes}
                selectedRecipe={props.selectedRecipe}
                setSelectedRecipes={props.setSelectedRecipes}
            />
        );
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Dinner;
