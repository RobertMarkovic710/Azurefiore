import { useState } from "react";
import "./NavBar.css";

function AzurefioreFlower() {
  return (
    <span className="logo-flower" aria-hidden="true">
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="azurefiore-petal-gradient"
            x1="18"
            y1="8"
            x2="46"
            y2="55"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f4fdff" />
            <stop offset="48%" stopColor="#b7ecff" />
            <stop offset="100%" stopColor="#69c8f3" />
          </linearGradient>

          <radialGradient
            id="azurefiore-flower-center"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(29 28) rotate(48) scale(13)"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#9fdfff" />
          </radialGradient>
        </defs>

        <g className="logo-flower-petals">
          <ellipse
            cx="32"
            cy="15"
            rx="8.5"
            ry="13.5"
            fill="url(#azurefiore-petal-gradient)"
          />

          <ellipse
            cx="32"
            cy="15"
            rx="8.5"
            ry="13.5"
            fill="url(#azurefiore-petal-gradient)"
            transform="rotate(72 32 32)"
          />

          <ellipse
            cx="32"
            cy="15"
            rx="8.5"
            ry="13.5"
            fill="url(#azurefiore-petal-gradient)"
            transform="rotate(144 32 32)"
          />

          <ellipse
            cx="32"
            cy="15"
            rx="8.5"
            ry="13.5"
            fill="url(#azurefiore-petal-gradient)"
            transform="rotate(216 32 32)"
          />

          <ellipse
            cx="32"
            cy="15"
            rx="8.5"
            ry="13.5"
            fill="url(#azurefiore-petal-gradient)"
            transform="rotate(288 32 32)"
          />
        </g>

        <circle
          cx="32"
          cy="32"
          r="7.5"
          fill="url(#azurefiore-flower-center)"
        />

        <circle
          cx="29.5"
          cy="29.5"
          r="2"
          fill="rgba(255, 255, 255, 0.85)"
        />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    const target = document.querySelector(sectionId);
    const nav = document.querySelector(".nav");

    if (!target) return;

    closeMenu();

    setTimeout(() => {
      const navHeight = nav ? nav.offsetHeight : 0;
      const extraGap = window.innerWidth <= 768 ? 10 : 14;

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        extraGap;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });

      window.history.pushState(null, "", sectionId);
    }, 0);
  };

  return (
    <nav
      className={`nav ${open ? "nav-open" : ""}`}
      aria-label="Glavna navigacija"
    >
      <a
        href="#home"
        className="logo"
        aria-label="Azurefiore početna stranica"
        onClick={(event) => scrollToSection(event, "#home")}
      >
        <span className="logo-word" aria-hidden="true">
          AZUREFIOR
          <span className="logo-last-letter">
            E
            <AzurefioreFlower />
          </span>
        </span>
      </a>

      <button
        type="button"
        className="hamburger"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
        aria-expanded={open}
        aria-controls="primary-navigation"
      >
        <span className={open ? "bar open" : "bar"}></span>
        <span className={open ? "bar open" : "bar"}></span>
        <span className={open ? "bar open" : "bar"}></span>
      </button>

      <ul
        id="primary-navigation"
        className={`nav-links ${open ? "open" : ""}`}
      >
        <li>
          <a
            href="#reviews"
            onClick={(event) => scrollToSection(event, "#reviews")}
          >
            Iskustva
          </a>
        </li>

        <li>
          <a
            href="#gallery"
            onClick={(event) => scrollToSection(event, "#gallery")}
          >
            Galerija
          </a>
        </li>

        <li>
          <a
            href="#about"
            onClick={(event) => scrollToSection(event, "#about")}
          >
            Upoznajte nas
          </a>
        </li>

        <li>
          <a
            href="#contact"
            onClick={(event) => scrollToSection(event, "#contact")}
          >
            Kontakt
          </a>
        </li>

        <li className="nav-mobile-cta">
          <a
            href="#contact"
            onClick={(event) => scrollToSection(event, "#contact")}
          >
            Kontaktirajte nas!
          </a>
        </li>
      </ul>

      <div className="cta">
        <a
          href="#contact"
          onClick={(event) => scrollToSection(event, "#contact")}
        >
          Kontaktirajte nas!
        </a>
      </div>
    </nav>
  );
}