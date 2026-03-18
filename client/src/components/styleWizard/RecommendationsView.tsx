import { FurnitureProduct } from "../../types";
import ProductCard from "../furniture/ProductCard/ProductCard";
import PageHeader from "../ui/PageHeader/PageHeader";
import { ROOM_TYPES, STYLE_OPTIONS } from "../../components/styleWizard/styleWizard.config";

interface Props {
  results: FurnitureProduct[];
  savedIds: Set<string>;
  roomType: string;
  style: string;
  budget: number;
  onSave: (product: FurnitureProduct) => void;
  onUnsave: (product: FurnitureProduct) => void;
  onReset: () => void;
}

export default function RecommendationsView({
  results, savedIds, roomType, style, budget, onSave, onUnsave, onReset,
}: Props) {
  const roomLabel = ROOM_TYPES.find((r) => r.id === roomType)?.label;
  const styleLabel = STYLE_OPTIONS.find((s) => s.id === style)?.label;

  return (
    <div className="sys-results">
      <div className="sys-results__header">
        <PageHeader
          eyebrow="Curated for you"
          title="Your Recommendations"
          subtitle={`${results.length} items · ${roomLabel} · ${styleLabel} · budget ₪${budget.toLocaleString()}`}
        />
        <button className="sys-restart-btn" onClick={onReset}>Start Over</button>
      </div>
      <div className="sys-results__grid">
        {results.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSaved={savedIds.has(product.id)}
            onSave={() => onSave(product)}
            onUnsave={() => onUnsave(product)}
          />
        ))}
      </div>
    </div>
  );
}
