"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Globe,
  Heart,
  User as UserIcon,
  Menu,
  ChevronDown,
  LogOut,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import CompassLogo from "@/components/ui/CompassLogo";
import { CountryFlag } from "@/components/ui/CountryFlags";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { user, logout, favorites, language, setLanguage, t, languages } = useAuth();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: t("navDestinations", "Destinations"), href: "/destinations" },
    { label: t("navExperiences", "Experiences"), href: "/experiences" },
    { label: t("navPlanTrip", "Plan Your Trip"), href: "/plan-your-trip" },
    { label: t("navEvents", "Events"), href: "/events" },
    { label: t("navStories", "Travel Stories"), href: "/stories" },
    { label: t("navAccommodation", "Accommodation"), href: "/accommodation" },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  // Dynamic appearance: on transparent hero of homepage vs white interior pages
  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-gradient-to-b from-brandDark/90 via-brandDark/50 to-transparent text-white py-4"
            : "bg-white/95 backdrop-blur-md text-brandDark shadow-subtle border-b border-brandDark/8 py-3"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 xl:gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <CompassLogo size="md" isTransparent={isTransparent} />
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap leading-tight ${
                  isTransparent ? "text-white" : "text-brandDark"
                }`}
              >
                Lanka<span className="text-secondary">Explore</span>
              </span>
              <span
                className={`text-[9px] uppercase tracking-widest font-sans font-semibold -mt-0.5 whitespace-nowrap ${
                  isTransparent ? "text-white/80" : "text-primary"
                }`}
              >
                Sri Lanka Tourism
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? isTransparent
                        ? "bg-white/20 text-white shadow-sm"
                        : "bg-primary/10 text-primary"
                      : isTransparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-brandDark/80 hover:text-primary hover:bg-brandDark/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0 flex-nowrap">
            {/* Global Search */}
            <Link
              href="/search"
              aria-label="Search destinations"
              className={`p-2 rounded-full transition-colors shrink-0 ${
                isTransparent
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-brandDark/70 hover:text-primary hover:bg-brandDark/5"
              }`}
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Multilingual Selector matching srilanka.travel Screenshot */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold rounded-lg uppercase transition-all whitespace-nowrap border ${
                  isTransparent
                    ? "text-white border-white/25 hover:bg-white/15"
                    : "text-brandDark border-brandDark/15 hover:bg-brandDark/5"
                }`}
                aria-label="Change language"
              >
                <CountryFlag code={currentLangObj.code} className="w-5 h-3.5" />
                <span className="tracking-wider">{currentLangObj.name}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 max-h-96 overflow-y-auto bg-white rounded-xl shadow-2xl border border-brandDark/10 py-1 text-brandDark z-50 animate-in fade-in zoom-in-95 duration-150 custom-scrollbar"
                >
                  {languages.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-[#0097B2] text-white shadow-sm"
                            : "text-brandDark/85 hover:bg-brandDark/5"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <CountryFlag code={l.code} className="w-5 h-3.5" />
                          <span>{l.name}</span>
                        </div>
                        <span className={`text-[11px] font-normal normal-case ${isSelected ? "text-white/80" : "text-brandDark/50"}`}>
                          {l.nativeName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Favorites count */}
            <Link
              href="/favorites"
              aria-label="Saved favorites"
              className={`relative p-2 rounded-full transition-colors shrink-0 ${
                isTransparent
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-brandDark/70 hover:text-primary hover:bg-brandDark/5"
              }`}
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary text-brandDark text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Account / Login */}
            {user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                    isTransparent
                      ? "border-white/30 bg-white/15 text-white hover:bg-white/25"
                      : "border-brandDark/15 bg-brandDark/5 text-brandDark hover:bg-brandDark/10"
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[80px] xl:max-w-[100px] truncate">{user.name}</span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-card border border-brandDark/10 py-1 text-brandDark z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3 py-2 border-b border-brandDark/10">
                      <p className="text-xs font-semibold text-brandDark truncate">{user.name}</p>
                      <p className="text-[11px] text-brandDark/60 truncate">{user.email}</p>
                    </div>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/favorites"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-brandDark/80 hover:bg-brandDark/5"
                    >
                      <Heart className="w-4 h-4 text-secondary" />
                      Saved Places ({favorites.length})
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("navSignOut", "Sign Out")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border whitespace-nowrap shrink-0 ${
                  isTransparent
                    ? "border-white/40 text-white hover:bg-white hover:text-brandDark"
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {t("navSignIn", "Sign In")}
              </Link>
            )}

            {/* Explore CTA */}
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold tracking-wide uppercase shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>{t("navExplore", "Explore")}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/search"
              aria-label="Search"
              className={`p-2 rounded-full ${
                isTransparent ? "text-white hover:bg-white/10" : "text-brandDark hover:bg-brandDark/5"
              }`}
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-full transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-brandDark hover:bg-brandDark/5"
              }`}
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        user={user}
        logout={logout}
        favoritesCount={favorites.length}
        language={language}
        setLanguage={setLanguage}
        languages={languages}
      />
    </>
  );
}
