import React from "react";
import DinnerMenu from "../Menu/DinnerMenu";

function Dinner(props) {
    function renderContent() {
        return (
            <DinnerMenu
                day={props.day}
                recipes={props.recipes}
                selectedRecipe={props.selectedRecipe}
            />
        );
    }
    return <div className="meal">{renderContent()}</div>;
}

export default Dinner;
