
import React, { useEffect, useState } from 'react';
import AllTutorials from './AllTutorials';
import { FaSearch } from 'react-icons/fa';

const FindTutors = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 6; 

  useEffect(() => {
    fetch('https://tutor-book-server-site.vercel.app/tutorials')
      .then((res) => res.json())
      .then((data) => {
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

  // Pagination calculations
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutorials = filteredTutorials.slice(indexOfFirstTutor, indexOfLastTutor);
  const totalPages = Math.ceil(filteredTutorials.length / tutorsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div>Loading tutorials...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-11/12 mx-auto grid grid-cols-1 gap-3'>
      <div>
        <h1 className='text-3xl font-bold text-center my-5'>
          Explore Online Tutors and teachers for learning a new language
        </h1>
      </div>

      {/* Search Box */}
      <div className='relative w-full'>
        <input
          className='w-full p-3 pr-10 border rounded-md'
          type='text'
          placeholder='Search by language'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 when searching
          }}
        />
        <FaSearch className='absolute top-3.5 right-3 ' />
      </div>

      {/* Display Filtered Tutorials */}
      {filteredTutorials.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No tutors found for this language.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentTutorials.map((tutorial) => (
              <AllTutorials key={tutorial._id} tutorial={tutorial} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-2 mb-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FindTutors;
