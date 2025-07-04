import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CategoryCard = ({ title, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/find-tutors/${title}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <img src={icon} alt={title} className="w-10 h-10" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <FaArrowRight className="text-gray-500" />
    </div>
  );
};

export default CategoryCard;
