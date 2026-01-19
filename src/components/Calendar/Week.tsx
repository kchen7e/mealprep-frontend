import { useEffect, useState } from "react";
import Day from "./Day";
import Account from "../Account/Account";
import ModalShoppingList from "../ShoppingList/ModalShoppingList";
import { getRecipes } from "../../service/RecipeService";
import { defaultRecipeData } from "../../static/constants";
import { WeekMealSelection, RecipeData } from "../../static/Type";

function Week() {
    const initialSelection: WeekMealSelection = {
        0: { breakfast: [], lunch: [], dinner: [], snacks: [], dessert: [] },
        1: { breakfast: [], lunch: [], dinner: [], snacks: [], dessert: [] },
        2: { breakfast: [], lunch: [], dinner: [], snacks: [], dessert: [] },
        3: { breakfast: [], lunch: [], dinner: [], snacks: [], dessert: [] },
        4: { breakfast: [], lunch: [], dinner: [], snacks: [], dessert: [] },
        5: { breakfast: [], lunch: [], dinner: [], snacks: [], dessert: [] },
        6: { breakfast: [], lunch: [], dinner: [], snacks: [], dessert: [] },
    };

    const [selectedRecipes, setSelectedRecipes] = useState<WeekMealSelection>(initialSelection);
    const getInitialRecipeData = () => {
        const recipeData = localStorage.getItem("recipeData");
        return recipeData ? JSON.parse(recipeData) : defaultRecipeData;
    };
    const initialRecipeData: RecipeData = getInitialRecipeData();
    const [recipeData, setRecipeData] = useState<RecipeData>(initialRecipeData);

    useEffect(() => {
        getRecipes(recipeData).then((result) => {
            localStorage.removeItem("recipeData");
            localStorage.setItem("recipeData", JSON.stringify(result));
            setRecipeData({
                ...recipeData,
                data: result.data,
                lastRetrieval: result.lastRetrieval,
            });
        });
    }, []);

    return (
        <>
            <div className="headerContainer">
                <Account />
                <h1>Meal Prep for this Week</h1>
                <ModalShoppingList list={selectedRecipes} />
            </div>
            <div className="weekContainer">
                {([0, 1, 2, 3, 4, 5, 6] as const).map((i) => {
                    return (
                        <Day
                            key={i}
                            day={i + 1}
                            selectedRecipe={selectedRecipes[i]}
                            recipes={recipeData.data}
                            setSelectedRecipes={setSelectedRecipes}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Week;
