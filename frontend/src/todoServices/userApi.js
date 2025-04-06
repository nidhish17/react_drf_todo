import {BASE_URL} from "../utils/utils.js";
import axios from "axios";


export const registerUser = async function ({username, password, confirmPassword}) {
    const response = await axios.post(`${BASE_URL}register/`, {
        username,
        password,
        confirm_password: confirmPassword
    });

    return response;
}

export const loginUser = async function ({username, password}) {
    const response = await axios.post(`${BASE_URL}token/`, {
        username,
        password
    })

    return response;
}



