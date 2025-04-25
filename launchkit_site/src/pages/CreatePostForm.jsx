import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../api/axios";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    seo_title: "",
    seo_description: "",
    reading_time: "",
    categories: [],
    is_published: false,
    img: null,
    content: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategoriesChange = (selectedOptions) => {
    setFormData({
      ...formData,
      categories: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "categories") {
        value.forEach((cat) => payload.append("categories", cat));
      } else {
        payload.append(key, value);
      }
    });

    try {
      const res = await api.post("/content/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/content/${res.data.slug}`);
    } catch (err) {
      console.error("Post creation failed:", err);
      if (err.response?.data) setErrors(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Create New Post</h2>

      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="block font-medium">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
        {errors.slug && <p className="text-red-500">{errors.slug}</p>}
      </div>

      <div>
        <label className="block font-medium">SEO Title</label>
        <input
          type="text"
          name="seo_title"
          value={formData.seo_title}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-medium">SEO Description</label>
        <textarea
          name="seo_description"
          value={formData.seo_description}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Reading Time (minutes)</label>
        <input
          type="number"
          name="reading_time"
          value={formData.reading_time}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Categories</label>
        <Select
          isMulti
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          onChange={handleCategoriesChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        {errors.categories && <p className="text-red-500">{errors.categories}</p>}
      </div>

      <div>
        <label className="block font-medium">Published</label>
        <input
          type="checkbox"
          name="is_published"
          checked={formData.is_published}
          onChange={handleChange}
          className="ml-2"
        />
      </div>

      <div>
        <label className="block font-medium">Cover Image</label>
        <input
          type="file"
          name="img"
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={6}
          className="border rounded w-full p-2"
        />
        {errors.content && <p className="text-red-500">{errors.content}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
