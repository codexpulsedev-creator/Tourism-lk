"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { seedEvents } from "@/data/seedData";
import { formatDate } from "@/lib/utils";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>(seedEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Cultural & Religious",
    location: "Kandy",
    shortDescription: "",
    description: "",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    startDate: "2026-08-10",
    endDate: "2026-08-20",
    ticketInfo: "Free / Open",
    venue: "Main Streets",
  });

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        if (data.events) setEvents(data.events);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Cultural & Religious",
      location: "Kandy",
      shortDescription: "",
      description: "",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
      startDate: "2026-08-10",
      endDate: "2026-08-20",
      ticketInfo: "Free / Open",
      venue: "Main Streets",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/events/id/${editingId}` : "/api/events";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setModalOpen(false);
        loadEvents();
      }
    } catch (e) {}
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/events/id/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents(events.filter((ev) => ev._id !== id && ev.slug !== id));
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandDark">Manage Events</h1>
          <p className="text-xs text-brandDark/60 mt-1">Cultural festivals, literary arts & surf championships.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>

      <div className="rounded-3xl bg-white border border-brandDark/8 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs text-brandDark">
          <thead className="bg-brandBg text-brandDark/70 uppercase text-[10px] tracking-wider border-b border-brandDark/8">
            <tr>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brandDark/5">
            {events.map((ev) => (
              <tr key={ev.slug || ev._id} className="hover:bg-brandBg/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-brandDark/10 flex-shrink-0">
                      <Image src={ev.image} alt={ev.title} fill className="object-cover" />
                    </div>
                    <span className="font-serif font-bold text-sm text-brandDark">{ev.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                    {ev.category}
                  </span>
                </td>
                <td className="px-6 py-4">{formatDate(ev.startDate)}</td>
                <td className="px-6 py-4">{ev.location}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleDelete(ev._id || ev.slug, ev.title)} className="p-1.5 rounded-lg bg-brandBg hover:bg-red-50 text-red-600">
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
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-brandDark">Add Event</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-brandDark/60" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">End Date</label>
                  <input type="date" required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Location / City</label>
                <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input type="url" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value, shortDescription: e.target.value.slice(0, 80) })} className="w-full px-3 py-2 rounded-lg bg-brandBg border" />
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
