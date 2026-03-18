import { ROOM_TYPES } from "../../components/styleWizard/styleWizard.config";

interface Props {
  value: string;
  onChange: (id: string) => void;
  onNext: () => void;
}

export default function StepRoom({ value, onChange, onNext }: Props) {
  return (
    <div className="sys-card">
      <h2 className="sys-card__title">Which room are you styling?</h2>
      <div className="sys-room-grid">
        {ROOM_TYPES.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`sys-room-btn${value === id ? " sys-room-btn--active" : ""}`}
            onClick={() => onChange(id)}
          >
            <Icon className="sys-room-btn__icon" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <button className="sys-next-btn" disabled={!value} onClick={onNext}>
        Next →
      </button>
    </div>
  );
}
