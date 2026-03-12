import "./SubNav.css";

export const NAV_ITEMS = [
  {
    id: "moodboard",
    label: "Mood Board",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "explore",
    label: "Explore Designs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "furniture",
    label: "Explore Furniture",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3" />
        <path d="M3 9a2 2 0 0 0-2 2v4h22v-4a2 2 0 0 0-2-2H3z" />
        <path d="M5 15v4M19 15v4" />
      </svg>
    ),
  },
  {
    id: "style",
    label: "Style Your Space",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
];

interface Props {
  active: string;
  onSelect: (id: string) => void;
}

export default function SubNav({ active, onSelect }: Props) {
  return (
    <nav className="subnav">
      <div className="subnav__inner">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`subnav__item ${active === item.id ? "subnav__item--active" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="subnav__icon">{item.icon}</span>
            <span className="subnav__label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
