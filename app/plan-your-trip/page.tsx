import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Train,
  CloudSun,
  FileCheck2,
  HelpCircle,
  Compass,
  ArrowRight,
  ShieldCheck,
  Phone,
  Banknote,
  Wifi,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Plan Your Trip to Sri Lanka — Complete Travel Guide | LankaExplore",
  description:
    "Essential Sri Lanka travel guide: electronic visa (ETA), scenic trains, seasonal weather and dual monsoon advice, local transport, and tips.",
};

export default function PlanYourTripPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Travel Essentials
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Plan Your Sri Lanka Journey
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          Everything you need for a safe, seamless, and deeply enriching holiday across the teardrop island of Sri Lanka.
        </p>
      </div>

      {/* Grid of Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 1. Visa */}
        <div id="visa" className="rounded-3xl bg-white border border-brandDark/8 p-8 shadow-subtle flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brandDark">
              Visa & Entry Requirements
            </h3>
            <p className="text-sm text-brandDark/70 leading-relaxed">
              Foreign passport holders entering Sri Lanka for tourism require an approved Electronic Travel Authorization (ETA) valid for 30 days. Passports must have at least 6 months of validity from arrival date.
            </p>
            <ul className="text-xs text-brandDark/80 space-y-2 pt-2 border-t border-brandDark/5">
              <li className="flex items-center gap-2">✓ Apply online prior to departure</li>
              <li className="flex items-center gap-2">✓ 30-day double entry standard tourist visa</li>
              <li className="flex items-center gap-2">✓ Extendable up to 270 days in Colombo</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-brandDark/8">
            <Link
              href="/contact"
              className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1"
            >
              <span>Visa Questions? Ask Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2. Weather & Monsoons */}
        <div id="weather" className="rounded-3xl bg-white border border-brandDark/8 p-8 shadow-subtle flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
              <CloudSun className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brandDark">
              Climate & Dual Monsoons
            </h3>
            <p className="text-sm text-brandDark/70 leading-relaxed">
              Sri Lanka is a year-round destination because its two monsoons strike opposite sides of the island at different times of the year!
            </p>
            <div className="text-xs text-brandDark/80 space-y-2.5 pt-2 border-t border-brandDark/5">
              <p>
                <strong>South & West Coasts (Galle, Mirissa, Colombo):</strong> Best from December to April.
              </p>
              <p>
                <strong>East Coast (Arugam Bay, Trincomalee):</strong> Best from May to September.
              </p>
              <p>
                <strong>Central Highlands (Ella, Kandy):</strong> Crisp and pleasant year-round.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-brandDark/8">
            <Link
              href="/destinations"
              className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1"
            >
              <span>Explore by Season</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3. Transport & Trains */}
        <div id="transport" className="rounded-3xl bg-white border border-brandDark/8 p-8 shadow-subtle flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brandDark">
              Island Transport & Rail
            </h3>
            <p className="text-sm text-brandDark/70 leading-relaxed">
              The Sri Lanka railway network is one of the world's most scenic. Private chauffeur-driven tourist cars or vans are also very popular and affordable.
            </p>
            <ul className="text-xs text-brandDark/80 space-y-2 pt-2 border-t border-brandDark/5">
              <li className="flex items-center gap-2">✓ Reserve Main Line train tickets 30 days ahead</li>
              <li className="flex items-center gap-2">✓ PickMe & Uber operate in Colombo, Kandy, Galle</li>
              <li className="flex items-center gap-2">✓ Agree on Tuk-tuk meter before starting rides</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-brandDark/8">
            <Link
              href="/itineraries"
              className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1"
            >
              <span>View Route Itineraries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Practical Travel Tips & Etiquette */}
      <div className="rounded-3xl bg-brandDark text-white p-8 sm:p-12 shadow-card border border-white/10 space-y-8">
        <div className="max-w-2xl">
          <span className="text-secondary text-xs uppercase tracking-widest font-semibold block mb-2">
            Local Culture & Insights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Practical Advice & Etiquette
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-gray-300">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-secondary font-bold text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Temple Etiquette
            </div>
            <p className="leading-relaxed">
              Cover shoulders and knees when visiting sacred temples. Remove hats and shoes before stepping onto temple grounds. Never pose with your back turned to a Buddha statue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-secondary font-bold text-sm flex items-center gap-1.5">
              <Banknote className="w-4 h-4" /> Currency & Cash
            </div>
            <p className="leading-relaxed">
              The currency is the Sri Lankan Rupee (LKR). Credit cards are widely accepted in hotels and restaurants, but always keep small cash for fruit stalls, tea shops, and tuk-tuks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-secondary font-bold text-sm flex items-center gap-1.5">
              <Wifi className="w-4 h-4" /> SIM Cards & Connectivity
            </div>
            <p className="leading-relaxed">
              Tourist SIM cards (Dialog, Mobitel) with high-speed 4G data packages can be purchased at the airport arrivals terminal for around $10 USD.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-secondary font-bold text-sm flex items-center gap-1.5">
              <Phone className="w-4 h-4" /> Tourist Police Hotline
            </div>
            <p className="leading-relaxed">
              Dial <strong>1912</strong> anywhere in Sri Lanka for 24/7 official tourist police emergency support in English, French, German, and Chinese.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
