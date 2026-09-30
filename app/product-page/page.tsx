"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Check, ArrowRight, ChevronLeft, ChevronsLeft, ChevronsRight, Layers } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const STATIC_PRODUCTS = [
  {
    id: 's1',
    name: "MAXHUB U4 75 Inch Interactive Flat Panel Display",
    price: 215000,
    oldPrice: 399999,
    category: "Digital Board",
    brand: "MAXHUB",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    slug: "maxhub-u4-75-inch-interactive-flat-panel",
  },
  {
    id: 's2',
    name: "Teachmint Star 65 Inch Interactive Digital Board",
    price: 95000,
    oldPrice: 130000,
    category: "Digital Board",
    brand: "Teachmint",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&h=400&fit=crop",
    slug: "teachmint-star-65-inch-interactive-digital-board",
  },
  {
    id: 's3',
    name: "Teachmint Ultra 65 Inch AI Teaching Station",
    price: 115000,
    oldPrice: 150000,
    category: "Digital Board",
    brand: "Teachmint",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
    slug: "teachmint-ultra-65-inch-ai-teaching-station",
  },
  {
    id: 's4',
    name: "Hisense A13 75\" Interactive Learning Display",
    price: 145000,
    oldPrice: 210000,
    category: "Digital Board",
    brand: "Hisense",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    slug: "hisense-a13-75-interactive-learning-display",
  },
  {
    id: 's5',
    name: "ViewSonic A14 75 Inch Interactive Digital Board",
    price: 145000,
    oldPrice: 210000,
    category: "Digital Board",
    brand: "ViewSonic",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    slug: "viewsonic-a14-75-inch-interactive-digital-board",
  },
  {
    id: 's6',
    name: "MAXHUB E3 4K Interactive Teaching Panel",
    price: 135000,
    oldPrice: 300000,
    category: "Digital Board",
    brand: "MAXHUB",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=400&fit=crop",
    slug: "maxhub-e3-4k-interactive-teaching-panel",
  },
  {
    id: 's7',
    name: "PencilAi Pro Digital Board - 86 Inch",
    price: 220000,
    oldPrice: null,
    category: "Digital Board",
    brand: "PencilAi",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    slug: "pencilai-pro-digital-board-86-inch",
  },
  {
    id: 's8',
    name: "PencilAi Pro Digital Board - 75 Inch",
    price: 155000,
    oldPrice: null,
    category: "Digital Board",
    brand: "PencilAi",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    slug: "pencilai-pro-digital-board-75-inch",
  },
];

const BRANDS = [
  "Creators Mind", "Hisense", "MAXHUB", "PencilAi", "Teachmint", "ViewSonic",
  "Apple", "Samsung", "HP", "Dell", "Lenovo", "Sony", "JBL", "boAt", "Canon", "Shure"
];

const SORT_OPTIONS = [
  "Featured", "Most relevant", "Best selling",
  "Alphabetically, A-Z", "Alphabetically, Z-A",
  "Price, low to high", "Price, high to low",
  "Date, old to new", "Date, new to old"
];

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialBrand = searchParams.get('brand') || '';
  const initialSearch = searchParams.get('search') || '';

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState("Most relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => (r.ok ? r.json() : { products: [] }))
      .then((d) => setDbProducts(d.products || []))
      .catch(() => {});
  }, []);

  // Update filters if URL parameters change
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialBrand) setSelectedBrands([initialBrand]);
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialCategory, initialBrand, initialSearch]);

  const ALL_PRODUCTS = useMemo(() => {
    const dynamic = dbProducts.map((p: any) => ({
      id: `db-${p.id}`,
      name: p.name,
      price: Number(p.price),
      oldPrice: Number(p.price) > 0 ? Math.round(Number(p.price) * 1.35) : null,
      category: p.category,
      brand: p.brand || p.category?.replace(/-/g, ' '),
      image: p.image_url || (Array.isArray(p.images) && p.images[0]) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
      slug: p.slug,
    }));
    return [...dynamic, ...STATIC_PRODUCTS];
  }, [dbProducts]);

  const allBrands = useMemo(() => {
    const list = new Set<string>(BRANDS);
    ALL_PRODUCTS.forEach((p) => {
      if (p.brand) list.add(p.brand);
    });
    return Array.from(list);
  }, [ALL_PRODUCTS]);

  const toggleFilter = (filter: string) =>
    setActiveFilter(activeFilter === filter ? null : filter);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.some(
          (b) => product.brand && product.brand.toLowerCase() === b.toLowerCase()
        );

      const matchesCat =
        !selectedCategory ||
        (product.category &&
          product.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        (product.brand &&
          product.brand.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

      const min = priceRange.min ? parseInt(priceRange.min) : 0;
      const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
      const matchesPrice = product.price >= min && product.price <= max;

      return matchesBrand && matchesCat && matchesSearch && matchesPrice;
    });
  }, [ALL_PRODUCTS, selectedBrands, selectedCategory, searchQuery, priceRange]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "Price, low to high":
        return sorted.sort((a, b) => a.price - b.price);
      case "Price, high to low":
        return sorted.sort((a, b) => b.price - a.price);
      case "Alphabetically, A-Z":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "Alphabetically, Z-A":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "Date, new to old":
        return sorted.reverse();
      case "Date, old to new":
        return sorted;
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedProducts.length);
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    const target = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(target);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const resetAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategory('');
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setCurrentPage(1);
  };

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= safeCurrentPage - delta && i <= safeCurrentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (typeof i === 'number') {
        if (l !== undefined) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }
    });

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* ── FILTER & SORT BAR ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Filters */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 relative">
            <span className="text-sm font-bold text-gray-700 hidden sm:block">Filter:</span>

            {/* Active filter badges */}
            {(selectedCategory || selectedBrands.length > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                    Category: {selectedCategory}
                    <button onClick={() => { setSelectedCategory(''); setCurrentPage(1); }} className="hover:text-rose-600">✕</button>
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">
                    {b}
                    <button onClick={() => toggleBrand(b)} className="hover:text-rose-600">✕</button>
                  </span>
                ))}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    Search: &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }} className="hover:text-rose-600">✕</button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-xs font-bold text-rose-600 underline ml-1 hover:text-rose-800"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Brand Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('brand')}
                className={`flex items-center gap-1.5 text-sm font-semibold hover:text-teal-600 transition-colors ${
                  activeFilter === 'brand' || selectedBrands.length > 0 ? 'text-teal-600 underline' : 'text-gray-700'
                }`}
              >
                Brand ({selectedBrands.length}) <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeFilter === 'brand' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-80 overflow-y-auto z-50">
                  <div className="flex justify-between items-center px-2 py-1.5 mb-1 border-b border-gray-100">
                    <span className="text-xs text-gray-500 font-bold">{selectedBrands.length} selected</span>
                    <button onClick={() => { setSelectedBrands([]); setCurrentPage(1); }} className="text-xs font-bold underline hover:text-teal-600">
                      Reset
                    </button>
                  </div>
                  {allBrands.map((brand) => (
                    <label
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div
                        className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                          selectedBrands.includes(brand)
                            ? 'bg-teal-600 border-teal-600'
                            : 'border-gray-300 group-hover:border-teal-500'
                        }`}
                      >
                        {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 capitalize">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('price')}
                className={`flex items-center gap-1.5 text-sm font-semibold hover:text-teal-600 transition-colors ${
                  activeFilter === 'price' ? 'text-teal-600 underline' : 'text-gray-700'
                }`}
              >
                Price <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeFilter === 'price' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500 font-bold">Price Filter (INR)</span>
                    <button onClick={() => { setPriceRange({ min: '', max: '' }); setCurrentPage(1); }} className="text-xs font-bold underline hover:text-teal-600">
                      Reset
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => { setPriceRange({ ...priceRange, min: e.target.value }); setCurrentPage(1); }}
                        className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs focus:border-teal-500 outline-none"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => { setPriceRange({ ...priceRange, max: e.target.value }); setCurrentPage(1); }}
                        className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sort & Page size */}
          <div className="flex items-center gap-3">
            {/* Items Per Page */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
              <span className="font-medium">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg text-xs font-bold text-gray-800 cursor-pointer outline-none focus:border-teal-600"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <span className="text-xs text-gray-400 mr-2 hidden md:inline font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-gray-800 pr-8 cursor-pointer focus:outline-none hover:border-teal-600"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Header Status */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100 text-xs font-semibold text-gray-500">
          <div>
            Showing <span className="font-bold text-gray-900">{sortedProducts.length > 0 ? startIndex + 1 : 0}</span> to{' '}
            <span className="font-bold text-gray-900">{endIndex}</span> of{' '}
            <span className="font-bold text-gray-900">{sortedProducts.length}</span> products
          </div>
          {totalPages > 1 && (
            <div>
              Page <span className="font-bold text-gray-900">{safeCurrentPage}</span> of{' '}
              <span className="font-bold text-gray-900">{totalPages}</span>
            </div>
          )}
        </div>

        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product: any) => {
              const targetSlug =
                product.slug ||
                product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border border-gray-200/80 p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    {/* Image Card */}
                    <div className="relative aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden mb-4 border border-slate-100 p-2 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.brand && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider bg-white/95 text-orange-700 shadow-sm border border-slate-200">
                          {product.brand}
                        </span>
                      )}
                      {product.oldPrice && (
                        <span className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <Link
                      href={`/product/${targetSlug}`}
                      className="text-sm font-black text-slate-900 line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors leading-snug"
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through mr-1.5 font-medium">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-black text-slate-900">
                        {product.price > 0 ? formatPrice(product.price) : 'On Request'}
                      </span>
                    </div>

                    <Link
                      href={`/product/${targetSlug}`}
                      className="px-3 py-1.5 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 p-8">
            <p className="text-gray-600 text-base font-bold">No products found matching your current filters.</p>
            <button
              onClick={resetAllFilters}
              className="mt-4 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Clear all filters & explore all products
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            PAGINATION CONTROLS (BOTTOM)
        ═══════════════════════════════════════════════════════════ */}
        {sortedProducts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-gray-100 flex items-center justify-center">
            {/* Pagination Buttons */}
            <div className="flex items-center gap-1.5">
              {/* First Page */}
              {safeCurrentPage > 2 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                  title="First Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
              )}

              {/* Previous Page */}
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="px-3 h-9 flex items-center gap-1 rounded-xl border border-gray-200 text-gray-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden xs:inline">Prev</span>
              </button>

              {/* Page Number Pills */}
              {getPageNumbers().map((item, idx) => {
                if (item === '...') {
                  return (
                    <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-xs font-bold text-gray-400">
                      ...
                    </span>
                  );
                }
                const pageNum = item as number;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                      safeCurrentPage === pageNum
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105'
                        : 'border border-gray-200 text-gray-700 hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Page */}
              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="px-3 h-9 flex items-center gap-1 rounded-xl border border-gray-200 text-gray-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-colors"
              >
                <span className="hidden xs:inline">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Last Page */}
              {safeCurrentPage < totalPages - 1 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                  title="Last Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}