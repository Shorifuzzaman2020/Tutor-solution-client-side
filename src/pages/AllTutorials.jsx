
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const AllTutorials = ({ tutorial }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const handleViewDetails = () => {
    if (!isLoggedIn) {
            Swal.fire('Error', 'You must be logged in to See Details.', 'error');
            return;
        }
    navigate(`/tutor/${tutorial._id}`);
  };

  return (
    <div className="card card-side bg-base-200 gap-6 p-4 border-2 shadow-sm flex flex-col md:flex-row mb-4">
      <figure className="w-full md:w-1/3">
        <img src={tutorial.image} alt="Tutorial" className="w-80 h-80 object-cover rounded" />
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title text-xl">{tutorial.userName}</h2>
        <p><strong>Language:</strong> {tutorial.language}</p>
        <p><strong>Review: {tutorial.review}</strong></p>
        <p className="text-sm">{tutorial.description?.slice(0, 120)}...</p>
        <div className="card-actions mt-4">
          <button onClick={handleViewDetails} className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTutorials;
