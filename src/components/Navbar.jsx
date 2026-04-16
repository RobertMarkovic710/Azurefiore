import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav">
      <h1 className="logo">Azurefiore.</h1>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div className={open ? "bar active" : "bar"}></div>
        <div className={open ? "bar active" : "bar"}></div>
        <div className={open ? "bar active" : "bar"}></div>
      </div>

      {/* NAV LINKS */}
      <ul className={open ? "nav-links open" : "nav-links"}>
        <li><a href="#about" onClick={() => setOpen(false)}>O nama</a></li>
        <li><a href="#gallery" onClick={() => setOpen(false)}>Galerija</a></li>
        <li><a href="#contact" onClick={() => setOpen(false)}>Kontakt</a></li>
      </ul>

      <h5 className="cta">
        <a href="#contact">Kontaktirajte nas!</a>
      </h5>
    </div>
  );
}