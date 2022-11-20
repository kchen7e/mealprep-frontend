import React from "react";
import {useState} from "react";
import DinnerMenu from "../Menu/DinnerMenu";

function Dinner(props) {
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
                <DinnerMenu
                    handleSelect={handleSetRecipe}
                    clearSelect={handleClear}
                />
            );
        }
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Dinner;
