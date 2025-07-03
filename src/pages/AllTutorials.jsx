
// import FindTutors from './FindTutors';


// const AllTutorials = ({ tutorial}) => {


//     return (

//         <div className="card card-side bg-base-200 gap-32 p-4 border-2 shadow-sm">

//             <figure>
//                 <img
//                     src={tutorial.image}
//                     alt="Movie" />
//             </figure>
//             <div className="card-body">
//                 <h2 className="card-title">{tutorial.userName}</h2>
//                 <p>Language: {tutorial.language}</p>
//                 <p>{tutorial.description}</p>
//                 <div className="card-actions justify-start">
//                     <button className="btn btn-primary">View Details</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllTutorials;


import { useNavigate } from 'react-router-dom';

const AllTutorials = ({ tutorial }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tutor/${tutorial._id}`);
  };

  return (
    <div className="card card-side bg-base-200 gap-6 p-4 border-2 shadow-sm flex flex-col md:flex-row">
      <figure className="w-full md:w-1/3">
        <img src={tutorial.image} alt="Tutorial" className="w-full h-full object-cover rounded" />
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title text-xl">{tutorial.userName}</h2>
        <p><strong>Language:</strong> {tutorial.language}</p>
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
