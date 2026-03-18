import { STYLE_OPTIONS } from "../../components/styleWizard/styleWizard.config";

interface Props {
  value: string;
  onChange: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepStyle({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="sys-card">
      <h2 className="sys-card__title">What's your preferred style?</h2>
      <div className="sys-style-grid">
        {STYLE_OPTIONS.map((s) => (
          <button
            key={s.id}
            className={`sys-style-btn${value === s.id ? " sys-style-btn--active" : ""}`}
            onClick={() => onChange(s.id)}
          >
            {s.label}
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
