import { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend
} from "react-icons/fi";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    phone: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error();

      setFormData({
        name: "",
        place: "",
        phone: "",
        email: "",
        message: ""
      });

      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-glow contact-glow-one" aria-hidden="true" />
      <div className="contact-glow contact-glow-two" aria-hidden="true" />
      <div className="contact-glow contact-glow-three" aria-hidden="true" />

      <div className="contact-shell">
        <header className="contact-header">
          <span className="contact-eyebrow">Kontakt i rezervacije</span>

          <h2>
            Slobodno nas kontaktirajte za sve upite vezane
            <span> uz naše Ragdoll mace.</span>
          </h2>

          <p>
            Svakom upitu pristupamo
            osobno i s jednakom pažnjom.
          </p>

          <div className="contact-highlights" aria-label="Prednosti kontakta s nama">
            <span>Osobni pristup</span>
            <span>Odgovoran uzgoj</span>
            <span>Podrška i nakon udomljavanja</span>
          </div>
        </header>

        <div className="contact-layout">
          <aside className="contact-details">
            <div className="contact-details-top">
              <span className="contact-card-label">
                <span aria-hidden="true" />
                Azurefiore
              </span>

              <h3>Kontaktirajte nas.</h3>

              <p>
                Tu smo kako bismo odgovorili na Vaša pitanja o dostupnim
                mačićima, rezervaciji, karakteru pasmine i pripremi novog doma.
              </p>
            </div>

            <div className="contact-methods">
              <a className="contact-method" href="tel:+385998340348">
                <span className="contact-method-icon" aria-hidden="true">
                  <FiPhone />
                </span>

                <span className="contact-method-copy">
                  <small>Telefon</small>
                  <strong>+385 99 8340 348</strong>
                  <em>Hana, univ.mag.ing.agr · poziv, Viber ili WhatsApp</em>
                </span>

                <span className="contact-method-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>

              <div className="contact-method">
                <span className="contact-method-icon" aria-hidden="true">
                  <FiMapPin />
                </span>

                <span className="contact-method-copy">
                  <small>Lokacija</small>
                  <strong>Osijek, Hrvatska</strong>
                  <em>Blizini centra grada Osijeka</em>
                </span>
              </div>

              <div className="contact-method">
                <span className="contact-method-icon" aria-hidden="true">
                  <FiMessageCircle />
                </span>

                <span className="contact-method-copy">
                  <small>Upiti</small>
                  <strong>Rezervacije i informacije</strong>
                  <em>Slobodno nam opišite svoj dom i očekivanja</em>
                </span>
              </div>
            </div>

            <div className="contact-response-note">
              <FiCheckCircle aria-hidden="true" />
              <p>
                <strong>Na svaki upit odgovaramo osobno.</strong>
                <span>Voljeli bismo vas upoznati, odgovoriti na vaša pitanja i zajedno pronaći mačića koji najbolje odgovara vašem domu.</span>
              </p>
            </div>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps?q=Osijek&output=embed"
                loading="lazy"
                title="Lokacija uzgajivačnice Azurefiore u Osijeku"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="contact-map-badge">
                <FiMapPin aria-hidden="true" />
                <span>
                  <small>Naša lokacija</small>
                  <strong>Osijek, Hrvatska</strong>
                </span>
              </div>
            </div>
          </aside>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-busy={loading}
          >
            <div className="contact-form-heading">
              <span className="contact-form-icon" aria-hidden="true">
                <FiMail />
              </span>

              <div>
                <span className="contact-form-kicker">Pošaljite upit</span>
                <h3>Recite nam kako vam možemo pomoći.</h3>
              </div>
            </div>

            <div className="contact-form-grid">
              <div className="form-field">
                <label htmlFor="contact-name">Ime i prezime</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Vaše ime i prezime"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-place">Mjesto</label>
                <input
                  id="contact-place"
                  type="text"
                  name="place"
                  placeholder="Grad ili mjesto"
                  value={formData.place}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-phone">
                  Telefon <span>(nije obavezno)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="Vaš broj telefona"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">E-mail</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Vaš e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="contact-message">Vaša poruka</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  placeholder="Bok! ..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button className="contact-submit" type="submit" disabled={loading}>
              <span>{loading ? "Šaljem poruku..." : "Pošalji upit"}</span>
              {!loading && <FiSend aria-hidden="true" />}
              {loading && (
                <span className="contact-spinner" aria-hidden="true" />
              )}
            </button>

            <p className="contact-form-note">
              Vaše podatke koristimo isključivo kako bismo odgovorili na ovaj
              upit.
            </p>

            <div className="contact-status" aria-live="polite">
              {status === "success" && (
                <p className="form-success">
                  <FiCheckCircle aria-hidden="true" />
                  Poruka je uspješno poslana. Javit ćemo vam se uskoro.
                </p>
              )}

              {status === "error" && (
                <p className="form-error">
                  <FiAlertCircle aria-hidden="true" />
                  Došlo je do greške. Pokušajte ponovno ili nas kontaktirajte
                  telefonom.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
