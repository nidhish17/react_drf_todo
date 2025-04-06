import toast from "react-hot-toast";
import useRegisterMutation from "../todoServices/registerMutation.js";

const Register = function () {

    const {registrationMutation, isRegistering} = useRegisterMutation();

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {username, createPassword, confirmPassword} = Object.fromEntries(formData.entries());

        if (!username || !createPassword || !confirmPassword) {
            toast.error("please fill all the fields");
            return;
        }

        registrationMutation({
            username,
            password: createPassword,
            confirmPassword
        })

    }

    return (
        <main className="max-w-screen-2xl mx-auto p-4 sm:p-8 md:p-12 lg:p-16 2xl:p-20">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="w-lg self-center flex flex-col gap-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="">Username</label>
                        <input type="text" name="username" id="username" className="px-4 py-2 rounded outline-none ring-1 focus:ring-purple-700 font-semibold placeholder:text-zinc-500 placeholder:font-semibold"
                               placeholder="username" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create-password" className="">Create Password</label>
                        <input type="password" name="createPassword" id="create-password" className="px-4 py-2 rounded outline-none ring-1 focus:ring-purple-700 font-semibold placeholder:text-zinc-500 placeholder:font-semibold"
                               placeholder="create password" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirm-password" className="">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirm-password" className="px-4 py-2 rounded outline-none ring-1 focus:ring-purple-700 font-semibold placeholder:text-zinc-500 placeholder:font-semibold"
                               placeholder="confirm password" />
                    </div>

                    <button disabled={isRegistering} className="px-4 py-2 uppercase bg-rose-400 hover:bg-rose-500 transition-colors duration-200 rounded cursor-pointer">register</button>
                </div>

            </form>
        </main>
    );
}

export default Register;