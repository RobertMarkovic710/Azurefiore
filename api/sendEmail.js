import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, place, phone, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "azurefiore.ragdoll@gmail.com",
            pass: "dllwjgxoiupqjsza",
        },
    });

    try {
        await transporter.sendMail({
            from: `"Azurefiore kontakt" <azurefiore.ragdoll@gmail.com>`,
            to: "azurefiore.ragdoll@gmail.com",
            subject: "Novi upit s web stranice",
            html: `
        <h3>Novi kontakt</h3>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Mjesto:</strong> ${place}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Poruka:</strong><br/>${message}</p>
      `,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Greška pri slanju emaila" });
    }
}