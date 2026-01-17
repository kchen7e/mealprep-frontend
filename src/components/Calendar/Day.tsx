import React from "react";
import Breakfast from "../Meal/Breakfast";
import Lunch from "../Meal/Lunch";
import Dinner from "../Meal/Dinner";

function Day(props) {
    // Add defensive checks to prevent errors during initial render
    const recipes = props.recipes || { breakfast: [], lunch: [], dinner: [] };
    const selectedRecipe = props.selectedRecipe || { breakfast: [], lunch: [], dinner: [] };

    return (
        <>
            <div className="dayContainer">
                <h4>Day {props.day}</h4>
                <Breakfast
                    recipes={recipes.breakfast}
                    selectedRecipe={selectedRecipe.breakfast}
                    day={props.day}
                />
                <Lunch
                    recipes={recipes.lunch}
                    selectedRecipe={selectedRecipe.lunch}
                    day={props.day}
                />
                <Dinner
                    recipes={recipes.dinner}
                    selectedRecipe={selectedRecipe.dinner}
                    day={props.day}
                />
            </div>
        </>
    );
}

export default Day;
