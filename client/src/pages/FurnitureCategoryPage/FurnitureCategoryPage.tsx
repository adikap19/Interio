import { useState, useEffect } from "react";
import { FURNITURE_CATEGORIES } from "../ExploreFurniturePage/ExploreFurniturePage";
import { FurnitureProduct } from "../../types";
import { getProducts } from "../../services/furniture";
import { useSaveProduct } from "../../hooks/useSaveProduct";
import ProductCard from "../../components/furniture/ProductCard/ProductCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import "./FurnitureCategoryPage.css";

interface Props {
  categoryId: string;
  onBack: () => void;
  onSaveChange?: () => void;
}

export default function FurnitureCategoryPage({ categoryId, onBack, onSaveChange }: Props) {
  const category = FURNITURE_CATEGORIES.find((c) => c.id === categoryId);

  const [products, setProducts] = useState<FurnitureProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { savedIds, handleSave, handleUnsave } = useSaveProduct();

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [categoryId]);

  const onSave = async (product: FurnitureProduct) => {
    await handleSave(product);
    onSaveChange?.();
  };

  const onUnsave = async (product: FurnitureProduct) => {
    await handleUnsave(product);
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
        <LoadingSpinner />
      ) : (
        <div className="fcat-page__grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={savedIds.has(product.id)}
              onSave={() => onSave(product)}
              onUnsave={() => onUnsave(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
