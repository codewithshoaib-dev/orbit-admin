import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/card";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${deleteId}/`);
      setCategories(categories.filter((cat) => cat.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Categories</h2>
          </div>

          {loading ? (
            <p>Loading categories…</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500">No categories found.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
                >
                  <span className="font-medium">{cat.name}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setDeleteId(cat.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Button
        onClick={() => navigate("/categories/create")}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold">Confirm Delete</h3>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete this category? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
