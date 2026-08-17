"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  ArrowRight,
  Calendar,
  Users,
  Compass,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Globe,
} from "lucide-react";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

const departureAirports = [
  { code: "LHR", name: "London Heathrow (LHR), United Kingdom" },
  { code: "DXB", name: "Dubai International (DXB), UAE" },
  { code: "SIN", name: "Singapore Changi (SIN), Singapore" },
  { code: "MEL", name: "Melbourne Tullamarine (MEL), Australia" },
  { code: "SYD", name: "Sydney Kingsford Smith (SYD), Australia" },
  { code: "FRA", name: "Frankfurt Airport (FRA), Germany" },
  { code: "CDG", name: "Paris Charles de Gaulle (CDG), France" },
  { code: "DOH", name: "Doha Hamad International (DOH), Qatar" },
  { code: "BOM", name: "Mumbai Chhatrapati Shivaji (BOM), India" },
  { code: "DEL", name: "Delhi Indira Gandhi (DEL), India" },
  { code: "MAA", name: "Chennai International (MAA), India" },
  { code: "NRT", name: "Tokyo Narita (NRT), Japan" },
  { code: "KUL", name: "Kuala Lumpur (KUL), Malaysia" },
  { code: "BKK", name: "Bangkok Suvarnabhumi (BKK), Thailand" },
  { code: "JFK", name: "New York John F. Kennedy (JFK), USA" },
];

const arrivalAirports = [
  { code: "CMB", name: "Colombo Bandaranaike (CMB), Sri Lanka" },
  { code: "HRI", name: "Mattala Rajapaksa (HRI) — Yala & South" },
  { code: "RML", name: "Ratmalana Airport (RML) — Colombo City" },
  { code: "KDZ", name: "Kandy Victoria Reservoir (Water Aerodrome)" },
  { code: "GIU", name: "Sigiriya Air Base (Cultural Triangle)" },
  { code: "DWO", name: "Dickwella / Tangalle (Southern Coast)" },
  { code: "BTC", name: "Bentota River (Water Aerodrome)" },
];

export default function FlightBookingPage() {
  const [tripType, setTripType] = useState<"return" | "oneway">("return");
  const [fromAirport, setFromAirport] = useState("LHR");
  const [toAirport, setToAirport] = useState("CMB");
  const [departDate, setDepartDate] = useState("2026-08-25");
  const [returnDate, setReturnDate] = useState("2026-09-05");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [cabin, setCabin] = useState("Economy");
  const [promoCode, setPromoCode] = useState("");

  const handleBookingRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to official SriLankan Airlines booking engine with prefilled route
    const officialUrl = `https://www.srilankan.com/en-US/special-offers/flight-deals?from=${fromAirport}&to=${toAirport}&depart=${departDate}&return=${returnDate}&adults=${adults}&cabin=${cabin.toLowerCase()}`;
    window.open(officialUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pb-24 space-y-12">
      {/* Page Header Banner matching srilanka.travel/flight-booking */}
      <PageHeaderBanner
        title="Book Flights to Sri Lanka"
        subtitle="Book flights to Sri Lanka with more confidence. Compare international access through SriLankan Airlines, then choose the right domestic operator for faster island connections."
        category="OFFICIAL TRAVEL ACCESS & AIRLINES"
        backgroundImage="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[
          { label: "Plan Your Trip", href: "/plan-your-trip" },
          { label: "Flight Booking" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Interactive Flight Search Engine Box matching Screenshot 1 */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-brandDark/10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brandDark/10">
            <div>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-brandDark">
                Start with your route
              </h2>
              <p className="text-xs sm:text-sm text-brandDark/70 mt-0.5">
                Select your travel basics here, then continue to the airline booking engine.
              </p>
            </div>

            {/* Radio Trip Type */}
            <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-brandBg border border-brandDark/10 text-xs font-bold text-brandDark">
              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-colors has-checked:bg-primary has-checked:text-white">
                <input
                  type="radio"
                  name="tripType"
                  value="return"
                  checked={tripType === "return"}
                  onChange={() => setTripType("return")}
                  className="hidden"
                />
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>Return</span>
              </label>

              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-colors has-checked:bg-primary has-checked:text-white">
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={tripType === "oneway"}
                  onChange={() => setTripType("oneway")}
                  className="hidden"
                />
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>One way</span>
              </label>
            </div>
          </div>

          <form onSubmit={handleBookingRedirect} className="space-y-6">
            {/* Airport Dropdowns and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">From</label>
                <select
                  value={fromAirport}
                  onChange={(e) => setFromAirport(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {departureAirports.map((ap) => (
                    <option key={ap.code} value={ap.code}>
                      {ap.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">To</label>
                <select
                  value={toAirport}
                  onChange={(e) => setToAirport(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {arrivalAirports.map((ap) => (
                    <option key={ap.code} value={ap.code}>
                      {ap.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">Depart</label>
                <div className="relative">
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {tripType === "return" && (
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">Return</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Passengers & Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">Adults</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">Children</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Child{n !== 1 ? "ren" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">Cabin Class</label>
                <select
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  <option value="Economy">Economy Class</option>
                  <option value="Business">Business Class</option>
                  <option value="First">First Class</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-brandDark/70">Promo Code</label>
                <input
                  type="text"
                  placeholder="Optional code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-brandBg border border-brandDark/12 text-xs font-semibold text-brandDark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Bottom Disclaimer & Orange Action Button matching Screenshot 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-brandDark/10">
              <p className="text-xs text-brandDark/60 max-w-lg leading-relaxed">
                The final fare, route availability, baggage rules, and payment are handled by the airline or domestic operator you choose.
              </p>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#EB5A28] hover:bg-[#D94C1B] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>Continue to SriLankan Airlines</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Content Layout with Main Info and Right Sidebar matching Screenshots */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            {/* International Flights Info */}
            <div className="p-8 rounded-3xl bg-white border border-brandDark/10 shadow-subtle space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                  Global Gateways
                </span>
                <h3 className="font-serif font-bold text-2xl text-brandDark">
                  International Flights to Colombo (CMB)
                </h3>
                <p className="text-xs sm:text-sm text-brandDark/70 leading-relaxed">
                  Sri Lanka Tourism highlights airline options for travelers planning their arrival into Colombo Bandaranaike International Airport (CMB) and onward journeys around the island.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-brandBg border border-brandDark/8 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Plane className="w-4 h-4" />
                    <span>SriLankan Airlines (National Carrier)</span>
                  </div>
                  <p className="text-xs text-brandDark/70 leading-relaxed">
                    Direct non-stop flights from London Heathrow, Melbourne, Sydney, Frankfurt, Paris, Dubai, Singapore, Tokyo, and all major Indian cities.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-brandBg border border-brandDark/8 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Globe className="w-4 h-4" />
                    <span>Global Airline Alliances</span>
                  </div>
                  <p className="text-xs text-brandDark/70 leading-relaxed">
                    Connecting flights via Qatar Airways, Emirates, Etihad, Singapore Airlines, Turkish Airlines, and Air India with seamless connections.
                  </p>
                </div>
              </div>
            </div>

            {/* Domestic Air Taxi & Scenic Sea-Plane Flights */}
            <div className="p-8 rounded-3xl bg-white border border-brandDark/10 shadow-subtle space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                  Fast Island Connections
                </span>
                <h3 className="font-serif font-bold text-2xl text-brandDark">
                  Domestic Air Taxi & Water Aerodromes
                </h3>
                <p className="text-xs sm:text-sm text-brandDark/70 leading-relaxed">
                  Save hours of road transit by taking a scheduled or chartered amphibian sea-plane flight to scenic lakes and lagoons.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-brandBg border border-brandDark/8 text-center space-y-1">
                  <span className="font-serif font-bold text-sm text-brandDark block">Kandy Victoria Lake</span>
                  <span className="text-[11px] text-primary font-semibold">25 Mins from Colombo</span>
                </div>
                <div className="p-4 rounded-2xl bg-brandBg border border-brandDark/8 text-center space-y-1">
                  <span className="font-serif font-bold text-sm text-brandDark block">Castlereagh (Hatton)</span>
                  <span className="text-[11px] text-primary font-semibold">30 Mins to Tea Country</span>
                </div>
                <div className="p-4 rounded-2xl bg-brandBg border border-brandDark/8 text-center space-y-1">
                  <span className="font-serif font-bold text-sm text-brandDark block">Dickwella / Tangalle</span>
                  <span className="text-[11px] text-primary font-semibold">40 Mins to South Coast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar "PLAN YOUR VISIT" */}
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
                  { label: "Flight Booking Engine", href: "/flight-booking", active: true },
                  { label: "Suggested Itineraries", href: "/itineraries" },
                  { label: "Online Services & Visa ETA", href: "https://www.immigration.gov.lk/", isExternal: true },
                  { label: "Certified Travel Agents", href: "/travel-agents" },
                  { label: "Accommodation & Resorts", href: "/accommodation" },
                  { label: "Camping Sites & Glamping", href: "/camping-sites" },
                  { label: "Transit & Blue Train Guide", href: "/plan-your-trip#transport" },
                  { label: "Experiences & Activities", href: "/experiences" },
                  { label: "Upcoming Events & Festivals", href: "/events" },
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
