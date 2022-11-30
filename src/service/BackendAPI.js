import axios from "axios";
import httpStatus from "http-status";

// const URL = "mealprep.storm7e.de";
const URL = "localhost";
// const PORT = "8081";
const PORT = "8080";
// const protocol = "https";
const protocol = "http";

export async function downloadRecipes() {
    return axios({
        method: "get",
        url: `${protocol}://${URL}:${PORT}/api/recipe/get/all/`,
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
        url: `${protocol}://${URL}:${PORT}/api/recipe/get/all`,
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
    return recipes;
}

export async function downloadUser(userInfo) {
    return axios({
        method: "post",
        url: `${protocol}://${URL}:${PORT}/api/user/get`,
        data: {
            userName: userInfo.userName,
            password: userInfo.password,
            token: userInfo.token,
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: userInfo.token,
        },
    })
        .then((response) => {
            if (response.status === httpStatus.ACCEPTED) {
                response.data.token = response.headers.authorization;
                return response.data;
            }
        })
        .catch((error) => {
            console.log("error is ", error);
            throw error;
        });
}

export async function queryShoppingList(list) {
    return axios({
        method: "post",
        url: `${protocol}://${URL}:${PORT}/api/shopping/get`,
        responseType: "json",
        data: list,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === httpStatus.OK) {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
}

export function updateUser(userInfoUpdated) {
    return axios({
        method: "patch",
        url: `${protocol}://${URL}:${PORT}/api/user/update`,
        data: userInfoUpdated,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === httpStatus.ACCEPTED) {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
}

export async function registerAccount(userInfo) {
    return axios({
        method: "post",
        url: `${protocol}://${URL}:${PORT}/api/user/register`,
        responseType: "json",
        data: userInfo,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === httpStatus.CREATED) {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
}
