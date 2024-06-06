'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
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

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }

    

    return (
        <div className="min-h-screen flex items-center bg-white justify-center
        bg-auto bg-no-repeat bg-bottom"
        style={{ backgroundImage: "url('wave2.svg')" }}>
            <div className=" bg-blue-500 shadow-lg rounded px-8 pt-6 pb-8 mb-4 shadow-slate-500">
                <h1 className="text-3xl font-bold mb-8">Sign up</h1>
                <form onSubmit={handleForm}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-white hover:bg-blue-700 text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign up</button>
                    </div>
                </form>
                <button className="bg-white hover:bg-blue-700 text-gray-500 hover:text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleBackToHome} > Back to home </button>
            </div>
        </div>
    );
}

export default Page;
