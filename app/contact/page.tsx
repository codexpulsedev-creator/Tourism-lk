"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from "lucide-react";

function ContactForm() {
  const searchParams = useSearchParams();
  const stayQuery = searchParams.get("stay");
  const expQuery = searchParams.get("experience");
  const itinQuery = searchParams.get("itinerary");

  const initialSubject = stayQuery
    ? `Booking Inquiry: ${stayQuery}`
    : expQuery
    ? `Experience Inquiry: ${expQuery}`
    : itinQuery
    ? `Custom Itinerary: ${itinQuery}`
    : "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setResponseMsg(data.message);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Failed to send message.");
      }
    } catch (err) {
      setStatus("error");
      setResponseMsg("Connection error. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Contact Form (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brandDark">
          Send Us a Message
        </h2>

        {status === "success" && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Ayubowan!</h4>
              <p>{responseMsg}</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{responseMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brandDark/70 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Elena Rostova"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-sm text-brandDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brandDark/70 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-sm text-brandDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brandDark/70 uppercase tracking-wider mb-1">
              Subject
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Train ticket reservation assistance"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-sm text-brandDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brandDark/70 uppercase tracking-wider mb-1">
              Message / Inquiries
            </label>
            <textarea
              required
              rows={5}
              placeholder="Tell us about your travel dates, party size, destinations of interest, or questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-sm text-brandDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{status === "loading" ? "Sending Message..." : "Submit Message"}</span>
          </button>
        </form>
      </div>

      {/* Info Sidebar (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-3xl bg-brandDark text-white p-8 shadow-card border border-white/10 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-white border-b border-white/10 pb-4">
            Tourist Information Office
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                  24/7 Official Hotline
                </span>
                <span className="font-bold text-white text-base">1912 (Tourist Police)</span>
                <span className="block text-gray-300 mt-0.5">+94 11 242 6900</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                  Inquiry Email
                </span>
                <span className="font-semibold text-white text-sm">info@lankaexplore.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                  Headquarters
                </span>
                <span className="font-semibold text-white text-sm">
                  80 Galle Road, Colombo 03, Sri Lanka
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                  Support Hours
                </span>
                <span className="font-semibold text-white text-sm">
                  Monday — Sunday (8:30 AM – 6:00 PM IST)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-primary/10 border border-primary/20 p-6 flex items-start gap-3 text-xs text-primary-900">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-primary mb-1">Official Travel Guarantee</h4>
            <p className="leading-relaxed">
              LankaExplore partners exclusively with certified local tour guides, safe registered transport fleets, and SLTDA-accredited accommodation providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Contact & Travel Inquiries
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          Have questions regarding visa requirements, custom itinerary planning, train journeys, or safari bookings? Our Ceylon travel team is here to assist.
        </p>
      </div>

      <Suspense fallback={<div>Loading contact form...</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
