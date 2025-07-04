import CategoryCard from './CategoryCard';

const categories = [
  { title: 'English', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Math', icon: 'https://i.ibb.co/svcRNwWt/91797ca242c542673d60e48fb5a35d4e.jpg' },
  { title: 'Physics', icon: 'https://i.ibb.co/H8hx6jZ/download-1.jpg' },
  { title: 'Chemistry', icon: 'https://i.ibb.co/GrBwNqR/541ff2e5ab104a1be4373c3f60120b09.png' },
  { title: 'Biology', icon: 'https://i.ibb.co/fYNMnts6/download-1.png' },
  { title: 'Computer', icon: 'https://i.ibb.co/fGVKSqj7/download-2.jpg' },
  { title: 'Arabic', icon: 'https://i.ibb.co/DgSdL4Tw/images.png' },
  { title: 'Bangla', icon: 'https://i.ibb.co/hRbn6g6f/images-1.png' },
  { title: 'General Knowledge', icon: 'https://i.ibb.co/bMDb9tXC/download-3.jpg' },
];

const LanguageCategorySection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.title} title={cat.title} icon={cat.icon} />
        ))}
      </div>
    </div>
  );
};

export default LanguageCategorySection;
