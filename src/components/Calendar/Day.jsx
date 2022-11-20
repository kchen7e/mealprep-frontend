import React from "react";
import Breakfast from "../Meal/Breakfast";
import Lunch from "../Meal/Lunch";
import Dinner from "../Meal/Dinner";

function Day(props) {
    return (
        <>
            <div className="dayContainer">
                <h4>Day {props.day}</h4>
                <Breakfast selectedRecipe={props.selectedRecipe.breakfast} />
                <Lunch selectedRecipe={props.selectedRecipe.lunch} />
                <Dinner selectedRecipe={props.selectedRecipe.dinner} />
            </div>
        </>
    );
}

export default Day;
