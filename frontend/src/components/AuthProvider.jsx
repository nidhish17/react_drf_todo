import {createContext, useState} from "react";
import {ACCESS_TOKEN} from "../utils/utils.js";


export const AuthContext = createContext();

const AuthProvider = function ({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(ACCESS_TOKEN));

    const contextValue = {
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;