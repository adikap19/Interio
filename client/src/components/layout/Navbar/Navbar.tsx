import { useRef, useState, useEffect } from "react";
import { User } from "../../../types";
import api from "../../../services/api";
import "./Navbar.css";

interface Props {
  user: User;
  onLogout: () => void;
  onOpenSettings: () => void;
  onUserUpdate: (updated: User) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Navbar({ user, onLogout, onOpenSettings, onUserUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const avatarUrl = ev.target?.result as string;
      // Update locally immediately so avatar shows right away
      onUserUpdate({ ...user, avatarUrl });
      try {
        const { data } = await api.patch<User>("/auth/profile", { avatarUrl });
        onUserUpdate(data);
      } catch {
        // silently ignore upload errors
      }
    };
    reader.readAsDataURL(file);
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left" />

      <div className="navbar__center">INTERIO</div>

      <div className="navbar__right" ref={dropdownRef}>
        {/* Avatar — click opens dropdown only */}
        <button
          className="navbar__avatar-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open user menu"
        >
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="avatar" className="navbar__avatar-img" />
          ) : (
            <span className="navbar__avatar-initials">
              {getInitials(user.name)}
            </span>
          )}
        </button>

        {/* Hidden file input — triggered only from dropdown */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="navbar__avatar-input"
          onChange={handleAvatarUpload}
        />

        {/* Dropdown */}
        {open && (
          <div className="navbar__dropdown">
            {/* User info header */}
            <div className="navbar__dropdown-header">
              <div className="navbar__dropdown-avatar">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
              </div>
              <div className="navbar__dropdown-info">
                <div className="navbar__dropdown-name">{user.name}</div>
                <div className="navbar__dropdown-email">{user.email}</div>
              </div>
            </div>

            <div className="navbar__dropdown-actions">
              {/* Choose photo */}
              <button
                className="navbar__dropdown-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Choose photo
              </button>

              {/* Options → settings modal */}
              <button
                className="navbar__dropdown-btn"
                onClick={() => {
                  setOpen(false);
                  onOpenSettings();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Options
              </button>

              <div className="navbar__dropdown-divider" />

              {/* Sign out */}
              <button
                className="navbar__dropdown-btn navbar__dropdown-btn--danger"
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
