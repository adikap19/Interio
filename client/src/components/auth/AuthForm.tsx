import { FormEvent } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";

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

interface Props {
  mode: "login" | "register";
  name: string;
  email: string;
  password: string;
  showPass: boolean;
  error: string;
  loading: boolean;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onTogglePass: () => void;
  onSubmit: (e: FormEvent) => void;
  onSwitchMode: () => void;
}

export default function AuthForm({
  mode, name, email, password, showPass, error, loading,
  onName, onEmail, onPassword, onTogglePass, onSubmit, onSwitchMode,
}: Props) {
  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-wrapper__header">
        <h1 className="auth-form-wrapper__title">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="auth-form-wrapper__subtitle">
          {mode === "login" ? (
            <><span>Don't have an account? </span><a onClick={onSwitchMode}>Sign up</a></>
          ) : (
            <><span>Already have an account? </span><a onClick={onSwitchMode}>Sign in</a></>
          )}
        </p>
      </div>

      <form onSubmit={onSubmit} autoComplete="off" noValidate>
        <div className="auth-fields">
          {mode === "register" && (
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => onName(e.target.value)}
              required fullWidth size="small" sx={MUI_SX}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline sx={{ color: "#c4a882", fontSize: 20 }} />
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
            onChange={(e) => { onEmail(e.target.value); }}
            fullWidth size="small" autoComplete="email" sx={MUI_SX}
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
            onChange={(e) => onPassword(e.target.value)}
            fullWidth size="small" autoComplete="current-password" sx={MUI_SX}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: "#c4a882", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onTogglePass} size="small" edge="end">
                    {showPass
                      ? <VisibilityOff sx={{ color: "#c4a882", fontSize: 20 }} />
                      : <Visibility sx={{ color: "#c4a882", fontSize: 20 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {mode === "login" && (
          <div className="auth-forgot"><a>Forgot password?</a></div>
        )}

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading
            ? <CircularProgress size={20} sx={{ color: "#f5ede0" }} />
            : mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
