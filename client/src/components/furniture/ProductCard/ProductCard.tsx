import { FurnitureProduct } from "../../../types";
import "./ProductCard.css";

interface Props {
  product: FurnitureProduct;
  isSaved: boolean;
  isOpen: boolean;
  onClick: (product: FurnitureProduct, rect: DOMRect) => void;
}

export default function ProductCard({ product, isSaved, isOpen, onClick }: Props) {
  return (
    <button
      className={`product-card${isOpen ? " product-card--open" : ""}${isSaved ? " product-card--saved" : ""}`}
      onClick={(e) => onClick(product, (e.currentTarget as HTMLButtonElement).getBoundingClientRect())}
    >
      <div className="product-card__img-wrap">
        <img src={product.imageUrl} alt={product.name} className="product-card__img" />
        {isSaved && <span className="product-card__saved-badge">שמור</span>}
      </div>
      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">₪{product.price.toLocaleString()}</p>
        <p className="product-card__store">{product.storeName}</p>
      </div>
    </button>
  );
}
