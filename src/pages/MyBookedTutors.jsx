import { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import Swal from 'sweetalert2';

const MyBookedTutors = () => {
  const { user } = useUser();
  const [bookedTutors, setBookedTutors] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://tutor-book-server-site.vercel.app/bookings?email=${user.email}`)
        .then(res => res.json())
        .then(data => setBookedTutors(data))
        .catch(err => {
          console.error('Fetch error:', err);
          Swal.fire('Error', 'Failed to fetch booked tutors', 'error');
        });
    }
  }, [user]);

  const handleReview = (tutorId) => {
    fetch(`https://tutor-book-server-site.vercel.app/tutorials/${tutorId}/review`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          Swal.fire('Thanks!', 'Review submitted.', 'success');
        } else {
          throw new Error(data.error);
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error', err.message || 'Something went wrong', 'error');
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Booked Tutors</h2>
      {bookedTutors.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookedTutors.map(tutor => (
            <div key={tutor._id} className="bg-white p-4 rounded shadow">
              <img src={tutor.image} alt="Tutor" className="rounded w-full h-48 object-cover" />
              <h3 className="text-xl mt-2 font-bold">{tutor.language}</h3>
              <p className="text-gray-600">Price: ${tutor.price}</p>
              <p className="text-sm text-gray-500 mt-1">Tutor Email: {tutor.email}</p>
              <button
                onClick={() => handleReview(tutor.tutorId)}
                className="mt-3 btn btn-primary"
              >
                Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedTutors;
