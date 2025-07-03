// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import { FaStar } from 'react-icons/fa';

// const TutorDetails = () => {
//   const { id } = useParams();
//   const [tutorial, setTutorial] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:3000/tutorials/${id}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch tutorial');
//         return res.json();
//       })
//       .then(data => {
//         setTutorial(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         Swal.fire('Error', err.message || 'Something went wrong', 'error');
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div className="text-center py-12">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow-md rounded-md">
//       <div className="grid md:grid-cols-2 gap-6">
//         <img src={tutorial.image} alt={tutorial.userName} className="rounded w-full h-auto" />
//         <div>
//           <h2 className="text-3xl font-bold mb-2">{tutorial.userName}</h2>
//           <p className="text-gray-600 mb-1"><strong>Language:</strong> {tutorial.language}</p>
//           <p className="text-gray-600 mb-1"><strong>Price:</strong> ${tutorial.price}</p>
//           <p className="text-gray-600 mb-1 flex items-center gap-3"><strong>Review:</strong> {tutorial.review || 0} <FaStar></FaStar></p>
//           <p className="mt-3"><strong>Description:</strong><br />{tutorial.description}</p>
//           <button className="mt-5 btn btn-success">Book Now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TutorDetails;


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useUser } from '../UserContext';

const TutorDetails = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    fetch(`http://localhost:3000/tutorials/${id}`)
      .then(res => res.json())
      .then(data => {
        setTutorial(data);
        setLoading(false);
      })
      .catch(err => {
        Swal.fire('Error', err.message || 'Something went wrong', 'error');
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    if (!user || !user.email) {
      Swal.fire('Error', 'You must be logged in to book.', 'error');
      return;
    }

    const bookingData = {
      tutorId: tutorial._id,
      image: tutorial.image,
      language: tutorial.language,
      price: tutorial.price,
      tutorEmail: tutorial.userEmail || tutorial.email || 'unknown',
      email: user.email
    };

    fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire('Success', 'Booking completed!', 'success');
        } else {
          throw new Error(data.error || 'Booking failed');
        }
      })
      .catch(err => {
        Swal.fire('Error', err.message || 'Something went wrong', 'error');
      });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow-md rounded-md">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={tutorial.image} alt={tutorial.userName} className="rounded w-full h-auto" />
        <div>
          <h2 className="text-3xl font-bold mb-2">{tutorial.userName}</h2>
          <p className="text-gray-600 mb-1"><strong>Language:</strong> {tutorial.language}</p>
          <p className="text-gray-600 mb-1"><strong>Price:</strong> ${tutorial.price}</p>
          <p className="text-gray-600 mb-1"><strong>Review:</strong> {tutorial.review || 0}</p>
          <p className="mt-3"><strong>Description:</strong><br />{tutorial.description}</p>
          <button onClick={handleBooking} className="mt-5 btn btn-success">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
