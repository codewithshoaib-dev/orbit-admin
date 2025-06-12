import React, { useEffect, useState, useRef, useCallback } from "react";
import api from "../api/axios";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function ContentListPage() {
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("content?page=1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef();
  const fetchedUrls = useRef(new Set());
  const navigate = useNavigate();

  
  const fetchCategories = async () => {
    try {
      const response = await api.get("categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchContents = async (url, reset = false) => {
    if (!url || fetchedUrls.current.has(url)) return;
    fetchedUrls.current.add(url);

    setLoading(true);
    try {
      const response = await api.get(url);
      setContents((prev) =>
        reset ? response.data.results : [...prev, ...response.data.results]
      );
      setNextPageUrl(response.data.next);
    } catch (err) {
      setError("Failed to load content. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchedUrls.current.clear();
    const baseUrl = selectedCategory
      ? `content/?category=${selectedCategory}&page=1`
      : "content?page=1";
    fetchContents(baseUrl, true);
  }, [selectedCategory]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageUrl) {
          fetchContents(nextPageUrl);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPageUrl]
  );

  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => fetchContents(nextPageUrl)} />
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Blog Posts</h1>

 
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {contents.length === 0 && !loading ? (
        <p className="text-gray-600 text-center">No content available.</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content, index) => {
              const isLastPost = index === contents.length - 1;
              return (
                <div
                  ref={isLastPost ? lastPostRef : null}
                  key={content.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {content.img && (
                    <img
                      src={content.img}
                      alt={content.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {content.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(content.published_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {content.content}
                    </p>
                  </div>
                  <div className="p-4 border-t">
                    <a
                      href={`/blog/${content.slug}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {loading && <Loader />}
        </>
      )}
    </div>
  );
}
