import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppLayout from "./components/AppLayout.jsx";
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Main from "./components/Main.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import PublicRoute from "./components/PublicRoute.jsx";


const queryClient = new QueryClient()

const App = function () {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<AppLayout/>}>
                            <Route index element={<Main/>}/>
                            <Route path={"login"} element={<PublicRoute><Login/></PublicRoute>}/>
                            <Route path={"register"} element={<PublicRoute><Register/></PublicRoute>}/>
                        </Route>
                    </Routes>

                </BrowserRouter>


                <Toaster position={"top-center"} gutter={12}/>
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;