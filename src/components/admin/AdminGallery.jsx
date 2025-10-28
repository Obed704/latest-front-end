// frontend/src/admin/GalleryAdmin.jsx
import React, { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // use .env

const GalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // New image statex`
  const [newAlt, setNewAlt] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editAlt, setEditAlt] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/gallery`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  // Handle file selection and preview for new upload
  const handleNewFileChange = (file) => {
    setNewFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSrc(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(null);
    }
  };

  // Handle file selection and preview for edit
  const handleEditFileChange = (file) => {
    setEditFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setEditPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newFile) return alert("Select an image file");

    const fd = new FormData();
    fd.append("image", newFile);
    fd.append("alt", newAlt);
    fd.append("title", newTitle);

    const res = await fetch(`${BACKEND_URL}/api/gallery`, { method: "POST", body: fd });
    if (!res.ok) return alert("Upload failed");
    setNewAlt(""); setNewTitle(""); setNewFile(null); setPreviewSrc(null);
    fetchImages();
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditAlt(item.alt || "");
    setEditTitle(item.title || "");
    setEditFile(null);
    setEditPreview(null);
  };

  const handleSaveEdit = async (id) => {
    const fd = new FormData();
    fd.append("alt", editAlt);
    fd.append("title", editTitle);
    if (editFile) fd.append("image", editFile);

    const res = await fetch(`${BACKEND_URL}/api/gallery/${id}`, { method: "PUT", body: fd });
    if (!res.ok) return alert("Update failed");
    setEditingId(null);
    setEditPreview(null);
    fetchImages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    const res = await fetch(`${BACKEND_URL}/api/gallery/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Delete failed");
    fetchImages();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Gallery Admin</h1>

      {/* Add new image */}
      <form onSubmit={handleUpload} className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <h2 className="font-semibold text-xl mb-4">Add New Image</h2>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
            {newFile ? "Change Image" : "Select Image"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleNewFileChange(e.target.files[0])} />
          </label>
          <input value={newAlt} onChange={(e) => setNewAlt(e.target.value)} placeholder="Alt text" className="border rounded-lg px-3 py-2 flex-1 bg-gray-200 border-blue-500" />
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="border rounded-lg px-3 py-2 flex-1 bg-gray-200 border-blue-500" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">{newFile ? "Upload" : "Upload Image"}</button>
        </div>

        {/* Preview */}
        {previewSrc && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Preview:</div>
            <img src={previewSrc} alt="Preview" className="w-48 h-48 object-cover rounded-lg border border-gray-300 shadow" />
          </div>
        )}
      </form>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((it) => (
            <div key={it._id} className="bg-white p-4 rounded-xl shadow-md relative flex flex-col">
              <img src={`${BACKEND_URL}${it.image}`} alt={it.alt} className="w-full h-48 object-cover rounded mb-3" />
              <div className="text-sm text-gray-700 font-medium mb-3">{it.title || it.alt}</div>

              {editingId === it._id ? (
                <div className="flex flex-col gap-2">
                  <input value={editAlt} onChange={(e) => setEditAlt(e.target.value)} placeholder="Alt" className="border px-2 py-1 rounded" />
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" className="border px-2 py-1 rounded" />
                  <label className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">
                    {editFile ? "Change Image" : "Select Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleEditFileChange(e.target.files[0])} />
                  </label>
                  {/* Preview */}
                  {editPreview && (
                    <img src={editPreview} alt="Edit Preview" className="w-48 h-48 object-cover rounded-lg border border-gray-300 shadow mt-2" />
                  )}
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleSaveEdit(it._id)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => startEdit(it)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Edit</button>
                  <button onClick={() => handleDelete(it._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
