import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../UserContext";

const EditTutorial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.uid) return;

        fetch(`http://localhost:3000/tutorials/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch tutorial");
                return res.json();
            })
            .then(data => {
                if (!data || !data.userId) throw new Error("Invalid tutorial data");

                if (data.userId !== user.uid) {
                    Swal.fire("Access Denied", "You are not allowed to edit this tutorial", "error");
                    navigate('/');
                    return;
                }

                setTutorial(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                Swal.fire("Error", err.message, "error");
                setLoading(false);
            });
    }, [id, user, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedTutorial = {
            image: form.image.value,
            language: form.language.value,
            price: parseFloat(form.price.value),
            description: form.description.value
        };

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/tutorials/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTutorial),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Update failed");
            }

            Swal.fire("Success", "Tutorial updated successfully!", "success");
            navigate("/my-tutorials");
        } catch (err) {
            Swal.fire("Error", err.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading || !tutorial) return <div className="text-center py-12">Loading tutorial...</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Edit Tutorial</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        value={tutorial.userName}
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                        disabled
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                        disabled
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        defaultValue={tutorial.image}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Language</label>
                    <input
                        type="text"
                        name="language"
                        defaultValue={tutorial.language}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price (USD)</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={tutorial.price}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        defaultValue={tutorial.description}
                        className="w-full border px-3 py-2 rounded"
                        rows="4"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Review</label>
                    <textarea
                        value={tutorial.review || 'No review yet'}
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                        rows="3"
                        disabled
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTutorial;
