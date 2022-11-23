import React from "react";
import BreakfastMenu from "../Menu/BreakfastMenu";

function Breakfast(props) {
    function renderContent() {
        return (
            <BreakfastMenu
                recipes={props.recipes}
                selectedRecipe={props.selectedRecipe}
            />
        );
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Breakfast;
