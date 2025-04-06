import axios from "axios";
import httpStatus from "http-status";

const {
    VITE_MEALPREP_BACKEND_HOSTNAME,
    VITE_MEALPREP_BACKEND_PORT,
    VITE_MEALPREP_BACKEND_PROTOCOL,
} = import.meta.env;

const PROTOCOL = VITE_MEALPREP_BACKEND_PROTOCOL;
const PORT = VITE_MEALPREP_BACKEND_PORT;
const URL = VITE_MEALPREP_BACKEND_HOSTNAME;

export async function downloadRecipes() {
    return axios({
        method: "get",
        url: `${PROTOCOL}://${URL}:${PORT}/api/recipe/get/all/`,
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
        url: `${PROTOCOL}://${URL}:${PORT}/api/recipe/get/all`,
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
        url: `${PROTOCOL}://${URL}:${PORT}/api/user/get`,
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
            console.log(response);
            if (response.status === httpStatus.ACCEPTED) {
                response.data.token = response.headers.authorization;
                return response.data;
            }
        })
        .catch((error) => {
            console.log("error is ", error);
        });
}

export async function queryShoppingList(list) {
    return axios({
        method: "post",
        url: `${PROTOCOL}://${URL}:${PORT}/api/shopping/get`,
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
            console.log("error is ", error);
        });
}

export function updateUser(userInfoUpdated) {
    return axios({
        method: "patch",
        url: `${PROTOCOL}://${URL}:${PORT}/api/user/update`,
        data: userInfoUpdated,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === httpStatus.ACCEPTED) {
                return response.data;
            } else {
                console.log("nothing");
            }
        })
        .catch((error) => {
            console.log("error is ", error);
        });
}

export async function registerAccount(userInfo) {
    console.log(JSON.stringify(userInfo));
    return axios({
        method: "post",
        url: `${PROTOCOL}://${URL}:${PORT}/api/user/register`,
        responseType: "json",
        data: userInfo,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === httpStatus.CREATED) {
                response.data.token = response.headers.authorization;
                return response.data;
            }
        })
        .catch((error) => {
            console.log("error is ", error);
        });
}

export async function logOutUser(userName, token) {
    axios({
        method: "post",
        url: `${PROTOCOL}://${URL}:${PORT}/api/user/logout`,
        responseType: "json",
        data: userName,
        headers: {
            "Content-Type": "application/json",
        },
    }).then(data => {
        console.log(data);
    })

}