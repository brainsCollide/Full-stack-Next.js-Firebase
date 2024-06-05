'use client'
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <div className="bg-white w-full h-screen flex justify-center items-center flex-col">
            <h1 className="text-black font-medium text-xl"
            >Only logged in users can view this page
            </h1>
            <button className="bg-blue-500 text-white font-medium my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleBackToHome} > Proceed to home </button>
        </div>

    );
}

export default Page;