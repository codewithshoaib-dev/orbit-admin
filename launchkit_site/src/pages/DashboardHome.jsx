import { useState, useEffect } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace this with /api/stats/ once DRF view is ready
        const response = {data: {
            posts: 24,
            published: 18,
            views: 9312,
            users: 7 }}
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="Total Posts" value={stats.posts} />
        <StatCard label="Published Articles" value={stats.published} />
        <StatCard label="Total Views" value={stats.views} />
        <StatCard label="Total Users" value={stats.users} />
      </div>
    </div>
  );
};

export default DashboardHome;
