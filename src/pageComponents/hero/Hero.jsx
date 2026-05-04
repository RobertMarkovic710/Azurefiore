import "./Hero.css";
import Navbar from "../../components/navbar/Navbar";

import tiktok from "../../assets/hero/tiktok.png";
import instagram from "../../assets/hero/instagram.png";
import facebook from "../../assets/hero/facebook.png";

import g1 from "../../assets/gallery/litter/g1.jpeg"
import g2 from "../../assets/gallery/litter/g2.jpeg"
import g3 from "../../assets/gallery/litter/g3.jpeg"
import g4 from "../../assets/gallery/litter/g4.jpeg"
import g5 from "../../assets/gallery/litter/g5.jpeg"


export default function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <Navbar />

        <div className="main">

          <div className="hero-center">

            <div className="hero-left">
              <h1 className="main-title-1">Mi smo Azurefiore.</h1>
              <h1 className="main-title-2">
                Uzgajivačnica Ragdoll mačaka iz srca Slavonije
              </h1>
            </div>

            <div className="hero-right">
              <div className="bento-grid">

                <div className="bento-item big">
                  <img src={g1} alt="Ragdoll mačić" />
                </div>

                <div className="bento-item">
                  <img src={g2} alt="Ragdoll mačić" />
                </div>

                <div className="bento-item">
                  <img src={g3} alt="Ragdoll mačić" />
                </div>

                <div className="bento-item wide">
                  <img src={g4} alt="Ragdoll mačić" />
                </div>

                <div className="bento-item">
                  <img src={g5} alt="Ragdoll mačić" />
                </div>

              </div>
            </div>

          </div>

          <div className="hero-bottom">
            <div className="card-list">

              <div className="card">
                <a href="https://www.instagram.com/azurefiore_/" target="_blank">
                  <img src={instagram} alt="Instagram" />
                  <p>Posjetite nas na Instagram profilu</p>
                </a>
              </div>

              <div className="card">
                <a href="https://www.tiktok.com/@azurefiore" target="_blank">
                  <img src={tiktok} alt="TikTok" />
                  <p>Posjetite nas na TikTok profilu</p>
                </a>
              </div>

              <div className="card">
                <a href="https://www.facebook.com/profile.php?id=61560536721870" target="_blank">
                  <img src={facebook} alt="Facebook" />
                  <p>Posjetite nas na Facebook profilu</p>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}