import { useState, useEffect } from "react";
import { FurnitureProduct } from "../types";
import { getSavedProducts, saveProduct, unsaveProduct } from "../services/furniture";

export function useSaveProduct() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    getSavedProducts().then((saved) => setSavedIds(new Set(saved.map((s) => s.productId))));
  }, []);

  const handleSave = async (product: FurnitureProduct) => {
    try {
      await saveProduct(product);
      setSavedIds((prev) => new Set(prev).add(product.id));
    } catch { /* already saved */ }
  };

  const handleUnsave = async (product: FurnitureProduct) => {
    await unsaveProduct(product.id);
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  return { savedIds, handleSave, handleUnsave };
}
