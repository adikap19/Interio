import { useState, useEffect, useRef } from "react";
import { User } from "../../types";
import { logout } from "../../services/auth";
import Navbar from "../../components/layout/Navbar/Navbar";
import SettingsModal from "../../components/layout/SettingsModal/SettingsModal";
import "./DashboardPage.css";

interface Props {
  user: User;
  onLogout: () => void;
}

const STYLES = [
  {
    id: "scandinavian",
    name: "Scandinavian / Nordic",
    description:
      "Born from long winters and a deep respect for craftsmanship, Scandinavian design strips away the unnecessary to reveal pure, quiet beauty. Natural wood, muted whites, and honest materials come together in spaces that feel both functional and deeply restful.",
    images: [
      "https://media.designcafe.com/wp-content/uploads/2020/11/18133838/scandinavian-interior-design-ideas.jpg",
      "https://www.thespruce.com/thmb/0Af7qsguKz8O01cILcE_cv0h_fY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EmilyHendersonMoutainHouseLivingRoomHiRes1-487ff9fa0d1e4bf0b6c4d0e01da1baec.jpg",
      "https://www.nordicessentials.uk/cdn/shop/articles/1._Scandinavian_design_minimalist_design_interior_design_home_decor_furniture_design_Nordic_design_hygge_sustainable_design_eco-friendly_design_Danish_design_9d6c1db4-beac-47f0-9274-d.jpg?v=1757417054&width=1000",
    ],
  },
  {
    id: "minimalist",
    name: "Modern Minimalist",
    description:
      "Every object earns its place. Modern minimalism is not about emptiness — it is about intention. Clean lines, a restrained palette of whites and warm greys, and carefully chosen statement pieces create spaces where the mind can finally breathe.",
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/22709010-2007946149450467-5502321846021783552-n-1538427422.jpg?crop=0.6xw:1xh;center,top",
      "https://www.modernfurnishings.com/cdn/shop/articles/bringing-modern-aesthetics-to-your-home-modern-studio.jpg?v=1717752164",
      "https://oakandpineonline.co.uk/wp-content/uploads/2023/04/interior-design.jpg",
    ],
  },
  {
    id: "bohemian",
    name: "Bohemian",
    description:
      "Layered textiles, hand-woven rugs, trailing plants, and artifacts gathered from around the world — bohemian interiors tell a personal story. Rich jewel tones and earthy terracottas collide in beautiful, unapologetic abundance.",
    images: [
      "https://www.hogandesignandconstruction.com/hs-fs/hubfs/luis-j-corniel-bJGBQj5cf6w-unsplash%20(1).jpg?width=1920&height=1277&name=luis-j-corniel-bJGBQj5cf6w-unsplash%20(1).jpg",
      "https://miro.medium.com/0*ueJXGyCClvpnTcJH",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYAlwNmgO0ouAm8SH9Amx1LNmyqLLu-7I-ug&s",
    ],
  },
  {
    id: "industrial",
    name: "Industrial",
    description:
      "Exposed brick, raw steel beams, weathered leather, and Edison bulbs celebrate the beauty of unfinished materials. Industrial style finds romance in the functional — urban, bold, and unapologetically honest about how things are made.",
    images: [
      "https://images.unsplash.com/photo-1564540574859-0dfb63985953?w=600&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    ],
  },
  {
    id: "japandi",
    name: "Japandi",
    description:
      "Where Japanese wabi-sabi meets Scandinavian hygge, Japandi finds harmony. Low-profile furniture, neutral tones of clay and ash, natural textures, and a devotion to simplicity create interiors that feel meditative, timeless, and profoundly serene.",
    images: [
      "https://i.etsystatic.com/51212267/r/il/a09b03/5938487374/il_570xN.5938487374_ciel.jpg",
      "https://interiordesign.net/wp-content/uploads/2024/10/Interior-Design-The-Rasidence-Studio-Right-Angle-the-rasidence-10.jpg",
      "https://cdn.home-designing.com/wp-content/uploads/2022/01/modular-sofa-4-1024x683.jpg",
    ],
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    description:
      "Wildflowers in ceramic pitchers, linen curtains catching morning light, vintage china stacked on open shelves — cottagecore is an ode to slowness and the pastoral life. Warm creams, sage greens, and dusty roses wrap every corner in gentle nostalgia.",
    images: [
      "https://i.pinimg.com/736x/f8/e8/40/f8e8406efcfc471662a1258d84ace6fc.jpg",
      "https://cdn.homedit.com/wp-content/uploads/2022/10/Understanding-the-Cottagecore-Aesthetic.jpg",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
  },
];

function StyleSection({
  style,
  index,
}: {
  style: (typeof STYLES)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`style-section style-section--${isEven ? "even" : "odd"} ${visible ? "style-section--visible" : ""}`}
    >
      <div className="style-section__text">
        <div className="style-section__index">0{index + 1}</div>
        <h2 className="style-section__name">{style.name}</h2>
        <p className="style-section__desc">{style.description}</p>
      </div>
      <div className="style-section__images">
        {style.images.map((src, i) => (
          <div
            key={i}
            className={`style-section__img-wrap style-section__img-wrap--${i}`}
          >
            <img
              src={src}
              alt={`${style.name} ${i + 1}`}
              className="style-section__img"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DashboardPage({ user: initialUser, onLogout }: Props) {
  const [user, setUser] = useState(initialUser);
  const [settingsOpen, setSettingsOpen] = useState(false);
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
      />

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
            <em>Design Styles</em>
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
