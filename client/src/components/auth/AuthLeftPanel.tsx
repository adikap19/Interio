export default function AuthLeftPanel() {
  return (
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
          perfect space,
          <br />
          your way.
        </h2>
        <p className="auth-left__desc">
          Create beautiful moodboards for every room. Find inspiration,
          collect ideas, and bring your interior vision to life.
        </p>
        <div className="auth-left__chips">
          {["Living Room", "Bedroom", "Kitchen", "Office"].map((c) => (
            <span key={c} className="auth-left__chip">{c}</span>
          ))}
        </div>
      </div>

      <div className="auth-left__bottom">© 2026 INTERIO. All rights reserved.</div>
    </div>
  );
}
