import "./Hero.css"
import Navbar from "../../components/navbar/Navbar";
import tiktok from "../../assets/tiktok.png";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";

export default function Hero() {
  return (
    <>

      <section className="hero" id="home">
        <Navbar />
        <div className="main">
          <h2 className="main-title-1">Bok, mi smo Azurefiore.</h2>
          <h3 className="main-title-2">
            Uzgajivačnica Ragdoll mačaka iz srca Slavonije
          </h3>

          <div className="card-list">
            <div className="card">
              <a href="https://www.instagram.com/azurefiore_/" target="_blank">
                <img src={instagram} />
                <p>Posjetite nas na Instagram profilu</p>
              </a>
            </div>

            <div className="card">
              <a href="https://www.tiktok.com/@azurefiore" target="_blank">
                <img src={tiktok} />
                <p>Posjetite nas na TikTok profilu</p>
              </a>
            </div>

            <div className="card">
              <a href="https://www.facebook.com/" target="_blank">
                <img src={facebook} />
                <p>Posjetite nas na Facebook profilu</p>
              </a>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}