import { useState, useEffect } from "react";
import { SavedProduct } from "../../types";
import { getSavedProducts, unsaveProduct } from "../../services/furniture";
import "./MoodBoardPage.css";

interface Props {
  refreshKey?: number;
}

export default function MoodBoardPage({ refreshKey }: Props) {
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="moodboard-page">
      <div className="moodboard-page__header">
        <h1>Mood Board</h1>
        <span className="moodboard-page__count">{products.length} items</span>
      </div>
      <div className="moodboard-page__grid">
        {products.map((product) => (
          <div key={product.id} className="moodboard-card">
            <div className="moodboard-card__img-wrap">
              <img src={product.imageUrl} alt={product.name} className="moodboard-card__img" />
              <div className="moodboard-card__overlay">
                <button
                  className="moodboard-card__remove-btn"
                  onClick={() => handleRemove(product.productId)}
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
    </div>
  );
}
