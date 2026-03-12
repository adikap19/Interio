import "./ExploreFurniturePage.css";

export interface FurnitureCategory {
  id: string;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
  image?: string;
}

export const FURNITURE_CATEGORIES: FurnitureCategory[] = [
  {
    id: "beds",
    label: "Beds",
    description: "Frames, headboards & bases",
    accent: "#b08060",
    image:
      "https://i.pinimg.com/1200x/fd/46/c2/fd46c20de4965bf5ce4a38804ea4b28d.jpg",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="26" width="40" height="12" rx="2" />
        <path d="M4 26v-6a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v6" />
        <rect x="8" y="18" width="10" height="8" rx="1" />
        <rect x="30" y="18" width="10" height="8" rx="1" />
        <path d="M4 38v4M44 38v4" />
      </svg>
    ),
  },
  {
    id: "sofas",
    label: "Sofas",
    description: "Lounges, sectionals & love seats",
    accent: "#8a6a4a",
    image:
      "https://i.pinimg.com/736x/1a/11/c2/1a11c2734fbc205b078385b87f0e7566.jpg",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="8" y="22" width="32" height="14" rx="3" />
        <rect x="4" y="26" width="6" height="10" rx="2" />
        <rect x="38" y="26" width="6" height="10" rx="2" />
        <path d="M8 36v4M40 36v4" />
        <path d="M8 22v-4a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v4" />
      </svg>
    ),
  },
  {
    id: "dining-tables",
    label: "Dining Tables",
    description: "Round, rectangular & extendable",
    image:
      "https://i.pinimg.com/1200x/d8/78/c5/d878c5d21bec438edc4a9d3a26351b30.jpg",
    accent: "#c49060",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="20" width="36" height="6" rx="2" />
        <path d="M12 26v14M36 26v14M18 26v10M30 26v10" />
      </svg>
    ),
  },
  {
    id: "wardrobes",
    label: "Wardrobes",
    description: "Sliding, hinged & walk-in",
    image:
      "https://i.pinimg.com/736x/d9/3e/cc/d93eccf31850d379510e74f2ac3b41f7.jpg",
    accent: "#7a5a3a",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="40" height="38" rx="2" />
        <line x1="24" y1="6" x2="24" y2="44" />
        <circle cx="20" cy="26" r="1.5" fill="currentColor" />
        <circle cx="28" cy="26" r="1.5" fill="currentColor" />
        <line x1="4" y1="14" x2="44" y2="14" />
      </svg>
    ),
  },
  {
    id: "coffee-tables",
    label: "Coffee Tables",
    description: "Living room centrepieces",
    image:
      "https://i.pinimg.com/736x/82/66/48/826648c91404d27ff62a87cca7a271d3.jpg",
    accent: "#a07850",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="22" width="36" height="6" rx="2" />
        <path d="M12 28v10M36 28v10" />
        <ellipse cx="24" cy="22" rx="18" ry="3" />
      </svg>
    ),
  },
  {
    id: "nightstands",
    label: "Nightstands",
    description: "Bedside tables & drawer units",
    image:
      "https://i.pinimg.com/1200x/df/16/9b/df169bdf6c0e20388510171d689b9279.jpg",
    accent: "#c0886a",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="10" y="10" width="28" height="32" rx="2" />
        <line x1="10" y1="26" x2="38" y2="26" />
        <circle cx="24" cy="18" r="1.5" fill="currentColor" />
        <circle cx="24" cy="34" r="1.5" fill="currentColor" />
        <path d="M10 42h28" />
      </svg>
    ),
  },
  {
    id: "bookshelves",
    label: "Bookshelves",
    description: "Open shelves & display units",
    image:
      "https://i.pinimg.com/1200x/da/2a/c8/da2ac8e77a4c493f7940be2d900fa16b.jpg",
    accent: "#9a7458",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="4" width="36" height="40" rx="2" />
        <line x1="6" y1="16" x2="42" y2="16" />
        <line x1="6" y1="28" x2="42" y2="28" />
        <line x1="20" y1="4" x2="20" y2="44" />
      </svg>
    ),
  },
  {
    id: "desks",
    label: "Desks",
    description: "Work desks & writing tables",
    image:
      "https://i.pinimg.com/736x/d1/04/af/d104af8cd22f30e4d1bb131064f543e6.jpg",
    accent: "#b07060",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="18" width="40" height="6" rx="2" />
        <path d="M10 24v18M38 24v18" />
        <rect x="28" y="24" width="10" height="14" rx="1" />
      </svg>
    ),
  },
  {
    id: "armchairs",
    label: "Armchairs",
    description: "Accent chairs & recliners",
    image:
      "https://i.pinimg.com/736x/5d/7c/1e/5d7c1ede065cfb9c97705e6196214a7f.jpg",
    accent: "#d0a070",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="12" y="18" width="24" height="16" rx="3" />
        <rect x="6" y="24" width="6" height="10" rx="2" />
        <rect x="36" y="24" width="6" height="10" rx="2" />
        <path d="M12 34v6M36 34v6" />
        <path d="M12 18v-4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4" />
      </svg>
    ),
  },
  {
    id: "tv-units",
    label: "TV Units",
    description: "Media consoles & entertainment",
    image:
      "https://i.pinimg.com/1200x/75/cf/7f/75cf7f2c60325d657945694eb66b3adf.jpg",
    accent: "#887060",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="28" width="40" height="12" rx="2" />
        <line x1="4" y1="34" x2="44" y2="34" />
        <line x1="16" y1="28" x2="16" y2="40" />
        <line x1="32" y1="28" x2="32" y2="40" />
        <rect x="8" y="8" width="32" height="20" rx="2" />
      </svg>
    ),
  },
  {
    id: "rugs",
    label: "Rugs",
    description: "Area rugs, runners & mats",
    image:
      "https://i.pinimg.com/1200x/71/fb/2c/71fb2c1df883162d743c88e4cb840819.jpg",
    accent: "#c0987a",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="8" y="10" width="32" height="28" rx="2" />
        <rect x="12" y="14" width="24" height="20" rx="1" />
        <line x1="8" y1="24" x2="40" y2="24" />
        <line x1="24" y1="10" x2="24" y2="38" />
      </svg>
    ),
  },
  {
    id: "lighting",
    label: "Lighting",
    description: "Pendants, floor lamps & sconces",
    image:
      "https://i.pinimg.com/736x/e2/1d/68/e21d68ff48ce7049a3fe9977cf35cb36.jpg",
    accent: "#d4a850",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 4v4" />
        <circle cx="24" cy="20" r="8" />
        <path d="M18 28l-2 8h16l-2-8" />
        <line x1="16" y1="36" x2="32" y2="36" />
        <path d="M8.6 8.6l2.8 2.8M38.6 8.6l-2.8 2.8M4 20h4M40 20h4" />
      </svg>
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
          Find the perfect pieces for every room in your home.
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
              <h3 className="furniture-card__label">{cat.label}</h3>
              <p className="furniture-card__desc">{cat.description}</p>
            </div>
            <span className="furniture-card__arrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
