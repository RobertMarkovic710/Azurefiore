import { useState } from "react";
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

      <div className="contact-info">
        <h2>Kontaktirajte nas</h2>

        <p>
          <strong>Kontakt:</strong>{" "}
          <a href="tel:+385998340348" className="phone-link">
            +385 99 8340 348
          </a>{" "}
          (Hana) · Viber / WhatsApp
        </p>

        <p className="contact-desc">
          Slobodno nas kontaktirajte za sve upite vezane uz naše Ragdoll mace.
        </p>
      </div>

      <div className="contact-bottom">

        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps?q=Osijek&output=embed"
            loading="lazy"
            title="Osijek mapa"
          ></iframe>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Pošaljite nam svoj upit</h2>

          <input
            type="text"
            name="name"
            placeholder="Ime i prezime"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="place"
            placeholder="Mjesto"
            value={formData.place}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Telefon (nije obavezno)"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Poruka"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Šaljem..." : "Pošalji"}
          </button>

          {status === "success" && (
            <p className="form-success">
              Poruka je uspješno poslana! ✔️
            </p>
          )}

          {status === "error" && (
            <p className="form-error">
              Došlo je do greške. Pokušajte ponovno.
            </p>
          )}
        </form>

      </div>

    </section>
  );
}