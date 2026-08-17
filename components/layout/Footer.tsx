"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import CompassLogo from "@/components/ui/CompassLogo";

export default function Footer() {
  return (
    <footer className="relative bg-[#541217] text-[#F3E5D8] overflow-hidden border-t-2 border-[#D4AF37]/40 shadow-2xl">
      {/* Top Traditional Floral Border Strip matching Mockup */}
      <div className="relative w-full h-5 sm:h-7 overflow-hidden opacity-90 border-b border-[#D4AF37]/30">
        <Image
          src="/images/footer/footer-border-strip.jpg"
          alt="Traditional Ceylon Floral Ribbon"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 space-y-10">
        {/* Main Grid: Brand + 7 Columns matching Mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 sm:gap-6">
          {/* Col 1: Brand & Socials */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2 space-y-5 pr-2">
            <Link href="/" className="inline-block group space-y-2">
              <div className="flex items-center gap-3">
                <CompassLogo size="md" />
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white block">
                    Lanka<span className="text-[#E5A93C]">Explore</span>
                  </span>
                  <span className="text-[11px] font-medium tracking-wider text-[#E2C9B6] block">
                    One Island. Endless Experiences.
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs text-[#E2C9B6]/80 leading-relaxed max-w-xs">
              Explore breathtaking landscapes, rich culture, ancient heritage and warm hospitality across the pearl of the Indian Ocean.
            </p>

            {/* Circular Social Buttons matching Mockup */}
            <div className="flex items-center space-x-3 pt-1 text-[#E2C9B6]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#541217] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#541217] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#541217] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#541217] transition-colors font-bold text-xs"
              >
                <span>♪</span>
              </a>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5C77E] tracking-wide">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C9B6]">
              <li><Link href="/destinations?category=Beaches" className="hover:text-white transition-colors">Beaches</Link></li>
              <li><Link href="/destinations?category=Wildlife" className="hover:text-white transition-colors">Wildlife</Link></li>
              <li><Link href="/destinations?category=Mountains" className="hover:text-white transition-colors">Mountains</Link></li>
              <li><Link href="/destinations?category=Heritage" className="hover:text-white transition-colors">Heritage</Link></li>
              <li><Link href="/destinations?category=Cities" className="hover:text-white transition-colors">Cities</Link></li>
              <li><Link href="/destinations?category=Nature" className="hover:text-white transition-colors">Nature</Link></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5C77E] tracking-wide">
              Experiences
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C9B6]">
              <li><Link href="/experiences?category=Adventure" className="hover:text-white transition-colors">Adventure</Link></li>
              <li><Link href="/experiences?category=Culture" className="hover:text-white transition-colors">Culture</Link></li>
              <li><Link href="/experiences?category=Wildlife" className="hover:text-white transition-colors">Wildlife Safari</Link></li>
              <li><Link href="/experiences?category=Hiking" className="hover:text-white transition-colors">Hiking</Link></li>
              <li><Link href="/experiences?category=Wellness" className="hover:text-white transition-colors">Wellness</Link></li>
              <li><Link href="/experiences?category=Culinary" className="hover:text-white transition-colors">Food & Cuisine</Link></li>
            </ul>
          </div>

          {/* Col 4: Plan Your Trip */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5C77E] tracking-wide">
              Plan Your Trip
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C9B6]">
              <li><Link href="/itineraries" className="hover:text-white transition-colors">Itineraries</Link></li>
              <li><Link href="/plan-your-trip" className="hover:text-white transition-colors">Travel Guide</Link></li>
              <li><Link href="/plan-your-trip#transport" className="hover:text-white transition-colors">Transport</Link></li>
              <li><Link href="/plan-your-trip#weather" className="hover:text-white transition-colors">Weather</Link></li>
              <li><a href="https://www.immigration.gov.lk/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Visa Information</a></li>
              <li><Link href="/flight-booking" className="hover:text-white transition-colors">Book Flights</Link></li>
            </ul>
          </div>

          {/* Col 5: Events */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5C77E] tracking-wide">
              Events
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C9B6]">
              <li><Link href="/events" className="hover:text-white transition-colors">Festivals</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Cultural Events</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Religious Events</Link></li>
              <li><Link href="/travel-news" className="hover:text-white transition-colors">Tourism News</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Music & Arts</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Sports Events</Link></li>
            </ul>
          </div>

          {/* Col 6: Travel Stories */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5C77E] tracking-wide">
              Travel Stories
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C9B6]">
              <li><Link href="/stories" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/stories" className="hover:text-white transition-colors">Traveller Stories</Link></li>
              <li><Link href="/stories" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/camping-sites" className="hover:text-white transition-colors">Camping Sites</Link></li>
              <li><Link href="/travel-agents" className="hover:text-white transition-colors">Travel Agents</Link></li>
            </ul>
          </div>

          {/* Col 7: About Us */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5C77E] tracking-wide">
              About Us
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C9B6]">
              <li><Link href="/about" className="hover:text-white transition-colors">About Sri Lanka</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Why Visit</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/blacklisted-service-providers" className="hover:text-white transition-colors text-amber-300">Consumer Notice</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Col 8: Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5C77E] tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C9B6]">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Support & Help</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Feedback</Link></li>
              <li><a href="tel:1912" className="text-[#E5A93C] font-bold hover:underline">Hotline: 1912</a></li>
            </ul>
          </div>
        </div>

        {/* Traditional Perahera Procession Graphic matching Mockup */}
        <div className="relative w-full h-32 sm:h-44 md:h-52 overflow-hidden rounded-2xl border border-[#D4AF37]/30 shadow-2xl bg-[#450e12]">
          <Image
            src="/images/footer/footer-procession.jpg"
            alt="Traditional Sri Lanka Sacred Perahera Procession with Tusker Elephant, Drummers and Sesath"
            fill
            className="object-cover object-center"
            priority={false}
          />
          {/* Subtle edge vignetting to blend seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#541217] via-transparent to-[#541217] opacity-60 pointer-events-none" />
        </div>

        {/* Bottom Traditional Floral Border Strip matching Mockup */}
        <div className="relative w-full h-4 sm:h-6 overflow-hidden opacity-90 border-t border-b border-[#D4AF37]/30">
          <Image
            src="/images/footer/footer-border-strip.jpg"
            alt="Traditional Ceylon Floral Ribbon"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Copyright & Legal Links matching Mockup */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2C9B6]/90 font-serif pt-1">
          <p>© 2026 LankaExplore. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[#E2C9B6]/85">
            <Link href="/plan-your-trip" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/plan-your-trip" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
