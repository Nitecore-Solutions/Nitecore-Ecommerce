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
} from "lucide-react";
import Navbar from "./components/Navbar";

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const BRANDS = [
  { name: "Hamlog", logo: "https://placehold.co/200x80/0f172a/ffffff?text=Hamlog&font=montserrat" },
  { name: "LG", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/LG_Electronics.png" },
  { name: "Samsung", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Orig_Wordmark_BLACK_RGB.png" },
  { name: "MAXHUB", logo: "https://placehold.co/200x80/1e293b/ffffff?text=MAXHUB&font=montserrat" },
  { name: "Study N Learn", logo: "https://placehold.co/200x80/334155/ffffff?text=Study+N+Learn&font=montserrat" },
  { name: "iSlate", logo: "https://placehold.co/200x80/475569/ffffff?text=iSlate&font=montserrat" },
  { name: "ViewSonic", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ViewSonic_logo.svg" },
  { name: "Sybernatix", logo: "https://placehold.co/200x80/0f172a/ffffff?text=Sybernatix&font=montserrat" },
  { name: "Evota", logo: "https://placehold.co/200x80/1e293b/ffffff?text=Evota&font=montserrat" },
];

interface Product {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image?: string;
  category: string;
}

const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  "Interactive Digital Boards": [
    { name: "ViewSonic IFP7550 75\" 4K Interactive Display", description: "ViewSonic 75\" 4K UHD interactive flat panel with 20-point touch, built-in Android 8.0.", price: 189000, originalPrice: 245000, badge: "Best Seller", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4MSZONvbVoAWOJ1v05zfkoUCLQFLQMGU_PbuY0Fne_PdlJDPjYmJvUoe&s=10", category: "Interactive Digital Boards" },
    { name: "MAXHUB V6 86\" 4K Interactive Panel", description: "MAXHUB 86\" 4K interactive flat panel with wireless screen sharing and built-in camera.", price: 285000, originalPrice: 380000, badge: "Premium", image: "https://cdn11.bigcommerce.com/s-mfdnq9n4ks/images/stencil/1280x1280/products/5277/23617/1695890479.1280.1280__75644.1695890602.jpg?c=2", category: "Interactive Digital Boards" },
    { name: "Samsung Flip 2 WM55R 55\" Digital Flipchart", description: "Samsung 55\" 4K UHD digital flipchart with pen input and wireless connectivity.", price: 165000, originalPrice: 210000, image: "https://cdn.shopify.com/s/files/1/0624/3155/9831/files/SAMSUNG-02.png?v=1717778817", category: "Interactive Digital Boards" },
    { name: "Hamlog 75\" Smart Interactive Board", description: "Hamlog 75\" interactive board with 4K display, 20-point touch and Android 11.", price: 125000, originalPrice: 160000, badge: "New", image: "https://5.imimg.com/data5/SELLER/Default/2026/4/598720000/WN/ZZ/CP/24364364/interactive-smart-board.jpeg", category: "Interactive Digital Boards" },
  ],
  "LG & Samsung Displays": [
    { name: "LG 65UN711C 65\" 4K UHD Commercial TV", description: "LG 65\" 4K UHD commercial display with webOS, perfect for digital signage.", price: 89000, originalPrice: 115000, badge: "Best Seller", image: "https://5.imimg.com/data5/SELLER/Default/2020/12/IX/EQ/BJ/6428109/samsung-pm55h-500x500.jpg", category: "LG & Samsung Displays" },
    { name: "Samsung QM55R 55\" 4K QLED Signage", description: "Samsung 55\" QLED 4K professional display with MagicINFO built-in.", price: 98000, originalPrice: 130000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqnT7WmvnphqY_IXk2QxorWOAk-ThQLY9hSwFEvYpQ0osbMMrHVvp7amy&s=10", category: "LG & Samsung Displays" },
    { name: "LG 75UN570H 75\" 4K Hotel TV Display", description: "LG 75\" 4K UHD Pro:Centric Smart Hotel TV with Pro:Idiom.", price: 145000, originalPrice: 185000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo4FKKuPyn7u88OVtYH5bRplQKlaAxFztKrKqAwqMO1g&s=10", category: "LG & Samsung Displays" },
    { name: "Samsung PM55H 55\" Full HD Videowall", description: "Samsung 55\" Full HD video wall display with 0.9mm ultra-narrow bezel.", price: 75000, originalPrice: 95000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqhCWYTsetcQExVVtEhQMsu-OFanl2PDJmG2jjKYqaAT1TAXxwTW0mBEG&s=10", category: "LG & Samsung Displays" },
  ],
  "Study N Learn & iSlate Boards": [
    { name: "Study N Learn 75\" Smart Class Board", description: "Study N Learn 75\" interactive smart board with pre-loaded educational content.", price: 95000, originalPrice: 130000, badge: "Best Seller", image: "https://m.media-amazon.com/images/I/61nusmLOkeL.jpg", category: "Study N Learn & iSlate Boards" },
    { name: "iSlate 65\" Interactive Flat Panel", description: "iSlate 65\" interactive flat panel with 4K display and multi-touch support.", price: 78000, originalPrice: 105000, image: "https://m.media-amazon.com/images/I/51mXmUhuvpL.jpg", category: "Study N Learn & iSlate Boards" },
    { name: "Study N Learn 86\" AI Smart Board", description: "Study N Learn 86\" AI-powered smart board with voice recognition.", price: 145000, originalPrice: 190000, badge: "New", image: "https://m.media-amazon.com/images/I/51BtPCg4nVL.jpg", category: "Study N Learn & iSlate Boards" },
    { name: "iSlate 75\" 4K Touch Display", description: "iSlate 75\" 4K UHD touch display with Android 11 and built-in speakers.", price: 110000, originalPrice: 145000, image: "https://5.imimg.com/data5/SELLER/Default/2023/7/329489263/SE/BY/TP/77525639/75-inch-interactive-display-terminal-500x500.jpg", category: "Study N Learn & iSlate Boards" },
  ],
  "Sybernatix & Evota Solutions": [
    { name: "Sybernatix OPS PC Module i5", description: "Sybernatix OPS PC module with Intel i5, 8GB RAM, 256GB SSD for interactive panels.", price: 28000, originalPrice: 38000, badge: "Best Seller", image: "https://5.imimg.com/data5/SELLER/Default/2025/11/560410701/VI/DC/XK/201329385/i5-ops.jpg", category: "Sybernatix & Evota Solutions" },
    { name: "Evota 75\" Interactive Smart Panel", description: "Evota 75\" 4K interactive smart panel with dual OS Android + Windows.", price: 118000, originalPrice: 155000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h7WkW_vbG3e516hkEa3bONTWpJEWdx6gx8dbV4VZ2qSsUGcTN_xsVVY&s=10", category: "Sybernatix & Evota Solutions" },
    { name: "Sybernatix Wall Mount Heavy Duty", description: "Sybernatix heavy duty wall mount for 55\" to 86\" interactive panels.", price: 4500, originalPrice: 6500, image: "https://m.media-amazon.com/images/I/71IDINAoAJL.jpg", category: "Sybernatix & Evota Solutions" },
    { name: "Evota OPS i7 Computer Module", description: "Evota OPS i7 module with 16GB RAM, 512GB SSD, Windows 11 Pro.", price: 42000, originalPrice: 58000, badge: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1OMzBn2I3bh7R7W0BX-7dfJcTWooSs4-U8kWqEkhD8TqHMt2DAu-iVDE&s=10", category: "Sybernatix & Evota Solutions" },
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
  { name: "ViewSonic IFP6550 65\" 4K Interactive Panel", description: "ViewSonic 65\" 4K interactive display with 20-point touch and Android 9.0.", price: 145000, originalPrice: 185000, badge: "Featured", image: "https://5.imimg.com/data5/SELLER/Default/2022/2/TM/ZR/VV/9197417/r-500x500.png", category: "Featured" },
  { name: "MAXHUB C65 New 65\" Interactive Panel", description: "MAXHUB 65\" 4K interactive panel with wireless sharing and built-in mic.", price: 165000, originalPrice: 210000, badge: "Featured", image: "https://5.imimg.com/data5/SELLER/Default/2024/10/455953504/CQ/KG/PK/879167/maxhub-interactive-panel-65-with-ops.webp", category: "Featured" },
  { name: "Samsung WAD Series 55\" Interactive Display", description: "Samsung 55\" interactive display with S Pen and flip-style writing.", price: 135000, originalPrice: 170000, badge: "Featured", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbl9O3jad5tndq6w0buQrp26I7FzEn2Iby3CxvSlWZmEFOhDimc0iQ0I4f&s=10", category: "Featured" },
  { name: "Hamlog 65\" Smart Interactive Board", description: "Hamlog 65\" smart board with 4K display, Android 11 and 20-point touch.", price: 89000, originalPrice: 120000, badge: "Featured", image: "https://cpimg.tistatic.com/10423349/b/4/High-Solid-Smart-Interactive-Classroom-Board..jpg", category: "Featured" },
];

const BEST_SELLERS: Product[] = [
  { name: "MAXHUB V6 75\" 4K Interactive Panel", description: "MAXHUB 75\" 4K interactive flat panel — most sold enterprise board.", price: 245000, originalPrice: 320000, badge: "Best Seller", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfBTCTgpm6mFV5BKOECX0R3uyAL6mCqItZOKOs-pHLcQ&s=10", category: "Best Sellers" },
  { name: "ViewSonic IFP7550 75\" Interactive Display", description: "ViewSonic 75\" 4K UHD interactive display with 20-point touch.", price: 189000, originalPrice: 245000, badge: "Best Seller", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7sicE1xFHbgEczTMx7A7ydH4HO3otcLWnD7hS4vM2SApHtfVhfKTloEm&s=10", category: "Best Sellers" },
  { name: "LG 75UN711C 75\" 4K Commercial Display", description: "LG 75\" 4K UHD commercial TV with webOS for digital signage.", price: 145000, originalPrice: 185000, badge: "Best Seller", image: "https://images.jdmagicbox.com/quickquotes/images_main/lg-television-23-11-2022-025-272320672-au0wy2zs.jpg", category: "Best Sellers" },
  { name: "Study N Learn 75\" Smart Class Board", description: "Study N Learn 75\" interactive board with pre-loaded educational content.", price: 95000, originalPrice: 130000, badge: "Best Seller", image: "https://m.media-amazon.com/images/I/51mXmUhuvpL.jpg", category: "Best Sellers" },
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
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-white border-b border-gray-100">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-300 hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <Monitor className="h-12 w-12 opacity-40" />
          </div>
        )}
        {discount && (
          <span className="absolute left-2 top-2 rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            -{discount}%
          </span>
        )}
        {product.badge && (
          <span className="absolute right-2 top-2 rounded-md bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-gray-900">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-gray-500">{product.description}</p>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-sm font-bold text-gray-900">₹{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-gray-400 line-through">₹{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="mt-2 flex gap-2">
          <button className="flex-1 rounded-lg bg-slate-900 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700">
            Buy Now
          </button>
          <button className="flex-1 rounded-lg bg-green-600 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700">
            WhatsApp
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
      <Navbar />

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

      {/* ═══════ BRANDS ═══════ */}
      <section className="bg-white border-b border-gray-200">
        <div className="px-4 py-8 sm:px-6">
          <h2 className="mb-6 text-center text-lg font-bold text-gray-500 uppercase tracking-widest">Our Brand Partners</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <img src={brand.logo} alt={brand.name} className="h-8 object-contain" />
                <span className="text-xs font-semibold text-gray-500">{brand.name}</span>
              </div>
            ))}
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
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="mb-3 aspect-[4/3] rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <Monitor className="h-10 w-10 text-gray-300" />
                )}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
              <p className="mt-1 text-sm font-bold text-teal-600">₹{formatPrice(product.price)}
                {product.originalPrice && <span className="ml-2 text-xs text-gray-400 line-through font-normal">₹{formatPrice(product.originalPrice)}</span>}
              </p>
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
                <div className="mb-3 aspect-[4/3] rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <Monitor className="h-10 w-10 text-slate-300" />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                <p className="mt-1 text-sm font-bold text-teal-600">₹{formatPrice(product.price)}
                  {product.originalPrice && <span className="ml-2 text-xs text-gray-400 line-through font-normal">₹{formatPrice(product.originalPrice)}</span>}
                </p>
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
