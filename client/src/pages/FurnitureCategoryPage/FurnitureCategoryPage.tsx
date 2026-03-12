import { FURNITURE_CATEGORIES } from "../ExploreFurniturePage/ExploreFurniturePage";
import "./FurnitureCategoryPage.css";

interface Props {
  categoryId: string;
  onBack: () => void;
}

export default function FurnitureCategoryPage({ categoryId, onBack }: Props) {
  const category = FURNITURE_CATEGORIES.find((c) => c.id === categoryId);

  return (
    <div className="furniture-cat-page">
      <div className="furniture-cat-page__inner">
        <button className="furniture-cat-page__back" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Furniture
        </button>

        <div
          className="furniture-cat-page__icon"
          style={{ "--accent": category?.accent } as React.CSSProperties}
        >
          {category?.icon}
        </div>

        <p className="furniture-cat-page__eyebrow">Category</p>
        <h1 className="furniture-cat-page__title">{category?.label}</h1>
        <p className="furniture-cat-page__sub">{category?.description}</p>

        <div className="furniture-cat-page__badge">Coming Soon</div>
        <p className="furniture-cat-page__note">
          We are curating the finest pieces for this category. Check back soon.
        </p>
      </div>
    </div>
  );
}
