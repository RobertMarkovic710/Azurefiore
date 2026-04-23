import { useState } from "react";
import "./NavBar.css";
 
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <h1 className="logo">AZUREFIORE.</h1>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span className={open ? "bar open" : "bar"}></span>
        <span className={open ? "bar open" : "bar"}></span>
        <span className={open ? "bar open" : "bar"}></span>
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li><a href="#about" onClick={() => setOpen(false)}>Upoznajte nas</a></li>
        <li><a href="#gallery" onClick={() => setOpen(false)}>Galerija</a></li>
        <li><a href="#reviews" onClick={() => setOpen(false)}>Iskustva</a></li>
        <li><a href="#contact" onClick={() => setOpen(false)}>Kontakt</a></li>
      </ul>

      <div className={`cta ${open ? "open" : ""}`}>
        <a href="#contact" onClick={() => setOpen(false)}>
          Kontaktirajte nas!
        </a>
      </div>
    </nav>
  );
}