import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'


function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    });

    // Stay on page if loged in

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/dashboard')
            }
        })
    }, [])

    // Setting Email
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    // Setting Password
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    // Sigin Button 

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/dashboard");
                event.preventDefault();

            })
            .catch(
                (error) => {
                    console.log("Not Valid User")
                    alert("Please Check Your Credentials", error.message)
                }
            )
    }

    // User Registration function

    const handleRegister = () => {
        if (registerInformation.email !== registerInformation.confirmEmail) {
            alert("Please confirm that email are the same");
            return;
        } else if (
            registerInformation.password !== registerInformation.confirmPassword
        ) {
            alert("Please confirm that password are the same");
            return;
        }
        createUserWithEmailAndPassword(
            auth,
            registerInformation.email,
            registerInformation.password
        )
            .then(() => {
                navigate("/homepage");
            })
            .catch((err) => alert(err.message));
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    ToDo List      </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    {isRegistering ? (
                        <>

                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create and account
                                </h1>
                                <form class="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>

                                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        onClick={handleRegister}

                                    >Create an account</button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href="" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >Login here</a>
                                    </p>
                                </form>
                            </div>
                        </>
                    ) :
                        (
                            <>
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Sign in to your account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                                onChange={handleEmailChange}
                                                value={email}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                                onChange={handlePasswordChange}
                                                value={password}
                                            />
                                        </div>

                                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            onClick={handleSignIn}
                                        >Sign in</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                onClick={() => setIsRegistering(true)}
                                            >Sign up</a>
                                        </p>
                                    </form>
                                </div>
                            </>
                        )}


                </div>
            </div>
        </section>
    )
}

export default Login