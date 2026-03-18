import { ROOM_TYPES, STYLE_OPTIONS, COLOR_PALETTES } from "../../components/styleWizard/styleWizard.config";

interface Props {
  budget: number;
  roomType: string;
  style: string;
  colorPalette: string;
  loading: boolean;
  onChange: (value: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function StepBudget({
  budget, roomType, style, colorPalette, loading, onChange, onSubmit, onBack,
}: Props) {
  return (
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
          onChange={(e) => onChange(Number(e.target.value))}
          className="sys-budget__slider"
        />
        <div className="sys-budget__labels">
          <span>₪500</span>
          <span>₪30,000</span>
        </div>
      </div>

      <div className="sys-summary">
        <div className="sys-summary__item">
          <span>Room</span>
          <strong>{ROOM_TYPES.find((r) => r.id === roomType)?.label}</strong>
        </div>
        <div className="sys-summary__item">
          <span>Style</span>
          <strong>{STYLE_OPTIONS.find((s) => s.id === style)?.label}</strong>
        </div>
        <div className="sys-summary__item">
          <span>Palette</span>
          <strong>{COLOR_PALETTES.find((p) => p.id === colorPalette)?.label}</strong>
        </div>
      </div>

      <div className="sys-nav">
        <button className="sys-back-btn" onClick={onBack}>← Back</button>
        <button className="sys-submit-btn" onClick={onSubmit} disabled={loading}>
          {loading ? "Finding matches..." : "✦ Get Recommendations"}
        </button>
      </div>
    </div>
  );
}
