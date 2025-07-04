import { useEffect, useState } from 'react';

const Stats = () => {
  const [stats, setStats] = useState({
    totalTutors: 0,
    totalReviews: 0,
    totalLanguages: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Fetch both stats endpoints
    const fetchStats = async () => {
      try {
        const tutorRes = await fetch('http://localhost:3000/stats/tutorials');
        const tutorData = await tutorRes.json();

        const userRes = await fetch('http://localhost:3000/stats/users');
        const userData = await userRes.json();

        setStats({
          totalTutors: tutorData.totalTutors,
          totalReviews: tutorData.totalReviews,
          totalLanguages: tutorData.totalLanguages,
          totalUsers: userData.totalUsers,
        });
      } catch (error) {
        console.error('Stats fetch error:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto py-10 text-center">
      <div className="bg-blue-100 p-6 rounded shadow">
        <h3 className="text-3xl font-bold">{stats.totalTutors}</h3>
        <p className="text-gray-700">Total Tutors</p>
      </div>
      <div className="bg-green-100 p-6 rounded shadow">
        <h3 className="text-3xl font-bold">{stats.totalReviews}</h3>
        <p className="text-gray-700">Total Reviews</p>
      </div>
      <div className="bg-yellow-100 p-6 rounded shadow">
        <h3 className="text-3xl font-bold">{stats.totalLanguages}</h3>
        <p className="text-gray-700">Languages</p>
      </div>
      <div className="bg-purple-100 p-6 rounded shadow">
        <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
        <p className="text-gray-700">Total Users</p>
      </div>
    </div>
  );
};

export default Stats;
