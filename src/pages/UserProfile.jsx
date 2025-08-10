
import React, { useEffect, useState } from "react";
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaEdit,
    FaCheck,
    FaTimes,
    FaPlus,
    FaUpload,
    FaTrash,
} from "react-icons/fa";
import { useUser } from "../UserContext";

const API_BASE = "https://tutor-book-server-site.vercel.app";

const emptyEducation = () => ({ degree: "", school: "", year: "" });
const emptyExperience = () => ({ role: "", company: "", duration: "", description: "" });

export default function UserProfileWithSeparateCollections() {
    const { user } = useUser();
    const [profile, setProfile] = useState({
        name: "",
        headline: "",
        location: "",
        email: "",
        bio: "",
        skills: [],
    });
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [avatar, setAvatar] = useState("");
    const [banner, setBanner] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UI state for editing
    const [editing, setEditing] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        const fetchProfileData = async () => {
            try {
                setLoading(true);
                
                // Fetch all profile data in parallel
                const [profileRes, educationRes, experienceRes, avatarRes, bannerRes] = await Promise.all([
                    fetch(`${API_BASE}/profile/${user.uid}`),
                    fetch(`${API_BASE}/education/${user.uid}`),
                    fetch(`${API_BASE}/experience/${user.uid}`),
                    fetch(`${API_BASE}/avatar/${user.uid}`),
                    fetch(`${API_BASE}/banner/${user.uid}`)
                ]);

                // Handle profile data
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setProfile({
                        name: profileData.name || user.displayName || "",
                        headline: profileData.headline || "",
                        location: profileData.location || "",
                        email: profileData.email || user.email || "",
                        bio: profileData.bio || "",
                        skills: profileData.skills || [],
                    });
                }

                // Handle education
                if (educationRes.ok) {
                    const educationData = await educationRes.json();
                    setEducation(educationData || []);
                }

                // Handle experience
                if (experienceRes.ok) {
                    const experienceData = await experienceRes.json();
                    setExperience(experienceData || []);
                }

                // Handle avatar
                if (avatarRes.ok) {
                    const avatarData = await avatarRes.json();
                    setAvatar(avatarData.url || user.photoURL || "https://i.pravatar.cc/150?img=15");
                }

                // Handle banner
                if (bannerRes.ok) {
                    const bannerData = await bannerRes.json();
                    setBanner(bannerData.url || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80");
                }

            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load profile data");
                // Set defaults if any request fails
                setProfile({
                    name: user.displayName || "",
                    headline: "",
                    location: "",
                    email: user.email || "",
                    bio: "",
                    skills: [],
                });
                setEducation([]);
                setExperience([]);
                setAvatar(user.photoURL || "https://i.pravatar.cc/150?img=15");
                setBanner("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user]);

    const saveProfileField = async (field, value) => {
        if (!user?.uid) return alert("Please login");
        try {
            const res = await fetch(`${API_BASE}/profile/${user.uid}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Update failed");
            }

            setProfile(prev => ({ ...prev, [field]: value }));
            setEditing(null);
            setTempValue("");
        } catch (err) {
            console.error("Save field error:", err);
            setError(err.message);
        }
    };

    const uploadImage = async (file, type) => {
        if (!file) return null;
        const formData = new FormData();
        formData.append("image", file);
        setUploadingImage(true);

        try {
            const res = await fetch(`${API_BASE}/${type}/${user.uid}`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Upload failed");
            }

            const data = await res.json();
            return data.url;
        } catch (err) {
            console.error("uploadImage error:", err);
            setError("Image upload failed");
            return null;
        } finally {
            setUploadingImage(false);
        }
    };

    const handleImageChange = async (e, type) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Set preview
        if (type === 'avatar') {
            setAvatarFile(URL.createObjectURL(file));
        } else {
            setBannerFile(URL.createObjectURL(file));
        }

        // Upload and update state
        const uploadedUrl = await uploadImage(file, type);
        if (uploadedUrl) {
            if (type === 'avatar') {
                setAvatar(uploadedUrl);
            } else {
                setBanner(uploadedUrl);
            }
        }
    };

    // Skills management
    const addSkill = async (skill) => {
        if (!user?.uid) return alert("Please login");
        try {
            const res = await fetch(`${API_BASE}/profile/${user.uid}/skills`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Add skill failed");
            }

            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, skill]
            }));
        } catch (err) {
            console.error("Add skill error:", err);
            setError(err.message);
        }
    };

    const removeSkill = async (index) => {
        if (!user?.uid) return alert("Please login");
        try {
            const skillToRemove = profile.skills[index];
            const res = await fetch(`${API_BASE}/profile/${user.uid}/skills`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill: skillToRemove }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Remove skill failed");
            }

            setProfile(prev => ({
                ...prev,
                skills: prev.skills.filter((_, i) => i !== index)
            }));
        } catch (err) {
            console.error("Remove skill error:", err);
            setError(err.message);
        }
    };

    // Education management
    const addEducation = async () => {
        if (!user?.uid) return alert("Please login");
        try {
            const newEdu = emptyEducation();
            const res = await fetch(`${API_BASE}/education/${user.uid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEdu),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Add education failed");
            }

            const data = await res.json();
            setEducation(prev => [...prev, data]);
        } catch (err) {
            console.error("Add education error:", err);
            setError(err.message);
        }
    };

    const updateEducation = async (id, field, value) => {
        if (!user?.uid) return alert("Please login");
        try {
            const res = await fetch(`${API_BASE}/education/${user.uid}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Update education failed");
            }

            setEducation(prev => prev.map(edu => 
                edu._id === id ? { ...edu, [field]: value } : edu
            ));
        } catch (err) {
            console.error("Update education error:", err);
            setError(err.message);
        }
    };

    const removeEducation = async (id) => {
        if (!user?.uid) return alert("Please login");
        try {
            const res = await fetch(`${API_BASE}/education/${user.uid}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Remove education failed");
            }

            setEducation(prev => prev.filter(edu => edu._id !== id));
        } catch (err) {
            console.error("Remove education error:", err);
            setError(err.message);
        }
    };

    // Experience management
    const addExperience = async () => {
        if (!user?.uid) return alert("Please login");
        try {
            const newExp = emptyExperience();
            const res = await fetch(`${API_BASE}/experience/${user.uid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExp),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Add experience failed");
            }

            const data = await res.json();
            setExperience(prev => [...prev, data]);
        } catch (err) {
            console.error("Add experience error:", err);
            setError(err.message);
        }
    };

    const updateExperience = async (id, field, value) => {
        if (!user?.uid) return alert("Please login");
        try {
            const res = await fetch(`${API_BASE}/experience/${user.uid}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Update experience failed");
            }

            setExperience(prev => prev.map(exp => 
                exp._id === id ? { ...exp, [field]: value } : exp
            ));
        } catch (err) {
            console.error("Update experience error:", err);
            setError(err.message);
        }
    };

    const removeExperience = async (id) => {
        if (!user?.uid) return alert("Please login");
        try {
            const res = await fetch(`${API_BASE}/experience/${user.uid}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Remove experience failed");
            }

            setExperience(prev => prev.filter(exp => exp._id !== id));
        } catch (err) {
            console.error("Remove experience error:", err);
            setError(err.message);
        }
    };

    // Inline edit controls
    const startEdit = (key, current) => {
        setEditing(key);
        setTempValue(current ?? "");
    };

    const cancelEdit = () => {
        setEditing(null);
        setTempValue("");
    };

    const saveEdit = async () => {
        await saveProfileField(editing, tempValue);
    };

    if (loading) return <div className="p-8 text-center">Loading profile...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden my-10">
            {/* Banner */}
            <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${bannerFile || banner})` }}
            >
                <label className="absolute top-3 right-3 bg-white/80 rounded px-3 py-2 cursor-pointer flex items-center gap-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'banner')}
                        className="hidden"
                    />
                    <FaUpload /> Change Cover
                </label>
            </div>

            <div className="px-8 pb-8 relative">
                {/* Avatar */}
                <div className="absolute -top-16 left-8 border-4 border-white rounded-full overflow-hidden w-32 h-32 shadow-lg">
                    <img
                        src={avatarFile || avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                    />
                    <label className="absolute bottom-0 right-0 bg-white/90 rounded-full p-2 cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'avatar')}
                            className="hidden"
                        />
                        <FaUpload />
                    </label>
                </div>

                <div className="ml-44 pt-6">
                    {/* Name */}
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        {editing === "name" ? (
                            <>
                                <input
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    className="border px-2 py-1 rounded"
                                />
                                <button onClick={saveEdit} className="text-green-600"><FaCheck /></button>
                                <button onClick={cancelEdit} className="text-red-600"><FaTimes /></button>
                            </>
                        ) : (
                            <>
                                {profile.name || "Your Name"}
                                <FaEdit
                                    className="ml-2 cursor-pointer text-indigo-600"
                                    onClick={() => startEdit("name", profile.name)}
                                />
                            </>
                        )}
                    </h1>

                    {/* Headline */}
                    <p className="text-indigo-600 font-semibold mt-1 text-lg flex items-center gap-2">
                        {editing === "headline" ? (
                            <>
                                <input
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    className="border px-2 py-1 rounded"
                                />
                                <button onClick={saveEdit} className="text-green-600"><FaCheck /></button>
                                <button onClick={cancelEdit} className="text-red-600"><FaTimes /></button>
                            </>
                        ) : (
                            <>
                                {profile.headline || "Add a headline"}
                                <FaEdit
                                    className="ml-2 cursor-pointer text-indigo-600"
                                    onClick={() => startEdit("headline", profile.headline)}
                                />
                            </>
                        )}
                    </p>

                    {/* Location */}
                    <p className="flex items-center text-gray-600 mt-2 gap-2">
                        <FaMapMarkerAlt />
                        {editing === "location" ? (
                            <>
                                <input
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    className="border px-2 py-1 rounded"
                                />
                                <button onClick={saveEdit} className="text-green-600"><FaCheck /></button>
                                <button onClick={cancelEdit} className="text-red-600"><FaTimes /></button>
                            </>
                        ) : (
                            <>
                                {profile.location || "Location not provided"}
                                <FaEdit
                                    className="ml-2 cursor-pointer text-indigo-600"
                                    onClick={() => startEdit("location", profile.location)}
                                />
                            </>
                        )}
                    </p>

                    {/* Email */}
                    <p className="flex items-center text-gray-600 mt-1 gap-2">
                        <FaEnvelope /> {profile.email || "Email not provided"}
                    </p>
                </div>

                {/* About / Bio */}
                <section className="mt-10 max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
                    {editing === "bio" ? (
                        <>
                            <textarea
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                rows={3}
                                className="w-full border px-2 py-1 rounded"
                            />
                            <div className="flex gap-2 mt-2">
                                <button onClick={saveEdit} className="text-green-600"><FaCheck /></button>
                                <button onClick={cancelEdit} className="text-red-600"><FaTimes /></button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-700 leading-relaxed flex items-start gap-2">
                            <span className="flex-1">{profile.bio || "No bio available."}</span>
                            <FaEdit
                                className="mt-1 cursor-pointer text-indigo-600"
                                onClick={() => startEdit("bio", profile.bio)}
                            />
                        </p>
                    )}
                </section>

                {/* Skills */}
                <section className="mt-8 max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
                        <span>Skills</span>
                        <AddSkillInline onAdd={addSkill} />
                    </h2>

                    {profile.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {profile.skills.map((skill, i) => (
                                <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                    {skill}
                                    <button onClick={() => removeSkill(i)} title="Remove skill" className="text-red-600"><FaTrash /></button>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No skills listed.</p>
                    )}
                </section>

                {/* Education */}
                <section className="mt-8 max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
                        <span>Education</span>
                        <button onClick={addEducation} className="bg-indigo-600 text-white px-3 py-1 rounded flex items-center gap-2">
                            <FaPlus /> Add
                        </button>
                    </h2>

                    {education.length > 0 ? (
                        <ul className="space-y-4">
                            {education.map((edu) => (
                                <li key={edu._id} className="border-l-4 border-indigo-600 pl-4">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <input
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(edu._id, "degree", e.target.value)}
                                                placeholder="Degree"
                                                className="w-full border px-2 py-1 rounded mb-1"
                                            />
                                            <input
                                                value={edu.school}
                                                onChange={(e) => updateEducation(edu._id, "school", e.target.value)}
                                                placeholder="School"
                                                className="w-full border px-2 py-1 rounded mb-1"
                                            />
                                            <input
                                                value={edu.year}
                                                onChange={(e) => updateEducation(edu._id, "year", e.target.value)}
                                                placeholder="Year"
                                                className="w-full border px-2 py-1 rounded"
                                            />
                                        </div>
                                        <button onClick={() => removeEducation(edu._id)} className="text-red-600">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No education history listed.</p>
                    )}
                </section>

                {/* Experience */}
                <section className="mt-8 max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
                        <span>Experience</span>
                        <button onClick={addExperience} className="bg-indigo-600 text-white px-3 py-1 rounded flex items-center gap-2">
                            <FaPlus /> Add
                        </button>
                    </h2>

                    {experience.length > 0 ? (
                        <ul className="space-y-6">
                            {experience.map((exp) => (
                                <li key={exp._id} className="border-l-4 border-indigo-600 pl-4">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <input
                                                value={exp.role}
                                                onChange={(e) => updateExperience(exp._id, "role", e.target.value)}
                                                placeholder="Role"
                                                className="w-full border px-2 py-1 rounded mb-1"
                                            />
                                            <input
                                                value={exp.company}
                                                onChange={(e) => updateExperience(exp._id, "company", e.target.value)}
                                                placeholder="Company"
                                                className="w-full border px-2 py-1 rounded mb-1"
                                            />
                                            <input
                                                value={exp.duration}
                                                onChange={(e) => updateExperience(exp._id, "duration", e.target.value)}
                                                placeholder="Duration"
                                                className="w-full border px-2 py-1 rounded mb-1"
                                            />
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) => updateExperience(exp._id, "description", e.target.value)}
                                                placeholder="Description"
                                                className="w-full border px-2 py-1 rounded"
                                                rows={2}
                                            />
                                        </div>
                                        <button onClick={() => removeExperience(exp._id)} className="text-red-600">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No experience listed.</p>
                    )}
                </section>
            </div>

            {uploadingImage && (
                <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded shadow">
                    Uploading image...
                </div>
            )}
        </div>
    );
}

function AddSkillInline({ onAdd }) {
    const [val, setVal] = useState("");
    const add = () => {
        const v = val.trim();
        if (!v) return;
        onAdd(v);
        setVal("");
    };

    return (
        <div className="flex items-center gap-2">
            <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder="New skill"
                className="border px-2 py-1 rounded"
            />
            <button onClick={add} className="bg-indigo-600 text-white px-3 py-1 rounded flex items-center gap-2">
                <FaPlus /> Add
            </button>
        </div>
    );
}