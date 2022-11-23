import React, {useRef} from "react";
import Day from "./Day";
import Account from "../Account/Account";
import {Button, Icon} from "semantic-ui-react";

function Week(props) {
    const initialStatus = {
        0: {breakfast: [], lunch: [], dinner: []},
        1: {breakfast: [], lunch: [], dinner: []},
        2: {breakfast: [], lunch: [], dinner: []},
        3: {breakfast: [], lunch: [], dinner: []},
        4: {breakfast: [], lunch: [], dinner: []},
        5: {breakfast: [], lunch: [], dinner: []},
        6: {breakfast: [], lunch: [], dinner: []},
    };

    const selectedRecipe = useRef(initialStatus);

    function getShoppingList() {
        console.log("submitting", selectedRecipe.current);
    }

    return (
        <>
            <div className="headerContainer">
                <Account />
                <h1>Meal Prep for this Week</h1>
                <Button
                    basic
                    // color="white"
                    onClick={getShoppingList}
                    style={{marginLeft: 20}}>
                    <Icon name="shopping cart" size="large" />
                    Get Shopping List
                </Button>
            </div>
            <div className="weekContainer">
                {[...Array(7)].map((_, i) => {
                    return (
                        <Day
                            key={i}
                            day={i + 1}
                            selectedRecipe={selectedRecipe.current[i]}
                            recipes={props.recipes}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Week;
