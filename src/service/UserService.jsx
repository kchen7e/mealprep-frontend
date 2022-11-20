import {downloadUser, updateUser} from "./BackendAPI";
import {UserInfo} from "../static/static";
import _ from "lodash";

export async function getUserInfo(userName, token) {
    try {
        downloadUser(userName).then((data) => {
            const noNullData = _.mapValues(data, (v) => (v === null ? "" : v));
            return noNullData;
        });
    } catch (err) {
        alert(err.message);
    }
}

export async function updateUserInfo(userInfo) {
    return updateUser(JSON.stringify(userInfo));
}
