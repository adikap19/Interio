import { useState, useEffect } from "react";
import api from "../../services/api";
import { FurnitureProduct } from "../../types";
import { getSavedProducts, saveProduct, unsaveProduct } from "../../services/furniture";
import ProductCard from "../../components/furniture/ProductCard/ProductCard";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "./StyleYourSpacePage.css";

const ROOM_TYPES = [
  { id: "bedroom", label: "Bedroom", Icon: KingBedOutlinedIcon },
  { id: "living", label: "Living Room", Icon: WeekendOutlinedIcon },
  { id: "dining", label: "Dining Room", Icon: DinnerDiningOutlinedIcon },
  { id: "office", label: "Home Office", Icon: LaptopMacOutlinedIcon },
  { id: "all", label: "Whole Home", Icon: HomeOutlinedIcon },
];

const STYLES = [
  { id: "scandinavian", label: "Scandinavian" },
  { id: "minimalist", label: "Minimalist" },
  { id: "bohemian", label: "Bohemian" },
  { id: "industrial", label: "Industrial" },
  { id: "japandi", label: "Japandi" },
  { id: "cottagecore", label: "Cottagecore" },
];

const COLOR_PALETTES = [
  { id: "warm", label: "Warm Neutrals", swatch: ["#e8ddd0", "#c9b99a", "#8b7355"] },
  { id: "cool", label: "Cool Tones", swatch: ["#d4dde4", "#a8b8c8", "#5c7a8a"] },
  { id: "dark", label: "Bold & Dark", swatch: ["#2a2a2a", "#444", "#666"] },
  { id: "natural", label: "Natural & Green", swatch: ["#d8e4d0", "#a8c090", "#5a7a50"] },
  { id: "white", label: "Pure White", swatch: ["#ffffff", "#f5f5f3", "#e8e8e4"] },
];

export default function StyleYourSpacePage() {
  const [step, setStep] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [style, setStyle] = useState("");
  const [colorPalette, setColorPalette] = useState("");
  const [budget, setBudget] = useState(5000);
  const [results, setResults] = useState<FurnitureProduct[] | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSavedProducts().then((saved) => setSavedIds(new Set(saved.map((s) => s.productId))));
  }, []);

  const canNext1 = !!roomType;
  const canNext2 = !!style;
  const canNext3 = !!colorPalette;

  const handleSave = async (product: FurnitureProduct) => {
    try {
      await saveProduct(product);
      setSavedIds((prev) => new Set(prev).add(product.id));
    } catch { /* already saved */ }
  };

  const handleUnsave = async (product: FurnitureProduct) => {
    await unsaveProduct(product.id);
    setSavedIds((prev) => { const next = new Set(prev); next.delete(product.id); return next; });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/furniture/recommend", {
        budget,
        style,
        roomType,
        colorPalette,
      });
      setResults(data);
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setRoomType("");
    setStyle("");
    setColorPalette("");
    setBudget(5000);
    setResults(null);
  };

  return (
    <div className="sys-page">
      {step < 5 && (
        <div className="sys-header">
          <h1>Style Your Space</h1>
          <p className="sys-header__sub">Answer a few questions and get personalized furniture recommendations</p>
          <div className="sys-steps">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`sys-step-dot${step === s ? " sys-step-dot--active" : step > s ? " sys-step-dot--done" : ""}`} />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="sys-card">
          <h2 className="sys-card__title">Which room are you styling?</h2>
          <div className="sys-room-grid">
            {ROOM_TYPES.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`sys-room-btn${roomType === id ? " sys-room-btn--active" : ""}`}
                onClick={() => setRoomType(id)}
              >
                <Icon className="sys-room-btn__icon" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <button className="sys-next-btn" disabled={!canNext1} onClick={() => setStep(2)}>
            Next →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="sys-card">
          <h2 className="sys-card__title">What's your preferred style?</h2>
          <div className="sys-style-grid">
            {STYLES.map((s) => (
              <button
                key={s.id}
                className={`sys-style-btn${style === s.id ? " sys-style-btn--active" : ""}`}
                onClick={() => setStyle(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="sys-nav">
            <button className="sys-back-btn" onClick={() => setStep(1)}>← Back</button>
            <button className="sys-next-btn" disabled={!canNext2} onClick={() => setStep(3)}>Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="sys-card">
          <h2 className="sys-card__title">Choose your color palette</h2>
          <div className="sys-palette-grid">
            {COLOR_PALETTES.map((p) => (
              <button
                key={p.id}
                className={`sys-palette-btn${colorPalette === p.id ? " sys-palette-btn--active" : ""}`}
                onClick={() => setColorPalette(p.id)}
              >
                <div className="sys-palette-swatches">
                  {p.swatch.map((c, i) => (
                    <div key={i} className="sys-palette-swatch" style={{ background: c }} />
                  ))}
                </div>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
          <div className="sys-nav">
            <button className="sys-back-btn" onClick={() => setStep(2)}>← Back</button>
            <button className="sys-next-btn" disabled={!canNext3} onClick={() => setStep(4)}>Next →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="sys-card">
          <h2 className="sys-card__title">What's your budget?</h2>
          <div className="sys-budget">
            <div className="sys-budget__amount">₪{budget.toLocaleString()}</div>
            <input
              type="range"
              min={500}
              max={30000}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="sys-budget__slider"
            />
            <div className="sys-budget__labels">
              <span>₪500</span>
              <span>₪30,000</span>
            </div>
          </div>
          <div className="sys-summary">
            <div className="sys-summary__item"><span>Room</span><strong>{ROOM_TYPES.find(r => r.id === roomType)?.label}</strong></div>
            <div className="sys-summary__item"><span>Style</span><strong>{STYLES.find(s => s.id === style)?.label}</strong></div>
            <div className="sys-summary__item"><span>Palette</span><strong>{COLOR_PALETTES.find(p => p.id === colorPalette)?.label}</strong></div>
          </div>
          <div className="sys-nav">
            <button className="sys-back-btn" onClick={() => setStep(3)}>← Back</button>
            <button className="sys-submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Finding matches..." : "✦ Get Recommendations"}
            </button>
          </div>
        </div>
      )}

      {step === 5 && results && (
        <div className="sys-results">
          <div className="sys-results__header">
            <p className="furniture-page__eyebrow">Curated for you</p>
            <h1 className="furniture-page__title">Your Recommendations</h1>
            <p className="furniture-page__subtitle">{results.length} items · {ROOM_TYPES.find(r => r.id === roomType)?.label} · {STYLES.find(s => s.id === style)?.label} · budget ₪{budget.toLocaleString()}</p>
            <button className="sys-restart-btn" onClick={handleReset}>Start Over</button>
          </div>
          <div className="sys-results__grid">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSaved={savedIds.has(product.id)}
                onSave={() => handleSave(product)}
                onUnsave={() => handleUnsave(product)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
