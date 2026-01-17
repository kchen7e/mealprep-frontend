import axios from "axios";
import httpStatus from "http-status";

const {
    VITE_MEALPREP_BACKEND_HOSTNAME,
    VITE_MEALPREP_BACKEND_PORT,
    VITE_MEALPREP_BACKEND_PROTOCOL,
} = import.meta.env;

const PROTOCOL = VITE_MEALPREP_BACKEND_PROTOCOL || 'http';
const PORT = VITE_MEALPREP_BACKEND_PORT || '8080';
const URL = VITE_MEALPREP_BACKEND_HOSTNAME || 'localhost';

export async function downloadRecipes() {
    return axios({
        method: "get",
        url: `${PROTOCOL}://${URL}:${PORT}/api/recipe/get/all/`,
        responseType: "json",
        timeout: 5000, // 5 second timeout
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error("Failed to download recipes:", error.message);
            if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
                console.warn("Backend server appears to be offline - using empty recipe data");
                // Return empty recipe structure when backend is unavailable
                return {
                    data: [],
                    status: 200
                };
            }
            throw error;
        });
}

export async function downloadMyRecipes(userName, token) {
    const breakfastRecipes: any[] = [];
    const lunchRecipes: any[] = [];
    const dinnerRecipes: any[] = [];
    const recipes = {
        breakfast: breakfastRecipes,
        lunch: lunchRecipes,
        dinner: dinnerRecipes,
    };

    try {
        const response = await axios({
            method: "get",
            url: `${PROTOCOL}://${URL}:${PORT}/api/recipe/get/all`,
            responseType: "json",
            timeout: 5000,
        });

        if (response.data && Array.isArray(response.data)) {
            response.data.forEach((element) => {
                const recipe = element.json || element;
                if (recipe.mealType === "breakfast") {
                    breakfastRecipes.push(recipe);
                } else if (recipe.mealType === "lunch") {
                    lunchRecipes.push(recipe);
                } else {
                    dinnerRecipes.push(recipe);
                }
            });
        }
    } catch (error) {
        console.error("Failed to download my recipes:", error.message);
        if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
            console.warn("Backend server appears to be offline - using empty recipe data");
        } else {
            throw error;
        }
    }
    
    return recipes;
}

export async function downloadUser(userInfo) {
    return axios({
        method: "post",
        url: `${PROTOCOL}://${URL}:${PORT}/api/user/get`,
        data: {
            userName: userInfo.userName,
            // Backend expects password to be Base64 encoded
            password: userInfo.password ? btoa(userInfo.password) : "",
            token: userInfo.token,
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: userInfo.token,
        },
        timeout: 5000, // 5 second timeout
    })
        .then((response) => {
            // Backend returns ACCEPTED (202) for successful auth
            if (response.status === httpStatus.ACCEPTED) {
                // Token is returned in Authorization header
                response.data.token = response.headers.authorization;
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Backend API Error:", error.message);
            if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
                console.warn("Backend server appears to be offline or endpoint not found");
                return null;
            }
            throw error;
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
    // Backend expects password to be Base64 encoded
    const payload = {
        ...userInfo,
        password: userInfo.password ? btoa(userInfo.password) : "",
    };
    console.log("Registration payload:", JSON.stringify(payload));
    return axios({
        method: "post",
        url: `${PROTOCOL}://${URL}:${PORT}/api/user/register`,
        responseType: "json",
        data: payload,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 5000, // 5 second timeout
    })
        .then((response) => {
            if (response.status === httpStatus.CREATED) {
                // Token is returned in Authorization header
                response.data.token = response.headers.authorization;
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Registration failed:", error.message);
            if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
                console.warn("Backend server appears to be offline");
                return null;
            }
            throw error;
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
    }).then((data) => {
        console.log(data);
    });
}
