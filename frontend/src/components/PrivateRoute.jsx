import {useContext} from "react";
import {AuthContext} from "./AuthProvider.jsx";
import {Navigate, useNavigate} from "react-router";

const PrivateRoute = function ({children, message = "please login or create an account to continue", needNavigators = true, autoNavigate=false}) {

    const {isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAnonymousLogin = function () {
        navigate("/login");
    }

    const handleAnonymousRegister = function () {
        navigate("/register");
    }

    if (autoNavigate) return <Navigate to="/login" />

    return (
        isLoggedIn ? children :
            <div className="flex flex-col gap-y-3">
                <p className="text-zinc-600/90 text-xl">{message}</p>
                {needNavigators && <div className="flex gap-x-2">
                    <button onClick={handleAnonymousRegister} className="px-4 py-2 uppercase bg-rose-400 hover:bg-rose-500 transition-colors duration-200 rounded cursor-pointer">register</button>
                    <button onClick={handleAnonymousLogin} className="uppercase px-4 py-2 outline-rose-400 outline hover:bg-rose-500/50 transition-colors duration-200 rounded cursor-pointer">login</button>
                </div>}
            </div>
    );
}

export default PrivateRoute;