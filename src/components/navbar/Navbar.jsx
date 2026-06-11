import { useState } from "react";
import "./NavBar.css";

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
        target.getBoundingClientRect().top + window.scrollY - navHeight - extraGap;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });

      window.history.pushState(null, "", sectionId);
    }, 0);
  };

  return (
    <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Glavna navigacija">
      <a
        href="#home"
        className="logo"
        onClick={(event) => scrollToSection(event, "#home")}
      >
        AZUREFIORE.
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

      <ul id="primary-navigation" className={`nav-links ${open ? "open" : ""}`}>
        <li>
          <a href="#reviews" onClick={(event) => scrollToSection(event, "#reviews")}>
            Iskustva
          </a>
        </li>

        <li>
          <a href="#gallery" onClick={(event) => scrollToSection(event, "#gallery")}>
            Galerija
          </a>
        </li>

        <li>
          <a href="#about" onClick={(event) => scrollToSection(event, "#about")}>
            Upoznajte nas
          </a>
        </li>

        <li>
          <a href="#contact" onClick={(event) => scrollToSection(event, "#contact")}>
            Kontakt
          </a>
        </li>

        <li className="nav-mobile-cta">
          <a href="#contact" onClick={(event) => scrollToSection(event, "#contact")}>
            Kontaktirajte nas!
          </a>
        </li>
      </ul>

      <div className="cta">
        <a href="#contact" onClick={(event) => scrollToSection(event, "#contact")}>
          Kontaktirajte nas!
        </a>
      </div>
    </nav>
  );
}