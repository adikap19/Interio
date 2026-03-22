import { useState } from "react";
import api from "../../services/api";
import { FurnitureProduct } from "../../types";
import { useSaveProduct } from "../../hooks/useSaveProduct";
import StepRoom from "../../components/styleWizard/StepRoom";
import StepPalette from "../../components/styleWizard/StepPalette";
import StepBudget from "../../components/styleWizard/StepBudget";
import RecommendationsView from "../../components/styleWizard/RecommendationsView";
import PageHeader from "../../components/ui/PageHeader/PageHeader";
import "./StyleYourSpacePage.css";

interface FormState {
  roomType: string;
  colorPalette: string;
  budget: number;
}

const INITIAL_FORM: FormState = { roomType: "", colorPalette: "", budget: 5000 };

export default function StyleYourSpacePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [results, setResults] = useState<FurnitureProduct[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { savedIds, handleSave, handleUnsave } = useSaveProduct();

  const set = (key: keyof FormState) => (value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/furniture/recommend", form);
      setResults(data);
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setForm(INITIAL_FORM);
    setResults(null);
  };

  return (
    <div className="sys-page">
      {step < 4 && (
        <div className="sys-header">
          <PageHeader
            eyebrow="Personalized for you"
            title="Style Your Space"
            subtitle="Answer a few questions and get personalized furniture recommendations"
          />
          <div className="sys-steps">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`sys-step-dot${step === s ? " sys-step-dot--active" : step > s ? " sys-step-dot--done" : ""}`}
              />
            ))}
          </div>
        </div>
      )}

      {step === 1 && <StepRoom value={form.roomType} onChange={set("roomType")} onNext={() => setStep(2)} />}
      {step === 2 && <StepPalette value={form.colorPalette} onChange={set("colorPalette")} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {step === 3 && (
        <StepBudget
          budget={form.budget}
          roomType={form.roomType}
          colorPalette={form.colorPalette}
          loading={loading}
          onChange={set("budget") as (v: number) => void}
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && results && (
        <RecommendationsView
          results={results}
          savedIds={savedIds}
          roomType={form.roomType}
          budget={form.budget}
          onSave={handleSave}
          onUnsave={handleUnsave}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
