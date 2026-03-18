import { useState, FormEvent } from "react";
import { loginWithPassword, loginWithGoogle, register } from "../../services/auth";
import { User } from "../../types";
import AuthLeftPanel from "../../components/auth/AuthLeftPanel";
import AuthForm from "../../components/auth/AuthForm";
import GoogleLoginButton from "../../components/auth/GoogleLoginButton";
import "./AuthPage.css";

interface Props {
  onAuth: (user: User) => void;
}

export default function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasGoogle = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = mode === "login"
        ? await loginWithPassword(email, password)
        : await register(name, email, password);
      onAuth(res.user);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } }).response?.data?.error;
      setError(msg || "Something went wrong. Please try again.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (accessToken: string) => {
    setError("");
    try {
      const res = await loginWithGoogle(accessToken);
      onAuth(res.user);
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-root">
      <AuthLeftPanel />

      <div className="auth-right">
        {hasGoogle && (
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google sign-in was cancelled.")}
            disabled={loading}
          />
        )}
        <AuthForm
          mode={mode}
          name={name}
          email={email}
          password={password}
          showPass={showPass}
          error={error}
          loading={loading}
          onName={setName}
          onEmail={(v) => { setEmail(v); setError(""); }}
          onPassword={(v) => { setPassword(v); setError(""); }}
          onTogglePass={() => setShowPass((p) => !p)}
          onSubmit={handleSubmit}
          onSwitchMode={switchMode}
        />
      </div>
    </div>
  );
}
