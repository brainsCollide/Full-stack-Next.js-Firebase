'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleBackToHome = () => {
        router.push("/");
    };

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log('Sign in successful:', result);
        return router.push("/")
    }
    return (
        <div className="wrapper h-screen flex items-center justify-center bg-white
        bg-auto bg-no-repeat bg-bottom"
        style={{ backgroundImage: "url('wave2.svg')" }}
        >
            <div className="form-wrapper bg-blue-400 test p-8 rounded w-96 shadow-lg shadow-slate-500">
                <h1 className="text-3xl font-medium mb-6">Sign in</h1>
                <form onSubmit={handleForm} className="form">
                    <div className="mb-4">
                        <label htmlFor="email">
                            <p className="mb-2">Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="email" className="w-full border text-black border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password">
                            <p className="mb-2">Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="w-full border text-black border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700">Sign in</button>
                    <button className=" w-full bg-white hover:bg-blue-700 text-gray-500 hover:text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleBackToHome} > Back to home </button>
                </form>
                
            </div>
        </div>
    );
}

export default Page;
