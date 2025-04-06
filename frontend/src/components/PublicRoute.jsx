import {useContext} from "react";
import {AuthContext} from "./AuthProvider.jsx";
import {Navigate} from "react-router";

const PublicRoute = function ({children}) {

    const {isLoggedIn} = useContext(AuthContext);

    return (
        isLoggedIn ? <Navigate to={"/"} /> : children
    );
}

export default PublicRoute;