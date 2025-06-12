import React, { useState, useEffect, useReducer } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/TextArea";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import Select from "react-select";
import { Switch } from "../components/ui/switch";


const initialState = {
  title: "",
  slug: "",
  seo_title: "",
  seo_description: "",
  reading_time: "",
  categories: [],
  is_published: false,
  img: null,
  content: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errors, setErrors] = useState({}); 
  const [activeTab, setActiveTab] = useState("basicInfo");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(
          response.data.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))
        );
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    const newValue = type === "file" ? files[0] : type === "checkbox" ? checked : value;
    dispatch({ type: "UPDATE_FIELD", field: name, value: newValue });
  };

  const handleSelectChange = (selected) => {
    const selectedValues = selected ? selected.map((opt) => opt.value) : [];
    dispatch({ type: "UPDATE_FIELD", field: "categories", value: selectedValues });
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "categories") {
        value.forEach((id) => data.append("categories", id));
      } else if (key === "img" && value instanceof File) {
        data.append(key, value);
      } else if (value !== undefined && value !== null) {
        data.append(key, value);
      }
    });

    try {
      const response = await api.post("/content/", data, {
        headers: {
          "Content-Type": undefined,
        },
      });
      navigate(`/blog/${response.data.slug}`);
    } catch (error) {
      setErrors(error.response?.data || {});
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-8 shadow-2xl rounded-2xl">
      <CardContent>
        <div className="flex justify-between border-b mb-4">
          {["basicInfo", "seoSettings", "content"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : ""
              }`}
              onClick={() => handleTabChange(tab)}
              type="button"
            >
              {tab === "basicInfo"
                ? "Basic Info"
                : tab === "seoSettings"
                ? "SEO Settings"
                : "Content"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === "basicInfo" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input name="title" value={formData.title} onChange={handleChange} />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input name="slug" value={formData.slug} onChange={handleChange} />
                  {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <Label>Reading Time (mins)</Label>
                  <Input
                    type="number"
                    name="reading_time"
                    value={formData.reading_time}
                    onChange={handleChange}
                    min="1"
                  />
                  {errors.reading_time && (
                    <p className="text-red-500 text-sm">{errors.reading_time}</p>
                  )}
                </div>
                <div>
                  <Label>Image</Label>
                  <Input type="file" name="img" onChange={handleChange} accept="image/*" />
                  {formData.img && (
                    <p className="text-sm text-gray-600 mt-2">
                      Current file: {formData.img.name}
                    </p>
                  )}
                  {errors.img && <p className="text-red-500 text-sm">{errors.img}</p>}
                </div>
              </div>

              <div>
                <Label>Categories</Label>
                {loadingCategories ? (
                  <p>Loading categories…</p>
                ) : (
                  <Select
                    options={categories}
                    isMulti
                    value={categories.filter((cat) =>
                      formData.categories.includes(cat.value)
                    )}
                    onChange={handleSelectChange}
                    placeholder="Select categories..."
                    styles={{
                      control: (provided) => ({ ...provided, backgroundColor: "white" }),
                      menu: (provided) => ({ ...provided, zIndex: 50 }),
                    }}
                  />
                )}
                {errors.categories && (
                  <p className="text-red-500 text-sm">{errors.categories}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "seoSettings" && (
            <div className="space-y-6">
              <div>
                <Label>SEO Title</Label>
                <Input name="seo_title" value={formData.seo_title} onChange={handleChange} />
                {errors.seo_title && (
                  <p className="text-red-500 text-sm">{errors.seo_title}</p>
                )}
              </div>
              <div>
                <Label>SEO Description</Label>
                <Textarea
                  name="seo_description"
                  value={formData.seo_description}
                  onChange={handleChange}
                  rows={2}
                />
                {errors.seo_description && (
                  <p className="text-red-500 text-sm">{errors.seo_description}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-6">
              <div>
                <Label>Content</Label>
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
              </div>
              <div className="flex items-center gap-4">
                <Label>Publish</Label>
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(val) =>
                    dispatch({ type: "UPDATE_FIELD", field: "is_published", value: val })
                  }
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full md:w-auto">
            Create Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
