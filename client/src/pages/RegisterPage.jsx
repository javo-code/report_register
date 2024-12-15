import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    
    const{signup, isAuthenticated, errors: registerErrors} = useAuth();
    
    const navigate = useNavigate();

    useEffect(()=>{
        if (isAuthenticated)navigate("/reports");
    },[isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });
    
    return (
        <div className="form-container bg-zinc-800 max-w-md  p-10 rounded-md">
            {
            registerErrors.map((error, i)=>(
                <div className="bg-red-500 p-2 text-white text-center"key={i}>
                    {error}
                </div>
            ))
            }
            <h1 className="text-2xl font-bold">Register</h1>
            <form onSubmit={onSubmit}>
                <input
                    className="py-2 my-2 w-full bg-zinc-700 text-white px-4 rounded-md"
                    type="text" {...register("username", { required: true })}
                    autoComplete="username"
                    placeholder="username" 
                    />
                    {
                        errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )}
                <input
                    className="py-2 my-2 w-full bg-zinc-700 text-white px-4 rounded-md"
                    type="email"  {...register("email", { required: true })}
                    autoComplete="email"
                    placeholder="email" 
                    />
                    {
                        errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )}
                <input
                    className="py-2 my-2 w-full bg-zinc-700 text-white px-4 rounded-md"
                    type="password"  {...register("password", { required: true })}
                    autoComplete="current-password"
                    placeholder="password" 
                    />
                    {
                        errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                <button type="submit">
                    Register
                </button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Already have an account? <Link to="/login" className="text-sky-500">Sign in</Link>
            </p>
        </div>
    );
};

export default RegisterPage