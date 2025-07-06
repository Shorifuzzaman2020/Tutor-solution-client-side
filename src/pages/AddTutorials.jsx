
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const AddTutorials = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // if (!user) {
    //     navigate("/login");
    //     return null;
    // }
    
    const handleAddTutorials = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const newTutorial = {
            userId: user.uid,
            userName: user.displayName,
            email: user.email,
            image: formData.get("image"),
            language: formData.get("language"),
            price: parseFloat(formData.get("price")),
            description: formData.get("description"),
            review: 0,
            createdAt: new Date().toISOString(),
        };


        setLoading(true);

        try {
            const response = await fetch("https://tutor-book-server-site.vercel.app/tutorials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTutorial),
            });

            if (!response.ok) {
                throw new Error("Failed to add tutorial");
            }

            const data = await response.json();
            if (data.insertedId) {
                Swal.fire({
                    title: "Tutorial added successfully!",
                    icon: "success",
                    confirmButtonColor: "#22c55e",
                });
                form.reset();
                navigate("/my-tutorials");
            } else {
                throw new Error("Tutorial not saved properly");
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: err.message || "Something went wrong.",
                icon: "error",
            });
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };
    if (loading || !user) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Add a New Tutorial</h2>
            <form onSubmit={handleAddTutorials} className="space-y-6">
                <div>
                    <label className="block mb-1 font-medium">User Name</label>
                    <input
                        type="text"
                        value={user.displayName}
                        disabled
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Language</label>
                    <input
                        type="text"
                        name="language"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="e.g., JavaScript, Python"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter price"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        className="w-full border px-3 py-2 rounded"
                        rows="4"
                        placeholder="Write a short description..."
                        required
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Tutorial"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTutorials;
