import { downloadUser, updateUser } from "./BackendAPI";
import _ from "lodash";

export function getUserInfo(userName) {
    const result = downloadUser(userName)
        .then((userData) => {
            if (userData) {
                const noNullData = _.mapValues(userData, (v) => (v === null ? "" : v));
                return noNullData;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err.message);
            throw err;
        });
    return result;
}

export async function updateUserInfo(updatedUserInfo) {
    const result = updateUser(JSON.stringify(updatedUserInfo))
        .then((response) => {
            return response;
        })
        .catch((err) => {
            throw err;
        });
    return result;
}

export async function registerUser(userName, token) {
    const result = downloadUser(userName)
        .then((userData) => {
            if (userData) {
                const noNullData = _.mapValues(userData, (v) => (v === null ? "" : v));
                return noNullData;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err.message);
            throw err;
        });
    return result;
}
