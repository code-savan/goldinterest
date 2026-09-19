export type Category = "wallpaper-packs" | "printable-posters" | "hoodies" | "tee-shirts" | "frame-wall-art";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  colors: { name: string; hex: string; image?: string }[];
  sizes?: string[];
  description: string;
  details: string[];
  images: string[];
  featured?: boolean;
  badge?: string;
};

export const categories: { id: Category; label: string; count: string; image: string; href: string }[] = [
  {
    id: "wallpaper-packs",
    label: "Wallpaper Packs",
    count: "18 DESIGNS",
    image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=600&auto=format&fit=crop&q=60",
    href: "/shop?category=wallpaper-packs",
  },
  {
    id: "printable-posters",
    label: "Printable Posters",
    count: "24 EDITIONS",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=60",
    href: "/shop?category=printable-posters",
  },
  {
    id: "frame-wall-art",
    label: "Frame Wall Art",
    count: "14 FRAMES",
    image: "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?w=600&auto=format&fit=crop&q=60",
    href: "/shop?category=frame-wall-art",
  },
  {
    id: "hoodies",
    label: "Hoodies",
    count: "12 STYLES",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60",
    href: "/shop?category=hoodies",
  },
  {
    id: "tee-shirts",
    label: "Tee Shirts",
    count: "16 GRAPHICS",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
    href: "/shop?category=tee-shirts",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "aurum-minimal-wallpaper-pack",
    name: "Aurum Minimal Wallpaper Pack, 3 Rolls",
    category: "wallpaper-packs",
    price: 129,
    oldPrice: 147,
    rating: 4.8,
    reviews: 124,
    colors: [
      { name: "Sand", hex: "#E8DCC6" },
      { name: "Stone", hex: "#C2B8A3" },
      { name: "Noir", hex: "#1A1A1A" },
    ],
    description:
      "A calm textured wallpaper for warm and welcoming walls. Matte vinyl with a soft linen finish that is wipeable and easy to align. It pastes straight to the wall. Each pack has 3 rolls and covers about 16 sqm.",
    details: [
      "3 rolls, 0.53m by 10m each (15.9 sqm total)",
      "Matte vinyl 300gsm, paste the wall application",
      "Low glare finish, washable",
      "Designed in our studio, printed in the EU on FSC certified paper",
    ],
    images: [
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
    badge: "BESTSELLER",
  },
  {
    id: "2",
    slug: "printer-star-nebula-pack",
    name: "Printer Star Nebula Wallpaper Pack",
    category: "wallpaper-packs",
    price: 149,
    rating: 4.9,
    reviews: 89,
    colors: [
      { name: "Midnight", hex: "#0F1A2A" },
      { name: "Dune", hex: "#C9A96E" },
    ],
    description:
      "A smooth night sky gradient that shifts from deep midnight blue to warm gold. Made to bring depth and calm to a feature wall. One pack covers a full wall.",
    details: ["3 rolls per pack", "Subtle metallic pearl ink", "Lightfast and UV resistant", "Paste the wall application"],
    images: [
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1444703686983-3d5158dd1200?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "golden-horizon-pack",
    name: "Golden Horizon Panoramic Pack",
    category: "wallpaper-packs",
    price: 179,
    rating: 4.7,
    reviews: 56,
    colors: [{ name: "Horizon", hex: "#D4A574" }],
    description: "Soft morning light over still water in a wide panoramic print. Seamless repeat made for modern rooms up to 2.7m high.",
    details: ["Seamless panoramic repeat", "Sturdy non woven base", "Made for 2.7m wall height", "3 rolls per pack"],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "desert-gold-printable",
    name: "Desert Gold Printable Poster Pack, A2",
    category: "printable-posters",
    price: 35,
    rating: 4.9,
    reviews: 201,
    colors: [
      { name: "Natural White", hex: "#F6F5F2" },
      { name: "Black", hex: "#0A0A0A" },
    ],
    sizes: ["A3", "A2", "A1"],
    description:
      "Warm desert shapes with a gold arch. You get an instant download plus the option of an archival print. Files are 300dpi, and the optional print is on thick 250gsm museum paper.",
    details: ["Digital files in A3, A2, A1 and 4:5", "Optional print on 250gsm Munken Lynx paper", "Gold foil detail on the printed version", "FSC certified paper"],
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
    badge: "NEW",
  },
  {
    id: "5",
    slug: "monochrome-muse-printable-set",
    name: "Monochrome Muse Printable Set, 2 Prints",
    category: "printable-posters",
    price: 48,
    oldPrice: 58,
    rating: 4.8,
    reviews: 94,
    colors: [{ name: "Off-White", hex: "#EDE9E3" }],
    sizes: ["A3", "A2"],
    description: "Two black and white prints with soft sculptural shapes. Simple and calm, made to give walls a clean gallery look. Instant download.",
    details: ["2 digital files included", "Archival prints available on request", "Prints ship rolled in a tube"],
    images: [
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
    ],
    featured: false,
  },
  {
    id: "6",
    slug: "cafe-noir-printable",
    name: "Cafe Noir Typography Printable",
    category: "printable-posters",
    price: 22,
    rating: 4.6,
    reviews: 47,
    colors: [{ name: "Cream", hex: "#F5E6C8" }],
    sizes: ["A3", "A2", "A1"],
    description: "A friendly nod to cafe culture in a bold serif with tight spacing and gold ink on cream. Print it at home or through a local lab.",
    details: ["Letterpress style texture", "Gold ink detail on the printed version", "Digital file with print option"],
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=60",
    ],
    featured: false,
  },
  {
    id: "7",
    slug: "framed-golden-arch",
    name: "Golden Arch Framed Wall Art, Oak",
    category: "frame-wall-art",
    price: 189,
    rating: 4.9,
    reviews: 78,
    colors: [
      { name: "Oak", hex: "#C9A96E" },
      { name: "Black", hex: "#0A0A0A" },
      { name: "White", hex: "#F6F5F2" },
    ],
    sizes: ["40×50", "50×70", "70×100"],
    description:
      "A warm Desert Gold print in a solid oak frame with museum glass and a slim gold spacer. It arrives ready to hang.",
    details: ["Solid oak frame in natural, black or white", "Museum glass with 99 percent UV protection", "Archival 250gsm print", "Ready to hang with gallery mount"],
    images: [
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
    badge: "FRAMED",
  },
  {
    id: "8",
    slug: "framed-monochrome-duo",
    name: "Monochrome Duo Framed Set, 2 Pieces",
    category: "frame-wall-art",
    price: 295,
    oldPrice: 340,
    rating: 4.8,
    reviews: 41,
    colors: [{ name: "Black Frame", hex: "#0A0A0A" }],
    sizes: ["30×40", "40×50"],
    description: "Two framed black and white prints with deep black frames and generous white space. A calm pair for a hallway or home office.",
    details: ["2 framed prints included", "Black solid wood frames", "Acid free mount"],
    images: [
      "https://images.unsplash.com/photo-1577083552792-a92a68f971a5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=60",
    ],
    featured: false,
  },
  {
    id: "9",
    slug: "essential-gold-hoodie-bone",
    name: "Essential Hoodie, Bone",
    category: "hoodies",
    price: 89,
    rating: 4.9,
    reviews: 312,
    colors: [
      { name: "Bone", hex: "#E8E6E1" },
      { name: "Noir", hex: "#0A0A0A" },
      { name: "Stone", hex: "#9A9590" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description:
      "Our everyday hoodie in a heavy 450gsm loopwheel cotton. Garment dyed with a brushed inside and a small gold embroidered logo at the cuff.",
    details: [
      "450gsm French terry, 100 percent cotton",
      "Garment dyed and pre shrunk",
      "Ribbed cuffs and hem, unisex fit",
      "Model is 178cm and wears size M",
      "Made in Portugal",
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
    badge: "ESSENTIAL",
  },
  {
    id: "10",
    slug: "noir-gold-hoodie",
    name: "Noir Gold Hoodie",
    category: "hoodies",
    price: 95,
    rating: 4.8,
    reviews: 178,
    colors: [{ name: "Noir", hex: "#0A0A0A" }],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description: "Deep black with a tonal gold chest embroidery. Heavy and soft, made to wear in nicely over time.",
    details: ["450gsm cotton", "Tonal embroidery", "Kangaroo pocket", "Unisex, S to 3XL"],
    images: [
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1578681994506-b8f463cea48a?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
  },
  {
    id: "11",
    slug: "stone-washed-hoodie-clay",
    name: "Stone Washed Hoodie, Clay",
    category: "hoodies",
    price: 92,
    rating: 4.7,
    reviews: 64,
    colors: [{ name: "Clay", hex: "#B07A5B" }],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Pigment dyed with a soft stone wash, so it feels broken in from day one. Relaxed fit with a brushed inside.",
    details: ["Pigment dyed", "Oversized fit", "Brushed interior"],
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60"],
    featured: false,
  },
  {
    id: "12",
    slug: "tomato-interest-tee",
    name: "Interest Tee, Tomato",
    category: "tee-shirts",
    price: 38,
    rating: 4.9,
    reviews: 267,
    colors: [
      { name: "Tomato", hex: "#C44536" },
      { name: "Off-White", hex: "#F6F5F2" },
      { name: "Black", hex: "#0A0A0A" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description:
      "Find your interest. A food inspired graphic tee in soft 180gsm organic cotton with water based inks. Also comes in Avocado and Chili.",
    details: ["180gsm organic cotton", "Water based screen print", "Relaxed unisex fit, S to 3XL", "Pre washed for softness"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
    badge: "ICON",
  },
  {
    id: "13",
    slug: "avocado-interest-tee-sage",
    name: "Avocado Interest Tee, Sage",
    category: "tee-shirts",
    price: 38,
    rating: 4.8,
    reviews: 142,
    colors: [{ name: "Sage", hex: "#8A9A8B" }],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description: "Our avocado print on soft sage cotton with a deep green graphic. Simple, fresh and easy to wear.",
    details: ["Organic cotton", "Sage pigment dye", "Unisex"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60",
    ],
    featured: true,
  },
  {
    id: "14",
    slug: "chili-interest-tee-cream",
    name: "Chili Graphic Tee, Cream",
    category: "tee-shirts",
    price: 38,
    rating: 4.7,
    reviews: 98,
    colors: [{ name: "Cream", hex: "#F5E6C8" }],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description: "A hand drawn chili cluster on warm cream cotton. A fun pick if you like a little heat.",
    details: ["Cream base", "Red chili print", "Limited color"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=60",
    ],
    featured: false,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const other = products.filter((p) => p.category !== product.category);
  return [...sameCategory, ...other].slice(0, limit);
}

export const categoryLabels: Record<Category, string> = {
  "wallpaper-packs": "Wallpaper Packs",
  "printable-posters": "Printable Posters",
  "frame-wall-art": "Frame Wall Art",
  hoodies: "Hoodies",
  "tee-shirts": "Tee Shirts",
};

/** Default tile images for the homepage "Shop by category" section (overridable in admin). */
export const DEFAULT_CATEGORY_IMAGES: Record<Category, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.image])
) as Record<Category, string>;
