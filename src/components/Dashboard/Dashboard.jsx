import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import { AuthContext } from "../../provider/AuthProvider";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [selectedTask, setSelectedTask] = useState(null);
    // console.log(selectedTask);

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/all-task/${user?.email}`);
            return res.data;
        }
    });

    
    return (
        <div className="">
        {/* Navbar */}
        <Navbar />

        <div className="container mx-auto px-2">
            {/* Add Task Button */}
            <div className="flex justify-between mb-6 mt-10">
                <h2 className="text-2xl font-semibold">Manage Your Tasks</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Add Task
                </button>
            </div>

            {/* Task Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{["To-Do", "In Progress", "Done"].map((col, index) => (
    <div
        key={col}
        className={`p-4 border rounded-lg shadow-sm ${
            index === 0 ? 'bg-gradient-to-b from-blue-50 to-blue-100' :
            index === 1 ? 'bg-gradient-to-b from-purple-50 to-purple-100' :
            'bg-gradient-to-b from-green-50 to-green-100'
        }`}
    >
        <h2 className="text-xl font-bold mb-4 text-gray-700">{col}</h2>
        <div className="space-y-4">
            {tasks
                .filter((task) => task.category === col)
                .map((task) => (
                    <div
                        key={task._id}
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                            <p className="text-base text-gray-600 mt-1">{task.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                📅 {new Date(task.dateTimeUTC).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                                onClick={() => handleUpdateTask(task)}
                            >
                                <FaEdit size={18} />
                            </button>
                            <button
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                onClick={() => handleDeleteTask(task._id)}
                            >
                                <FaTrash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    </div>
))}
</div>

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-[768px] px-3 py-8 relative">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
                        <form onSubmit={handleAddTask}>
                            <label>Task Title</label>
                            <input
                                type="text"
                                placeholder="Task Title"
                                name="title"
                                className="border p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={50}
                                required
                            />
                            <label>Task Description</label>
                            <textarea
                                placeholder="Description"
                                name="description"
                                className="border p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={200}
                                required
                            />
                            <label>Task Category</label>
                            <select
                                name="category"
                                className="border p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                defaultValue={''}
                            >
                                <option disabled value="">Select Category</option>
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                {/* <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button> */}
                                <button
                                    className="btn btn-circle btn-outline fixed top-4 right-4 bg-red-300 hover:bg-red-500"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    ✕
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isModalOpen && selectedTask && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-[768px] px-3 py-8 relative">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
                        <form onSubmit={updateTask}>
                            <label>Task Title</label>
                            <input
                                type="text"
                                placeholder="Task Title"
                                defaultValue={selectedTask.title}
                                name="title"
                                className="border p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={50}
                                required
                            />
                            <label>Task Description</label>
                            <textarea
                                placeholder="Description"
                                name="description"
                                defaultValue={selectedTask.description}
                                className="border p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={200}
                                required
                            />
                            <label>Task Category</label>
                            <select
                                name="category"
                                className="border p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                defaultValue={selectedTask.category}
                            >
                                {/* <option disabled value="">Select Category</option> */}
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                {/* <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button> */}
                                <button
                                    className="btn btn-circle btn-outline fixed top-4 right-4 bg-red-300 hover:bg-red-500"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    ✕
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Update Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    </div>
    );
};

export default Dashboard;