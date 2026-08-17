"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Compass,
  Calendar,
  BookOpen,
  Users,
  MessageSquare,
  Plus,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    destinations: 10,
    experiences: 8,
    events: 4,
    stories: 4,
    users: 2,
    reviews: 24,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          if (data.stats) {
            setStats(data.stats);
          }
        }
      } catch (e) {}
      finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Destinations",
      value: stats.destinations,
      icon: <MapPin className="w-5 h-5 text-primary" />,
      href: "/admin/destinations",
      color: "bg-primary/10",
    },
    {
      title: "Total Experiences",
      value: stats.experiences,
      icon: <Compass className="w-5 h-5 text-secondary" />,
      href: "/admin/experiences",
      color: "bg-secondary/10",
    },
    {
      title: "Total Events",
      value: stats.events,
      icon: <Calendar className="w-5 h-5 text-emerald-600" />,
      href: "/admin/events",
      color: "bg-emerald-50",
    },
    {
      title: "Travel Stories",
      value: stats.stories,
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      href: "/admin/stories",
      color: "bg-blue-50",
    },
    {
      title: "Registered Users",
      value: stats.users,
      icon: <Users className="w-5 h-5 text-purple-600" />,
      href: "/admin/users",
      color: "bg-purple-50",
    },
    {
      title: "Total Reviews",
      value: stats.reviews,
      icon: <MessageSquare className="w-5 h-5 text-amber-600" />,
      href: "/admin/reviews",
      color: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Overview & Metrics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brandDark">
            Platform Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/destinations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Destination</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="p-6 rounded-3xl bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all flex items-center justify-between group"
          >
            <div className="space-y-2">
              <span className="text-xs text-brandDark/60 font-medium">{stat.title}</span>
              <h3 className="font-serif text-3xl font-bold text-brandDark">{stat.value}</h3>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div className="rounded-3xl bg-white border border-brandDark/8 p-8 shadow-subtle space-y-6">
        <h3 className="font-serif text-xl font-bold text-brandDark">
          Content Management Shortcuts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/destinations"
            className="p-4 rounded-2xl bg-brandBg border border-brandDark/5 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3 group"
          >
            <MapPin className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-serif font-bold text-sm text-brandDark group-hover:text-primary">
                Manage Destinations
              </h4>
              <p className="text-xs text-brandDark/60 mt-0.5">
                Add, edit coordinates, images & attractions
              </p>
            </div>
            <div className="text-xs font-bold text-primary flex items-center gap-1">
              <span>View List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/admin/experiences"
            className="p-4 rounded-2xl bg-brandBg border border-brandDark/5 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3 group"
          >
            <Compass className="w-6 h-6 text-secondary" />
            <div>
              <h4 className="font-serif font-bold text-sm text-brandDark group-hover:text-primary">
                Manage Experiences
              </h4>
              <p className="text-xs text-brandDark/60 mt-0.5">
                Safari, hiking, surfing & culinary tours
              </p>
            </div>
            <div className="text-xs font-bold text-primary flex items-center gap-1">
              <span>View List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/admin/events"
            className="p-4 rounded-2xl bg-brandBg border border-brandDark/5 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3 group"
          >
            <Calendar className="w-6 h-6 text-emerald-600" />
            <div>
              <h4 className="font-serif font-bold text-sm text-brandDark group-hover:text-primary">
                Manage Festivals
              </h4>
              <p className="text-xs text-brandDark/60 mt-0.5">
                Dates, venues & cultural pageantry
              </p>
            </div>
            <div className="text-xs font-bold text-primary flex items-center gap-1">
              <span>View List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/admin/stories"
            className="p-4 rounded-2xl bg-brandBg border border-brandDark/5 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3 group"
          >
            <BookOpen className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-serif font-bold text-sm text-brandDark group-hover:text-primary">
                Manage Stories
              </h4>
              <p className="text-xs text-brandDark/60 mt-0.5">
                Editorial travel articles & guides
              </p>
            </div>
            <div className="text-xs font-bold text-primary flex items-center gap-1">
              <span>View List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
