import React, {useState, useRef} from "react";

function Recipe(props) {
    let initialStatus = props.selectedRecipe.includes(props.recipe.recipeName)
        ? true
        : false;

    const [selected, setStatus] = useState(initialStatus);

    function handleClick(event) {
        if (selected) {
            const index = props.selectedRecipe.indexOf(
                event.target.nextSibling.data
            );
            if (index > -1) {
                props.selectedRecipe.splice(index, 1);
            }
        } else {
            props.selectedRecipe.push(event.target.nextSibling.data);
        }
        setStatus(!selected);
    }

    return (
        <div
            className={
                selected ? "recipeContainer selected" : "recipeContainer"
            }>
            <div className="recipeBrief">
                <input
                    onClick={handleClick}
                    type="button"
                    value={selected ? "✓" : "+"}
                />
                {/* <img alt="recipe"></img> */}
                {props.recipe.recipeName}
            </div>
            <div className="recipeDescription">{props.recipe.recipeName}</div>
        </div>
    );
}
export default Recipe;
