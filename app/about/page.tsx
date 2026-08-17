"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  History,
  Eye,
  Users,
  Briefcase,
  PhoneCall,
  Mail,
  TrendingUp,
  ShieldCheck,
  Award,
  Globe,
  Compass,
  ArrowRight,
} from "lucide-react";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"history" | "philosophy" | "board" | "investor">("history");

  const cards = [
    {
      id: "history",
      title: "Our History",
      subtitle: "EXPLORE TIMELINE",
      icon: <History className="w-6 h-6" />,
      desc: "Founded as the Ceylon Tourist Board in 1966, pioneering authentic tropical hospitality.",
    },
    {
      id: "philosophy",
      title: "Philosophy & Vision",
      subtitle: "CORE VALUES",
      icon: <Eye className="w-6 h-6" />,
      desc: "Championing sustainable ecological conservation and uplifting local cultural heritage.",
    },
    {
      id: "board",
      title: "Board & Leadership",
      subtitle: "GOVERNANCE",
      icon: <Users className="w-6 h-6" />,
      desc: "Guided by industry leaders, conservationists, and hospitality visionaries.",
    },
    {
      id: "investor",
      title: "Investor Relations",
      subtitle: "GROWTH & OPPORTUNITY",
      icon: <TrendingUp className="w-6 h-6" />,
      desc: "Prime opportunities in eco-resorts, boutique wellness retreats, and maritime tourism.",
    },
  ];

  return (
    <div className="pb-24 space-y-12">
      {/* Header Banner matching srilanka.travel/about-us */}
      <PageHeaderBanner
        title="About Sri Lanka Tourism"
        subtitle="Discover the rich heritage, vision, leadership, and sustainability commitments shaping the future of Ceylon travel."
        category="SRI LANKA TOURISM AUTHORITY"
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[{ label: "About Us" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Navigation Cards Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => {
            const isSelected = activeTab === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id as any)}
                className={`p-7 rounded-3xl text-left border transition-all flex flex-col justify-between space-y-4 shadow-subtle group ${
                  isSelected
                    ? "bg-[#0097B2] text-white border-[#0097B2] shadow-xl scale-102"
                    : "bg-white text-brandDark border-brandDark/10 hover:border-primary/40 hover:shadow-cardHover"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                }`}>
                  {c.icon}
                </div>

                <div className="space-y-1">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${
                    isSelected ? "text-secondary" : "text-primary"
                  }`}>
                    {c.subtitle}
                  </span>
                  <h3 className="font-serif font-extrabold text-2xl">
                    {c.title}
                  </h3>
                  <p className={`text-xs leading-relaxed pt-1 ${
                    isSelected ? "text-white/85" : "text-brandDark/70"
                  }`}>
                    {c.desc}
                  </p>
                </div>

                <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider pt-2 ${
                  isSelected ? "text-white" : "text-primary group-hover:translate-x-1 transition-transform"
                }`}>
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-brandDark/10 shadow-card space-y-8">
          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                  1966 — Present Day
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brandDark">
                  A Legacy of Ceylon Hospitality
                </h2>
              </div>
              <p className="text-sm sm:text-base text-brandDark/75 leading-relaxed">
                Sri Lanka Tourism began its formal journey under the Ceylon Tourist Board Act No. 10 of 1966. For six decades, the island has pioneered eco-tourism, cultural heritage safeguarding, and world-class luxury boutique travel. From the ancient Silk Route travelers to contemporary digital nomads, Sri Lanka remains the crown jewel of the Indian Ocean.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-brandBg border border-brandDark/8">
                  <span className="text-3xl font-extrabold text-primary font-serif">1966</span>
                  <p className="text-xs text-brandDark/70 mt-1">Founding of the Ceylon Tourist Board</p>
                </div>
                <div className="p-5 rounded-2xl bg-brandBg border border-brandDark/8">
                  <span className="text-3xl font-extrabold text-primary font-serif">8 UNESCO</span>
                  <p className="text-xs text-brandDark/70 mt-1">World Heritage Sites safeguarded</p>
                </div>
                <div className="p-5 rounded-2xl bg-brandBg border border-brandDark/8">
                  <span className="text-3xl font-extrabold text-primary font-serif">#1</span>
                  <p className="text-xs text-brandDark/70 mt-1">Wanderlust Most Desirable Island in the World</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "philosophy" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                  Our Guiding Principles
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brandDark">
                  Harmony, Conservation & Warmth
                </h2>
              </div>
              <p className="text-sm sm:text-base text-brandDark/75 leading-relaxed">
                Our vision is to position Sri Lanka as the world’s most ecologically responsible and culturally enriching island destination. We focus on low-impact, high-value experiential tourism that benefits local communities, preserves biodiversity, and celebrates our ancient Ayurvedic and culinary heritage.
              </p>
            </div>
          )}

          {activeTab === "board" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                  Leadership
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brandDark">
                  Board of Directors & Governance
                </h2>
              </div>
              <p className="text-sm sm:text-base text-brandDark/75 leading-relaxed">
                Our board works hand-in-hand with the Ministry of Tourism, provincial authorities, hoteliers, wildlife departments, and international airline partners to maintain global tourism excellence.
              </p>
            </div>
          )}

          {activeTab === "investor" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                  Opportunities
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brandDark">
                  Tourism Investment & Incentives
                </h2>
              </div>
              <p className="text-sm sm:text-base text-brandDark/75 leading-relaxed">
                Sri Lanka offers fast-track investment approvals, duty-free capital imports, and long-term tax concessions for luxury resort developments, marina projects, and eco-retreats.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
