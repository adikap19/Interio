import { useState, useEffect } from "react";
import { SavedProduct } from "../../types";
import { getSavedProducts, unsaveProduct } from "../../services/furniture";
import { FURNITURE_CATEGORIES } from "../ExploreFurniturePage/ExploreFurniturePage";
import "./MoodBoardPage.css";

interface Props {
  refreshKey?: number;
}

function ProductGrid({ products, onRemove }: { products: SavedProduct[]; onRemove: (id: string) => void }) {
  return (
    <div className="moodboard-page__grid">
      {products.map((product) => (
        <div key={product.id} className="moodboard-card">
          <div className="moodboard-card__img-wrap">
            <img src={product.imageUrl} alt={product.name} className="moodboard-card__img" />
            <div className="moodboard-card__overlay">
              <button
                className="moodboard-card__remove-btn"
                onClick={() => onRemove(product.productId)}
              >
                Remove
              </button>
              <a
                href={product.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="moodboard-card__visit"
                onClick={(e) => e.stopPropagation()}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
                Visit Store
              </a>
            </div>
          </div>
          <div className="moodboard-card__body">
            <p className="moodboard-card__name">{product.name}</p>
            <p className="moodboard-card__price">₪{product.price.toLocaleString()}</p>
            <p className="moodboard-card__store">{product.storeName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MoodBoardPage({ refreshKey }: Props) {
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSavedProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const handleRemove = async (productId: string) => {
    await unsaveProduct(productId);
    setProducts((prev) => prev.filter((p) => p.productId !== productId));
  };

  if (loading) {
    return (
      <div className="moodboard-page">
        <div className="moodboard-page__loading">
          <span className="moodboard-page__spinner" />
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="moodboard-page">
        <div className="moodboard-page__empty">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="6" width="36" height="36" rx="4" />
            <path d="M6 18h36M18 18v24" />
          </svg>
          <p>Your moodboard is empty</p>
          <span>Browse furniture categories and save products you love</span>
        </div>
      </div>
    );
  }

  // Categories that have at least one saved product
  const savedCategories = FURNITURE_CATEGORIES.filter((cat) =>
    products.some((p) => p.categoryId === cat.id)
  );

  const filteredProducts = activeCategory
    ? products.filter((p) => p.categoryId === activeCategory)
    : products;

  const activeCat = FURNITURE_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="moodboard-page">
      <div className="moodboard-page__header">
        <h1>Mood Board</h1>
        <span className="moodboard-page__count">{products.length} items</span>
      </div>

      {/* Category filter chips */}
      <div className="moodboard-cats">
        {savedCategories.map((cat) => {
          const count = products.filter((p) => p.categoryId === cat.id).length;
          const firstImg = products.find((p) => p.categoryId === cat.id)?.imageUrl;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`moodboard-cat-card${isActive ? " moodboard-cat-card--active" : ""}`}
              onClick={() => setActiveCategory(isActive ? null : cat.id)}
            >
              <div className="moodboard-cat-card__img-wrap">
                {firstImg && <img src={firstImg} alt={cat.label} className="moodboard-cat-card__img" />}
              </div>
              <p className="moodboard-cat-card__label">{cat.label}</p>
              <p className="moodboard-cat-card__count">{count} items</p>
            </button>
          );
        })}
      </div>

      {/* Section title */}
      <div className="moodboard-page__section-header">
        {activeCategory ? (
          <>
            <h2>{activeCat?.label}</h2>
            <button className="moodboard-page__clear" onClick={() => setActiveCategory(null)}>
              Show all
            </button>
          </>
        ) : (
          <h2>All Saved</h2>
        )}
      </div>

      <ProductGrid products={filteredProducts} onRemove={handleRemove} />
    </div>
  );
}
