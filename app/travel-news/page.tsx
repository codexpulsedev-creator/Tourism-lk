"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, ArrowRight, ExternalLink, Newspaper, Compass, ChevronRight } from "lucide-react";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string[];
  image: string;
}

const tourismNewsData: NewsItem[] = [
  {
    id: "1",
    slug: "bimstec-network-tour-operators-2026",
    title: "4th Meeting of the BIMSTEC Network of Tour Operators – July 2026",
    date: "August 17, 2026",
    category: "INTERNATIONAL DIPLOMACY & TOURISM",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    summary: "Sri Lanka successfully hosted the 4th Meeting of the BIMSTEC Network of Tour Operators in Colombo, strengthening regional tourism circuits and maritime cooperation.",
    content: [
      "Sri Lanka successfully hosted the 4th Meeting of the BIMSTEC Network of Tour Operators in Colombo.",
      "The Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation (BIMSTEC) is a regional organization comprising seven member states: Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka, and Thailand. Connected by the Bay of Bengal, these countries share a common interest in promoting regional cooperation across multiple sectors, including tourism.",
      "The keynote remarks highlighted the immense potential of the BIMSTEC region to emerge as a diverse and globally attractive tourism destination, emphasizing rich cultural heritage, spiritual traditions, biodiversity, and warm hospitality.",
      "During the sessions, member states reviewed the operational modalities of the proposed BIMSTEC Tourism Circuits, including the Buddhist Circuit, Temple Circuit, Ecotourism Circuit, Cruise Circuit, and Adventure Circuit.",
    ],
  },
  {
    id: "2",
    slug: "convention-bureau-mice-sector-roadmap",
    title: "Sri Lanka Convention Bureau's Roadmap for a Knowledge-Driven MICE Sector",
    date: "July 28, 2026",
    category: "BUSINESS & MICE TOURISM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    summary: "The Sri Lanka Convention Bureau (SLCB) unveiled its strategic framework to position Colombo as a leading hub for international conferences, corporate incentives, and expos.",
    content: [
      "The Sri Lanka Convention Bureau (SLCB) unveiled an ambitious masterplan to elevate Sri Lanka's MICE (Meetings, Incentives, Conferences, and Exhibitions) industry.",
      "With world-class facilities including the Bandaranaike Memorial International Conference Hall (BMICH), Cinnamon Life Integrated Resort, and Port City Colombo convention zones, Sri Lanka is primed to capture major global corporate events.",
    ],
  },
  {
    id: "3",
    slug: "sri-lanka-tourism-progress-2026",
    title: "Sri Lanka Tourism Showcases Progress Across Key Sectors – July 2026",
    date: "July 13, 2026",
    category: "INDUSTRY GROWTH & ARRIVALS",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    summary: "Tourist arrivals surpassed 1.5 million milestones in the first half of 2026, driven by strong growth from India, the UK, Germany, Russia, France, and China.",
    content: [
      "Sri Lanka Tourism has recorded unprecedented growth across all international markets, with revenue exceeding $2.4 billion in tourism receipts.",
      "A surge in repeat travelers and digital nomads has established Sri Lanka as one of the fastest recovering travel economies in the Asia-Pacific region.",
    ],
  },
  {
    id: "4",
    slug: "recognized-among-worlds-best-2026",
    title: "Sri Lanka Recognized Among World's Best Travel Destinations for 2026",
    date: "July 13, 2026",
    category: "GLOBAL ACCOLADES & AWARDS",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1000&auto=format&fit=crop",
    summary: "Leading global travel publications including Wanderlust, Lonely Planet, and Conde Nast Traveler have ranked Sri Lanka as the #1 Must-Visit Island Destination.",
    content: [
      "Sri Lanka continues to emerge as one of the world's most acclaimed travel destinations, recognized for its compact diversity, eight UNESCO heritage sites, and untouched coastlines.",
    ],
  },
  {
    id: "5",
    slug: "roadshows-in-gujarat-and-india",
    title: "Sri Lanka Tourism Strengthens Presence in India Through Successful B2B Roadshows",
    date: "July 13, 2026",
    category: "REGIONAL ROADSHOWS",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop",
    summary: "Over 200 Indian travel agents and outbound operators engaged in high-level B2B networking sessions to promote Ramayana trails and luxury wellness retreats.",
    content: [
      "The Sri Lanka Tourism Promotion Bureau (SLTPB) concluded a series of high-impact roadshows across Mumbai, Ahmedabad, and New Delhi to expand direct air connectivity.",
    ],
  },
];

export default function TourismNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem>(tourismNewsData[0]);

  const filteredNews = tourismNewsData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 space-y-12">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Official Tourism News & Press Releases"
        subtitle="Stay updated with official announcements, international diplomacy, global accolades, and industry masterplans."
        category="SRI LANKA TOURISM MEDIA CENTRE"
        backgroundImage="https://images.unsplash.com/photo-1511578314322-379afb476865?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[
          { label: "Tourism News", href: "/travel-news" },
          { label: selectedNews.title.slice(0, 40) + "..." },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Display matching Screenshot 3 */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-brandDark/10 shadow-card">
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary block">
                POSTED ON {selectedNews.date.toUpperCase()}
              </span>
              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl text-brandDark tracking-tight leading-tight">
                {selectedNews.title}
              </h1>
            </div>

            {/* Featured Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-subtle bg-brandDark/10">
              <Image
                src={selectedNews.image}
                alt={selectedNews.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-brandDark uppercase tracking-wider">
                {selectedNews.category}
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-sm sm:text-base text-brandDark/85 leading-relaxed font-sans pt-2">
              <p className="font-semibold text-lg text-brandDark leading-relaxed">
                {selectedNews.summary}
              </p>
              {selectedNews.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Social Share & Media Contact */}
            <div className="pt-8 border-t border-brandDark/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-brandDark/60">
              <span>Sri Lanka Tourism Promotion Bureau (SLTPB) Media Division</span>
              <Link
                href="/contact"
                className="text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span>Media Inquiries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Sidebar: "More News" with search matching Screenshot 3 */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-white border border-brandDark/10 overflow-hidden shadow-card sticky top-28">
              {/* Header Box */}
              <div className="bg-[#0097B2] p-5 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg tracking-wide uppercase">
                    More News
                  </h3>
                  <Newspaper className="w-5 h-5 text-white/80" />
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-xs text-brandDark placeholder-brandDark/50 focus:outline-none shadow-inner"
                  />
                  <Search className="w-3.5 h-3.5 text-brandDark/40 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Scrollable News List */}
              <div className="max-h-[460px] overflow-y-auto divide-y divide-brandDark/8 p-2 custom-scrollbar">
                {filteredNews.map((item) => {
                  const isCurrent = selectedNews.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedNews(item);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      className={`w-full text-left p-3.5 rounded-xl transition-all block space-y-1 ${
                        isCurrent
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-brandDark/5"
                      }`}
                    >
                      <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isCurrent ? "text-primary" : "text-brandDark"
                      }`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-brandDark/50 font-semibold block">
                        {item.date}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
