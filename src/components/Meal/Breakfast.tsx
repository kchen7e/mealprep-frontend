import React from "react";
import BreakfastMenu from "../Menu/BreakfastMenu";
import type { Recipe, WeekMealSelection } from "../../static/Type";

interface BreakfastProps {
    day: number;
    recipes: Recipe[];
    selectedRecipe: string[];
    setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>;
}

function Breakfast(props: BreakfastProps) {
    function renderContent() {
        return (
            <BreakfastMenu
                recipes={props.recipes}
                selectedRecipe={props.selectedRecipe}
                day={props.day}
                setSelectedRecipes={props.setSelectedRecipes}
            />
        );
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Breakfast;
