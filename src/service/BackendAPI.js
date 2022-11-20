export function downloadRecipes() {
    const breakfastRecipes = [];
    const lunchRecipes = [];
    const dinnerRecipes = [];
    const recipes = {
        breakfast: breakfastRecipes,
        lunch: lunchRecipes,
        dinner: dinnerRecipes,
    };

    fetch("localhost:8080/api/recipes/get").then((data) => {
        data.forEach((element) => {
            const recipe = element.json;
            if (recipe.category === "breakfast") {
                breakfastRecipes.push(recipe);
            } else if (recipe.category === "lunch") {
                lunchRecipes.push(recipe);
            } else if (recipe.category === "dinner") {
                dinnerRecipes.push(recipe);
            }
        });
    });
    return recipes;
}

export function downloadMyRecipes(userName, token) {
    const breakfastRecipes = [];
    const lunchRecipes = [];
    const dinnerRecipes = [];
    const recipes = {
        breakfast: breakfastRecipes,
        lunch: lunchRecipes,
        dinner: dinnerRecipes,
    };

    fetch("localhost:8080/api/user/auth").then((data) => {
        fetch({
            url: "localhost:8080/api/recipes/get",
            method: "post",
            token: data,
        }).then((data) => {
            data.forEach((element) => {
                const recipe = element.json;
                if (recipe.category === "breakfast") {
                    breakfastRecipes.push(recipe);
                } else if (recipe.category === "lunch") {
                    lunchRecipes.push(recipe);
                } else if (recipe.category === "dinner") {
                    dinnerRecipes.push(recipe);
                }
            });
        });
    });
    return recipes;
}

export async function downloadUser(userName) {
    const result = await fetch("http://localhost:8080/api/user/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: userName,
        }),
    })
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error(response.status);
        })
        .catch((err) => {
            console.log(err.message);
        });
    return result;
}

export function getShoppingList() {
    const breakfastRecipes = [];
    const lunchRecipes = [];
    const dinnerRecipes = [];
    const recipes = {
        breakfast: breakfastRecipes,
        lunch: lunchRecipes,
        dinner: dinnerRecipes,
    };

    return recipes;
}

export async function updateUser(userInfoUpdated) {
    console.log(userInfoUpdated);
    const result = await fetch("http://localhost:8080/api/user/update", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: userInfoUpdated,
    })
        .then((response) => {
            if (response.ok) return true;
        })
        .catch((err) => {
            return false;
        });
    return result;
}

// export function updateUserName() {
//     const breakfastRecipes = [];
//     const lunchRecipes = [];
//     const dinnerRecipes = [];
//     const recipes = {
//         breakfast: breakfastRecipes,
//         lunch: lunchRecipes,
//         dinner: dinnerRecipes,
//     };

//     return recipes;
// }

// export function updateFirstName() {
//     const breakfastRecipes = [];
//     const lunchRecipes = [];
//     const dinnerRecipes = [];
//     const recipes = {
//         breakfast: breakfastRecipes,
//         lunch: lunchRecipes,
//         dinner: dinnerRecipes,
//     };

//     return recipes;
// }

// export function updateLastName() {
//     const breakfastRecipes = [];
//     const lunchRecipes = [];
//     const dinnerRecipes = [];
//     const recipes = {
//         breakfast: breakfastRecipes,
//         lunch: lunchRecipes,
//         dinner: dinnerRecipes,
//     };

//     return recipes;
// }

// export function updateEmail() {
//     const breakfastRecipes = [];
//     const lunchRecipes = [];
//     const dinnerRecipes = [];
//     const recipes = {
//         breakfast: breakfastRecipes,
//         lunch: lunchRecipes,
//         dinner: dinnerRecipes,
//     };

//     return recipes;
// }

// export function updateCountry() {
//     const breakfastRecipes = [];
//     const lunchRecipes = [];
//     const dinnerRecipes = [];
//     const recipes = {
//         breakfast: breakfastRecipes,
//         lunch: lunchRecipes,
//         dinner: dinnerRecipes,
//     };

//     return recipes;
// }

// export function updatePassword() {
//     const breakfastRecipes = [];
//     const lunchRecipes = [];
//     const dinnerRecipes = [];
//     const recipes = {
//         breakfast: breakfastRecipes,
//         lunch: lunchRecipes,
//         dinner: dinnerRecipes,
//     };
//     return recipes;
// }
