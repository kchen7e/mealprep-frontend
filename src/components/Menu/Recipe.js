import React, {useState} from "react";
import meal from "../../static/meal.jpg";

function Recipe(props) {
    let initialStatus = props.selectedRecipe.includes(props.recipe.recipeName)
        ? true
        : false;

    const [selected, setStatus] = useState(initialStatus);
    var recipeNameLocator = null;

    function handleClick() {
        if (selected) {
            const index = props.selectedRecipe.indexOf(
                recipeNameLocator.getAttribute("data")
            );
            if (index > -1) {
                props.selectedRecipe.splice(index, 1);
            }
        } else {
            props.selectedRecipe.push(recipeNameLocator.getAttribute("data"));
        }
        setStatus(!selected);
    }

    return (
        <div
            className={
                selected ? "recipeContainer selected" : "recipeContainer"
            }
            onClick={handleClick}>
            <div className="recipeBrief">
                <img alt="recipe" src={meal}></img>
                <button type="button">{selected ? "✓" : "+"}</button>
            </div>
            <p
                ref={(ref) => (recipeNameLocator = ref)}
                data={props.recipe.recipeName}>
                {props.recipe.displayName}
            </p>
        </div>
    );
}
export default Recipe;
