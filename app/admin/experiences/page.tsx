"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, X, CheckCircle2, AlertCircle, Compass } from "lucide-react";
import { seedExperiences } from "@/data/seedData";

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>(seedExperiences);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Surfing",
    shortDescription: "",
    description: "",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    duration: "Half-Day",
    difficulty: "Moderate",
    bestSeason: "Year-Round",
    location: "Southern Coast",
    featured: true,
  });

  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadExperiences = async () => {
    try {
      const res = await fetch("/api/experiences");
      if (res.ok) {
        const data = await res.json();
        if (data.experiences) setExperiences(data.experiences);
      }
    } catch (e) {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Surfing",
      shortDescription: "",
      description: "",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      duration: "Half-Day",
      difficulty: "Moderate",
      bestSeason: "Year-Round",
      location: "Southern Coast",
      featured: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (exp: any) => {
    setEditingId(exp._id || exp.slug);
    setFormData({
      title: exp.title,
      category: exp.category,
      shortDescription: exp.shortDescription,
      description: exp.description,
      image: exp.image,
      duration: exp.duration || "Half-Day",
      difficulty: exp.difficulty || "Moderate",
      bestSeason: exp.bestSeason || "Year-Round",
      location: exp.location || "Sri Lanka",
      featured: exp.featured ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/experiences/id/${editingId}` : "/api/experiences";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg({ type: "success", text: data.message || "Experience saved!" });
        setModalOpen(false);
        loadExperiences();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed" });
      }
    } catch (e: any) {
      setStatusMsg({ type: "error", text: e.message });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/experiences/id/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExperiences(experiences.filter((e) => e._id !== id && e.slug !== id));
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandDark">Manage Experiences</h1>
          <p className="text-xs text-brandDark/60 mt-1">Adventure, culture, wildlife and wellness tours.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Experience</span>
        </button>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${statusMsg.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <div className="rounded-3xl bg-white border border-brandDark/8 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs text-brandDark">
          <thead className="bg-brandBg text-brandDark/70 uppercase text-[10px] tracking-wider border-b border-brandDark/8">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brandDark/5">
            {experiences.map((exp) => (
              <tr key={exp.slug || exp._id} className="hover:bg-brandBg/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-brandDark/10 flex-shrink-0">
                      <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                    </div>
                    <span className="font-serif font-bold text-sm text-brandDark">{exp.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                    {exp.category}
                  </span>
                </td>
                <td className="px-6 py-4">{exp.duration}</td>
                <td className="px-6 py-4">{exp.location}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleOpenEdit(exp)} className="p-1.5 rounded-lg bg-brandBg hover:bg-primary/10">
                      <Edit2 className="w-4 h-4 text-brandDark" />
                    </button>
                    <button onClick={() => handleDelete(exp._id || exp.slug, exp.title)} className="p-1.5 rounded-lg bg-brandBg hover:bg-red-50 text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brandDark/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-brandDark">
                {editingId ? "Edit Experience" : "Add Experience"}
              </h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-brandDark/60" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Duration</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input type="url" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Short Description</label>
                <input type="text" required value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Detailed Description</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div className="pt-3 flex justify-end gap-2 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-white font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
