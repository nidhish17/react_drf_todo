import Header from "./Header.jsx";
import {Outlet} from "react-router";


const AppLayout = function () {


    return (
        <>
            <Header/>
            <Outlet />
        </>
    );
}

export default AppLayout;