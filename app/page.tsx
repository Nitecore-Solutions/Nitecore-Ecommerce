// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   ICON COMPONENTS
═══════════════════════════════════════════════════════════════ */
const SearchIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const UserIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const ChevronLeft = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const ChevronRight = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
const ArrowRight = () => <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const StarIcon = () => <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const CheckIcon = () => <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const MailIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const MinusIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>;
const PlusIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const ChevronDown = ({ open }: { open?: boolean }) => <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;

/* ═══════════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════════════════════════ */
function SectionLabel({ children, color = "indigo" }: { children: React.ReactNode; color?: "indigo" | "amber" | "rose" | "teal" | "emerald" }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${colors[color]}`}>
      {children}
    </span>
  );
}

function PrimaryButton({ children, href = "#", variant = "indigo", className = "" }: { children: React.ReactNode; href?: string; variant?: "indigo" | "amber" | "outline" | "white"; className?: string }) {
  const variants = {
    indigo: "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-500/30",
    amber: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/30",
    outline: "bg-white text-indigo-700 border-2 border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50",
    white: "bg-white text-indigo-700 hover:bg-slate-50 shadow-lg",
  };
  return (
    <Link href={href} className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR
═══════════════════════════════════════════════════════════════ */
function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white py-2.5 px-4 text-center text-sm font-semibold relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      <p className="relative z-10">
         NOW GET ALL DIGITAL BOARDS ON EASY EMI — UPGRADE YOUR TEACHING WITHOUT THE UPFRONT COST! 
        <Link href="#" className="ml-2 underline font-bold hover:no-underline">SHOP NOW →</Link>
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const links = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products", hasDropdown: true },
    { name: "About Us", href: "/about" },
    { name: "Our Experience Center", href: "/experience" },
    { name: "EMI", href: "/emi" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/30">S</div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 leading-none tracking-tight">Smart Infovision</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em]">A Name of Trust</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white outline-none transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center text-white hover:from-indigo-700 hover:to-indigo-800 transition-all">
                  <SearchIcon />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link href="#" className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
                <UserIcon /> <span className="hidden md:inline">My Account</span>
              </Link>
              <Link href="#" className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
                <CartIcon />
                <span className="hidden md:inline">Cart</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-700">
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:block border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 py-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors relative group ${
                  link.name === "Home" ? "text-indigo-600 bg-indigo-50" : "text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown />}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 py-4 space-y-2">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-indigo-500 outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <SearchIcon />
              </button>
            </div>
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY ICONS ROW
═══════════════════════════════════════════════════════════════ */
function CategoryIcons() {
  const categories = [
    { name: "Digital Board", icon: "" },
    { name: "Camera", icon: "📷" },
    { name: "Mic", icon: "🎙️" },
    { name: "OPS", icon: "" },
    { name: "Lighting", icon: "💡" },
    { name: "Monitors", icon: "🖥️" },
    { name: "Studio Setup", icon: "🎬" },
    { name: "Acoustic", icon: "🔊" },
    { name: "Accessories", icon: "" },
    { name: "Podium", icon: "🎤" },
  ];

  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href="#" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-100 flex items-center justify-center text-2xl group-hover:border-indigo-300 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                {cat.icon}
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO BANNER
═══════════════════════════════════════════════════════════════ */
function HeroBanner() {
  return (
    <section className="py-8 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.2),transparent_50%)]"></div>
          
          <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
            <div className="text-white space-y-6">
              <SectionLabel color="amber">Studio Setup</SectionLabel>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                GET YOUR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">OWN STUDIO</span><br />
                WITH US
              </h1>
              <p className="text-lg text-indigo-100 max-w-md">
                Complete professional studio setup solutions for educators, creators, and businesses. From concept to installation.
              </p>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href="#" variant="amber">Shop Studio Setup <ArrowRight /></PrimaryButton>
                <PrimaryButton href="#" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">View Packages</PrimaryButton>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&h=500&fit=crop"
                alt="Studio Setup"
                width={700}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-xl animate-float">
                <p className="text-xs font-bold text-slate-900">4K Quality</p>
                <p className="text-[10px] text-slate-500">Professional Grade</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-xl animate-float-delayed">
                <p className="text-xs font-bold text-emerald-600">Free Installation</p>
                <p className="text-[10px] text-slate-500">Pan India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   BRAND CAROUSEL
═══════════════════════════════════════════════════════════════ */
function BrandCarousel() {
  const brands = [
    { name: "LG", color: "bg-red-500" },
    { name: "MAXHUB", color: "bg-slate-900" },
    { name: "ffine", color: "bg-rose-500" },
    { name: "RØDE", color: "bg-amber-700" },
    { name: "SAMSUNG", color: "bg-blue-600" },
    { name: "SHURE", color: "bg-emerald-500" },
    { name: "ViewSonic", color: "bg-pink-500" },
    { name: "LOGIC", color: "bg-slate-800" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Shop by Brand</h2>
          <p className="text-sm text-slate-500 mt-2">Trusted brands, premium quality</p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Link key={brand.name} href="#" className="group">
              <div className={`${brand.color} rounded-2xl p-4 md:p-6 flex items-center justify-center h-20 md:h-24 shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300`}>
                <span className="text-white font-black text-sm md:text-base">{brand.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIGITAL SIGNAGE BANNER
═══════════════════════════════════════════════════════════════ */
function DigitalSignageBanner() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-8 lg:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                DIGITAL SIGNAGE<br />DISPLAYS
              </h2>
              <p className="text-lg text-purple-100">The unique solution to convey your marketing</p>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  { value: "400 NITS", label: "Brightness" },
                  { value: "BUILT-IN", label: "Player" },
                  { value: "1080P HD", label: "Display" },
                  { value: "GRADE A+", label: "Panel" },
                ].map((feat) => (
                  <div key={feat.value} className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
                    <p className="text-lg font-black">{feat.value}</p>
                    <p className="text-xs text-purple-200">{feat.label}</p>
                  </div>
                ))}
              </div>
              <PrimaryButton href="#" variant="amber" className="mt-4">Explore Signage <ArrowRight /></PrimaryButton>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="Digital Signage"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIGMA AI-A7 PRO BANNER
═══════════════════════════════════════════════════════════════ */
function SigmaBanner() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-700 to-indigo-800 p-8 lg:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.15),transparent_50%)]"></div>
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4">
              <SectionLabel color="amber">India's #1</SectionLabel>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                Interactive Flat Panel<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Sigma AI-A7 Pro</span>
              </h2>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  "Android 14 OS",
                  "4K UHD Display",
                  "20-Point Touch",
                  "Built-in Speakers",
                  "WiFi & Bluetooth",
                  "OPS Slot Ready",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-sm">
                    <CheckIcon />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <PrimaryButton href="#" variant="amber" className="mt-4">View Details <ArrowRight /></PrimaryButton>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop"
                alt="Sigma AI-A7 Pro"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   POPULAR MICROPHONES
═══════════════════════════════════════════════════════════════ */
function PopularMicrophones() {
  const products = [
    { name: "Benchmark Microphone", brand: "Benchmark", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=300&fit=crop" },
    { name: "BMT POD X2 TWS", brand: "Benchmark", img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=300&h=300&fit=crop" },
    { name: "AIR GO II", brand: "Benchmark", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionLabel color="indigo">Popular</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">Popular Microphones</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div key={i} className="group bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200 p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white mb-4 border border-slate-100">
                <Image src={product.img} alt={product.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">{product.brand}</p>
              <h3 className="text-lg font-bold text-slate-900 mb-4">{product.name}</h3>
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all">
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SALE ON STUDIO SETUP (COUNTDOWN)
═══════════════════════════════════════════════════════════════ */
function SaleStudioSetup() {
  const [timeLeft, setTimeLeft] = useState({ days: 21, hours: 13, mins: 44, secs: 17 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) secs--;
        else if (mins > 0) { mins--; secs = 59; }
        else if (hours > 0) { hours--; mins = 59; secs = 59; }
        else if (days > 0) { days--; hours = 23; mins = 59; secs = 59; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const packages = [
    { name: "Virtual Class Studio Setup", desc: "Best Tools and Equipment for Online Teaching", price: "350,000", originalPrice: "₹400,000", img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop" },
    { name: "Green Chroma Studio Setup", desc: "Professional Video Production and Virtual Background Solution", price: "₹425,000", originalPrice: "₹450,000", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop" },
    { name: "Pentab Studio Setup", desc: "Pentab Studio Setup: Enhance Teaching and Creative Presentation", price: "₹375,000", originalPrice: "₹400,000", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop" },
    { name: "Conference Studio Setup", desc: "Conference Studio Setup: Redefine Your Meetings", price: "₹550,000", originalPrice: "₹600,000", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.2),transparent_50%)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <SectionLabel color="rose">Limited Offer</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-white">Sale on Studio Setup Package</h2>
          </div>
          <div className="flex items-center gap-3">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.mins, label: "Mins" },
              { value: timeLeft.secs, label: "Sec" },
            ].map((t) => (
              <div key={t.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3 text-center min-w-[70px]">
                <p className="text-2xl font-black text-amber-400">{String(t.value).padStart(2, '0')}</p>
                <p className="text-[10px] text-slate-300 uppercase">{t.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={pkg.img} alt={pkg.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full">SALE</span>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">SMART INFOVISION</p>
                <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{pkg.name}</h3>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{pkg.desc}</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-black text-indigo-600">{pkg.price}</span>
                  <span className="text-xs text-slate-400 line-through">{pkg.originalPrice}</span>
                </div>
                <Link href="#" className="block w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-bold rounded-xl text-center transition-all">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHOWROOM BANNER
═══════════════════════════════════════════════════════════════ */
function ShowroomBanner() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center text-white font-black text-xl">S</div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Smart Infovision</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">A Name of Trust</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white px-6 py-3 rounded-xl inline-block">
                <h2 className="text-2xl md:text-3xl font-black">SHOWROOM</h2>
              </div>
              <p className="text-lg text-slate-700 font-semibold">
                DIGITAL BOARD और STUDIO SETUP का सारा सामान यहाँ मिलता है
              </p>
              <div className="bg-white rounded-xl p-4 border-2 border-indigo-200">
                <p className="text-sm text-slate-600 mb-1">CALL FOR DEMO:</p>
                <p className="text-2xl font-black text-indigo-600">8527926648</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["NOIDA", "PATNA", "BHAGALPUR", "LUCKNOW", "PUNE", "AHMEDABAD", "BHOPAL", "JAIPUR", "VIJAYAWADA", "JAMSHEDPUR", "KOLKATA"].map((city) => (
                  <span key={city} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700">{city}</span>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&h=500&fit=crop"
                alt="Smart Infovision Showroom"
                width={700}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED COLLECTION
═══════════════════════════════════════════════════════════════ */
function FeaturedCollection() {
  const products = [
    { name: "Benchmark Classic Interactive Flat Panel", brand: "Benchmark", price: "₹120,000", originalPrice: "₹135,000", sizes: ["75 inch", "86 inch", "65 inch"], img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop" },
    { name: "MAXHUB U3 Interactive Flat Panel", brand: "MAXHUB", price: "₹155,000", originalPrice: "200,000", sizes: ["65 inch", "75 inch", "86 inch"], img: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400&h=300&fit=crop" },
    { name: "Newline S Pro Interactive Flat Panel", brand: "Newline", price: "₹85,000", originalPrice: "₹105,000", sizes: ["65 inch", "75 inch", "86 inch"], img: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&h=300&fit=crop" },
    { name: "Benchmark Technomate Millenium", brand: "Benchmark", price: "₹240,000", originalPrice: "", sizes: ["65 inch", "75 inch", "86 inch"], img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <SectionLabel color="indigo">Featured</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">Featured Collection</h2>
          </div>
          <Link href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center">See More <ArrowRight /></Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                <Image src={product.img} alt={product.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">{product.brand}</p>
                <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 min-h-[40px]">{product.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-black text-indigo-600">{product.price}</span>
                  {product.originalPrice && <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>}
                  {product.originalPrice && <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">SALE</span>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button key={size} className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-md text-[10px] font-semibold text-slate-700 transition-colors">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DREAM STUDIO BANNER
═══════════════════════════════════════════════════════════════ */
function DreamStudioBanner() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-700 to-indigo-800 p-8 lg:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4">
              <p className="text-lg text-teal-100">The perfect selection of products to create your</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                Dream Studio
              </h2>
              <p className="text-teal-100 max-w-md">
                Complete professional studio solutions with cameras, lighting, microphones, and more.
              </p>
              <PrimaryButton href="#" variant="amber">Build Your Studio <ArrowRight /></PrimaryButton>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&h=500&fit=crop"
                alt="Dream Studio"
                width={700}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT DETAIL SECTION
═══════════════════════════════════════════════════════════════ */
function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState("75 inch");
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-white border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop"
                  alt="Benchmark Classic"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border-2 border-slate-200 hover:border-indigo-500 cursor-pointer transition-colors">
                    <Image
                      src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=100&h=100&fit=crop"
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Benchmark</p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Benchmark Classic Interactive Flat Panel | Smart Board for Teaching</h2>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <span className="text-sm text-slate-500">(127 reviews)</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-indigo-600">₹120,000.00</span>
                  <span className="text-lg text-slate-400 line-through">₹135,000.00</span>
                  <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">SALE</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Taxes included.</p>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-2">Size: <span className="text-indigo-600">{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {["75 inch", "86 inch", "65 inch"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-slate-200 rounded-xl">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-slate-600 hover:bg-slate-50">
                      <MinusIcon />
                    </button>
                    <span className="px-4 py-2 font-bold text-slate-900 min-w-[50px] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-slate-600 hover:bg-slate-50">
                      <PlusIcon />
                    </button>
                  </div>
                  <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">Size guide</Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button className="py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
                  <CartIcon /> Add To Cart
                </button>
                <button className="py-4 bg-white border-2 border-indigo-200 hover:border-indigo-600 text-indigo-700 font-bold rounded-xl transition-all">
                  Buy It Now
                </button>
              </div>

              <Link href="#" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700">
                View full details <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STUDIO SOLUTIONS
═══════════════════════════════════════════════════════════════ */
function StudioSolutions() {
  const solutions = [
    { name: "Green Screen Studio Setup", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop" },
    { name: "Podcast Studio Setup", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop" },
    { name: "Virtual Studio Setup", img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop" },
    { name: "Youtube Studio Setup", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop" },
    { name: "Hybrid Studio Setup", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <SectionLabel color="teal">Solutions</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">We Have All Types of Studio Solution</h2>
          </div>
          <Link href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center">See More <ArrowRight /></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {solutions.map((sol, i) => (
            <Link key={i} href="#" className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                <Image src={sol.img} alt={sol.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-center">{sol.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT GRID
═══════════════════════════════════════════════════════════════ */
function ProductGrid() {
  const products = [
    { name: "Benchmark Classic Series with Android 14 | Smart Board for Online Teaching", price: "₹210,000", img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop", tag: "NEW" },
    { name: "Benchmark TV | Benchmark Television for Entertainment", price: "₹11,999", img: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&h=300&fit=crop", tag: "HOT" },
    { name: "Online Class Studio Setup | Teaching Studio Setup", price: "₹350,000", img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop", tag: "SALE" },
    { name: "Benchmark Maxpro 13 Interactive Flat Panel | Best digital board for online teaching", price: "₹125,000", img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop", tag: "NEW" },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={product.img} alt={product.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className={`absolute top-3 left-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full ${
                  product.tag === "NEW" ? "bg-emerald-500" : product.tag === "HOT" ? "bg-rose-500" : "bg-amber-500"
                }`}>
                  {product.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 min-h-[40px]">{product.name}</h3>
                <p className="text-lg font-black text-indigo-600 mb-3">{product.price}</p>
                <Link href="#" className="block w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-bold rounded-xl text-center transition-all">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ SECTION
═══════════════════════════════════════════════════════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "What products and services does Smart Infovision offer?", a: "Smart Infovision provides a range of smart class solutions, including digital boards, interactive flat panels, smart classroom setups, portable projectors, digital podiums, PTZ cameras, microphones, studio setups, and acoustic solutions." },
    { q: "What is the warranty period for your digital boards and interactive flat panels?", a: "Our digital boards and interactive flat panels come with a standard 3-year warranty covering manufacturing defects. Extended warranty options are also available." },
    { q: "Do you provide installation services for the digital boards and studio setups?", a: "Yes, we provide complete installation services across India. Our expert team handles setup, configuration, and training for all products." },
    { q: "How can I request a product demo?", a: "You can request a demo by calling us at +91-8527926648, visiting our experience centers, or filling out the contact form on our website." },
    { q: "How can I place an order with Smart Infovision?", a: "You can place orders through our website, call our sales team, or visit any of our experience centers across India. We also offer EMI options for convenient payment." },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionLabel color="indigo">FAQs</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-colors">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown open={openIndex === i} />
                  </button>
                  {openIndex === i && (
                    <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Link href="#" className="inline-flex items-center mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-700">
              See More <ArrowRight />
            </Link>
          </div>

          <div>
            <SectionLabel color="amber">Our Blogs</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900 mb-6">Latest from Our Blog</h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=400&fit=crop"
                  alt="Blog"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-500 mb-2">10 September 2024</p>
                <h3 className="font-bold text-slate-900 mb-2">Vivek Priyadarshi के लिए Barbigha में Benchmark...</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">विशेष शिक्षकों के लिए Barbigha में Benchmark Technomate 4K PTZ Camera Installation | Professional...</p>
                <Link href="#" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-bold rounded-lg">
                  Read More <ArrowRight />
                </Link>
              </div>
            </div>
            <Link href="#" className="inline-flex items-center mt-4 text-sm font-bold text-indigo-600 hover:text-indigo-700">
              Explore Our Blogs <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ONLINE TEACHING STUDIO BANNER
═══════════════════════════════════════════════════════════════ */
function OnlineTeachingBanner() {
  const components = [
    { name: "4K PTZ Camera", pos: "top-10 left-10" },
    { name: "Monitor 1", pos: "top-10 right-10" },
    { name: "Anti-flicker Lights", pos: "top-1/2 right-5" },
    { name: "Monitor 2", pos: "bottom-10 left-10" },
    { name: "Server", pos: "bottom-10 left-1/3" },
    { name: "Podium", pos: "bottom-10 right-1/3" },
    { name: "Interactive Flat Panel", pos: "top-1/2 left-5" },
    { name: "Ceiling Lights", pos: "top-5 left-1/2" },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&h=600&fit=crop"
            alt="Online Teaching Studio Setup"
            width={1200}
            height={600}
            className="w-full h-96 lg:h-[500px] object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          
          {/* Component Labels */}
          {components.map((comp, i) => (
            <div key={i} className={`absolute ${comp.pos} hidden lg:block`}>
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg border border-white/50">
                <p className="text-xs font-bold text-slate-900">{comp.name}</p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">ONLINE TEACHING</h2>
            <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">STUDIO SETUP</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-300 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(99,102,241,0.15),transparent_50%)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Newsletter */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-lg">S</div>
              <div>
                <span className="text-lg font-black text-white leading-none block">Smart Infovision</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">A Name of Trust</span>
              </div>
            </div>
            <h4 className="text-white font-bold mb-3">Subscribe our Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">You Will Get Monthly Tips for Studio Setup</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500" />
              <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                <MailIcon />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "All Products", "About Us", "Our Experience Center", "EMI", "Blogs", "Contact"].map((l) => (
                <li key={l}><Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              {["f", "in", "ig", "yt"].map((s, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-teal-500 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white transition-all">{s}</a>
              ))}
            </div>
            <h4 className="text-white font-bold mb-3 text-sm">Contact Us Now</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">Service: <span className="text-white font-semibold">+91-7090022211</span></p>
              <p className="text-slate-400">Sales: <span className="text-white font-semibold">+91-8527926648</span></p>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Policies</h4>
            <ul className="space-y-2.5 text-sm">
              {["Refund Policy", "Privacy Policy", "Terms of Service", "Contact Information"].map((l) => (
                <li key={l}><Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">© 2025, Smart Infovision | India's #1 Studio Setup Provider. Powered by Shopify</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">India (INR ₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING WHATSAPP
═══════════════════════════════════════════════════════════════ */
function FloatingWhatsApp() {
  return (
    <a href="#" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform">
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 overflow-x-hidden">
      <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 4s ease-in-out infinite 1s; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
      `}</style>
      <AnnouncementBar />
      <Navbar />
      <CategoryIcons />
      <HeroBanner />
      <BrandCarousel />
      <DigitalSignageBanner />
      <SigmaBanner />
      <PopularMicrophones />
      <SaleStudioSetup />
      <ShowroomBanner />
      <FeaturedCollection />
      <DreamStudioBanner />
      <ProductDetail />
      <StudioSolutions />
      <ProductGrid />
      <FAQSection />
      <OnlineTeachingBanner />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}