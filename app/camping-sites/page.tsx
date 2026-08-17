"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  Award,
  Filter,
  CheckCircle2,
  ExternalLink,
  Tent,
  Calendar,
  Compass,
} from "lucide-react";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

interface CampingSite {
  id: string;
  name: string;
  category: string;
  grade: "SUPERIOR" | "DELUXE";
  address: string;
  localAuthority: string;
  web: string;
  email: string;
  regNo: string;
  tel?: string;
  image: string;
  description: string;
}

const officialCampingSites: CampingSite[] = [
  {
    id: "1",
    name: "Athgira River Camping",
    category: "Camping sites",
    grade: "SUPERIOR",
    address: "OLD PUMP ROAD, MUDUNMANKADA, UDAWALAWA",
    localAuthority: "Embilipitiya",
    web: "http://www.athgirarivercamp.com/",
    email: "nssathgirarivercamping@gmail.com",
    regNo: "SLTDA/SQA/CAM/0008",
    tel: "0472233275",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=800&auto=format&fit=crop",
    description: "Serene riverside luxury tented accommodation near Udawalawe National Park, ideal for elephant safaris and bird watching.",
  },
  {
    id: "2",
    name: "Eco Team Safari Camps Udawalawe (pvt) Ltd",
    category: "Camping sites",
    grade: "DELUXE",
    address: "KALAWELGALA, SOORIYAARA, THANAMALWILA",
    localAuthority: "Thanamalwila Pradeshiya Sabha",
    web: "http://www.ecoteam.lk/",
    email: "accounts3@ecoteam.lk",
    regNo: "SLTDA/CAM/00002",
    tel: "0710662217",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?q=80&w=800&auto=format&fit=crop",
    description: "Premium wilderness glamping with custom 4x4 jeep safaris deep in the elephant corridors of Udawalawe.",
  },
  {
    id: "3",
    name: "Eco Team Safari Camps Wilpattu (pvt) Ltd",
    category: "Camping sites",
    grade: "DELUXE",
    address: "KATUKELIYA ROAD, GALKADAWALA, NOCHCHIYAGAMA",
    localAuthority: "Anuradhapura",
    web: "http://www.ecoteam.lk/",
    email: "accounts7@ecoteam.lk",
    regNo: "SLTDA/SQA/CAM/0001",
    tel: "0710662217",
    image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=800&auto=format&fit=crop",
    description: "Exclusive safari glamping adjacent to Wilpattu National Park lakes (Villus) for sloth bear and leopard tracking.",
  },
  {
    id: "4",
    name: "Eco Team Safari Camps Yala (pvt) Ltd (Mahoora)",
    category: "Camping sites",
    grade: "DELUXE",
    address: "SITHULPAWWA ROAD, KATARAGAMA",
    localAuthority: "Katharagama",
    web: "http://www.mahoora.lk/",
    email: "accounts6@ecoteam.lk",
    regNo: "SLTDA/CAM/00003",
    tel: "0710662217",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop",
    description: "Award-winning Mahoora tented safari camp on the border of Yala Block 1, renowned for expert naturalist-led game drives.",
  },
  {
    id: "5",
    name: "Ella Retreat Hotel & Glamping",
    category: "Camping sites",
    grade: "SUPERIOR",
    address: "GALARAWA, RAWANAELLA, ELLA",
    localAuthority: "Ella Pradeshiya Sabha",
    web: "http://www.ellaretreat.com/",
    email: "ellaretreat@yahoo.com",
    regNo: "SLTDA/SQA/CAM/00015",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop",
    description: "Eco mountain retreat overlooking Ravana Falls and misty tea plantations with luxury forest canvas suites.",
  },
  {
    id: "6",
    name: "Glamping By Offtrek",
    category: "Camping sites",
    grade: "SUPERIOR",
    address: "NO.16/A, KOVILAGAWA ESTATE, UDAMANGODA, MEDAMAHANUWARA",
    localAuthority: "Kandy",
    web: "mailto:hello@offtrek.lk",
    email: "hello@offtrek.lk",
    regNo: "SLTDA/SQA/CAM/00016",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop",
    description: "High-altitude Knuckles mountain range glamping, cloud forest trekking trails, and starlit campfire nights.",
  },
  {
    id: "7",
    name: "Leopard Nest Luxury Glamping",
    category: "Camping sites",
    grade: "DELUXE",
    address: "58, SITHULPAWWA ROAD, UDDAKANDARA, TISSAMAHARAMA",
    localAuthority: "Thissamaharama",
    web: "http://www.leopardnest.com/",
    email: "ruwan.rat@gmail.com",
    regNo: "SLTDA/SQA/CAM/0007",
    tel: "0474935191",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=800&auto=format&fit=crop",
    description: "Romantic luxury treehouses and canvas domes nestled in the wild bush of Yala, complete with open-air dining.",
  },
  {
    id: "8",
    name: "Leopard Trails Yala",
    category: "Camping sites",
    grade: "DELUXE",
    address: "SITHULPAUWA ROAD, KOCHCHIPATHANA WEWA PARA, BODIRAJAPURA, KATHARAGAMA",
    localAuthority: "Katharagama",
    web: "http://www.leopardtrails.com/",
    email: "hr@leopardtrails.com",
    regNo: "SLTDA/CAM/00004",
    tel: "0112686147",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
    description: "Bespoke safari expeditions with air-conditioned luxury tents, gourmet bush dinners, and world-class wildlife photography guides.",
  },
  {
    id: "9",
    name: "Makini Bush Camp",
    category: "Camping sites",
    grade: "DELUXE",
    address: "MALITHTHAN PALESSA, KATARAGAMA",
    localAuthority: "Katharagama",
    web: "https://makinibushcamp.com/",
    email: "chamith@makini.lk",
    regNo: "SLTDA/SQA/CAM/00012",
    tel: "0773526879",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    description: "Secluded boutique eco-camp offering bespoke bush experiences, leopard safaris, and tranquil nature walks.",
  },
  {
    id: "10",
    name: "Noel Rodrigo's Leopard Safaris",
    category: "Camping sites",
    grade: "SUPERIOR",
    address: "OLD KATARAGAMA ROAD, KOCHIPATANA, KATARAGAMA",
    localAuthority: "Katharagama",
    web: "http://www.leopardsafaris.com/",
    email: "noel@leopardsafaris.com",
    regNo: "SLTDA/CAM/00006",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    description: "Pioneer luxury safari camping in Sri Lanka with customized game drives, sundowners, and passionate conservation ethics.",
  },
];

export default function CampingSitesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthority, setSelectedAuthority] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");

  const authorities = ["All", "Embilipitiya", "Thanamalwila Pradeshiya Sabha", "Anuradhapura", "Katharagama", "Ella Pradeshiya Sabha", "Kandy", "Thissamaharama"];
  const grades = ["All", "DELUXE", "SUPERIOR"];

  const filtered = officialCampingSites.filter((site) => {
    const matchSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.regNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchAuthority = selectedAuthority === "All" || site.localAuthority === selectedAuthority;
    const matchGrade = selectedGrade === "All" || site.grade === selectedGrade;

    return matchSearch && matchAuthority && matchGrade;
  });

  return (
    <div className="pb-24 space-y-12">
      {/* Header Banner matching srilanka.travel/gemstone-srilanka */}
      <PageHeaderBanner
        title="Camping Sites & Glamping"
        subtitle="Official Sri Lanka Tourism Approved Tented Lodges & Eco Retreats"
        category="SRI LANKA TOURISM REGISTERED ACCOMMODATION"
        backgroundImage="https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[
          { label: "Accommodation", href: "/accommodation" },
          { label: "Camping Sites" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Content Layout with Right Sidebar matching Screenshot 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left / Center Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* 3 Summary Info Cards matching Screenshot 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-brandDark/10 shadow-subtle">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <Tent className="w-4 h-4" />
                  <span>Registered Stays</span>
                </div>
                <p className="text-xs text-brandDark/70 leading-relaxed">
                  Find listed official safari camps, glamping suites, and mountain lodges.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-brandDark/10 shadow-subtle">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location Filters</span>
                </div>
                <p className="text-xs text-brandDark/70 leading-relaxed">
                  Filter by Yala, Udawalawe, Wilpattu, Kandy, and Ella districts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-brandDark/10 shadow-subtle">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Classification</span>
                </div>
                <p className="text-xs text-brandDark/70 leading-relaxed">
                  SLTDA Quality Assurance: SUPERIOR and DELUXE certified.
                </p>
              </div>
            </div>

            {/* Search and Filters Box matching Screenshot 3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brandDark/10 shadow-card space-y-5">
              <h2 className="font-serif font-bold text-xl text-brandDark">
                Search Hotels & Other Accommodation
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brandDark/70">Hotel Name or Place</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-brandDark/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search camping sites..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-brandBg border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brandDark/70">Local Authority / District</label>
                  <select
                    value={selectedAuthority}
                    onChange={(e) => setSelectedAuthority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-brandBg border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    {authorities.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brandDark/70">Classification Grade</label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-brandBg border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    {grades.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Camping Sites Listing Table / Cards matching Screenshot 3 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brandDark/60">
                  Showing {filtered.length} Approved Camping Sites
                </span>
              </div>

              <div className="space-y-6">
                {filtered.map((site) => (
                  <div
                    key={site.id}
                    className="rounded-3xl bg-white border border-brandDark/10 overflow-hidden shadow-subtle hover:shadow-cardHover transition-all flex flex-col md:flex-row group"
                  >
                    {/* Left Tourism Stamp & Photo */}
                    <div className="relative md:w-64 h-56 md:h-auto overflow-hidden bg-brandDark/10 flex-shrink-0">
                      <Image
                        src={site.image}
                        alt={site.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 md:hidden" />
                      
                      {/* Official Sri Lanka Tourism Approved Stamp */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#0097B2] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>SLTDA APPROVED</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 md:hidden">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary text-brandDark text-[10px] font-bold uppercase tracking-wider">
                          {site.grade} GRADE
                        </span>
                      </div>
                    </div>

                    {/* Content Details matching exact Screenshot 3 Table Style */}
                    <div className="p-6 flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                            {site.category}
                          </span>
                          <h3 className="font-serif font-extrabold text-2xl text-brandDark group-hover:text-primary transition-colors">
                            {site.name}
                          </h3>
                        </div>
                        <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                          {site.grade}
                        </span>
                      </div>

                      <p className="text-xs text-brandDark/70 leading-relaxed">
                        {site.description}
                      </p>

                      {/* Official Data Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-brandDark/8 text-xs">
                        <div>
                          <span className="text-brandDark/50 font-medium">Address:</span>
                          <p className="font-semibold text-brandDark">{site.address}</p>
                        </div>

                        <div>
                          <span className="text-brandDark/50 font-medium">Local Authority:</span>
                          <p className="font-semibold text-brandDark">{site.localAuthority}</p>
                        </div>

                        <div>
                          <span className="text-brandDark/50 font-medium">Registration No:</span>
                          <p className="font-mono font-bold text-primary">{site.regNo}</p>
                        </div>

                        {site.tel && (
                          <div>
                            <span className="text-brandDark/50 font-medium">Telephone:</span>
                            <p className="font-semibold text-brandDark">
                              <a href={`tel:${site.tel}`} className="hover:text-primary transition-colors">
                                {site.tel}
                              </a>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Contact & Web CTA */}
                      <div className="pt-3 border-t border-brandDark/8 flex flex-wrap items-center gap-3">
                        {site.web && (
                          <a
                            href={site.web}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                          >
                            <span>Visit Official Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {site.email && (
                          <a
                            href={`mailto:${site.email}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brandDark/15 hover:border-primary text-brandDark hover:text-primary text-xs font-bold transition-all"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{site.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar "PLAN YOUR VISIT" Navigation matching Screenshot 1 & 2 */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-white border border-brandDark/10 overflow-hidden shadow-card sticky top-28">
              <div className="bg-gradient-to-r from-[#0097B2] to-primary p-5 text-white">
                <h3 className="font-serif font-bold text-lg tracking-wide uppercase">
                  Plan Your Visit
                </h3>
                <p className="text-xs text-white/80 mt-0.5">
                  Official tourism directory & planning services
                </p>
              </div>

              <div className="p-3 divide-y divide-brandDark/5">
                {[
                  { label: "Suggested Itineraries", href: "/itineraries" },
                  { label: "Online Services & Visa ETA", href: "https://www.immigration.gov.lk/", isExternal: true },
                  { label: "Certified Travel Agents", href: "/travel-agents" },
                  { label: "Accommodation & Resorts", href: "/accommodation" },
                  { label: "Camping Sites & Glamping", href: "/camping-sites", active: true },
                  { label: "Transit & Blue Train Guide", href: "/plan-your-trip#transport" },
                  { label: "Experiences & Activities", href: "/experiences" },
                  { label: "Upcoming Events & Festivals", href: "/events" },
                  { label: "Travel Stories & Guides", href: "/stories" },
                ].map((item, idx) => (
                  <div key={idx} className="py-1">
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-brandDark hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <span>{item.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-brandDark/40" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                          item.active
                            ? "bg-primary/10 text-primary font-extrabold"
                            : "text-brandDark hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        <span>{item.label}</span>
                        <Compass className="w-3.5 h-3.5 text-brandDark/40" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Tourism Business Registration Box matching Screenshot 3 */}
              <div className="m-4 p-5 rounded-2xl bg-brandBg border border-brandDark/8 space-y-3">
                <h4 className="font-serif font-bold text-sm text-brandDark">
                  Tourism Business Registration
                </h4>
                <p className="text-xs text-brandDark/70 leading-relaxed">
                  It is mandatory to register tourism accommodation businesses operating in Sri Lanka.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full justify-center items-center py-2.5 rounded-xl bg-brandDark hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Register Business
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
