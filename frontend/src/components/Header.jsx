import {Link} from "react-router";
import {useContext} from "react";
import {AuthContext} from "./AuthProvider.jsx";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../utils/utils.js";

const Header = function () {

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

    const handleLogout = function () {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsLoggedIn(false);
    }

    return (
        <header className="">
            <nav className="flex justify-between items-center p-4 bg-neutral-800 px-8">
                <Link to={"/"}><h1 className="text-lg font-bold">Productive Mutant</h1></Link>

                <div className="flex gap-2">
                    {isLoggedIn ?
                        <button onClick={handleLogout} className="px-4 py-2 outline-rose-400 outline hover:bg-rose-500/50 transition-colors duration-200 rounded cursor-pointer">Logout</button>
                        :
                        <>
                            <Link to="/register" className="px-4 py-2 bg-rose-400 hover:bg-rose-500 transition-colors duration-200 rounded cursor-pointer">Register</Link>
                            <Link to="/login" className="px-4 py-2 outline-rose-400 outline hover:bg-rose-500/50 transition-colors duration-200 rounded cursor-pointer">Login</Link>
                        </>
                    }

                </div>
            </nav>
        </header>
    );
}

export default Header;