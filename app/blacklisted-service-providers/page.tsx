"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Search,
  ChevronDown,
  ExternalLink,
  Phone,
  Mail,
  Compass,
} from "lucide-react";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

const blacklistedAgencies = [
  {
    name: "Ceylon Direct Voyages (Unlicensed Entity)",
    category: "Unregistered Inbound Operator",
    reason: "Operating without mandatory SLTDA licensing & consumer deposit complaints.",
    noticeDate: "January 2026",
    status: "Suspended",
  },
  {
    name: "Lanka Royal Safaris (Fake Online Booking Portal)",
    category: "Fraudulent Safari Booking Website",
    reason: "Misrepresenting official national park permits and collecting unauthorized funds.",
    noticeDate: "March 2026",
    status: "Blacklisted",
  },
  {
    name: "Southern Waves Surf & Transport (Unlicensed Chauffeur Service)",
    category: "Uncertified Transport Provider",
    reason: "Lack of commercial passenger insurance and non-compliance with passenger safety guidelines.",
    noticeDate: "May 2026",
    status: "Revoked",
  },
];

export default function BlacklistedServiceProvidersPage() {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = blacklistedAgencies.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-24 space-y-12">
      {/* Header Banner */}
      <PageHeaderBanner
        title="Blacklisted Service Providers"
        subtitle="Official consumer protection advisory from the Sri Lanka Tourism Development Authority (SLTDA)."
        category="CONSUMER PROTECTION & SAFE TRAVEL"
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[
          { label: "Safe Travel", href: "/plan-your-trip" },
          { label: "Blacklisted Service Providers" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main List matching Screenshot 1 */}
          <div className="lg:col-span-8 space-y-8">
            {/* Advisory Alert Banner */}
            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-4 shadow-subtle">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <h3 className="font-bold text-base text-amber-950">
                  Consumer Advisory for Travelers & Tour Operators
                </h3>
                <p className="leading-relaxed text-amber-900/80">
                  To ensure safety and quality standards, the Sri Lanka Tourism Development Authority (SLTDA) regularly inspects tourism businesses. Travelers are strongly advised to only book through SLTDA-registered agencies.
                </p>
              </div>
            </div>

            {/* Accordion Box matching Screenshot 1 */}
            <div className="rounded-3xl bg-white border border-brandDark/10 overflow-hidden shadow-card">
              <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="w-full p-5 sm:p-6 bg-brandDark text-white font-serif font-bold text-lg flex items-center justify-between transition-colors hover:bg-black"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-secondary" />
                  <span>BLACKLISTED TRAVEL AGENCIES & UNLICENSED OPERATORS</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${accordionOpen ? "rotate-180" : ""}`} />
              </button>

              {accordionOpen && (
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search blacklisted entities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="w-4 h-4 text-brandDark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="space-y-4">
                    {filtered.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700 block">
                              {item.category}
                            </span>
                            <h4 className="font-serif font-bold text-base sm:text-lg text-brandDark">
                              {item.name}
                            </h4>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-brandDark/75 leading-relaxed">
                          <strong className="text-brandDark">Grounds:</strong> {item.reason}
                        </p>
                        <span className="text-[11px] text-brandDark/50 font-mono block">
                          Notice Published: {item.noticeDate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* How to verify an operator */}
            <div className="p-8 rounded-3xl bg-white border border-brandDark/10 shadow-subtle space-y-4">
              <div className="flex items-center gap-3 text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-serif font-bold text-xl text-brandDark">
                  How to Verify an SLTDA Registered Agency
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brandDark/75 leading-relaxed">
                Always ensure your tour operator displays an official SLTDA Registration Number (formatted as <code className="bg-brandBg px-2 py-0.5 rounded font-mono font-bold text-primary">SLTDA/SQA/TA/...</code>). You can browse our certified directory anytime.
              </p>
              <div className="pt-2">
                <Link
                  href="/travel-agents"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Browse Certified Travel Agents</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-white border border-brandDark/10 overflow-hidden shadow-card sticky top-28">
              <div className="bg-gradient-to-r from-brandDark to-black p-5 text-white">
                <h3 className="font-serif font-bold text-lg tracking-wide uppercase">
                  Tourist Police & Help
                </h3>
                <p className="text-xs text-white/70 mt-0.5">
                  24/7 Emergency Assistance Hotline
                </p>
              </div>

              <div className="p-5 space-y-4 text-xs text-brandDark/80">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Emergency Police Hotline</span>
                  <p className="text-lg font-bold font-mono">1912</p>
                  <p className="text-[11px] text-emerald-800">Toll-free tourist complaint & assistance line</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-brandDark/8">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+94 11 242 1052 (SLTDA Safety Division)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>complaints@srilanka.travel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
