import { useState, useEffect, useRef } from "react";

export interface StyleItem {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export const STYLES: StyleItem[] = [
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
      "https://i.pinimg.com/1200x/00/66/42/00664213808ea131b8fbedce3c20b41a.jpg",
    ],
  },
  {
    id: "industrial",
    name: "Industrial",
    description:
      "Exposed brick, raw steel beams, weathered leather, and Edison bulbs celebrate the beauty of unfinished materials. Industrial style finds romance in the functional — urban, bold, and unapologetically honest about how things are made.",
    images: [
      "https://i.pinimg.com/1200x/1f/66/a6/1f66a6a17d85ac71d899de7711aa7d7a.jpg",
      "https://i.pinimg.com/736x/56/14/c7/5614c7224c190106e55e6d80d1dbff49.jpg",
      "https://i.pinimg.com/1200x/36/3e/6a/363e6a5d56e697ec10d2ed85f1f20f6c.jpg",
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

interface Props {
  style: StyleItem;
  index: number;
}

export default function StyleSection({ style, index }: Props) {
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
      { threshold: 0.12 }
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
          <div key={i} className={`style-section__img-wrap style-section__img-wrap--${i}`}>
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
