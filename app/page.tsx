import Link from "next/link";
import {
  Phone,
  MessageCircle,
  ShoppingCart,
  Star,
  ArrowRight,
  Monitor,
  Mic,
  Cable,
  Cpu,
  Camera,
  Package,
  Mail,
  MapPin,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Shop By Solution", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Resources", href: "#resources" },
  { label: "Support", href: "#support" },
];

const CATEGORY_CARDS = [
  { icon: Monitor, title: "Smart Classroom Solutions", count: "12 Products", color: "from-slate-700 to-slate-900" },
  { icon: Mic, title: "Audio & Microphones", count: "8 Products", color: "from-slate-600 to-slate-800" },
  { icon: Cable, title: "Digital Board Accessories", count: "15 Products", color: "from-slate-700 to-slate-900" },
  { icon: Cpu, title: "Computer Accessories", count: "10 Products", color: "from-slate-600 to-slate-800" },
  { icon: Cable, title: "Cables & Connectivity", count: "18 Products", color: "from-slate-700 to-slate-900" },
  { icon: Monitor, title: "Digital Boards", count: "6 Products", color: "from-slate-600 to-slate-800" },
  { icon: Camera, title: "Cameras & Video", count: "9 Products", color: "from-slate-700 to-slate-900" },
  { icon: Package, title: "Studio & Podcast Setup", count: "7 Products", color: "from-slate-600 to-slate-800" },
];

interface Product {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  category: string;
}

const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  "Smart Classroom Solutions": [
    { name: "ViewSonic A14 75\" Interactive Panel", description: "75 Inch Interactive Digital Board with 4K display and multi-touch support.", price: 145000, originalPrice: 210000, badge: "Best Seller", category: "Smart Classroom Solutions" },
    { name: "Hisense A13 75\" Interactive Learning Board", description: "75 Inch Smart Digital Board with Touch technology for classrooms.", price: 145000, originalPrice: 210000, category: "Smart Classroom Solutions" },
    { name: "Teachmint X2 Ultra 75\" AI Digital Board", description: "AI-powered 75 Inch Digital Board for smart teaching experience.", price: 140000, originalPrice: 190000, badge: "New", category: "Smart Classroom Solutions" },
    { name: "Teachmint Star 75\" Interactive Smart Board", description: "Interactive Smart Board designed for modern learning environments.", price: 110000, originalPrice: 150000, category: "Smart Classroom Solutions" },
  ],
  "Audio & Microphones": [
    { name: "PencilAi Pro Mic", description: "Professional wireless microphone by Creators Mind for clear audio.", price: 4999, category: "Audio & Microphones" },
    { name: "PencilAi Air Mic Wireless", description: "Wireless Microphone System with seamless connectivity.", price: 4999, category: "Audio & Microphones" },
    { name: "PencilAi Teaching Mic", description: "Clean audio capture mic designed specifically for teaching.", price: 3000, category: "Audio & Microphones" },
    { name: "Podcast Studio Condenser Microphone", description: "Professional condenser microphone for podcast recording.", price: 5499, category: "Audio & Microphones" },
  ],
  "Digital Board Accessories": [
    { name: "DVI to VGA Display Converter Cable", description: "High Quality 3 Meter DVI to VGA converter cable.", price: 299, category: "Digital Board Accessories" },
    { name: "HD Auto Focus Webcam", description: "Webcam for Online Classes & Video Meetings with auto focus.", price: 1999, originalPrice: 3499, category: "Digital Board Accessories" },
    { name: "Wall Mount for Interactive Panels", description: "Fixed Wall Mount compatible with all interactive panels.", price: 3999, category: "Digital Board Accessories" },
    { name: "OPS Computer Module", description: "OPS Computer Module for Interactive Panels – Transform your board.", price: 24999, originalPrice: 34999, category: "Digital Board Accessories" },
  ],
  "Computer Accessories": [
    { name: "PencilAi Smart All-In-One PC", description: "All In One Computer designed for modern education needs.", price: 54999, originalPrice: 64999, category: "Computer Accessories" },
    { name: "Mini PC for Business & Education", description: "Compact Mini PC perfect for business and education use.", price: 24999, originalPrice: 29999, category: "Computer Accessories" },
    { name: "USB WiFi Adapter for PC & Desktop", description: "Turn your desktop into a wireless workstation instantly.", price: 599, originalPrice: 899, category: "Computer Accessories" },
    { name: "Wireless Keyboard & Mouse Combo", description: "Create a clutter-free workspace with this wireless combo.", price: 1499, originalPrice: 2299, category: "Computer Accessories" },
  ],
  "Cables & Connectivity": [
    { name: "DVI to VGA Display Converter Cable", description: "High Quality 3 Meter DVI to VGA converter cable.", price: 299, category: "Cables & Connectivity" },
    { name: "HDMI Cable 3m / 5m High Speed 4K", description: "Premium HDMI Cable supporting 4K resolution at high speed.", price: 999, category: "Cables & Connectivity" },
    { name: "10m USB 3.0 Extension Cable", description: "Extend your camera connectivity up to 10 meters reliably.", price: 2500, category: "Cables & Connectivity" },
    { name: "HDMI to DVI Cable 3 Metre", description: "High-Speed Digital HDMI to DVI conversion cable.", price: 1399, category: "Cables & Connectivity" },
  ],
  "Digital Boards": [
    { name: "MAXHUB U4 75\" Interactive Flat Panel", description: "Premium 75 Inch Interactive Flat Panel Display for professionals.", price: 215000, originalPrice: 399999, badge: "Premium", category: "Digital Boards" },
    { name: "Teachmint Star 65\" Interactive Board", description: "65 Inch Interactive Digital Board for compact classrooms.", price: 95000, originalPrice: 130000, category: "Digital Boards" },
    { name: "Teachmint Ultra 65\" AI Teaching Station", description: "AI Teaching Station with 8GB RAM + 256GB Storage.", price: 115000, originalPrice: 150000, category: "Digital Boards" },
    { name: "Teachmint Star 75\" Interactive Smart Board", description: "Interactive Smart Board designed for modern learning.", price: 110000, originalPrice: 150000, category: "Digital Boards" },
  ],
  "Cameras & Video": [
    { name: "Teaching Camera for Smart Classroom", description: "Camera optimized for Smart Classroom & Online Teaching.", price: 8999, originalPrice: 14999, category: "Cameras & Video" },
    { name: "PencilAi FHD PTZ Camera", description: "Bring every speaker and teacher into crystal-clear focus.", price: 55000, originalPrice: 70000, category: "Cameras & Video" },
    { name: "PencilAi 4K PTZ Camera with Auto-Focus", description: "4K PTZ Camera with advanced auto-focus capabilities.", price: 90000, category: "Cameras & Video" },
    { name: "PencilAi Pro Camera", description: "High-end professional camera for studio-grade recordings.", price: 95000, category: "Cameras & Video" },
  ],
};

const FEATURED_CATEGORIES = [
  { name: "Wires & Cables", starting: 99 },
  { name: "Digital Board Pen", starting: 99 },
  { name: "USB & OTG & PenDrive", starting: 199 },
  { name: "Keyboard & Mouse", starting: 199 },
  { name: "Mics (Wired & Wireless)", starting: 299 },
  { name: "Tool Box & Repair Kit", starting: 399, originalStarting: 499 },
  { name: "Headphones", starting: 199 },
  { name: "Tripods", starting: 99, originalStarting: 199 },
];

const FEATURED_PRODUCTS: Product[] = [
  { name: "Professional LED Monitor", description: "High-resolution LED monitor for professional use.", price: 4999, category: "Featured" },
  { name: "3.5mm AUX Audio Cable", description: "AUX Audio Cable for PC, Laptop, Speaker & Car Stereo.", price: 599, category: "Featured" },
  { name: "Webcam for Online Classes", description: "Perfect webcam for online classes and video meetings.", price: 1999, category: "Featured" },
  { name: "Universal Monitor Wall Mount", description: "Compatible wall mount for all monitor sizes.", price: 999, category: "Featured" },
];

const BEST_SELLERS: Product[] = [
  { name: "MAXHUB U4 75\" Interactive Flat Panel", description: "Premium interactive flat panel display.", price: 215000, category: "Best Sellers" },
  { name: "Teachmint Star 65\" Interactive Digital Board", description: "Popular 65 inch interactive digital board.", price: 95000, category: "Best Sellers" },
  { name: "Teachmint Ultra 65\" AI Teaching Station", description: "AI Teaching Station with 8GB RAM + 256GB Storage.", price: 115000, category: "Best Sellers" },
  { name: "Teachmint Star 75\" Interactive Smart Board", description: "Interactive smart board for modern classrooms.", price: 110000, category: "Best Sellers" },
];

const SOLUTIONS = [
  { title: "Smart Classroom Solutions", desc: "Complete interactive classroom setup with digital boards, cameras, and audio systems." },
  { title: "Coaching Institute Setup", desc: "End-to-end digital infrastructure for coaching centers and training institutes." },
  { title: "School Digital Setup", desc: "Transform traditional schools with smart digital learning solutions." },
  { title: "Online Teaching Setup", desc: "Professional streaming and recording setup for online educators." },
  { title: "Conference Room Setup", desc: "Corporate presentation and meeting room technology solutions." },
  { title: "Podcast Studio Setup", desc: "Complete podcasting equipment and acoustic treatment packages." },
];

const SERVICES = [
  { title: "App Development", desc: "Custom Android, iOS, and cross-platform applications for education." },
  { title: "Website Development", desc: "Modern, responsive websites tailored for educational institutions." },
  { title: "LMS Development", desc: "Learning Management Systems with student tracking and analytics." },
  { title: "Social Media Marketing", desc: "Grow your brand presence across all social media platforms." },
  { title: "PAN India Installation", desc: "Professional installation services available across India." },
  { title: "Technical Support", desc: "24/7 technical support for all products and installations." },
];

/* ──────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────── */

function formatPrice(n: number) {
  return n.toLocaleString("en-IN");
}

function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <Monitor className="h-12 w-12 opacity-40" />
        </div>
        {discount && (
          <span className="absolute left-3 top-3 rounded-md bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-md bg-slate-800 px-2 py-0.5 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 group-hover:text-slate-700">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{product.description}</p>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-gray-900">Rs. {formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">Rs. {formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="mt-2 flex gap-2">
          <button className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-700">
            Buy Now
          </button>
          <button className="flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-green-700">
            <MessageCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* ═══════ TOP BAR ═══════ */}
      <div className="bg-slate-900 text-xs text-gray-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <a href="tel:+917070512666" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3" /> +91 70705 12666
            </a>
            <a href="mailto:support@creatorsmind.co.in" className="hidden items-center gap-1.5 hover:text-white transition-colors sm:flex">
              <Mail className="h-3 w-3" /> support@creatorsmind.co.in
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white transition-colors text-xs font-medium">FB</a>
            <a href="#" className="hover:text-white transition-colors text-xs font-medium">IG</a>
            <a href="#" className="hover:text-white transition-colors text-xs font-medium">LI</a>
            <a href="#" className="hover:text-white transition-colors text-xs font-medium">YT</a>
          </div>
        </div>
      </div>

      {/* ═══════ NAVBAR ═══════ */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Monitor className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Creators Mind</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                0
              </span>
            </button>
            <button className="md:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-slate-400">
              India&apos;s #1 EdTech Marketplace
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              One Stop Solution for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Educators & Creators
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
              Interactive Digital Boards, Apps, Studio Equipment & Services for modern learning environments. Trusted by 10,000+ educators across India.
            </p>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-gray-400">(1,250+ Reviews)</span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                <ShoppingCart className="h-4 w-4" /> Shop Products
              </Link>
              <a
                href="tel:+917070512666"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TOP SELLING PRODUCTS ═══════ */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Top Selling Products</h2>
          <p className="mt-3 text-base text-gray-500">
            Professional products and solutions built for creators, studios, and modern businesses.
          </p>
        </div>

        {Object.entries(PRODUCTS_BY_CATEGORY).map(([category, products]) => (
          <div key={category} className="mb-14 last:mb-0">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{category}</h3>
              <Link href="#" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Shop All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ═══════ FEATURED CATEGORIES ═══════ */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Featured Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href="#"
                className="group flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 p-4 text-center transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-transform group-hover:scale-110">
                  <Package className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-gray-800">{cat.name}</span>
                <span className="mt-0.5 text-[11px] text-gray-500">
                  Starting ₹{cat.starting}
                  {cat.originalStarting && (
                    <span className="ml-1 text-gray-400 line-through">₹{cat.originalStarting}</span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED PRODUCTS ═══════ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 aspect-[16/9] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Monitor className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
              <p className="mt-1 text-sm font-bold text-gray-900">Rs. {formatPrice(product.price)}</p>
              <button className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-400">
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ BEST SELLERS ═══════ */}
      <section className="bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Best Sellers</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BEST_SELLERS.map((product) => (
              <div
                key={product.name}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 aspect-[16/9] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Monitor className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm font-bold text-gray-900">Rs. {formatPrice(product.price)}</p>
                <button className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-700">
                  View Product
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SOLUTIONS ═══════ */}
      <section id="solutions" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Shop By Solution</h2>
          <p className="mt-3 text-base text-gray-500">Tailored setups for every educational and creative need.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
            >
              <h3 className="text-base font-bold text-gray-900">{sol.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{sol.desc}</p>
              <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Learn More <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-3 text-base text-gray-400">Beyond products — we deliver complete solutions.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
              >
                <h3 className="text-base font-bold text-white">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GET IN TOUCH ═══════ */}
      <section id="support" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* Left – info */}
            <div className="flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">Get in Touch</h2>
              <p className="mt-3 text-gray-300">We&apos;d love to hear from you! Reach out for quotes, demos, or any questions.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="tel:+917070512666" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-gray-100">
                  <Phone className="h-4 w-4" /> Call Us
                </a>
                <a href="https://wa.me/917070512666" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                  <MessageCircle className="h-4 w-4" /> Chat Now
                </a>
              </div>
              <div className="mt-8 space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Patna, Bihar, India</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +91 70705 12666</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> support@creatorsmind.co.in</div>
              </div>
            </div>

            {/* Right – form */}
            <form className="p-8 sm:p-12 space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow-md active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ═══════ */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Monitor className="h-4 w-4" />
                </div>
                <span className="text-base font-bold text-slate-900">Creators Mind</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                Complete solutions for Smart Classrooms, Digital Boards, Podcast Studios, Streaming Setups, PCs, Networking, Apps, Websites & Digital Services.
              </p>
              <div className="mt-4 flex gap-3">
                <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">FB</a>
                <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">IG</a>
                <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">LI</a>
                <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors text-xs font-medium">YT</a>
              </div>
            </div>

            {/* Columns */}
            {[
              { title: "Smart Classroom", links: ["Digital Boards", "Interactive Panels", "Smart Classroom Setup"] },
              { title: "Cameras & Studio", links: ["PTZ Cameras", "Wireless Microphones", "Lighting Setup", "Studio Accessories"] },
              { title: "PC & Networking", links: ["All-in-One PCs", "Keyboards & Mouse", "HDMI Cables", "Networking Solutions"] },
              { title: "Services", links: ["App Development", "Website Development", "Shopify Development", "Technical Support"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-gray-900">{col.title}</h4>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-xs text-gray-500 hover:text-slate-700 transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick links row */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <Link href="#" className="hover:text-slate-700 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-slate-700 transition-colors">Shipping</Link>
                <Link href="#" className="hover:text-slate-700 transition-colors">Refund</Link>
                <Link href="#" className="hover:text-slate-700 transition-colors">Support</Link>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-green-700 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> 24/7 Technical Support
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Creators Mind. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
