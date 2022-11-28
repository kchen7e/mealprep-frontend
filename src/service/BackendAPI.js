import axios from "axios";

const URL = "localhost";

export async function downloadRecipes() {
    return axios({
        method: "get",
        url: `http://${URL}:8080/api/recipe/get/all/`,
        responseType: "json",
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
}

export async function downloadMyRecipes(userName, token) {
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
        url: `http://${URL}:8080/api/recipe/get/all`,
        responseType: "json",
    })
        .then((data) => {
            data.forEach((element) => {
                const recipe = element.json;
                if (recipe.mealType === "breakfast") {
                    breakfastRecipes.push(recipe);
                } else if (recipe.mealType === "lunch") {
                    lunchRecipes.push(recipe);
                } else {
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

export async function downloadUser(userName) {
    console.log("download user", userName);
    return axios
        .post(
            `http://${URL}:8080/api/user/get`,
            {
                userName: userName,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function queryShoppingList(list) {
    // console.log(list);
    return axios({
        method: "post",
        url: `http://${URL}:8080/api/shopping/get`,
        responseType: "json",
        data: list,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
}

export function updateUser(userInfoUpdated) {
    return axios.patch(`http://${URL}:8080/api/user/update/`, userInfoUpdated);
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
