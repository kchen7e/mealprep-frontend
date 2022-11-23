import {downloadUser, updateUser} from "./BackendAPI";
import _ from "lodash";

export function getUserInfo(userName, token) {
    const result = downloadUser(userName)
        .then((response) => {
            if (response.data) {
                const noNullData = _.mapValues(response.data, (v) =>
                    v === null ? "" : v
                );
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

export function updateUserInfo(updatedUserInfo) {
    const result = updateUser(updatedUserInfo)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err.message);
            throw err;
        });
    return result;
}
