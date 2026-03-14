import { useState, FormEvent } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  loginWithPassword,
  loginWithGoogle,
  register,
} from "../../services/auth";
import { User } from "../../types";
import "./AuthPage.css";

const MUI_SX = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    "& fieldset": { borderColor: "#e0d5c8" },
    "&:hover fieldset": { borderColor: "#c4a882" },
    "&.Mui-focused fieldset": { borderColor: "#5c3a1e", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#5c3a1e" },
};

/* ── Google button in its own component so useGoogleLogin is isolated ── */
function GoogleLoginButton({
  onSuccess,
  onError,
  disabled,
}: {
  onSuccess: (token: string) => void;
  onError: () => void;
  disabled: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      setLoading(true);
      try {
        onSuccess(access_token);
      } finally {
        setLoading(false);
      }
    },
    onError,
  });

  return (
    <>
      <button
        type="button"
        className="google-btn"
        onClick={() => googleLogin()}
        disabled={disabled || loading}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: "#5c3a1e" }} />
        ) : (
          <svg className="google-btn__icon" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        Continue with Google
      </button>
      <div className="auth-divider">or</div>
    </>
  );
}

/* ── Main auth page ── */
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
      const res =
        mode === "login"
          ? await loginWithPassword(email, password)
          : await register(name, email, password);
      onAuth(res.user);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } }).response
        ?.data?.error;
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
      {/* ── Left panel ── */}
      <div className="auth-left">
        <div className="auth-left__pattern" />

        <div className="auth-left__top">
          <div className="auth-left__logo">INTERIO</div>
          <div className="auth-left__tagline">Interior Moodboards</div>
        </div>

        <div className="auth-left__center">
          <h2 className="auth-left__headline">
            Design your
            <br />
            <span>perfect space,</span>
            <br />
            your way.
          </h2>
          <p className="auth-left__desc">
            Create beautiful moodboards for every room. Find inspiration,
            collect ideas, and bring your interior vision to life.
          </p>
          <div className="auth-left__chips">
            {["Living Room", "Bedroom", "Kitchen", "Office"].map((c) => (
              <span key={c} className="auth-left__chip">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="auth-left__bottom">
          © 2025 INTERIO. All rights reserved.
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-form-wrapper__header">
            <h1 className="auth-form-wrapper__title">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="auth-form-wrapper__subtitle">
              {mode === "login" ? (
                <>
                  <span>Don't have an account? </span>
                  <a onClick={switchMode}>Sign up</a>
                </>
              ) : (
                <>
                  <span>Already have an account? </span>
                  <a onClick={switchMode}>Sign in</a>
                </>
              )}
            </p>
          </div>

          {/* Google button — only rendered when clientId exists */}
          {hasGoogle && (
            <GoogleLoginButton
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google sign-in was cancelled.")}
              disabled={loading}
            />
          )}

          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className="auth-fields">
              {mode === "register" && (
                <TextField
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  size="small"
                  sx={MUI_SX}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline
                          sx={{ color: "#c4a882", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <TextField
                label="Email"
                type="text"
                inputMode="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                fullWidth
                size="small"
                autoComplete="email"
                sx={MUI_SX}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: "#c4a882", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                fullWidth
                size="small"
                autoComplete="current-password"
                sx={MUI_SX}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "#c4a882", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass((p) => !p)}
                        size="small"
                        edge="end"
                      >
                        {showPass ? (
                          <VisibilityOff
                            sx={{ color: "#c4a882", fontSize: 20 }}
                          />
                        ) : (
                          <Visibility sx={{ color: "#c4a882", fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {mode === "login" && (
              <div className="auth-forgot">
                <a>Forgot password?</a>
              </div>
            )}

            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#f5ede0" }} />
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
