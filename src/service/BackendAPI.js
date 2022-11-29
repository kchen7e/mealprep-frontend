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

export async function downloadUser(userName, token) {
    return axios
        .post(
            `${protocol}://${URL}:${PORT}/api/user/get`,
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
            if (response.status === httpStatus.OK) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function downloadUser2(userInfo) {
    return axios
        .post(
            `${protocol}://${URL}:${PORT}/api/user/get`,
            {
                userName: userInfo.userName,
                passowrd: userInfo.passowrd,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            if (response.status === httpStatus.OK) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error);
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
    console.log(userInfoUpdated);
    return axios({
        method: "patch",
        url: `${protocol}://${URL}:${PORT}/api/user/update`,
        responseType: "json",
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
