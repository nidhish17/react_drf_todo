import toast from "react-hot-toast";
import useLoginMutation from "../todoServices/useLoginMutation.js";

const Login = function () {

    const {loginMutation, isLoggingIn} = useLoginMutation();

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {username, password} = Object.fromEntries(formData.entries());

        if (!username || !password) {
            toast.error("please fill all the fields");
            return;
        }

        loginMutation({
            username,
            password
        })

    }


    return (
        <main className="max-w-screen-2xl mx-auto p-4 sm:p-8 md:p-12 lg:p-16 2xl:p-20">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="w-lg self-center flex flex-col gap-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="">Username</label>
                        <input type="text" id="username" name="username" className="px-4 py-2 rounded outline-none ring-1 focus:ring-purple-700 font-semibold placeholder:text-zinc-500 placeholder:font-semibold"
                               placeholder="username" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="">Password</label>
                        <input type="password" name="password" className="px-4 py-2 rounded outline-none ring-1 focus:ring-purple-700 font-semibold placeholder:text-zinc-500 placeholder:font-semibold"
                               placeholder="password" />
                    </div>

                    <button disabled={isLoggingIn} className="uppercase px-4 py-2 outline-rose-400 outline hover:bg-rose-500/50 transition-colors duration-200 rounded cursor-pointer">login</button>
                </div>

            </form>
        </main>
    );
}

export default Login;