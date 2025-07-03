
import FindTutors from './FindTutors';


const AllTutorials = ({ tutorial}) => {


    return (

        <div className="card card-side bg-base-200 gap-32 p-4 border-2 shadow-sm">

            <figure>
                <img
                    src={tutorial.image}
                    alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{tutorial.userName}</h2>
                <p>Language: {tutorial.language}</p>
                <p>{tutorial.description}</p>
                <div className="card-actions justify-start">
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default AllTutorials;
