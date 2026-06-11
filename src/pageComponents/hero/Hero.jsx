import "./Hero.css";
import { useCallback, useEffect, useMemo, useState } from "react";

import instagram from "../../assets/hero/instagram.png";
import tiktok from "../../assets/hero/tiktok.png";
import facebook from "../../assets/hero/facebook.png";

export default function Hero() {
  const kittens = useMemo(() => {
    const fullImages = Object.entries(
      import.meta.glob("../../assets/cats/hero/*.{jpeg,jpg,png,webp}", {
        eager: true,
      })
    ).sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, { numeric: true })
    );

    const thumbImages = Object.entries(
      import.meta.glob("../../assets/cats/hero_thumbs/*.{jpeg,jpg,png,webp}", {
        eager: true,
      })
    ).sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, { numeric: true })
    );

    const getFileBaseName = (path) => {
      return path
        .split("/")
        .pop()
        .replace(/\.(jpeg|jpg|png|webp)$/i, "");
    };

    const thumbsByName = new Map(
      thumbImages.map(([thumbPath, thumbModule]) => [
        getFileBaseName(thumbPath),
        thumbModule.default,
      ])
    );

    const pairedImages = fullImages.map(([fullPath, fullModule], index) => {
      const baseName = getFileBaseName(fullPath);

      return {
        id: `${baseName}-${index}`,
        image: thumbsByName.get(baseName) || fullModule.default,
        fullImage: fullModule.default,
      };
    });

    const shuffledImages = [...pairedImages];

    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [shuffledImages[i], shuffledImages[randomIndex]] = [
        shuffledImages[randomIndex],
        shuffledImages[i],
      ];
    }

    return shuffledImages.slice(0, 9);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || kittens.length === 0) return null;

      return (prev + 1) % kittens.length;
    });
  }, [kittens.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || kittens.length === 0) return null;

      return prev === 0 ? kittens.length - 1 : prev - 1;
    });
  }, [kittens.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  const selectedKitten =
    selectedIndex !== null ? kittens[selectedIndex] : null;

  return (
    <section className="hero" id="home">
      <div className="hero-bg-pattern"></div>
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            ✦ NAŠI MAČIĆI DOLAZE S RODOVNIKOM SVJETSKE ORGANIZACIJE MAČAKA (WCF)
          </div>

          <h2 className="hero-reservation-title">
            Primamo rezervacije za novo leglo!
          </h2>

          <h1 className="hero-title">
            Mi smo <span>Azurefiore</span>
          </h1>

          <h2 className="hero-subtitle">
            Uzgajivačnica Ragdoll mačaka iz srca Slavonije
          </h2>

          <p className="hero-description">
            Ekskluzivni Blue i Lilac Ragdoll mačići uzgojeni s fokusom na ljubav,
            zdravu prehranu i maženje.
          </p>

          <div className="hero-actions">
            <a href="#gallery" className="hero-btn hero-btn-primary">
              Pogledajte galeriju
            </a>

            <a href="#contact" className="hero-btn hero-btn-secondary">
              Kontaktirajte nas
            </a>
          </div>

          <div className="hero-socials" aria-label="Društvene mreže">
            <a
              href="https://www.instagram.com/azurefiore_/"
              target="_blank"
              rel="noreferrer"
              className="hero-social"
            >
              <img src={instagram} alt="" loading="lazy" decoding="async" />
              <div>
                <strong>Instagram</strong>
                <span>@azurefiore_</span>
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@azurefiore"
              target="_blank"
              rel="noreferrer"
              className="hero-social"
            >
              <img src={tiktok} alt="" loading="lazy" decoding="async" />
              <div>
                <strong>TikTok</strong>
                <span>@azurefiore</span>
              </div>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61560536721870"
              target="_blank"
              rel="noreferrer"
              className="hero-social"
            >
              <img src={facebook} alt="" loading="lazy" decoding="async" />
              <div>
                <strong>Facebook</strong>
                <span>Azurefiore</span>
              </div>
            </a>
          </div>
        </div>

        {kittens.length > 0 && (
          <div className="hero-gallery-wrapper">

            <div className="hero-gallery">
              {kittens.map((kitten, index) => (
                <button
                  key={kitten.id}
                  className={`kitten-card kitten-card-${index + 1}`}
                  onClick={() => setSelectedIndex(index)}
                  aria-label="Otvori veću sliku mačića"
                >
                  <img
                    src={kitten.image}
                    alt="Ragdoll mačić"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding={index === 0 ? "auto" : "async"}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                </button>
              ))}
            </div>

            <div className="hero-gallery-note">
              Klikni na fotku za veći prikaz
            </div>
          </div>
        )}
      </div>

      {selectedKitten && (
        <div
          className="image-modal"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="modal-close"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            aria-label="Zatvori galeriju"
          >
            ×
          </button>

          <button
            className="modal-arrow modal-arrow-left"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Prethodna slika"
          >
            ←
          </button>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedKitten.fullImage}
              alt="Ragdoll mačić"
              className="modal-image"
              loading="eager"
              decoding="async"
            />
          </div>

          <button
            className="modal-arrow modal-arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Sljedeća slika"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}