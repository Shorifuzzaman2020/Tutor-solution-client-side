

import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useParams } from "react-router-dom";

const API_BASE = "https://tutor-book-server-site.vercel.app";

export default function TutorProfileView() {
  const { userId } = useParams(); 
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("No tutor ID provided");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, eduRes, expRes] = await Promise.all([
          fetch(`${API_BASE}/profile/${userId}`), 
          fetch(`${API_BASE}/education/${userId}`),
          fetch(`${API_BASE}/experience/${userId}`),
        ]);

        if (!profileRes.ok) throw new Error("Failed to load profile");
        const profileData = await profileRes.json();
        setProfile(profileData);

        if (eduRes.ok) setEducation(await eduRes.json());
        if (expRes.ok) setExperience(await expRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!profile) return <div className="p-8 text-center">Profile not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden my-10">
      {/* Banner */}
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${profile.banner || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"})`,
        }}
      />

      <div className="px-8 pb-8 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-8 border-4 border-white rounded-full overflow-hidden w-32 h-32 shadow-lg">
          <img
            src={profile.avatar || "https://i.pravatar.cc/150?img=15"}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-44 pt-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.name || "No Name"}
          </h1>
          <p className="text-indigo-600 font-semibold mt-1 text-lg">
            {profile.headline || ""}
          </p>
          <p className="flex items-center text-gray-600 mt-2 gap-2">
            <FaMapMarkerAlt />
            {profile.location || "Location not provided"}
          </p>
          <p className="flex items-center text-gray-600 mt-1 gap-2">
            <FaEnvelope /> {profile.email}
          </p>
        </div>

        {/* About */}
        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
          <p className="text-gray-700 leading-relaxed">
            {profile.bio || "No bio available."}
          </p>
        </section>

        {/* Skills */}
        <section className="mt-8 max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
          {profile.skills && profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed.</p>
          )}
        </section>

        {/* Education */}
        <section className="mt-8 max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
          {education.length > 0 ? (
            <ul className="space-y-4">
              {education.map((edu) => (
                <li key={edu._id} className="border-l-4 border-indigo-600 pl-4">
                  <p className="font-semibold">{edu.degree}</p>
                  <p>{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No education history listed.</p>
          )}
        </section>

        {/* Experience */}
        <section className="mt-8 max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
          {experience.length > 0 ? (
            <ul className="space-y-6">
              {experience.map((exp) => (
                <li key={exp._id} className="border-l-4 border-indigo-600 pl-4">
                  <p className="font-semibold">{exp.role}</p>
                  <p>{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p>{exp.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No experience listed.</p>
          )}
        </section>
      </div>
    </div>
  );
}
