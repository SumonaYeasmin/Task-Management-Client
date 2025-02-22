import { useContext } from "react";
import { FaGoogle, FaSyncAlt, FaArrowsAlt, FaClipboardCheck, FaHandPaper } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";


const Authentication = () => {
    const { loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/users');
            return res.data;
        },
    });

    const handleLogin = async () => {
     
        try {
            const result = await loginWithGoogle();
            const userInfo = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                photo: result?.user?.photoURL,
            };

            // Check if the user already exists
            const existingUser = users?.find((user) => user.email === result?.user?.email);
            if (existingUser) {
                toast.success(`Welcome back, ${existingUser.name || "User"}!`);
                navigate("dashboard");
                return;
            }

            // If user does not exist, add them to the database
            const res = await axios.post("http://localhost:5000/users", userInfo);
            if (res.data.insertedId) {
                toast.success(`Welcome, ${userInfo.name || "User"}! Your account has been created.`);
                navigate("dashboard");
            }
        } catch (error) {
            toast.error("Failed to sign in. Please try again.");
        }
    };

    return (
        <div
            className={`${location.pathname === "dashboard" && "hidden"
                } flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-100 to-green-100 p-6 text-center`}
        >
            {/* Hero Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                     Task Management Application
                </h1>
                <p className="text-gray-600 mb-6 text-lg">
                Effortlessly organize, prioritize, and track your tasks to boost productivity and reach your goals faster.
                </p>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        < FaClipboardCheck className="text-3xl text-blue-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Task Management</h2>
                        <p className="text-gray-600">
                        Effortlessly add, update, and remove tasks while tracking your progress through a user-friendly interface.
                        </p>
                    </div>
                    <div className="bg-pink-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <FaSyncAlt className="text-3xl text-pink-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Sync</h2>
                        <p className="text-gray-600">
                        Your tasks sync in real-time across all devices, ensuring seamless access anytime, anywhere.
                        </p>
                    </div>
                    <div className="bg-green-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <FaHandPaper className="text-3xl text-green-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Drag-and-Drop</h2>
                        <p className="text-gray-600">
                        Easily reorder tasks with drag-and-drop and seamlessly move them between To-Do, In Progress, and Done.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-teal-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-3xl font-bold text-white mb-4">Are you ready to begin?</h2>
                    <p className="text-white mb-6">
                    Sign in with Google to unlock your personalized dashboard and streamline your task management today.
                    </p>
                    <button
                        onClick={handleLogin}
                        className="flex items-center justify-center w-full py-3 bg-white text-teal-500 font-semibold rounded-lg hover:bg-teal-100 transition duration-200"
                    >
                        <FaGoogle className="mr-2" /> Sign in with Google
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-gray-600 text-center">
                <p>© {new Date().getFullYear()} Task Management Application. Design by <span className="font-semibold">Sumona Yeasmin</span></p>
            </div>

        </div>
    );
};

export default Authentication;