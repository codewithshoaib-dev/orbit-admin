import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import { FaClipboard, FaPencilAlt, FaEye, FaUsers } from "react-icons/fa";
import Loader from "../components/Loader";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for the chart
  const chartData = [
    { name: "Jan", views: 4000, users: 240 },
    { name: "Feb", views: 3000, users: 221 },
    { name: "Mar", views: 2000, users: 229 },
    { name: "Apr", views: 2780, users: 200 },
    { name: "May", views: 1890, users: 218 },
    { name: "Jun", views: 2390, users: 250 },
    { name: "Jul", views: 3490, users: 300 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulating a response from the API
        const response = {
          data: {
            posts: 24,
            published: 18,
            views: 9312,
            users: 7,
          },
        };
        setStats(response.data);
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
        <StatCard label="Total Posts" value={stats.posts} icon={<FaClipboard />} />
        <StatCard label="Published Articles" value={stats.published} icon={<FaPencilAlt />} />
        <StatCard label="Total Views" value={stats.views} icon={<FaEye />} />
        <StatCard label="Total Users" value={stats.users} icon={<FaUsers />} />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Analytics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
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
    </div>
  );
};

export default DashboardHome;
