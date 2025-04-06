import {useMutation} from "@tanstack/react-query";
import {loginUser} from "./userApi.js";
import toast from "react-hot-toast";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../utils/utils.js";
import {useContext} from "react";
import {AuthContext} from "../components/AuthProvider.jsx";
import {useNavigate} from "react-router";

export default function useLoginMutation() {
    const {setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const {mutate: loginMutation, isPending: isLoggingIn} = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            const {access, refresh} = response.data;
            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);
            setIsLoggedIn(true);
            toast.success("Login Successful");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error?.message || "Failed To LogIn")
        }
    })

    return {loginMutation, isLoggingIn};
}