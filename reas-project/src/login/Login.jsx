import { Link } from "react-router-dom";


const Login = () => {
    return (
        <div>
            <div className="relative p-10 border rounded-md shadow-lg bg-slate-800 border-slate-400 backdrop-filter backdrop-blur-sm bg-opacity-30">
                <h1 className="mb-6 font-bold text-center text-white text-4x1">Login</h1>
                <form action="">
                    <div className="relative my-4">
                        <input type="email" id="email" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
                        <label htmlFor="email" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
                    </div>
                    <div className="relative my-4">
                        <input type="password" id="password" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
                        <label htmlFor="password" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="rememberMe" id="rememberMe" /> <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <Link to='' className="text-blue-500">Forgot Password?</Link> </div>
                    <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type="submit">Login</button>
                    <div className="text-center">
                        <span className="flex justify-center m-4">Create New Here<Link className="ml-4 text-blue-500" to='/Register'>Create an Account</Link></span>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Login;