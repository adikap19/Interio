import { useState, useEffect } from "react";
import { FURNITURE_CATEGORIES } from "../ExploreFurniturePage/ExploreFurniturePage";
import { FurnitureProduct } from "../../types";
import { getProducts, getSavedProducts, saveProduct, unsaveProduct } from "../../services/furniture";
import ProductCard from "../../components/furniture/ProductCard/ProductCard";
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

  useEffect(() => {
    setLoading(true);
    Promise.all([getProducts(categoryId), getSavedProducts()])
      .then(([prods, saved]) => {
        setProducts(prods);
        setSavedIds(new Set(saved.map((s) => s.productId)));
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleSave = async (product: FurnitureProduct) => {
    try {
      await saveProduct(product);
      setSavedIds((prev) => new Set(prev).add(product.id));
      onSaveChange?.();
    } catch {
      // already saved — ignore
    }
  };

  const handleUnsave = async (product: FurnitureProduct) => {
    await unsaveProduct(product.id);
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
    onSaveChange?.();
  };

  return (
    <div className="fcat-page">
      <div className="fcat-page__header">
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
              onSave={() => handleSave(product)}
              onUnsave={() => handleUnsave(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
