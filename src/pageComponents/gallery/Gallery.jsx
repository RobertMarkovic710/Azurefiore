import { useState } from "react";
import "./Gallery.css";

export default function Gallery() {

  const litter = Object.values(
    import.meta.glob("../../assets/gallery/litter/*.jpeg", { eager: true })
  ).map((img) => img.default);

  const cats = Object.values(
    import.meta.glob("../../assets/gallery/azurefiore_cats/*.jpg", { eager: true })
  ).map((img) => img.default);

  const [selected, setSelected] = useState(null);

  return (
    <section className="gallery" id="gallery">

      <h2>
        Galerija naših Ragdolla
      </h2>

      <h3 className="gallery-subtitle">
        Naši mačići
      </h3>

      <div className="gallery-slider-1">
        <div className="gallery-track-1">
          {[...litter, ...litter, ...litter].map((img, index) => (
            <div className="gallery-item" key={index}>
              <img src={img} alt="Naši Ragdoll mačići" onClick={() => setSelected(img)} />
            </div>
          ))}
        </div>
      </div>

      <h3 className="gallery-subtitle">
        Roditelji - Greg, Gloria i Quinn Juliet
      </h3>

      <div className="gallery-slider-2">
        <div className="gallery-track-2">
          {[...cats, ...cats, ...cats].map((img, index) => (
            <div className="gallery-item" key={index}>
              <img src={img} alt="Naši Ragdoll mačići" onClick={() => setSelected(img)} />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="gallery-modal" onClick={() => setSelected(null)}>
          <img src={selected} alt="Ragdoll fullscreen" />
        </div>
      )}
    </section>
  );
}