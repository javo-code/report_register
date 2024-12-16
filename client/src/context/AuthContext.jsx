import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = ()=> {
    const context= useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.error(error.response);
            setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message || "An error occurred"]);
        }
    };
    
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log("Response from backend:", res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.error("Error during signin:", error.response);
            setErrors(
                Array.isArray(error.response.data)
                    ? error.response.data
                    : [error.response.data.message || "An error occurred"]
            );
        }
    };



    useEffect(() => {
        if (errors.lenght > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookie = Cookies.get()

            if (cookie.token) {
                try {
                    const res = await verifyTokenRequest(cookie.token);
                    if (!res.data) setIsAuthenticated(false);
                        setIsAuthenticated(true);
                        setUser(res.data);
                    
                } catch (error) {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        }
        checkLogin();
    }, []);

    return(
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                user,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}