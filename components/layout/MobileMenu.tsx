"use client";

import React from "react";
import Link from "next/link";
import { User } from "@/context/AuthContext";
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  user: User | null;
  logout: () => Promise<void>;
  favoritesCount: number;
  language: string;
  setLanguage: (lang: string) => void;
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
            className="p-2 rounded-full hover:bg-brandDark/10 text-brandDark/70 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
          <p className="text-xs font-semibold text-brandDark/40 uppercase tracking-wider px-3 mb-2">
            Explore Island
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium text-brandDark hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-brandDark/30" />
            </Link>
          ))}

          <div className="pt-4 border-t border-brandDark/10 my-4">
            <p className="text-xs font-semibold text-brandDark/40 uppercase tracking-wider px-3 mb-2">
              My Travel
            </p>
            <Link
              href="/favorites"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium text-brandDark hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-secondary" />
                <span>Saved Destinations</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-brandDark text-xs font-bold">
                {favoritesCount}
              </span>
            </Link>

            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Admin Portal</span>
              </Link>
            )}
          </div>

          {/* Language selector */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-brandDark/40 uppercase tracking-wider px-3 mb-2">
              Language
            </p>
            <div className="grid grid-cols-3 gap-2 px-3">
              {[
                { code: "en", label: "English" },
                { code: "si", label: "සිංහල" },
                { code: "ta", label: "தமிழ்" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition-all ${
                    language === lang.code
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-brandDark/5 border-brandDark/10 text-brandDark hover:bg-brandDark/10"
                  }`}
                >
                  {lang.label}
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
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                Sign In / Register
              </Link>
              <Link
                href="/destinations"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-brandDark/20 text-brandDark text-sm font-semibold hover:bg-brandDark/5 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                Explore Destinations
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
