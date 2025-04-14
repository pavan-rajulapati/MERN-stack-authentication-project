import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../utils/firebase.config';
import { toast } from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';

const ContinueWithGoogle = ({ text = "Continue with Google" }) => {
    const navigate = useNavigate();
    const { login } = useUser();

    const handleGoogleAuth = async () => {
        try {
            // Firebase login
            const result = await signInWithPopup(auth, provider);
            const { email, displayName, uid } = result.user;
            console.log('Firebase User:', result.user);

            try {
                // Check if user exists
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/check-user`, { email }, { withCredentials: true });

                if (res.data.success === true) {
                    // If user exists, log in
                    const loginRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/google-signin`, { email, googleId: uid }, { withCredentials: true });
                    login(loginRes.data.user); // Save user in context/localStorage
                    toast.success('Logged in successfully');
                    navigate('/');
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    // If user does not exist, sign up
                    try {
                        const signupRes = await axios.post(
                            `${import.meta.env.VITE_BACKEND_URL}/google-signup`,
                            {
                                userName: displayName,
                                email,
                                googleId: uid,
                            },
                        );

                        login(signupRes.data.user); // Save user in context/localStorage
                        toast.success('Account created successfully');
                        navigate('/');
                    } catch (signupErr) {
                        console.error(signupErr);
                        toast.error(signupErr.response?.data?.message || 'Signup failed');
                    }
                } else {
                    console.error(error);
                    toast.error(error.response?.data?.message || 'User check failed');
                }
            }
        } catch (err) {
            console.error('Google Auth Error:', err);
            toast.error('Google authentication failed');
        }
    };

    return (
        <div>
            <button
                onClick={handleGoogleAuth}
                className="flex w-full cursor-pointer hover:bg-gray-100 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600"
            >
                <FcGoogle size={20} />
                {text}
            </button>
        </div>
    );
};

export default ContinueWithGoogle;
