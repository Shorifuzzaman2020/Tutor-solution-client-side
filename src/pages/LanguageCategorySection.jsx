import CategoryCard from './CategoryCard';

const categories = [
  { title: 'English', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Math', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Physics', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Chemistry', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Biology', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Computer', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Arabic', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'Bangla', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
  { title: 'General Knowledge', icon: 'https://i.ibb.co/TB89KLJb/6e0d65431abbe31458f95f0eb1f4baca-t.jpg' },
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
