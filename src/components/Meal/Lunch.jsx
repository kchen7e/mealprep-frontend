import React from "react";
import LunchMenu from "../Menu/LunchMenu";

function Lunch(props) {
    function renderContent() {
        return (
            <LunchMenu
                // handleSelect={handleSetRecipe}
                // clearSelect={handleClear}
                recipes={props.recipes}
                selectedRecipe={props.selectedRecipe}
            />
        );
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Lunch;
