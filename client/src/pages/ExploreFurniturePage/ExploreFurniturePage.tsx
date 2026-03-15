import "./ExploreFurniturePage.css";

export interface FurnitureCategory {
  id: string;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
  image?: string;
  room?: string;
}

/** Wraps raw SVG path markup in the shared icon <svg> so each entry is one line */
const icon = (d: string) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    dangerouslySetInnerHTML={{ __html: d }}
  />
);

export const FURNITURE_CATEGORIES: FurnitureCategory[] = [
  {
    id: "beds",
    label: "Beds",
    description: "Frames, headboards & bases",
    room: "Bedroom",
    accent: "#b08060",
    image:
      "https://i.pinimg.com/1200x/fd/46/c2/fd46c20de4965bf5ce4a38804ea4b28d.jpg",
    icon: icon(
      `<rect x="4" y="26" width="40" height="12" rx="2"/><path d="M4 26v-6a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v6"/><rect x="8" y="18" width="10" height="8" rx="1"/><rect x="30" y="18" width="10" height="8" rx="1"/><path d="M4 38v4M44 38v4"/>`,
    ),
  },
  {
    id: "sofas",
    label: "Sofas",
    description: "Lounges, sectionals & love seats",
    room: "Living Room",
    accent: "#8a6a4a",
    image:
      "https://i.pinimg.com/736x/1a/11/c2/1a11c2734fbc205b078385b87f0e7566.jpg",
    icon: icon(
      `<rect x="8" y="22" width="32" height="14" rx="3"/><rect x="4" y="26" width="6" height="10" rx="2"/><rect x="38" y="26" width="6" height="10" rx="2"/><path d="M8 36v4M40 36v4"/><path d="M8 22v-4a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v4"/>`,
    ),
  },
  {
    id: "dining-tables",
    label: "Dining Tables",
    description: "Round, rectangular & extendable",
    room: "Dining Room",
    accent: "#c49060",
    image:
      "https://i.pinimg.com/1200x/d8/78/c5/d878c5d21bec438edc4a9d3a26351b30.jpg",
    icon: icon(
      `<rect x="6" y="20" width="36" height="6" rx="2"/><path d="M12 26v14M36 26v14M18 26v10M30 26v10"/>`,
    ),
  },
  {
    id: "wardrobes",
    label: "Wardrobes",
    description: "Sliding, hinged & walk-in",
    room: "Bedroom",
    accent: "#7a5a3a",
    image:
      "https://i.pinimg.com/736x/d9/3e/cc/d93eccf31850d379510e74f2ac3b41f7.jpg",
    icon: icon(
      `<rect x="4" y="6" width="40" height="38" rx="2"/><line x1="24" y1="6" x2="24" y2="44"/><circle cx="20" cy="26" r="1.5" fill="currentColor"/><circle cx="28" cy="26" r="1.5" fill="currentColor"/><line x1="4" y1="14" x2="44" y2="14"/>`,
    ),
  },
  {
    id: "coffee-tables",
    label: "Coffee Tables",
    description: "Living room centrepieces",
    room: "Living Room",
    accent: "#a07850",
    image:
      "https://i.pinimg.com/736x/82/66/48/826648c91404d27ff62a87cca7a271d3.jpg",
    icon: icon(
      `<rect x="6" y="22" width="36" height="6" rx="2"/><path d="M12 28v10M36 28v10"/><ellipse cx="24" cy="22" rx="18" ry="3"/>`,
    ),
  },
  {
    id: "nightstands",
    label: "Nightstands",
    description: "Bedside tables & drawer units",
    room: "Bedroom",
    accent: "#c0886a",
    image:
      "https://i.pinimg.com/1200x/df/16/9b/df169bdf6c0e20388510171d689b9279.jpg",
    icon: icon(
      `<rect x="10" y="10" width="28" height="32" rx="2"/><line x1="10" y1="26" x2="38" y2="26"/><circle cx="24" cy="18" r="1.5" fill="currentColor"/><circle cx="24" cy="34" r="1.5" fill="currentColor"/><path d="M10 42h28"/>`,
    ),
  },
  {
    id: "bookshelves",
    label: "Bookshelves",
    description: "Open shelves & display units",
    room: "Study",
    accent: "#9a7458",
    image:
      "https://i.pinimg.com/1200x/da/2a/c8/da2ac8e77a4c493f7940be2d900fa16b.jpg",
    icon: icon(
      `<rect x="6" y="4" width="36" height="40" rx="2"/><line x1="6" y1="16" x2="42" y2="16"/><line x1="6" y1="28" x2="42" y2="28"/><line x1="20" y1="4" x2="20" y2="44"/>`,
    ),
  },
  {
    id: "desks",
    label: "Desks",
    description: "Work desks & writing tables",
    room: "Study",
    accent: "#b07060",
    image:
      "https://i.pinimg.com/1200x/c7/a0/68/c7a06811851271c1b0f69ae1e1318c38.jpg",
    icon: icon(
      `<rect x="4" y="18" width="40" height="6" rx="2"/><path d="M10 24v18M38 24v18"/><rect x="28" y="24" width="10" height="14" rx="1"/>`,
    ),
  },
  {
    id: "armchairs",
    label: "Armchairs",
    description: "Accent chairs & recliners",
    room: "Living Room",
    accent: "#d0a070",
    image:
      "https://i.pinimg.com/736x/5d/7c/1e/5d7c1ede065cfb9c97705e6196214a7f.jpg",
    icon: icon(
      `<rect x="12" y="18" width="24" height="16" rx="3"/><rect x="6" y="24" width="6" height="10" rx="2"/><rect x="36" y="24" width="6" height="10" rx="2"/><path d="M12 34v6M36 34v6"/><path d="M12 18v-4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4"/>`,
    ),
  },
  {
    id: "tv-units",
    label: "TV Units",
    description: "Media consoles & entertainment",
    room: "Living Room",
    accent: "#887060",
    image:
      "https://i.pinimg.com/1200x/75/cf/7f/75cf7f2c60325d657945694eb66b3adf.jpg",
    icon: icon(
      `<rect x="4" y="28" width="40" height="12" rx="2"/><line x1="4" y1="34" x2="44" y2="34"/><line x1="16" y1="28" x2="16" y2="40"/><line x1="32" y1="28" x2="32" y2="40"/><rect x="8" y="8" width="32" height="20" rx="2"/>`,
    ),
  },
  {
    id: "rugs",
    label: "Rugs",
    description: "Area rugs, runners & mats",
    room: "Living Room",
    accent: "#c0987a",
    image:
      "https://i.pinimg.com/1200x/71/fb/2c/71fb2c1df883162d743c88e4cb840819.jpg",
    icon: icon(
      `<rect x="8" y="10" width="32" height="28" rx="2"/><rect x="12" y="14" width="24" height="20" rx="1"/><line x1="8" y1="24" x2="40" y2="24"/><line x1="24" y1="10" x2="24" y2="38"/>`,
    ),
  },
  {
    id: "lighting",
    label: "Lighting",
    description: "Pendants, floor lamps & sconces",
    room: "All Rooms",
    accent: "#d4a850",
    image:
      "https://i.pinimg.com/736x/e2/1d/68/e21d68ff48ce7049a3fe9977cf35cb36.jpg",
    icon: icon(
      `<path d="M24 4v4"/><circle cx="24" cy="20" r="8"/><path d="M18 28l-2 8h16l-2-8"/><line x1="16" y1="36" x2="32" y2="36"/><path d="M8.6 8.6l2.8 2.8M38.6 8.6l-2.8 2.8M4 20h4M40 20h4"/>`,
    ),
  },
];

interface Props {
  onSelectCategory: (id: string) => void;
}

export default function ExploreFurniturePage({ onSelectCategory }: Props) {
  return (
    <div className="furniture-page">
      <div className="furniture-page__header">
        <p className="furniture-page__eyebrow">Browse by category</p>
        <h1 className="furniture-page__title">Explore Furnitures</h1>
        <p className="furniture-page__subtitle">
          Find the perfect pieces for every room in your home
        </p>
      </div>

      <div className="furniture-page__grid">
        {FURNITURE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className="furniture-card"
            style={{ "--accent": cat.accent } as React.CSSProperties}
            onClick={() => onSelectCategory(cat.id)}
          >
            <div className="furniture-card__icon-zone">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="furniture-card__photo"
                />
              ) : (
                <div className="furniture-card__icon">{cat.icon}</div>
              )}
            </div>
            <div className="furniture-card__body">
              {cat.room && <span className="furniture-card__room">{cat.room}</span>}
              <h3 className="furniture-card__label">{cat.label}</h3>
              <p className="furniture-card__desc">{cat.description}</p>
              <span className="furniture-card__browse">Browse →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
