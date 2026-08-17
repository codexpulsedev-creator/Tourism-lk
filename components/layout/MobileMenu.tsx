"use client";

import React from "react";
import Link from "next/link";
import { User } from "@/context/AuthContext";
import { LanguageOption } from "@/lib/translations";
import {
  Heart,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Globe,
  Sparkles,
  MapPin,
  X,
  ChevronRight,
} from "lucide-react";
import CompassLogo from "@/components/ui/CompassLogo";
import { CountryFlag } from "@/components/ui/CountryFlags";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  user: User | null;
  logout: () => Promise<void>;
  favoritesCount: number;
  language: string;
  setLanguage: (lang: string) => void;
  languages?: LanguageOption[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  user,
  logout,
  favoritesCount,
  language,
  setLanguage,
  languages = [],
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brandDark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-brandDark/10 bg-brandBg">
          <div className="flex items-center gap-2.5">
            <CompassLogo size="sm" />
            <span className="font-serif text-lg font-bold text-brandDark">
              Lanka<span className="text-secondary">Explore</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-brandDark/5 text-brandDark/70"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 rounded-xl font-serif text-base font-semibold text-brandDark hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-brandDark/30" />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-brandDark/10 space-y-1">
            <Link
              href="/favorites"
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-brandDark/80 hover:bg-brandDark/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-secondary" />
                <span>Saved Favorites</span>
              </div>
              {favoritesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-secondary text-brandDark text-xs font-bold">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Admin Portal</span>
              </Link>
            )}
          </div>

          {/* Multilingual Selector in Mobile Menu */}
          <div className="pt-3 border-t border-brandDark/10">
            <div className="flex items-center gap-2 px-2 mb-3">
              <Globe className="w-4 h-4 text-primary" />
              <p className="text-xs font-bold text-brandDark/70 uppercase tracking-wider">
                Select Language ({languages.length})
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 px-1 max-h-48 overflow-y-auto p-1 border border-brandDark/10 rounded-2xl bg-brandBg/50 custom-scrollbar">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`py-2 px-2.5 text-xs rounded-xl font-bold uppercase tracking-wider text-left flex items-center justify-between transition-all ${
                    language === l.code
                      ? "bg-[#0097B2] text-white shadow-sm"
                      : "bg-white border border-brandDark/10 text-brandDark/80 hover:bg-brandDark/5"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <CountryFlag code={l.code} className="w-4 h-3" />
                    <span className="truncate">{l.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-brandDark/10 bg-brandBg">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brandDark truncate">{user.name}</p>
                  <p className="text-xs text-brandDark/60 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-primary text-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/destinations"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Explore Destinations</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
