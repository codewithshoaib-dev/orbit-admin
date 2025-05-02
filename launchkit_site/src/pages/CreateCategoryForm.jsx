import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";

const CreateCategoryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Fixed destructuring
    setFormData((prev) => ({ ...prev, [name]: value })); // Correctly update state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await api.post("/categories/", formData);
      navigate("/categories"); // Redirect to categories list on success
    } catch (error) {
      setErrors(error.response?.data || {}); // Display server-side validation errors
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-8 shadow-2xl rounded-2xl">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Slug Field */}
            <div>
              <Label>Slug</Label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="custom-slug"
                required
              />
              {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full md:w-auto" disabled={submitting}>
            {submitting ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCategoryForm;
