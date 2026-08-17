"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Send,
  Phone,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import CompassLogo from "@/components/ui/CompassLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message || "Thank you for subscribing to Ceylon travel tales!");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMsg("Connection error. Please try again.");
    }
  };

  return (
    <footer className="bg-brandDark text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand and Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <CompassLogo size="md" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Lanka<span className="text-secondary">Explore</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-primary-300 font-semibold">
                  One Island. Endless Experiences.
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Discover the emerald teardrop of the Indian Ocean. From misty mountain tea trails and ancient UNESCO rock citadels to world-class surfing bays and wildlife sanctuaries.
            </p>

            {/* Newsletter form */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-secondary">
                Get Ceylon Travel Inspiration
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {status === "loading" ? "..." : <Send className="w-4 h-4" />}
                  <span>Join</span>
                </button>
              </form>

              {status === "success" && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {msg}
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {msg}
                </p>
              )}
            </div>
          </div>

          {/* Col 3: Discover */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Discover
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/destinations" className="hover:text-secondary transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-secondary transition-colors">
                  Island Experiences
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="hover:text-secondary transition-colors">
                  Curated Itineraries
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:text-secondary transition-colors">
                  Boutique Stays & Eco Lodges
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-secondary transition-colors">
                  Upcoming Festivals
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-secondary transition-colors">
                  Travel Stories & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Plan Your Trip */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Trip Planner
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/plan-your-trip" className="hover:text-secondary transition-colors">
                  Visa & Entry Info
                </Link>
              </li>
              <li>
                <Link href="/flight-booking" className="hover:text-secondary transition-colors">
                  Book Flights to Sri Lanka
                </Link>
              </li>
              <li>
                <Link href="/travel-agents" className="hover:text-secondary transition-colors">
                  Certified Travel Agents
                </Link>
              </li>
              <li>
                <Link href="/camping-sites" className="hover:text-secondary transition-colors">
                  Camping Sites & Glamping
                </Link>
              </li>
              <li>
                <Link href="/travel-news" className="hover:text-secondary transition-colors">
                  Tourism News & Updates
                </Link>
              </li>
              <li>
                <Link href="/blacklisted-service-providers" className="hover:text-secondary transition-colors text-amber-300">
                  Blacklisted Providers Notice
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  About Sri Lanka Tourism
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Travel Safe & Hotlines */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Emergency & Trust
            </h4>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                <Phone className="w-4 h-4" />
                <span>1912</span>
              </div>
              <p className="leading-snug">
                Sri Lanka Tourism 24/7 Official Multilingual Tourist Assistance & Emergency Hotline.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
                <Shield className="w-3.5 h-3.5" />
                Official Safe Travel Partner
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-xs text-gray-400 block mb-2">Follow our journey</span>
              <div className="flex items-center space-x-3 text-gray-300">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-secondary hover:text-brandDark transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-secondary hover:text-brandDark transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-secondary hover:text-brandDark transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 LankaExplore. All rights reserved. Sri Lanka Tourism Showcase.</p>
          <div className="flex items-center space-x-6">
            <Link href="/plan-your-trip" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/plan-your-trip" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
