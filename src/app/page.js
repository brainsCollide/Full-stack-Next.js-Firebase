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
            <main className="flex-grow bg-slate-400 flex justify-center items-center">
                  {user ? (
                      <div className='text-center'>
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
                      <h1 className="text-2xl font-bold">Please log in</h1>
                  )}
              </main>
        </div>
    );
}

export default App;
