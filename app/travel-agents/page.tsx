"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Users,
} from "lucide-react";

interface TravelAgent {
  id: string;
  name: string;
  regNo: string;
  location: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  specialties: string[];
  rating: number;
  image: string;
  verified: boolean;
}

const verifiedAgents: TravelAgent[] = [
  {
    id: "1",
    name: "Walkers Tours Sri Lanka",
    regNo: "SLTDA/SQA/TA/00142",
    location: "Colombo 02",
    type: "Inbound Tour Operator",
    phone: "+94 11 230 6306",
    email: "inquiries@walkerstours.com",
    website: "https://www.walkerstours.com",
    specialties: ["Luxury Tailor-Made", "Cultural Circuits", "Wildlife Expeditions"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
    verified: true,
  },
  {
    id: "2",
    name: "Jetwing Travels",
    regNo: "SLTDA/SQA/TA/00089",
    location: "Colombo 07",
    type: "Eco & Boutique Specialist",
    phone: "+94 11 470 9400",
    email: "travels@jetwing.lk",
    website: "https://www.jetwingtravels.com",
    specialties: ["Sustainable Travel", "Geoffrey Bawa Architecture", "Ayurveda Retreats"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    verified: true,
  },
  {
    id: "3",
    name: "Aitken Spence Travels",
    regNo: "SLTDA/SQA/TA/00021",
    location: "Colombo 03",
    type: "Full-Service Destination DMC",
    phone: "+94 11 230 8308",
    email: "info@aitkenspencetravels.com",
    website: "https://www.aitkenspencetravels.com",
    specialties: ["Highland Rail Packages", "Safari Escapes", "Beach & Surfing Tours"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=600&auto=format&fit=crop",
    verified: true,
  },
  {
    id: "4",
    name: "Ceylon Roots Exploration",
    regNo: "SLTDA/SQA/TA/00318",
    location: "Kandy",
    type: "Highland & Heritage Specialist",
    phone: "+94 81 223 4567",
    email: "contact@ceylonroots.com",
    website: "https://www.ceylonroots.com",
    specialties: ["Knuckles Trekking", "Kandyan Culture", "Tea Estate Bungalows"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=600&auto=format&fit=crop",
    verified: true,
  },
  {
    id: "5",
    name: "Southern Coastal Expeditions & Surf",
    regNo: "SLTDA/SQA/TA/00405",
    location: "Galle Fort",
    type: "Coastal & Adventure DMC",
    phone: "+94 91 224 8890",
    email: "hello@southernceylon.com",
    website: "https://www.southernceylon.com",
    specialties: ["Surfing Lessons", "Blue Whale Watching", "Galle Fort Heritage Walks"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    verified: true,
  },
  {
    id: "6",
    name: "Wild Lanka 4x4 Safaris",
    regNo: "SLTDA/SQA/TA/00512",
    location: "Yala / Tissamaharama",
    type: "Wildlife & Eco Safari Operator",
    phone: "+94 47 223 9988",
    email: "safari@wildlanka.com",
    website: "https://www.wildlanka.com",
    specialties: ["Leopard Tracking", "Minneriya Elephant Gathering", "Birdwatching Expeditions"],
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=600&auto=format&fit=crop",
    verified: true,
  },
];

export default function TravelAgentsPage() {
  const [searchName, setSearchName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const locations = ["All", "Colombo 02", "Colombo 03", "Colombo 07", "Kandy", "Galle Fort", "Yala / Tissamaharama"];
  const types = ["All", "Inbound Tour Operator", "Eco & Boutique Specialist", "Full-Service Destination DMC", "Highland & Heritage Specialist", "Coastal & Adventure DMC", "Wildlife & Eco Safari Operator"];

  const filtered = verifiedAgents.filter((agent) => {
    const matchName = agent.name.toLowerCase().includes(searchName.toLowerCase()) ||
      agent.regNo.toLowerCase().includes(searchName.toLowerCase()) ||
      agent.specialties.some((s) => s.toLowerCase().includes(searchName.toLowerCase()));

    const matchLocation = selectedLocation === "All" || agent.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchType = selectedType === "All" || agent.type === selectedType;

    return matchName && matchLocation && matchType;
  });

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero Banner matching srilanka.travel/travel-agents */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop"
            alt="Travel Agents Banner"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-secondary">
            <ShieldCheck className="w-4 h-4" />
            <span>Registered Travel Agents</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Certified Travel Agents & Specialists
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl leading-relaxed">
            Find registered Sri Lankan travel agents and tour operators with verified licence details, official SLTDA accreditation, deep local knowledge, and direct contact support.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-brandDark/8 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-brandDark">Verified Operators</h3>
              <p className="text-xs text-brandDark/60 mt-1 leading-relaxed">
                Browse SLTDA registered travel businesses with official licence and compliance registration.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-brandDark/8 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-brandDark">Local Knowledge</h3>
              <p className="text-xs text-brandDark/60 mt-1 leading-relaxed">
                Connect with specialist destination guides based across Colombo, Kandy, Galle, and Yala.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-brandDark/8 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-brandDark">Plan With Confidence</h3>
              <p className="text-xs text-brandDark/60 mt-1 leading-relaxed">
                Get custom itinerary planning, transport reservations, and 24/7 on-the-ground support.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Box matching Screenshot 4 */}
        <div className="rounded-3xl bg-white border border-brandDark/10 p-6 sm:p-8 shadow-card space-y-6">
          <h2 className="font-serif font-bold text-xl text-brandDark">
            Search for a Certified Travel Agent
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="space-y-1 lg:col-span-2">
              <label className="text-xs font-semibold text-brandDark/70">Travel Agent Name / Reg No / Specialty</label>
              <div className="relative">
                <Search className="w-4 h-4 text-brandDark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Walkers Tours, SLTDA, Safari..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brandDark/70">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brandDark/70">Registration Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-xs text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Directory Results List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brandDark/60">
              Showing {filtered.length} Verified Agencies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((agent) => (
              <div
                key={agent.id}
                className="rounded-3xl bg-white border border-brandDark/8 overflow-hidden shadow-subtle hover:shadow-cardHover transition-all flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-brandDark/10">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SLTDA Verified</span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-primary font-bold tracking-widest uppercase block">
                      {agent.type}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-brandDark group-hover:text-primary transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-[11px] text-brandDark/50 font-mono">
                      Reg: {agent.regNo}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {agent.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-brandBg text-brandDark/70 text-[10px] font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brandDark/8 space-y-2.5 text-xs text-brandDark/75">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{agent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <a href={`tel:${agent.phone}`} className="hover:text-primary transition-colors">
                        {agent.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <a href={`mailto:${agent.email}`} className="hover:text-primary truncate transition-colors">
                        {agent.email}
                      </a>
                    </div>

                    <div className="pt-3">
                      <a
                        href={agent.website}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                      >
                        <span>Visit Agency Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
