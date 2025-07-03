
import React, { useEffect, useState } from 'react';
import AllTutorials from './AllTutorials';
import { FaSearch } from 'react-icons/fa';
const FindTutors = () => {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/tutorials')  // Make sure this is the correct backend port
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched tutorials:', data); // <-- Add this
                setTutorials(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);


    if (loading) return <div>Loading tutorials...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className='w-11/12 mx-auto grid grid-cols-1 gap-3'>
            <div>
                <h1 className='text-3xl font-bold text-center'>Explore Online Tutors and teachers for learning a new language</h1>
            </div>
            <div className='relative w-full'>
                <input
                    className='w-full p-3 pr-10 border border-gray-300 rounded-md'
                    type='text'
                    placeholder='Search by language'
                />
                <FaSearch className='absolute top-3.5 right-3 text-gray-500' />
            </div>
            {tutorials.map((tutorial) => (
                <AllTutorials key={tutorial._id} tutorial={tutorial}></AllTutorials>))}
        </div>
    );
};

export default FindTutors;
