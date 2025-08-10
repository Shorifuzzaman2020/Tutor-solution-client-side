// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// const UserProfileEdit = ({ user, initialProfile, onUpdateSuccess }) => {
//   /*
//    * user: from navbar/context (at least has user.displayName & user.email)
//    * initialProfile: profile data fetched from backend (optional)
//    * onUpdateSuccess: callback to refresh profile after update
//    */

//   // Initialize state with either backend data or fallback from user object
//   const [formData, setFormData] = useState({
//     name: user?.displayName || "",
//     email: user?.email || "",
//     headline: "",
//     location: "",
//     bio: "",
//     skills: "",
//     education: "",
//     experience: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (initialProfile) {
//       setFormData({
//         name: initialProfile.name || user?.displayName || "",
//         email: initialProfile.email || user?.email || "",
//         headline: initialProfile.headline || "",
//         location: initialProfile.location || "",
//         bio: initialProfile.bio || "",
//         skills: (initialProfile.skills || []).join(", "),
//         education: (initialProfile.education || [])
//           .map(
//             (edu) =>
//               `${edu.degree} at ${edu.school} (${edu.year})`
//           )
//           .join("\n"),
//         experience: (initialProfile.experience || [])
//           .map(
//             (exp) =>
//               `${exp.role} at ${exp.company} (${exp.duration}) - ${exp.description}`
//           )
//           .join("\n"),
//       });
//     }
//   }, [initialProfile, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare data to send
//     const updatedProfile = {
//       name: formData.name.trim(),
//       // email generally shouldn't change; optional to send or disable editing
//       headline: formData.headline.trim(),
//       location: formData.location.trim(),
//       bio: formData.bio.trim(),
//       skills: formData.skills
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean),
//       education: formData.education
//         .split("\n")
//         .map((line) => line.trim())
//         .filter(Boolean)
//         .map((line) => {
//           // Simple parse: "Degree at School (Year)"
//           const match = line.match(/^(.*) at (.*) \((.*)\)$/);
//           if (match) {
//             return {
//               degree: match[1],
//               school: match[2],
//               year: match[3],
//             };
//           }
//           return { degree: line, school: "", year: "" };
//         }),
//       experience: formData.experience
//         .split("\n")
//         .map((line) => line.trim())
//         .filter(Boolean)
//         .map((line) => {
//           // Simple parse: "Role at Company (Duration) - Description"
//           const match = line.match(/^(.*) at (.*) \((.*)\) - (.*)$/);
//           if (match) {
//             return {
//               role: match[1],
//               company: match[2],
//               duration: match[3],
//               description: match[4],
//             };
//           }
//           return { role: line, company: "", duration: "", description: "" };
//         }),
//     };

//     setLoading(true);

//     try {
//       // Replace with your backend API endpoint to update profile
//       const response = await fetch(
//         `https://tutor-book-server-site.vercel.app/users/update/${user.uid}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(updatedProfile),
//         }
//       );

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.message || "Update failed");
//       }

//       Swal.fire("Success", "Profile updated successfully!", "success");
//       onUpdateSuccess && onUpdateSuccess();
//     } catch (error) {
//       Swal.fire("Error", error.message || "Update failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
//       <h2 className="text-3xl font-semibold mb-6 text-center">Edit Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Name */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="name">
//             Full Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Email - Disabled */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="email">
//             Email (cannot change)
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
//             value={formData.email}
//             disabled
//           />
//         </div>

//         {/* Headline */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="headline">
//             Headline (e.g. Senior Math Tutor)
//           </label>
//           <input
//             id="headline"
//             name="headline"
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             value={formData.headline}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="location">
//             Location
//           </label>
//           <input
//             id="location"
//             name="location"
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             value={formData.location}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="bio">
//             About / Bio
//           </label>
//           <textarea
//             id="bio"
//             name="bio"
//             rows={4}
//             className="w-full border rounded px-3 py-2"
//             value={formData.bio}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Skills */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="skills">
//             Skills (comma separated)
//           </label>
//           <input
//             id="skills"
//             name="skills"
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             value={formData.skills}
//             onChange={handleChange}
//             placeholder="Algebra, Calculus, SAT Prep"
//           />
//         </div>

//         {/* Education */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="education">
//             Education (one per line, format: Degree at School (Year))
//           </label>
//           <textarea
//             id="education"
//             name="education"
//             rows={4}
//             className="w-full border rounded px-3 py-2 font-mono"
//             value={formData.education}
//             onChange={handleChange}
//             placeholder={`M.Sc. in Mathematics at University of California (2015)\nB.Sc. in Statistics at State University (2012)`}
//           />
//         </div>

//         {/* Experience */}
//         <div>
//           <label className="block mb-1 font-medium" htmlFor="experience">
//             Experience (one per line, format: Role at Company (Duration) - Description)
//           </label>
//           <textarea
//             id="experience"
//             name="experience"
//             rows={6}
//             className="w-full border rounded px-3 py-2 font-mono"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder={`Senior Math Tutor at Bright Minds Tutoring (2016 - Present) - Led tutoring sessions\nMath Instructor at City High School (2012 - 2016) - Taught AP courses`}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between items-center pt-4">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserProfileEdit;


import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUser } from "../UserContext";

const imgbbAPIKey = "fc3b149af4e69041d72248d6085358e9";

const UserProfileEdit = () => {
  const { user } = useUser();

  const [initialProfile, setInitialProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    headline: "",
    location: "",
    bio: "",
    skills: "",
    education: "",
    experience: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Fetch profile on mount or when user.uid changes
  useEffect(() => {
    if (!user?.uid) return;

    fetch(`https://tutor-book-server-site.vercel.app/users/profile/${user.uid}`)
      .then(async (res) => {
        if (res.status === 404) {
          setInitialProfile(null);
          return null;
        }
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch profile");
        }
        return res.json();
      })
      .then((profileData) => {
        setInitialProfile(profileData);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", error.message || "Failed to load profile", "error");
      });
  }, [user?.uid]);

  // Initialize formData when initialProfile or user changes
  useEffect(() => {
    if (initialProfile) {
      setFormData({
        uid: user.uid,
        name: initialProfile.name || user?.displayName || "",
        email: initialProfile.email || user?.email || "",
        headline: initialProfile.headline || "",
        location: initialProfile.location || "",
        bio: initialProfile.bio || "",
        skills: (initialProfile.skills || []).join(", "),
        education: (initialProfile.education || [])
          .map((edu) => `${edu.degree} at ${edu.school} (${edu.year})`)
          .join("\n"),
        experience: (initialProfile.experience || [])
          .map(
            (exp) =>
              `${exp.role} at ${exp.company} (${exp.duration}) - ${exp.description}`
          )
          .join("\n"),
        avatar: initialProfile.avatar || "",
      });
    } else if (user) {
      setFormData({
        uid: user.uid,
        name: user?.displayName || "",
        email: user?.email || "",
        headline: "",
        location: "",
        bio: "",
        skills: "",
        education: "",
        experience: "",
        avatar: "",
      });
    }
  }, [initialProfile, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user?.uid) {
      Swal.fire("Error", "User ID missing. Please login again.", "error");
      setLoading(false);
      return;
    }

    try {
      let avatarURL = formData.avatar;

      if (imageFile) {
        avatarURL = await uploadImageToImgbb(imageFile);
      }

      const updatedProfile = {
        uid: user.uid,
        name: formData.name.trim(),
        headline: formData.headline.trim(),
        location: formData.location.trim(),
        bio: formData.bio.trim(),
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        education: formData.education
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const match = line.match(/^(.*) at (.*) \((.*)\)$/);
            if (match) {
              return {
                degree: match[1],
                school: match[2],
                year: match[3],
              };
            }
            return { degree: line, school: "", year: "" };
          }),
        experience: formData.experience
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const match = line.match(/^(.*) at (.*) \((.*)\) - (.*)$/);
            if (match) {
              return {
                role: match[1],
                company: match[2],
                duration: match[3],
                description: match[4],
              };
            }
            return { role: line, company: "", duration: "", description: "" };
          }),
        avatar: avatarURL,
        email: formData.email,
      };

      const response = await fetch(
        `https://tutor-book-server-site.vercel.app/users/update/${user.uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Profile update failed");
      }

      const resultData = await response.json();
      Swal.fire("Success", "Profile updated successfully!", "success");

      // Update formData with updated profile returned from backend
      if (resultData.profile) {
        const p = resultData.profile;
        setFormData({
          uid: p.uid,
          name: p.name || "",
          email: p.email || "",
          headline: p.headline || "",
          location: p.location || "",
          bio: p.bio || "",
          skills: (p.skills || []).join(", "),
          education: (p.education || [])
            .map((edu) => `${edu.degree} at ${edu.school} (${edu.year})`)
            .join("\n"),
          experience: (p.experience || [])
            .map(
              (exp) =>
                `${exp.role} at ${exp.company} (${exp.duration}) - ${exp.description}`
            )
            .join("\n"),
          avatar: p.avatar || "",
        });
        setImageFile(null); // Clear selected image file after successful upload
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email - Disabled */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email (cannot change)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={formData.email}
            disabled
          />
        </div>

        {/* Avatar upload */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="avatar">
            Profile Image (leave blank to keep current)
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {formData.avatar && !imageFile && (
            <img
              src={formData.avatar}
              alt="Current avatar"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected avatar"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        {/* Headline */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="headline">
            Headline (e.g. Senior Math Tutor)
          </label>
          <input
            id="headline"
            name="headline"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.headline}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="bio">
            About / Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="w-full border rounded px-3 py-2"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="skills">
            Skills (comma separated)
          </label>
          <input
            id="skills"
            name="skills"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Algebra, Calculus, SAT Prep"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="education">
            Education (one per line, format: Degree at School (Year))
          </label>
          <textarea
            id="education"
            name="education"
            rows={4}
            className="w-full border rounded px-3 py-2 font-mono"
            value={formData.education}
            onChange={handleChange}
            placeholder={`M.Sc. in Mathematics at University of California (2015)\nB.Sc. in Statistics at State University (2012)`}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="experience">
            Experience (one per line, format: Role at Company (Duration) - Description)
          </label>
          <textarea
            id="experience"
            name="experience"
            rows={6}
            className="w-full border rounded px-3 py-2 font-mono"
            value={formData.experience}
            onChange={handleChange}
            placeholder={`Senior Math Tutor at Bright Minds Tutoring (2016 - Present) - Led tutoring sessions\nMath Instructor at City High School (2012 - 2016) - Taught AP courses`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;
