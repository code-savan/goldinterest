export type NamedColor = { name: string; hex: string };

/** Curated, searchable color library for products. Custom names are still allowed. */
export const NAMED_COLORS: NamedColor[] = [
  // Neutrals / whites
  { name: "White", hex: "#FFFFFF" },
  { name: "Off White", hex: "#FAF9F6" },
  { name: "Ivory", hex: "#FFFFF0" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Bone", hex: "#E3DAC9" },
  { name: "Ecru", hex: "#C2B280" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Sand", hex: "#E8DCC6" },
  { name: "Linen", hex: "#FAF0E6" },
  { name: "Oat", hex: "#D9CAB3" },
  { name: "Taupe", hex: "#483C32" },
  { name: "Greige", hex: "#BEBAAE" },
  { name: "Stone", hex: "#C2B8A3" },
  { name: "Pebble", hex: "#9A958C" },
  { name: "Ash", hex: "#B2BEB5" },
  { name: "Fog", hex: "#D8D8D8" },
  { name: "Light Grey", hex: "#D3D3D3" },
  { name: "Grey", hex: "#808080" },
  { name: "Slate Grey", hex: "#708090" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Graphite", hex: "#383428" },
  { name: "Slate", hex: "#2F3336" },
  { name: "Black", hex: "#000000" },
  { name: "Noir", hex: "#1A1A1A" },
  { name: "Jet", hex: "#0A0A0A" },
  // Browns / earth
  { name: "Camel", hex: "#C19A6B" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Clay", hex: "#B66A50" },
  { name: "Terracotta", hex: "#E2725B" },
  { name: "Rust", hex: "#B7410E" },
  { name: "Copper", hex: "#B87333" },
  { name: "Bronze", hex: "#CD7F32" },
  { name: "Coffee", hex: "#6F4E37" },
  { name: "Espresso", hex: "#4B3621" },
  { name: "Chocolate", hex: "#7B3F00" },
  { name: "Cocoa", hex: "#875847" },
  { name: "Mocha", hex: "#967969" },
  { name: "Walnut", hex: "#773F1A" },
  { name: "Mahogany", hex: "#C04000" },
  { name: "Oak", hex: "#B08D57" },
  // Reds / pinks
  { name: "Tomato", hex: "#FF6347" },
  { name: "Chili", hex: "#C1272D" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Ruby", hex: "#E0115F" },
  { name: "Red", hex: "#FF0000" },
  { name: "Brick", hex: "#9B2226" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Maroon", hex: "#800000" },
  { name: "Wine", hex: "#722F37" },
  { name: "Rose", hex: "#F33A6A" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Salmon", hex: "#FA8072" },
  { name: "Blush", hex: "#F4C2C2" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Hot Pink", hex: "#FF69B4" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Mauve", hex: "#E0B0FF" },
  { name: "Dusty Rose", hex: "#C08081" },
  // Oranges / yellows / golds
  { name: "Orange", hex: "#FF7F00" },
  { name: "Burnt Orange", hex: "#CC5500" },
  { name: "Amber", hex: "#FFBF00" },
  { name: "Honey", hex: "#EBA937" },
  { name: "Mustard", hex: "#E1AD01" },
  { name: "Gold", hex: "#C9A96E" },
  { name: "Old Gold", hex: "#CFB53B" },
  { name: "Champagne", hex: "#F7E7CE" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Lemon", hex: "#FFF44F" },
  { name: "Butter", hex: "#FDE49C" },
  { name: "Sandstone", hex: "#D9B382" },
  // Greens
  { name: "Avocado", hex: "#568203" },
  { name: "Sage", hex: "#B2AC88" },
  { name: "Olive", hex: "#808000" },
  { name: "Moss", hex: "#8A9A5B" },
  { name: "Fern", hex: "#4F7942" },
  { name: "Forest", hex: "#228B22" },
  { name: "Pine", hex: "#01796F" },
  { name: "Emerald", hex: "#50C878" },
  { name: "Jade", hex: "#00A86B" },
  { name: "Mint", hex: "#98FF98" },
  { name: "Seafoam", hex: "#9FE2BF" },
  { name: "Teal", hex: "#008080" },
  { name: "Aqua", hex: "#00FFFF" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Sky", hex: "#87CEEB" },
  { name: "Green", hex: "#00A550" },
  { name: "Lime", hex: "#32CD32" },
  { name: "Chartreuse", hex: "#7FFF00" },
  // Blues
  { name: "Navy", hex: "#000080" },
  { name: "Midnight", hex: "#191970" },
  { name: "Indigo", hex: "#4B0082" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Cobalt", hex: "#0047AB" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Denim", hex: "#1560BD" },
  { name: "Steel Blue", hex: "#4682B4" },
  { name: "Powder Blue", hex: "#B0E0E6" },
  { name: "Baby Blue", hex: "#89CFF0" },
  { name: "Ice Blue", hex: "#E0F2F7" },
  { name: "Petrol", hex: "#005F6B" },
  // Purples
  { name: "Plum", hex: "#8E4585" },
  { name: "Eggplant", hex: "#614051" },
  { name: "Purple", hex: "#800080" },
  { name: "Violet", hex: "#8F00FF" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Lilac", hex: "#C8A2C8" },
  { name: "Orchid", hex: "#DA70D6" },
  // Multi / prints
  { name: "Multicolor", hex: "#C9A96E" },
  { name: "Natural", hex: "#EDE6D6" },
  { name: "Raw", hex: "#D6CFC2" },
];

export function findColorByName(name: string): NamedColor | undefined {
  const want = name.trim().toLowerCase();
  if (!want) return undefined;
  return NAMED_COLORS.find((c) => c.name.toLowerCase() === want);
}

export function searchColors(query: string, limit = 8): NamedColor[] {
  const q = query.trim().toLowerCase();
  if (!q) return NAMED_COLORS.slice(0, limit);
  const starts: NamedColor[] = [];
  const contains: NamedColor[] = [];
  for (const c of NAMED_COLORS) {
    const n = c.name.toLowerCase();
    if (n.startsWith(q)) starts.push(c);
    else if (n.includes(q)) contains.push(c);
    if (starts.length + contains.length >= limit * 3) break;
  }
  return [...starts, ...contains].slice(0, limit);
}
