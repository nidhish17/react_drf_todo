import {ModalProvider} from "./Modal.jsx";
import CreateTodo from "./CreateTodo.jsx";
import DisplayTasks from "./DisplayTasks.jsx";
import {useContext} from "react";
import {AuthContext} from "./AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const Main = function () {

    const {isLoggedIn} = useContext(AuthContext);

    return (
        <main className="max-w-screen-2xl mx-auto p-4 sm:p-8 md:p-12 lg:p-16 2xl:p-20">
            <ModalProvider>
                <section className="p-4 sm:p-8 md:p-12">
                    <CreateTodo/>
                </section>

                {/*<section className="p-4 sm:p-8 md:p-12">*/}

                {/*</section>*/}

                <section className="p-4 sm:p-8 md:p-12">
                    <PrivateRoute needNavigators={false} message="Login or Register to add/view Tasks">
                        <DisplayTasks />
                    </PrivateRoute>
                </section>

            </ModalProvider>


        </main>
    );
}

export default Main;