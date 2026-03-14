import { FurnitureProduct } from "../../../types";
import "./ProductCard.css";

interface Props {
  product: FurnitureProduct;
  isSaved: boolean;
  onSave: () => void;
  onUnsave: () => void;
}

export default function ProductCard({ product, isSaved, onSave, onUnsave }: Props) {
  return (
    <div className="pin-card">
      <div className="pin-card__img-wrap">
        <img src={product.imageUrl} alt={product.name} className="pin-card__img" />

        <div className="pin-card__overlay">
          <button
            className={`pin-card__save${isSaved ? " pin-card__save--saved" : ""}`}
            onClick={(e) => { e.stopPropagation(); isSaved ? onUnsave() : onSave(); }}
          >
            {isSaved ? "Saved ✓" : "Add to Moodboard"}
          </button>

          <a
            href={product.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pin-card__visit"
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
            Visit Store
          </a>
        </div>
      </div>

      <div className="pin-card__info">
        <p className="pin-card__name">{product.name}</p>
        <p className="pin-card__price">₪{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
