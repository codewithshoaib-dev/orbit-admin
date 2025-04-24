import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

function ContentPage() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/content/${slug}/`)
      .then(response => setContent(response.data))
      .catch(error => setError("Content not found."));
  }, [slug]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!content) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}

export default ContentPage;
