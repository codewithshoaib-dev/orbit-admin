import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import { FaClipboard, FaPencilAlt, FaEye, FaUsers } from "react-icons/fa";
import Loader from "../components/Loader";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

import api from "../api/axios";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null)
   const [mostViewedPosts, setmostViewedPosts] = useState(null)
  const [loading, setLoading] = useState(true);

 
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
      const response = await api.get('stats')
      console.log(response)

      setChartData(response.data.chartData)
      setmostViewedPosts(response.data.mostViewedPosts)
    
      setStats(response.data.stats);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>

     
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Posts" value={stats?.posts} icon={<FaClipboard />} />
        <StatCard label="Published Articles" value={stats?.published} icon={<FaPencilAlt />} />
        <StatCard label="Total Views" value={stats.views} icon={<FaEye />} />
        <StatCard label="Total Users" value={stats.users} icon={<FaUsers />} />
      </div>

     
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Analytics Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

  
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Most Viewed Posts</h2>
        <ul className="divide-y divide-gray-200">
          {mostViewedPosts.map((post) => (
            <li key={post.id} className="py-4 flex justify-between items-center">
              <span className="text-gray-800 font-medium">{post.title}</span>
              <span className="text-gray-500 text-sm">{post.views} views</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
