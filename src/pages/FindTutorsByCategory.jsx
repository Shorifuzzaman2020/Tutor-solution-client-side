import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FindTutorsByCategory = () => {
  const { category } = useParams();
  const [filteredTutors, setFilteredTutors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/tutorials',{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(t => t.language?.toLowerCase() === category.toLowerCase());
        setFilteredTutors(filtered);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Tutors for: {category}</h2>
      {filteredTutors.length === 0 ? (
        <p>No tutors found for this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTutors.map(t => (
            <div key={t._id} className="bg-white border p-4 rounded shadow">
              <img src={t.image} alt="Tutor" className="w-full h-48 object-cover rounded mb-3" />
              <h3 className="text-xl font-semibold">{t.userName}</h3>
              <p className="text-sm text-gray-500">{t.language}</p>
              <p className="text-gray-700">Price: ${t.price}</p>
              <p className="text-sm text-gray-600">Review: {t.review || 0}</p>
              <button
                onClick={() => navigate(`/tutor/${t._id}`)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindTutorsByCategory;
