import {useMutation} from "@tanstack/react-query";
import {registerUser} from "./userApi.js";
import toast from "react-hot-toast";
import {Navigate, useNavigate} from "react-router";

const useRegisterMutation = function () {
    const navigate = useNavigate();

    const {mutate: registrationMutation, isPending: isRegistering} = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Successfully registered");
            navigate("/login");
        },
        onError: (error) => {
            const errorMessage = error?.message || "Registration Failed";
            console.log(error); // logging the error message
            toast.error(error.message);
        }
    });

    return {registrationMutation, isRegistering};

}

export default useRegisterMutation;
