import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentCard from "../components/ContentCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";``

export default function ContentListPage() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContents = async () => {
    try {
      const response = await axios.get("/api/content_blocks/");
      setContents(response.data.results || response.data);
    } catch (err) {
      setError("Failed to load content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Content</h1>
      {contents.length === 0 ? (
        <p className="text-gray-600">No content available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
