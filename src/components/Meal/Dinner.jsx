import React from "react";
import DinnerMenu from "../Menu/DinnerMenu";

function Dinner(props) {
    function renderContent() {
        return (
            <DinnerMenu
                // handleSelect={handleSetRecipe}
                // clearSelect={handleClear}
                recipes={props.recipes}
                selectedRecipe={props.selectedRecipe}
            />
        );
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Dinner;
