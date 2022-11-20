import React from "react";
import {useState} from "react";
import BreakfastMenu from "../Menu/BreakfastMenu";

function Breakfast(props) {
    const [currentRecipe, setRecipe] = useState("");

    function handleSetRecipe(recipe) {
        setRecipe(recipe);
    }

    function handleClear() {
        setRecipe("");
        props.selelctedRecipe = "";
    }

    function renderContent() {
        if (currentRecipe) {
            props.selelctedRecipe = currentRecipe;
            return <p>recipe</p>;
        } else {
            return (
                <BreakfastMenu
                    handleSelect={handleSetRecipe}
                    clearSelect={handleClear}
                />
            );
        }
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Breakfast;
