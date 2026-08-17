"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Calendar,
  BookOpen,
  Hotel,
  Users,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  const navItems = [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Destinations", href: "/admin/destinations", icon: <MapPin className="w-4 h-4" /> },
    { label: "Experiences", href: "/admin/experiences", icon: <Compass className="w-4 h-4" /> },
    { label: "Events", href: "/admin/events", icon: <Calendar className="w-4 h-4" /> },
    { label: "Travel Stories", href: "/admin/stories", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Reviews", href: "/admin/reviews", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "Users", href: "/admin/users", icon: <Users className="w-4 h-4" /> },
  ];

  const handleSeed = async () => {
    if (!confirm("Are you sure you want to re-seed demo data in MongoDB Atlas?")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeedMsg(data.message || "Database seeded successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (e) {
      setSeedMsg("Seed failed");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-brandBg flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-brandDark text-white p-6 flex flex-col justify-between flex-shrink-0 border-r border-white/10">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2 pb-4 border-b border-white/10">
            <ShieldCheck className="w-6 h-6 text-secondary" />
            <div>
              <h2 className="font-serif font-bold text-base text-white">Admin Console</h2>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                LankaExplore CMS
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-secondary text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${seeding ? "animate-spin" : ""}`} />
            <span>{seeding ? "Seeding..." : "Reset / Seed DB"}</span>
          </button>
          {seedMsg && <p className="text-[10px] text-emerald-400 text-center">{seedMsg}</p>}

          <Link
            href="/"
            className="w-full py-2 px-3 rounded-xl border border-white/20 text-gray-300 text-xs font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
