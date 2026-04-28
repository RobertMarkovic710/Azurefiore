import "./Contact.css";

export default function Contact() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target[0].value,
      place: e.target[1].value,
      phone: e.target[2].value,
      email: e.target[3].value,
      message: e.target[4].value,
    };

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Poruka poslana!");
    } else {
      alert("Greška!");
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