import "./Hero.css";
import { useState } from "react";

import Navbar from "../../components/navbar/Navbar";

import instagram from "../../assets/hero/instagram.png";
import tiktok from "../../assets/hero/tiktok.png";
import facebook from "../../assets/hero/facebook.png";

import g1 from "../../assets/gallery/litter/g1.jpeg";
import g2 from "../../assets/gallery/litter/g2.jpeg";
import g3 from "../../assets/gallery/litter/g3.jpeg";
import g4 from "../../assets/gallery/litter/g4.jpeg";

export default function Hero() {
  const images = [g1, g2, g3, g4];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero" id="home">
      <Navbar />

      <div className="noise"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-topline">
            ✦ NAŠI MAČIĆI DOLAZE S RODOVNIKOM SVJETSKE ORGANIZACIJE MAČAKA (WCF).
          </div>

          <h1 className="hero-title">
            Mi smo Azurefiore
          </h1>

          <h2 className="hero-subtitle">
            Uzgajivačnica Ragdoll mačaka iz srca Slavonije
          </h2>

          <p className="hero-description">
            Ekskluzivni Blue i Lilac Ragdoll mačići uzgojeni s fokusom na ljubav, zdravu prehranu i maženje.
          </p>

          <div className="hero-buttons">

            <a href="#gallery" className="hero-btn hero-primary">
              Pogledajte galeriju
            </a>

            <a href="#contact" className="hero-btn hero-secondary">
              Kontaktirajte nas
            </a>

          </div>

          <div className="social-bar">

            <a
              href="https://www.instagram.com/azurefiore_/"
              target="_blank"
              rel="noreferrer"
              className="social-item"
            >
              <img src={instagram} alt="Instagram" />
              <div>
                <span>Instagram</span>
                <p>@azurefiore_</p>
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@azurefiore"
              target="_blank"
              rel="noreferrer"
              className="social-item"
            >
              <img src={tiktok} alt="TikTok" />
              <div>
                <span>TikTok</span>
                <p>@azurefiore</p>
              </div>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61560536721870"
              target="_blank"
              rel="noreferrer"
              className="social-item"
            >
              <img src={facebook} alt="Facebook" />
              <div>
                <span>Facebook</span>
                <p>Azurefiore</p>
              </div>
            </a>

          </div>

        </div>

        <div className="hero-visual">

          <div className="fan-gallery">

            <div className="fan-card card-1">
              <img
                src={g1}
                alt="Ragdoll mačić"
                onClick={() => setSelectedIndex(0)}
              />
              <div className="fan-card-info">
                <h3>Celeste</h3>
                <p>Leglo C</p>
              </div>
            </div>

            <div className="fan-card card-2">
              <img
                src={g2}
                alt="Ragdoll mačić"
                onClick={() => setSelectedIndex(0)}
              />
              <div className="fan-card-info">
                <h3>Callie</h3>
                <p>Leglo C</p>
              </div>
            </div>

            <div className="fan-card card-3">
              <img
                src={g3}
                alt="Ragdoll mačić"
                onClick={() => setSelectedIndex(0)}
              />
              <div className="fan-card-info">
                <h3>Callie</h3>
                <p>Leglo C</p>
              </div>
            </div>

            <div className="fan-card card-4">
              <img
                src={g4}
                alt="Ragdoll mačić"
                onClick={() => setSelectedIndex(0)}
              />
              <div className="fan-card-info">
                <h3>Cosmo</h3>
                <p>Leglo C</p>
              </div>
            </div>

            <div className="fan-card card-5">
              <img
                src={g4}
                alt="Ragdoll mačić"
                onClick={() => setSelectedIndex(0)}
              />
              <div className="fan-card-info">
                <h3>Cairo</h3>
                <p>Leglo C</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {selectedIndex !== null && (
        <div
          className="image-modal"
          onClick={() => setSelectedIndex(null)}
        >

          <button
            className="modal-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ←
          </button>

          <img
            src={images[selectedIndex]}
            alt="Ragdoll fullscreen"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="modal-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            →
          </button>

        </div>
      )}
    </section>
  );
}