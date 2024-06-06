'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import app from '@/firebase/config';

const auth = getAuth(app);
const db = getFirestore(app);

function App() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchData();
            } else {
                setUser(null);
                setData([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'userData'));
        const dataList = querySnapshot.docs.map((doc) => doc.data());
        setData(dataList);
    };

    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/signin');
    };

    const handleAddData = async (newData) => {
        await addDoc(collection(db, 'userData'), newData);
        fetchData();
    };

    const handleFacebookShare = () => {
        const url = 'https://fullstack-amber.vercel.app/'; 
        const fbAppUrl = `fb://facewebmodal/f?href=${encodeURIComponent(url)}`;
        const fbWebUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        
        window.location = fbAppUrl;
        setTimeout(() => {
            window.location = fbWebUrl;
        }, 25);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 p-4">
                {user ? (
                    <button className="text-white" onClick={handleSignOut}>Logout</button>
                ) : (
                    <>
                        <button className="text-white mr-4" onClick={() => router.push('/signin')}>Sign In</button>
                        <button className="text-white" onClick={() => router.push('/signup')}>Sign Up</button>
                    </>
                )}
            </nav>
            <main className="flex-grow bg-white bg-auto bg-no-repeat bg-bottom
            flex flex-col justify-center items-center " style={{ backgroundImage: "url('wave2.svg')" }}
            >
                  {user ? (
                      <div className='text-center text-gray-500 '>
                          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
                          <h2 className="text-xl mb-2">Data:</h2>
                          <ul>
                              {data.map((item, index) => (
                                  <li className="mb-2" key={index}>{JSON.stringify(item)}</li>
                              ))}
                          </ul>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleAddData({ example: 'newData' })}>
                              Add Data
                          </button>
                      </div>
                  ) : (
                        <h1 className="text-2xl font-medium text-gray-500"
                        >
                        Please <span className=' hover:cursor-pointer' onClick={() => router.push('/signin')} >log in</span> or 
                        <span className='hover:cursor-pointer' onClick={() => router.push('/signup')}> sign up</span> if you dont have any account
                        </h1>
                  )}
                    <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleFacebookShare}>
                            Share on Facebook
                    </button>
                  
              </main>
        </div>
    );
}

export default App;
