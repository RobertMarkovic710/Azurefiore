import React, { useState } from "react";
import "./Gallery.css"

import g1 from "../../assets/gallery/g1.jpeg";
import g2 from "../../assets/gallery/g2.jpeg";
import g3 from "../../assets/gallery/g3.jpeg";
import g4 from "../../assets/gallery/g4.jpeg";
import g5 from "../../assets/gallery/g5.jpeg";
import g6 from "../../assets/gallery/g6.jpeg";

export default function Gallery() {
  const images = [g1, g2, g3, g4, g5, g6];
  const [selected, setSelected] = useState(null);

  return (
    <section className="gallery" id="gallery">
      <h2>Galerija naših Ragdolla</h2>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img} alt="Ragdoll mačka" onClick={() => setSelected(img)} />
          </div>
        ))}
      </div>

      {selected && (
        <div className="gallery-modal" onClick={() => setSelected(null)}>
          <img src={selected} alt="Ragdoll fullscreen" />
        </div>
      )}
    </section>
  );
}