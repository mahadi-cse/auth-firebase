import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase.config';


const app = initializeApp(firebaseConfig);

const Login = () => {
    const [user, setuser] = useState({});
    const provider = new GoogleAuthProvider();

    const handleGoogleSignin = () => {
        // Implement Google Sign-in logic here using firebase authentication
        // Example:
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                console.log(user);
                setuser(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });


    };
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-5">
                Login!
            </h1>
            <div>
                <button onClick={handleGoogleSignin} className="flex items-center justify-center mx-auto mt-16 text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-black-600 rounded text-lg">
                    <FaGoogle className="mr-2" />Button
                </button>
                {
                    user.photoURL &&
                    <img src={user.photoURL} alt="" />
                }
                {
                    user.displayName &&
                    <h2>{user.displayName}</h2>
                }
            </div>
        </div>
    );
};

export default Login;
