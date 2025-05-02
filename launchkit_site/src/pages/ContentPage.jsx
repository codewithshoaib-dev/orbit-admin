import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";
import ContentNotFound from "../components/ContentNotFound";
import { Trash2, Edit3 } from "lucide-react"; 

function ContentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  useEffect(() => {
    let isMounted = true;
    setContent(null);
    setError(null);

    // Fetch the current post
    api.get(`/content/${slug}`)
      .then((response) => {
        if (isMounted) {
          setContent(response.data);

          // Fetch related posts based on categories
          if (response.data.categories && response.data.categories.length > 0) {
            const categoryIds = response.data.categories.map((cat) => cat.id).join(",");
            api.get(`/content/?categories=${categoryIds}&exclude=${response.data.id}`)
              .then((relatedResponse) => {
                if (isMounted) setRelatedPosts(relatedResponse.data.results || relatedResponse.data);
              })
              .catch(() => {
                if (isMounted) setRelatedPosts([]);
              });
          }
        }
      })
      .catch(() => {
        if (isMounted)
          setError("Looks like this post doesn’t exist or was removed.");
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleDelete = async () => {
    try {
      await api.delete(`/content/${slug}`);
      alert("Post deleted successfully.");
      navigate("/dashboard/content"); // Redirect to the content list
    } catch (err) {
      alert("Failed to delete the post. Please try again.");
    } finally {
      setShowDeleteModal(false); // Close the modal
    }
  };

  if (!slug)
    return (
      <ContentNotFound message="Invalid post identifier provided in URL." />
    );
  if (error) return <ContentNotFound message={error} />;
  if (!content) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Title and Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{content.title}</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Actions
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <button
                onClick={() => navigate(`/content/update/${slug}`)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <Edit3 className="w-4 h-4" />
                Update Post
              </button>
              <button
                onClick={() => setShowDeleteModal(true)} // Open the delete modal
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image or Placeholder */}
      {content.img ? (
        <div className="mb-6">
          <img
            src={content.img}
            alt={content.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
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

      {/* Slug */}
      <p className="text-gray-500 text-sm mb-4">Slug: {content.slug}</p>

      {/* Categories */}
      {content.categories && content.categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Categories:</h3>
          <ul className="flex flex-wrap gap-2 mt-2">
            {content.categories.map((category) => (
              <li
                key={category.id}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none text-gray-800 mb-12">
        {content.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {post.img && (
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {new Date(post.published_at).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="p-4 border-t">
                  <a
                    href={`/content/${post.slug}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentPage;
