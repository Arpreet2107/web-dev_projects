import {Link,useNavigate} from "react-router-dom"
import {assets} from "../assets/assets.js"
import Input from "../components/Input.jsx"
import {useContext, useState} from "react";
import {validateEmail} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import {AppContext} from "../context/AppContext.jsx";
import LoaderCircle from "lucide-react";

const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);

    const navigate= useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        //basic validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        setError("");

        //login api call
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
                email,
                password,
            });
            const {token,user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch (error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }else{
                console.error("Something went wrong",error);
                setError(error.message);
            }
        }finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/*Background image with blur*/}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome back! Your financial journey continues. Let's pick up where you left off.
                    </h3>
                    <p className="text-sm text-scale-700 text-center mb-8">
                        Unlock your personalized financial dashboard. Log in to continue your journey!
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email address"
                                placeholder="abc@gmail.com"
                                type="text"
                            />
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="********"
                                    type="password"
                                />
                        {error && (
                            <p className="text-red-800 trxt-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${
                            isLoading ? "opacity-60 cursor-not-allowed" : ""
                        }`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Logging in...
                                </>
                            ):("LOGIN")}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Where have you been? Create your account and dive in!
                            <Link to="/signup" className="font-medium text-purple-600 underline hover:text-purple-600-dark transition-colors">Signup</Link>
                        </p>

                    </form>

                </div>

            </div>
        </div>

    )
}

export default Login;