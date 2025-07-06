

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
        fetch(`https://tutor-book-server-site.vercel.app/tutorials/${id}`,{
            credentials: 'include'
        })
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

        fetch('https://tutor-book-server-site.vercel.app/bookings', {
            credentials: 'include',
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
        <div>
            <h2 className='font-bold text-3xl text-center my-5'>Tutor Details</h2>
            <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow-md rounded-md">
                <div className="grid md:grid-cols-2 gap-6">
                    <img src={tutorial.image} alt={tutorial.userName} className="rounded w-72 h-72" />
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{tutorial.userName}</h2>
                        <p className="text-gray-600 mb-2"><strong>Language:</strong> {tutorial.language}</p>
                        <p className="text-gray-600 mb-2"><strong>Price:</strong> ${tutorial.price}</p>
                        <p className="text-gray-600 mb-2"><strong>Review:</strong> {tutorial.review || 0}</p>
                        <p className="mt-3"><strong className='mb-2'>Description:</strong><br />{tutorial.description}</p>
                        <button onClick={handleBooking} className="mt-5 btn btn-success">Book Now</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TutorDetails;
