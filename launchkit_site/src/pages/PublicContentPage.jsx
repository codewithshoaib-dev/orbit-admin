import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";
import ContentNotFound from "../components/ContentNotFound";

function PublicContentPage() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedNextPage, setRelatedNextPage] = useState(null);
  const [error, setError] = useState(null);
  const relatedObserver = useRef();
  const fetchedUrls = useRef(new Set());

  useEffect(() => {
    let isMounted = true;
    setContent(null);
    setError(null);
    setRelatedPosts([]);
    setRelatedNextPage(null);
    fetchedUrls.current.clear();

    api
      .get(`/content/${slug}`)
      .then((response) => {
        if (isMounted) {
          setContent(response.data);

          if (response.data.categories && response.data.categories.length > 0) {
            const categoryIds = response.data.categories.map((cat) => cat.id).join(",");
            const url = `/content/?categories=${categoryIds}&exclude=${response.data.id}`;
            setRelatedNextPage(url);
            fetchRelatedPosts(url);
          }
        }
      })
      .catch(() => {
        if (isMounted) setError("Looks like this post doesn’t exist or was removed.");
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const fetchRelatedPosts = async (url) => {
    if (!url || fetchedUrls.current.has(url)) return;
    fetchedUrls.current.add(url);

    try {
      const res = await api.get(url);
      setRelatedPosts((prev) => [...prev, ...res.data.results]);
      setRelatedNextPage(res.data.next);
    } catch (err) {
      console.error("Failed to load related posts", err);
    }
  };

  const lastRelatedRef = useCallback(
    (node) => {
      if (relatedObserver.current) relatedObserver.current.disconnect();
      relatedObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && relatedNextPage) {
          fetchRelatedPosts(relatedNextPage);
        }
      });
      if (node) relatedObserver.current.observe(node);
    },
    [relatedNextPage]
  );

  if (!slug) return <ContentNotFound message="Invalid post identifier provided in URL." />;
  if (error) return <ContentNotFound message={error} />;
  if (!content) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{content.title}</h1>

      {content.img ? (
        <div className="mb-6">
          <img src={content.img} alt={content.title} className="w-full h-96 object-cover rounded-lg shadow-md" />
        </div>
      ) : (
        <div className="mb-6 w-full h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md flex items-center justify-center">
          <span className="text-6xl font-bold text-white">
            {content.title
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>
      )}

      <p className="text-gray-500 text-sm mb-4">Slug: {content.slug}</p>

      {content.categories && content.categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Categories:</h3>
          <ul className="flex flex-wrap gap-2 mt-2">
            {content.categories.map((category) => (
              <li key={category.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-800 mb-12">
        {content.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post, index) => {
              const isLast = index === relatedPosts.length - 1;
              return (
                <div
                  ref={isLast ? lastRelatedRef : null}
                  key={post.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {post.img && (
                    <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3">{post.content}</p>
                  </div>
                  <div className="p-4 border-t">
                    <Link
                      to={`/content/${post.slug}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicContentPage;
