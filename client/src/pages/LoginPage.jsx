import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


function LoginPage() {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    
    const {signin, isAuthenticated, errors: loginErrors} = useAuth();

    const navigate = useNavigate();

useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
    if (isAuthenticated) navigate("/reports");
}, [isAuthenticated]);


    const onSubmit = handleSubmit((data) => {
        signin(data)
    });
    
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                
                {
                    loginErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center" key={i}>
                        {error}
                    </div>
                ))}
                
                <h1 className="text-2xl font-bold">Login</h1>
                
                <form onSubmit={onSubmit}>
                    <input
                        type="email"  {...register("email", { required: true })}
                        className="py-2 my-2 w-full bg-zinc-700 text-white px-4 rounded-md"
                        autoComplete="email"
                        placeholder="email" 
                        />
                        {
                            errors.email && 
                            <p className="text-red-500">Email is required</p>
                        }
                    <input
                        type="password"  {...register("password", { required: true })}
                        className="py-2 my-2 w-full bg-zinc-700 text-white px-4 rounded-md"
                        autoComplete="current-password"
                        placeholder="password" 
                        />
                        {
                            errors.password && 
                            <p className="text-red-500">Password is required</p>
                        }
                    <button type="submit">
                        Login 
                    </button>
                </form>
                <p className="flex gap-x-2 justify-between">
                    Don't have an acount yet? <Link to="/reports" className="text-sky-500">Sign up</Link>
                </p>
            </div>
        </div>
    )
};

export default LoginPage;