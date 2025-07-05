import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLike } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { CiStar } from 'react-icons/ci';

const MyTutorialsCard = ({ tutorial, onDelete }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isOwner] = useState(user && user.uid === tutorial.userId);

  const handleReview = () => {
    if (user && tutorial.userId !== user.uid) {
      const updatedTutorial = {
        ...tutorial,
        ReviewCount: (tutorial.review || 0) + 1,
      };

      fetch(`http://localhost:3000/tutorials/${tutorial._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ReviewCount: updatedTutorial.ReviewCount }),
      })
        .then((res) => res.json())
        .then(() => {
          tutorial.ReviewCount = updatedTutorial.ReviewCount;
        })
        .catch((err) => {
          Swal.fire('Error!', err.message || 'Something went wrong.', 'error');
        });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This tutorial will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/tutorials/${tutorial._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.uid }),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire('Deleted!', 'Your tutorial has been deleted.', 'success');
            onDelete(tutorial._id);
          })
          .catch((err) => {
            Swal.fire('Error!', err.message || 'Something went wrong.', 'error');
          });
      }
    });
  };

  const handleEdit = () => {
    navigate(`/edit-tutorial/${tutorial._id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <img src={tutorial.image} alt="" />
        <p className="text-xl text-gray-800 font-bold mt-3">Posted by: {tutorial.userName}</p>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-semibold">Description:</span><br /> {tutorial.description}
        </p>
        {tutorial.language && (
          <p className="font-bold text-xl text-gray-500 mt-2 mb-3">
            <span className="">Language:</span> {tutorial.language}
          </p>
        )}
        <p className='font-bold text-xl'>Price: {tutorial.price} $</p>
        <div className="mt-3 mb-5">
          <span className=" py-1 rounded-full text-2xl flex items-center">
            {tutorial.review || 0} Review
          </span>
        </div>

        {isOwner && (
          <div className="flex justify-between gap-2">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600"
            >
              <AiOutlineEdit size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
            >
              <AiOutlineDelete size={20} />
            </button>
            <button
              onClick={handleReview}
              disabled={tutorial.userId === user?.uid}
              className={`${
                tutorial.userId === user?.uid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white py-2 px-4 rounded-full`}
            >
              <CiStar size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTutorialsCard;
