import React, {useState} from "react";

function Recipe(props) {
    const [selected, setStatus] = useState(false);

    function handleClick() {
        setStatus(!selected);
    }
    return (
        <div className="recipeContainer">
            <div className="recipeBrief">
                <button onClick={handleClick}>button</button>
                recipe name
                <img alt="recipe image"></img>
            </div>
            <div className="recipeDescription">description</div>
        </div>
    );
}
export default Recipe;
