import "./Contact.css";

export default function Contact() {
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

        <form className="contact-form">
          <h2>Pošaljite nam svoj upit</h2>

          <input type="text" placeholder="Ime i prezime" required />
          <input type="text" placeholder="Mjesto" required />
          <input type="tel" placeholder="Telefon (nije obavezno)" pattern="^\+?[0-9\s]{8,15}$" required />
          <input type="email" placeholder="E-mail" required />

          <textarea placeholder="Poruka" required></textarea>

          <button type="submit">Pošalji</button>
        </form>

      </div>

    </section>
  );
}