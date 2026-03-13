import { useState, useEffect } from "react";
import { FURNITURE_CATEGORIES } from "../ExploreFurniturePage/ExploreFurniturePage";
import { FurnitureProduct } from "../../types";
import { getProducts, getSavedProducts, saveProduct, unsaveProduct } from "../../services/furniture";
import ProductCard from "../../components/furniture/ProductCard/ProductCard";
import ProductPopover from "../../components/furniture/ProductPopover/ProductPopover";
import "./FurnitureCategoryPage.css";

interface Props {
  categoryId: string;
  onBack: () => void;
  onSaveChange?: () => void;
}

export default function FurnitureCategoryPage({ categoryId, onBack, onSaveChange }: Props) {
  const category = FURNITURE_CATEGORIES.find((c) => c.id === categoryId);

  const [products, setProducts] = useState<FurnitureProduct[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const [openProduct, setOpenProduct] = useState<FurnitureProduct | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getProducts(categoryId), getSavedProducts()])
      .then(([prods, saved]) => {
        setProducts(prods);
        setSavedIds(new Set(saved.map((s) => s.productId)));
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleCardClick = (product: FurnitureProduct, rect: DOMRect) => {
    if (openProduct?.id === product.id) {
      setOpenProduct(null);
      setAnchorRect(null);
    } else {
      setOpenProduct(product);
      setAnchorRect(rect);
    }
  };

  const handleSave = async () => {
    if (!openProduct) return;
    try {
      await saveProduct(openProduct);
      setSavedIds((prev) => new Set(prev).add(openProduct.id));
      onSaveChange?.();
    } catch {
      // already saved or error — ignore
    }
  };

  const handleUnsave = async () => {
    if (!openProduct) return;
    await unsaveProduct(openProduct.id);
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.delete(openProduct.id);
      return next;
    });
    onSaveChange?.();
  };

  return (
    <div className="fcat-page">
      <div className="fcat-page__header" style={{ "--accent": category?.accent } as React.CSSProperties}>
        <button className="fcat-page__back" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Furniture
        </button>
        <h1 className="fcat-page__title">{category?.label}</h1>
        <p className="fcat-page__sub">{category?.description}</p>
      </div>

      {loading ? (
        <div className="fcat-page__loading">
          <span className="fcat-page__spinner" />
        </div>
      ) : (
        <div className="fcat-page__grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={savedIds.has(product.id)}
              isOpen={openProduct?.id === product.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {openProduct && anchorRect && (
        <ProductPopover
          product={openProduct}
          anchorRect={anchorRect}
          isSaved={savedIds.has(openProduct.id)}
          onSave={handleSave}
          onUnsave={handleUnsave}
          onClose={() => { setOpenProduct(null); setAnchorRect(null); }}
        />
      )}
    </div>
  );
}
