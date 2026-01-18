import { downloadUser, updateUser } from "./BackendAPI";
import type { UserInfo } from "../static/Type.d";
import _ from "lodash";

export function getUserInfo(userInfo: Partial<UserInfo>) {
    const result = downloadUser(userInfo)
        .then((userData) => {
            if (userData) {
                const noNullData = _.mapValues(userData, (v) => (v === null ? "" : v));
                return noNullData;
            } else {
                return null;
            }
        })
        .catch((err: any) => {
            console.log(err.message);
            throw err;
        });
    return result;
}

export async function updateUserInfo(updatedUserInfo: Partial<UserInfo>) {
    const result = updateUser(updatedUserInfo)
        .then((response) => {
            return response;
        })
        .catch((err: any) => {
            throw err;
        });
    return result;
}

export async function registerUser(userInfo: Partial<UserInfo>, _token: string) {
    const result = downloadUser(userInfo)
        .then((userData) => {
            if (userData) {
                const noNullData = _.mapValues(userData, (v) => (v === null ? "" : v));
                return noNullData;
            } else {
                return null;
            }
        })
        .catch((err: any) => {
            console.log(err.message);
            throw err;
        });
    return result;
}
