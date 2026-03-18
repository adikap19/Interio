import { COLOR_PALETTES } from "../../components/styleWizard/styleWizard.config";

interface Props {
  value: string;
  onChange: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPalette({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="sys-card">
      <h2 className="sys-card__title">Choose your color palette</h2>
      <div className="sys-palette-grid">
        {COLOR_PALETTES.map((p) => (
          <button
            key={p.id}
            className={`sys-palette-btn${value === p.id ? " sys-palette-btn--active" : ""}`}
            onClick={() => onChange(p.id)}
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
        <button className="sys-back-btn" onClick={onBack}>← Back</button>
        <button className="sys-next-btn" disabled={!value} onClick={onNext}>Next →</button>
      </div>
    </div>
  );
}
