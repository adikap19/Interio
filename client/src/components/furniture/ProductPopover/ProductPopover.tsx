import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FurnitureProduct } from "../../../types";
import "./ProductPopover.css";

interface Props {
  product: FurnitureProduct;
  anchorRect: DOMRect;
  isSaved: boolean;
  onSave: () => void;
  onUnsave: () => void;
  onClose: () => void;
}

const POPOVER_W = 240;
const POPOVER_H = 180;
const GAP = 10;

function calcPosition(rect: DOMRect): { top: number; left: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Try right
  if (rect.right + GAP + POPOVER_W <= vw) {
    return { top: Math.min(rect.top, vh - POPOVER_H - 8), left: rect.right + GAP };
  }
  // Try left
  if (rect.left - GAP - POPOVER_W >= 0) {
    return { top: Math.min(rect.top, vh - POPOVER_H - 8), left: rect.left - GAP - POPOVER_W };
  }
  // Below, centered
  const left = Math.max(8, Math.min(rect.left + rect.width / 2 - POPOVER_W / 2, vw - POPOVER_W - 8));
  const top = Math.min(rect.bottom + GAP, vh - POPOVER_H - 8);
  return { top, left };
}

export default function ProductPopover({ product, anchorRect, isSaved, onSave, onUnsave, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = calcPosition(anchorRect);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      className="product-popover"
      style={{ top: pos.top, left: pos.left }}
    >
      <button className="product-popover__close" onClick={onClose} aria-label="Close">✕</button>

      <p className="product-popover__name">{product.name}</p>
      <p className="product-popover__price">₪{product.price.toLocaleString()}</p>
      <p className="product-popover__store">{product.storeName}</p>

      <div className="product-popover__actions">
        <a
          href={product.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-popover__btn product-popover__btn--store"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Visit Store
        </a>

        {isSaved ? (
          <button className="product-popover__btn product-popover__btn--unsave" onClick={onUnsave}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Saved
          </button>
        ) : (
          <button className="product-popover__btn product-popover__btn--save" onClick={onSave}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Save to Moodboard
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}
