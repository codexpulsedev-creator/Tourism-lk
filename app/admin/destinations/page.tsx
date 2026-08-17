"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, MapPin, X, CheckCircle2, AlertCircle } from "lucide-react";
import { seedDestinations } from "@/data/seedData";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>(seedDestinations);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    province: "Central",
    district: "Kandy",
    category: "Mountains",
    shortDescription: "",
    description: "",
    heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop",
    latitude: 6.8667,
    longitude: 81.0466,
    bestTimeToVisit: "December to April",
    weatherSummary: "20°C - 26°C",
    attractions: "Nine Arch Bridge, Little Adam's Peak",
    activities: "Hiking, Photography, Tea Tasting",
    rating: 4.9,
    featured: true,
  });

  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadDestinations = async () => {
    try {
      const res = await fetch("/api/destinations");
      if (res.ok) {
        const data = await res.json();
        if (data.destinations) {
          setDestinations(data.destinations);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      province: "Central",
      district: "Kandy",
      category: "Mountains",
      shortDescription: "",
      description: "",
      heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop",
      latitude: 6.8667,
      longitude: 81.0466,
      bestTimeToVisit: "December to April",
      weatherSummary: "20°C - 26°C",
      attractions: "Attraction 1, Attraction 2",
      activities: "Hiking, Photography",
      rating: 4.9,
      featured: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (dest: any) => {
    setEditingId(dest._id || dest.slug);
    setFormData({
      name: dest.name,
      province: dest.province,
      district: dest.district,
      category: dest.category,
      shortDescription: dest.shortDescription,
      description: dest.description,
      heroImage: dest.heroImage,
      latitude: dest.latitude,
      longitude: dest.longitude,
      bestTimeToVisit: dest.bestTimeToVisit || "",
      weatherSummary: dest.weatherSummary || "",
      attractions: Array.isArray(dest.attractions) ? dest.attractions.join(", ") : dest.attractions || "",
      activities: Array.isArray(dest.activities) ? dest.activities.join(", ") : dest.activities || "",
      rating: dest.rating || 4.8,
      featured: dest.featured ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const payload = {
      ...formData,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      rating: Number(formData.rating),
      attractions: formData.attractions.split(",").map((s) => s.trim()).filter(Boolean),
      activities: formData.activities.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const url = editingId ? `/api/destinations/id/${editingId}` : "/api/destinations";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg({ type: "success", text: data.message || "Saved destination successfully!" });
        setModalOpen(false);
        loadDestinations();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Operation failed" });
      }
    } catch (e: any) {
      setStatusMsg({ type: "error", text: e.message || "Network error" });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/destinations/id/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStatusMsg({ type: "success", text: `Deleted ${name}` });
        setDestinations(destinations.filter((d) => d._id !== id && d.slug !== id));
      }
    } catch (e) {
      alert("Delete failed");
    }
  };

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.district.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandDark">
            Manage Destinations
          </h1>
          <p className="text-xs sm:text-sm text-brandDark/60 mt-1">
            Create, modify, and manage Sri Lankan destination cards, coordinates, and content.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Destination</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-brandDark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary shadow-subtle"
        />
      </div>

      {/* Destinations Table */}
      <div className="rounded-3xl bg-white border border-brandDark/8 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-brandDark">
            <thead className="bg-brandBg text-brandDark/70 uppercase text-[10px] tracking-wider border-b border-brandDark/8">
              <tr>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brandDark/5">
              {filtered.map((dest) => (
                <tr key={dest.slug || dest._id} className="hover:bg-brandBg/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-brandDark/10 flex-shrink-0">
                        <Image src={dest.heroImage} alt={dest.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-serif font-bold text-sm text-brandDark block">
                          {dest.name}
                        </span>
                        <span className="text-[11px] text-brandDark/50 line-clamp-1 max-w-xs">
                          {dest.shortDescription}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                      {dest.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-brandDark/80">
                      {dest.district}, {dest.province}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-amber-600">★ {dest.rating || 4.8}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(dest)}
                        className="p-1.5 rounded-lg bg-brandBg hover:bg-primary/10 text-brandDark hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dest._id || dest.slug, dest.name)}
                        className="p-1.5 rounded-lg bg-brandBg hover:bg-red-50 text-brandDark hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brandDark/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-brandDark/10 max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-brandDark/10 pb-4">
              <h3 className="font-serif text-2xl font-bold text-brandDark">
                {editingId ? "Edit Destination" : "Create New Destination"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brandDark/5 text-brandDark/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Destination Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  >
                    <option value="Mountains">Mountains</option>
                    <option value="Heritage">Heritage</option>
                    <option value="Beaches">Beaches</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Nature">Nature</option>
                    <option value="Cities">Cities</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Province</label>
                  <input
                    type="text"
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Latitude (°N)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Longitude (°E)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Hero Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description (1 sentence)</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Description</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Attractions (comma separated)</label>
                  <input
                    type="text"
                    value={formData.attractions}
                    onChange={(e) => setFormData({ ...formData, attractions: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Activities (comma separated)</label>
                  <input
                    type="text"
                    value={formData.activities}
                    onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-brandBg border border-brandDark/10"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brandDark/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-brandDark/20 text-brandDark font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-sm"
                >
                  {editingId ? "Save Changes" : "Create Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
