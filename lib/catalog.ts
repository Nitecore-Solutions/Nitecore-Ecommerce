/**
 * Single source of truth for the storefront catalogue taxonomy.
 *
 * Both the Navbar mega menu and the Admin Dashboard product form render brands from
 * BRAND_GRID, so a brand added here shows up in both places at once.
 */

export type BrandGrid = Record<string, string[]>;

export const BRAND_GRID: BrandGrid = {
  Phone: [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Redmi",
    "Oneplus",
    "Poco",
    "Vivo",
    "Oppo",
    "Realme",
    "Motorola",
    "Nokia",
  ],
  Laptop: ["Apple", "HP", "Lenovo", "Dell", "Asus"],
  Airbud: ["boAt", "Samsung", "Apple", "SONY", "JBL"],
  Speaker: ["JBL", "Sony", "Bose", "LG"],
  Light: ["Philips", "Wipro", "Syska", "Godrej"],
  "Digital Board": [
    "Apple",
    "Samsung",
    "HP",
    "Lenovo",
    "Dell",
    "Honor",
    "LG",
    "MAXHUB",
    "ViewSonic",
    "iSlate",
    "Evota",
  ],
  Tripod: ["DIGITEK", "Tygot", "Syvo", "NAFA", "ULANZI"],
  Camera: ["Canon", "Sony", "Nikon", "Fujifilm"],
  Mic: ["Shure", "Blue Yeti", "Rode", "Audio-Technica"],
  OPS: ["Evota", "Intel", "AMD"],
  Monitor: ["LG", "Samsung", "ViewSonic", "HP", "Dell"],
  Acoustic: ["LG", "Samsung", "Panasonic"],
  Podium: ["Custom", "Wooden", "Acrylic"],
  Accessories: ["Cables", "Mounts", "Stands", "Adapters"],
  "Tablet / iPad": ["Apple", "Samsung", "Lenovo", "Microsoft"],
};

/**
 * Categories whose mega-menu right column shows a "Buy Refurbished <Category>" panel
 * instead of Popular Filters. Each entry reuses that category's own brand list so the
 * two columns can never drift apart.
 */
export const REFURBISHED_CATEGORIES: Record<
  string,
  { title: string; brands: string[] }
> = {
  Phone: { title: "Buy Refurbished Phones", brands: BRAND_GRID.Phone },
  Laptop: { title: "Buy Refurbished Laptops", brands: BRAND_GRID.Laptop },
};
