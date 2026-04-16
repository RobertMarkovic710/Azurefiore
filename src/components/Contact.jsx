export default function Contact() {
  return (
    <section className="contact" id="contact">
      <form className="contact-form">
        <h2>Kontaktirajte nas</h2>

        <input type="text" placeholder="Ime i prezime" required />
        <input type="text" placeholder="Mjesto" required />
        <input type="email" placeholder="E-mail" required />

        <textarea placeholder="Poruka" required></textarea>

        <button type="submit">Pošalji</button>
      </form>
    </section>
  );
}