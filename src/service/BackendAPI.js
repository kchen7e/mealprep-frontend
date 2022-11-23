import axios from "axios";

export function downloadRecipes() {
    const breakfastRecipes = [];
    const lunchRecipes = [];
    const dinnerRecipes = [];
    const supperRecipes = [];
    const dessertRecipes = [];
    const recipes = {
        breakfast: breakfastRecipes,
        lunch: lunchRecipes,
        dinner: dinnerRecipes,
        supper: supperRecipes,
        dessert: dessertRecipes,
    };

    axios({
        method: "get",
        url: "http://localhost:8080/api/recipe/get/all",
        responseType: "json",
    })
        .then((response) => {
            response.data.forEach((recipe) => {
                if (recipe.mealType.includes("BREAKFAST")) {
                    breakfastRecipes.push(recipe);
                }
                if (recipe.mealType.includes("LUNCH")) {
                    lunchRecipes.push(recipe);
                }
                if (recipe.mealType.includes("DINNER")) {
                    dinnerRecipes.push(recipe);
                }
                if (recipe.mealType.includes("SUPPER")) {
                    supperRecipes.push(recipe);
                }
                if (recipe.mealType.includes("DESSERT")) {
                    dessertRecipes.push(recipe);
                }
                if (!recipe.mealType) {
                    dinnerRecipes.push(recipe);
                }
            });
        })
        .catch((error) => {
            throw error;
        });

    // fetch("localhost:8080/api/recipes/get").then((data) => {
    //     data.forEach((element) => {
    //         const recipe = element.json;
    //         if (recipe.category === "breakfast") {
    //             breakfastRecipes.push(recipe);
    //         } else if (recipe.category === "lunch") {
    //             lunchRecipes.push(recipe);
    //         } else if (recipe.category === "dinner") {
    //             dinnerRecipes.push(recipe);
    //         }
    //     });
    // });
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

    axios({
        method: "get",
        url: "localhost:8080/api/recipes/get",
        responseType: "json",
    })
        .then((data) => {
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
        })
        .catch((error) => {
            throw error;
        });

    // fetch("localhost:8080/api/user/auth").then((data) => {
    //     fetch({
    //         url: "localhost:8080/api/recipes/get",
    //         method: "post",
    //         token: data,
    //     }).then((data) => {
    //         data.forEach((element) => {
    //             const recipe = element.json;
    //             if (recipe.category === "breakfast") {
    //                 breakfastRecipes.push(recipe);
    //             } else if (recipe.category === "lunch") {
    //                 lunchRecipes.push(recipe);
    //             } else if (recipe.category === "dinner") {
    //                 dinnerRecipes.push(recipe);
    //             }
    //         });
    //     });
    // });
    return recipes;
}

export function downloadUser(userName) {
    return axios.post("http://localhost:8080/api/user/get", {
        userName: userName,
    });
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

export function updateUser(userInfoUpdated) {
    return axios.patch(
        "http://localhost:8080/api/user/update",
        userInfoUpdated
    );
    // const result = await fetch("http://localhost:8080/api/user/update", {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: userInfoUpdated,
    // })
    //     .then((response) => {
    //         if (response.ok) {
    //             return true;
    //         } else return false;
    //     })
    //     .catch((err) => {
    //         throw err;
    //     });
    // return result;
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
