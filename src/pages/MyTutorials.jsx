

import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';
import MyTutorialsCard from './MyTutorialsCard';

const MyTutorials = () => {
  const { user, isLoggedIn, loading } = useUser();
  const [myTutorials, setMyTutorials] = useState([]);

  useEffect(() => {
    if (user && isLoggedIn) {
      fetch(`https://tutor-book-server-site.vercel.app/tutorials`, {
        credentials: 'include'
      })
        .then((res) => res.json())
        .then((data) => {
          const userTutorials = data.filter((tutorial) => tutorial.userId === user.uid);
          setMyTutorials(userTutorials);
        })
        .catch((err) => {
          console.error('Error fetching tutorials:', err);
        });
    }
  }, [user, isLoggedIn]);

  const handleDeleteTutorial = (tutorialId) => {
    setMyTutorials((prev) => prev.filter((tutorial) => tutorial._id !== tutorialId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Redirect to="/login" replace />;
  }

  return (
    <div className="w-11/12 mx-auto">
      <p className="text-2xl font-bold text-center my-4">Your Added Tutorials are here!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {
          myTutorials && myTutorials.length > 0 ? (
            myTutorials.map((tutorial) => (
              <MyTutorialsCard
                key={tutorial._id}
                tutorial={tutorial}
                onDelete={handleDeleteTutorial}
              />
            ))
          ) : (
            <>
              <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <p className='font-bold text-xl'>No tutorial found.</p>
              </div>
            </>
          )
        }
      </div>

    </div>
  );
};

export default MyTutorials;
