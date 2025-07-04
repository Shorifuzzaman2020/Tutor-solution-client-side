

import React, { useEffect, useState } from 'react';
import AllTutorials from './AllTutorials';
import { FaSearch } from 'react-icons/fa';

const FindTutors = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/tutorials')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched tutorials:', data);
        setTutorials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter tutorials based on search term
  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.language?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading tutorials...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-11/12 mx-auto grid grid-cols-1 gap-3'>
      <div>
        <h1 className='text-3xl font-bold text-center'>
          Explore Online Tutors and teachers for learning a new language
        </h1>
      </div>
      
      {/* 🔍 Search Box */}
      <div className='relative w-full'>
        <input
          className='w-full p-3 pr-10 border border-gray-300 rounded-md'
          type='text'
          placeholder='Search by language'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className='absolute top-3.5 right-3 text-gray-500' />
      </div>

      {/* 🧑‍🏫 Display Filtered Tutorials */}
      {filteredTutorials.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No tutors found for this language.</p>
      ) : (
        filteredTutorials.map((tutorial) => (
          <AllTutorials key={tutorial._id} tutorial={tutorial} />
        ))
      )}
    </div>
  );
};

export default FindTutors;
