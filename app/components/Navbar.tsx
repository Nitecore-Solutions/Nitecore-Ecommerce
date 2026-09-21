"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Search, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { label: "Phone", href: "#phone" },
  { label: "Laptop", href: "#laptop" },
  { label: "Airboard", href: "#airboard" },
  { label: "Speaker", href: "#speaker" },
  { label: "Light", href: "#light" },
  { label: "Digital Board", href: "#digital-board" },
  { label: "Tripod", href: "#tripod" },
  { label: "Camera", href: "#camera" },
  { label: "Mic", href: "#mic" },
  { label: "OPS", href: "#ops" },
  { label: "Monitor", href: "#monitor" },
  { label: "Acoustic", href: "#acoustic" },
  { label: "Podium", href: "#podium" },
  { label: "Accessories", href: "#accessories" },
  { label: "Tablet / iPad", href: "#tablet" },
];

const DEVICE_SUB = ["Phone", "Laptop", "Airboard", "Tablet / iPad"];
const MAIN_ITEMS = CATEGORIES.filter((c) => !DEVICE_SUB.includes(c.label));

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [allOpen, setAllOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  function openDropdown() {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom, left: r.left });
    }
    setAllOpen(true);
  }

  // Reposition on scroll (navbar is sticky so button moves with it)
  useEffect(() => {
    if (!allOpen) return;
    const reposition = () => {
      if (btnRef.current) {
        const r = btnRef.current.getBoundingClientRect();
        setPos({ top: r.bottom, left: r.left });
      }
    };
    window.addEventListener("scroll", reposition, { passive: true });
    return () => window.removeEventListener("scroll", reposition);
  }, [allOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        {/* ── Row 1 ── */}
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white font-extrabold text-lg">C</div>
            <span className="text-xl font-extrabold tracking-tight text-teal-500">CREATORS</span>
          </Link>

          <div className="flex flex-1 items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2 gap-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for mobiles, accessories & More"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-teal-500 transition-colors" aria-label="Wishlist">
              <Heart className="h-6 w-6" />
            </button>
            <button className="relative text-gray-500 hover:text-teal-500 transition-colors" aria-label="Cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">0</span>
            </button>
            <button className="rounded-full border-2 border-gray-900 bg-white px-5 py-1.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
              Login
            </button>
          </div>
        </div>

        {/* ── Row 2: Category Bar ── */}
        <div className="border-t border-gray-200 bg-white overflow-x-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center whitespace-nowrap">

              {/* ALL button */}
              <button
                ref={btnRef}
                onMouseEnter={openDropdown}
                onMouseLeave={() => setAllOpen(false)}
                className="inline-flex items-center gap-0.5 px-3 py-3 text-sm font-bold text-gray-800 hover:text-teal-600 transition-colors border-b-2 border-transparent hover:border-teal-500"
              >
                All
                <ChevronDown className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 ${allOpen ? "rotate-180" : ""}`} />
              </button>

              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="inline-flex items-center gap-0.5 px-3 py-3 text-sm font-bold text-gray-800 hover:text-teal-600 transition-colors border-b-2 border-transparent hover:border-teal-500"
                >
                  {cat.label}
                  <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Dropdown: fixed to viewport, positioned below the All button ── */}
      {allOpen && (
        <div
          className="fixed z-[9999] w-80 rounded-xl border border-gray-200 bg-white shadow-2xl overflow-y-auto"
          style={{ top: pos.top, left: pos.left, maxHeight: `calc(100vh - ${pos.top}px - 16px)` }}
          onMouseEnter={() => setAllOpen(true)}
          onMouseLeave={() => setAllOpen(false)}
        >
          {/* Devices section — teal */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Devices</p>
            <div className="grid grid-cols-2 gap-x-4">
              {DEVICE_SUB.map((label) => {
                const cat = CATEGORIES.find((c) => c.label === label)!;
                return (
                  <Link key={label} href={cat.href} className="flex items-center justify-between py-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors">
                    {label}
                    <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-100 mx-4" />

          {/* All other categories — bold */}
          <div className="px-5 py-2 pb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 mt-1">All Categories</p>
            {MAIN_ITEMS.map((cat) => (
              <Link key={cat.label} href={cat.href} className="flex items-center justify-between py-2 text-sm font-bold text-gray-800 hover:text-teal-600 transition-colors">
                {cat.label}
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
