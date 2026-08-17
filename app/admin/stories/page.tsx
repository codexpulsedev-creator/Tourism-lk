"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { seedStories } from "@/data/seedData";
import { formatDate } from "@/lib/utils";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<any[]>(seedStories);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Scenic Journeys",
    authorName: "Kasun Jayawardena",
    coverImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop",
    readingTime: "5 min read",
    excerpt: "",
    content: "",
  });

  const loadStories = async () => {
    try {
      const res = await fetch("/api/stories");
      if (res.ok) {
        const data = await res.json();
        if (data.stories) setStories(data.stories);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          coverImage: formData.coverImage,
          readingTime: formData.readingTime,
          excerpt: formData.excerpt,
          content: formData.content,
          author: { name: formData.authorName },
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        loadStories();
      }
    } catch (e) {}
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/stories/id/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStories(stories.filter((s) => s._id !== id && s.slug !== id));
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandDark">Manage Travel Stories</h1>
          <p className="text-xs text-brandDark/60 mt-1">Articles, local food guides, and expedition chronicles.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Story</span>
        </button>
      </div>

      <div className="rounded-3xl bg-white border border-brandDark/8 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs text-brandDark">
          <thead className="bg-brandBg text-brandDark/70 uppercase text-[10px] tracking-wider border-b border-brandDark/8">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Published</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brandDark/5">
            {stories.map((s) => (
              <tr key={s.slug || s._id} className="hover:bg-brandBg/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-brandDark/10 flex-shrink-0">
                      <Image src={s.coverImage} alt={s.title} fill className="object-cover" />
                    </div>
                    <span className="font-serif font-bold text-sm text-brandDark max-w-sm line-clamp-1">{s.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{s.author?.name || "LankaExplore"}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                    {s.category}
                  </span>
                </td>
                <td className="px-6 py-4">{formatDate(s.publishedAt || new Date())}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(s._id || s.slug, s.title)} className="p-1.5 rounded-lg bg-brandBg hover:bg-red-50 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brandDark/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-brandDark">Write Travel Story</h3>
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
                  <label className="block font-semibold mb-1">Author Name</label>
                  <input type="text" required value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Cover Image URL</label>
                <input type="url" required value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Excerpt / Summary</label>
                <textarea rows={2} required value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Article Body</label>
                <textarea rows={5} required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div className="pt-3 flex justify-end gap-2 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-white font-semibold">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
