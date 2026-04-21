import React, { useState } from "react";
import "./About.css"


import aria_cat from "../../assets/aria.jpeg";
import s1 from "../../assets/slider/aria1.png";
import s2 from "../../assets/slider/aria2.png";
import s3 from "../../assets/slider/aria3.png";
import s4 from "../../assets/slider/aria4.png";

export default function About() {

    const images = [s1, s2, s3, s4];
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

  return (
    <section className="about" id="about">
      <div className="about-container">

        <div className="about-image">
          <div className="slider">
            <img src={images[current]} alt="Ragdoll mačka" />

            <button className="slider-btn left" onClick={prevSlide}>
              ‹
            </button>

            <button className="slider-btn right" onClick={nextSlide}>
              ›
            </button>
          </div>
        </div>

        <div className="about-content">
          <h2>Azurefiore Ragdoll uzgajivačnica</h2>

          <p className="about-intro">
            Dobrodošli u Azurefiore, profesionalnu i WCF registriranu uzgajivačnicu
            Ragdoll mačaka u Hrvatskoj, gdje se spajaju vrhunska kvaliteta,
            odgovoran uzgoj i iskrena ljubav prema životinjama.
          </p>

          <h3>Zašto Ragdoll?</h3>
          <p>
            Ragdoll mačke poznate su po svom svilenkastom krznu, plavim očima i
            izuzetno nježnom i privrženom temperamentu. Idealne su za obitelji i
            sve koji traže umiljatog i društvenog ljubimca.
          </p>

          <h3>Naš uzgoj</h3>
          <p>
            Svi naši mačići odrastaju u kućnom okruženju uz stalni kontakt s
            ljudima, što osigurava odličnu socijalizaciju, stabilan karakter i
            jednostavnu prilagodbu na novi dom.
          </p>

          <h3>Svaki mačić dolazi s:</h3>
          <ul className="about-list">
            <li>cijepljenjem i mikročipom</li>
            <li>čišćenjem od parazita</li>
            <li>kastracijom ili sterilizacijom</li>
            <li>WCF rodovnikom</li>
            <li>EU putovnicom</li>
            <li>ugovorom o kupnji</li>
          </ul>

          <h3>Zašto odabrati Azurefiore?</h3>
          <ul className="about-list">
            <li>provjereno porijeklo i genetika</li>
            <li>zdrav i socijaliziran mačić</li>
            <li>podrška prije i nakon kupnje</li>
            <li>starter paket za mačića</li>
          </ul>
        </div>
      </div>
    </section>
  );
}