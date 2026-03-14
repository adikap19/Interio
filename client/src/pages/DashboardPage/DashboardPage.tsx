import { useState, useRef } from "react";
import { User } from "../../types";
import { logout } from "../../services/auth";
import Navbar from "../../components/layout/Navbar/Navbar";
import SettingsModal from "../../components/layout/SettingsModal/SettingsModal";
import SubNav, { NAV_ITEMS } from "../../components/layout/SubNav/SubNav";
import StyleSection, { STYLES } from "./StyleSection";
import ExploreFurniturePage from "../ExploreFurniturePage/ExploreFurniturePage";
import FurnitureCategoryPage from "../FurnitureCategoryPage/FurnitureCategoryPage";
import MoodBoardPage from "../MoodBoardPage/MoodBoardPage";
import "./DashboardPage.css";

interface Props {
  user: User;
  onLogout: () => void;
}

export default function DashboardPage({ user: initialUser, onLogout }: Props) {
  const [user, setUser] = useState(initialUser);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("explore");
  const [activeFurnitureId, setActiveFurnitureId] = useState<string | null>(null);
  const [moodboardRefresh, setMoodboardRefresh] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleScroll = () => {
    document
      .querySelector(".style-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dashboard-page">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenSettings={() => setSettingsOpen(true)}
        onUserUpdate={(updated) => setUser(updated)}
      />
      <SubNav
        active={activeNav}
        onSelect={(id) => { setActiveNav(id); setActiveFurnitureId(null); }}
      />

      {activeNav === "explore" ? (
        <>
          {/* Hero */}
          <section className="dashboard-hero" ref={heroRef}>
            <div className="dashboard-hero__bg" />
            <div className="dashboard-hero__content">
              <p className="dashboard-hero__eyebrow">
                Welcome, {user.name.split(" ")[0]}
              </p>
              <h1 className="dashboard-hero__title">
                Explore Different
                <br />
                Design Styles
              </h1>
              <p className="dashboard-hero__subtitle">
                Curate your perfect interior. Discover six timeless aesthetics,
                <br />
                save what inspires you, and build moodboards that feel like home.
              </p>
              <button className="dashboard-hero__btn" onClick={handleScroll}>
                Start Exploring
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </button>
            </div>
          </section>

          {/* Style sections */}
          <div className="dashboard-styles">
            {STYLES.map((style, i) => (
              <StyleSection key={style.id} style={style} index={i} />
            ))}
          </div>
        </>
      ) : activeNav === "furniture" ? (
        activeFurnitureId ? (
          <FurnitureCategoryPage
            categoryId={activeFurnitureId}
            onBack={() => setActiveFurnitureId(null)}
            onSaveChange={() => setMoodboardRefresh((n) => n + 1)}
          />
        ) : (
          <ExploreFurniturePage onSelectCategory={setActiveFurnitureId} />
        )
      ) : activeNav === "moodboard" ? (
        <MoodBoardPage refreshKey={moodboardRefresh} />
      ) : (
        <div className="dashboard-placeholder">
          <p className="dashboard-placeholder__label">
            {NAV_ITEMS.find((n) => n.id === activeNav)?.label}
          </p>
          <h2 className="dashboard-placeholder__title">Coming Soon</h2>
          <p className="dashboard-placeholder__sub">
            This section is currently being crafted. Check back soon.
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <span className="dashboard-footer__brand">INTERIO</span>
        <span className="dashboard-footer__copy">
          © {new Date().getFullYear()} — Your interior moodboard
        </span>
      </footer>

      {settingsOpen && (
        <SettingsModal
          user={user}
          onClose={() => setSettingsOpen(false)}
          onUserUpdate={(updated) => setUser(updated)}
        />
      )}
    </div>
  );
}
