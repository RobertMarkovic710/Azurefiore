import nodemailer from "nodemailer";

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { name, place, phone, email, message } = req.body;

    if (!name || !place || !email || !message) {
        return res.status(400).json({
            error: "Nedostaju obavezni podaci."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Neispravna email adresa."
        });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const safeName = escapeHtml(name);
    const safePlace = escapeHtml(place);
    const safePhone = escapeHtml(phone || "Nije navedeno");
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    try {
        await transporter.sendMail({
            from: `"Azurefiore kontakt" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Novi upit s web stranice - ${name}`,

            text: `
Novi upit s Azurefiore web stranice

Ime i prezime: ${name}
Mjesto: ${place}
Telefon: ${phone || "Nije navedeno"}
Email: ${email}

Poruka:
${message}
            `,

            html: `
                <!DOCTYPE html>
                <html lang="hr">
                    <head>
                        <meta charset="UTF-8">
                    </head>

                    <body style="
                        margin: 0;
                        padding: 0;
                        background-color: #f2f6fa;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #172033;
                    ">

                        <div style="
                            width: 100%;
                            padding: 35px 15px;
                            box-sizing: border-box;
                        ">

                            <div style="
                                max-width: 650px;
                                margin: 0 auto;
                                background: #ffffff;
                                border-radius: 18px;
                                overflow: hidden;
                                box-shadow: 0 15px 40px rgba(0, 46, 93, 0.10);
                            ">

                                <div style="
                                    background-color: #002e5d;
                                    padding: 30px;
                                    text-align: center;
                                ">
                                    <div style="
                                        color: #ffffff;
                                        font-size: 28px;
                                        font-weight: 700;
                                    ">
                                        Azurefiore
                                    </div>

                                    <div style="
                                        margin-top: 7px;
                                        color: #bcecff;
                                        font-size: 14px;
                                    ">
                                        Novi upit s web stranice
                                    </div>
                                </div>

                                <div style="
                                    padding: 32px;
                                    line-height: 1.6;
                                ">

                                    <h2 style="
                                        margin: 0 0 25px;
                                        color: #002e5d;
                                        font-size: 22px;
                                    ">
                                        Novi kontakt
                                    </h2>

                                    <table
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="
                                            border-collapse: collapse;
                                            font-size: 15px;
                                        "
                                    >
                                        <tr>
                                            <td style="
                                                padding: 10px 0;
                                                color: #6b7484;
                                                width: 140px;
                                            ">
                                                <strong>Ime i prezime</strong>
                                            </td>

                                            <td style="
                                                padding: 10px 0;
                                                color: #172033;
                                            ">
                                                ${safeName}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="
                                                padding: 10px 0;
                                                color: #6b7484;
                                            ">
                                                <strong>Mjesto</strong>
                                            </td>

                                            <td style="
                                                padding: 10px 0;
                                                color: #172033;
                                            ">
                                                ${safePlace}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="
                                                padding: 10px 0;
                                                color: #6b7484;
                                            ">
                                                <strong>Telefon</strong>
                                            </td>

                                            <td style="
                                                padding: 10px 0;
                                                color: #172033;
                                            ">
                                                ${safePhone}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="
                                                padding: 10px 0;
                                                color: #6b7484;
                                            ">
                                                <strong>Email</strong>
                                            </td>

                                            <td style="
                                                padding: 10px 0;
                                                color: #172033;
                                            ">
                                                ${safeEmail}
                                            </td>
                                        </tr>
                                    </table>

                                    <div style="
                                        margin-top: 25px;
                                        padding: 20px;
                                        background-color: #edf4ff;
                                        border-left: 4px solid #2774ae;
                                        border-radius: 10px;
                                    ">

                                        <div style="
                                            margin-bottom: 10px;
                                            color: #002e5d;
                                            font-size: 14px;
                                            font-weight: 700;
                                        ">
                                            Poruka
                                        </div>

                                        <div style="
                                            color: #4f5b6d;
                                            font-size: 15px;
                                            line-height: 1.7;
                                        ">
                                            ${safeMessage}
                                        </div>
                                    </div>

                                    <p style="
                                        margin: 25px 0 0;
                                        color: #7a8798;
                                        font-size: 13px;
                                    ">
                                        Kliknite Reply / Odgovori kako biste
                                        odgovorili direktno osobi koja je
                                        poslala ovaj upit.
                                    </p>

                                </div>
                            </div>
                        </div>

                    </body>
                </html>
            `,
        });

        try {
            await transporter.sendMail({
                from: `"Azurefiore" <${process.env.GMAIL_USER}>`,
                to: email,
                replyTo: process.env.GMAIL_USER,
                subject: "Zaprimili smo vaš upit | Azurefiore",

                text: `
Pozdrav ${name},

hvala Vam što ste kontaktirali Azurefiore.

Vaš upit smo uspješno zaprimili i odgovorit ćemo u najkraćem mogućem roku.

Vaša poruka:
${message}

Hvala!

Azurefiore
Uzgajivačnica Ragdoll mačaka
Osijek, Hrvatska
https://www.azurefiore.com
                `,

                html: `
                    <!DOCTYPE html>
                    <html lang="hr">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        </head>

                        <body style="
                            margin: 0;
                            padding: 0;
                            background-color: #f2f6fa;
                            font-family: Arial, Helvetica, sans-serif;
                            color: #172033;
                        ">

                            <div style="
                                width: 100%;
                                padding: 40px 15px;
                                box-sizing: border-box;
                            ">

                                <div style="
                                    max-width: 620px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    border-radius: 20px;
                                    overflow: hidden;
                                    box-shadow: 0 15px 40px rgba(0, 46, 93, 0.10);
                                ">

                                    <div style="
                                        background-color: #002e5d;
                                        padding: 40px 30px;
                                        text-align: center;
                                    ">

                                        <div style="
                                            color: #ffffff;
                                            font-size: 32px;
                                            font-weight: 700;
                                            letter-spacing: -1px;
                                        ">
                                            Azurefiore
                                        </div>

                                        <div style="
                                            margin-top: 9px;
                                            color: #bcecff;
                                            font-size: 14px;
                                            line-height: 1.5;
                                        ">
                                            Uzgajivačnica Ragdoll mačaka
                                            <br>
                                            Osijek, Hrvatska
                                        </div>

                                    </div>

                                    <div style="
                                        padding: 38px 35px;
                                        line-height: 1.7;
                                    ">

                                        <h2 style="
                                            margin: 0 0 24px;
                                            color: #002e5d;
                                            font-size: 25px;
                                            line-height: 1.3;
                                        ">
                                            Hvala vam na javljanju! 🐾
                                        </h2>

                                        <p style="
                                            margin: 0 0 18px;
                                            color: #172033;
                                            font-size: 16px;
                                        ">
                                            Pozdrav ${safeName},
                                        </p>

                                        <p style="
                                            margin: 0 0 18px;
                                            color: #4f5b6d;
                                            font-size: 15px;
                                        ">
                                            hvala vam što ste kontaktirali
                                            <strong style="color: #002e5d;">
                                                Azurefiore
                                            </strong>.
                                        </p>

                                        <p style="
                                            margin: 0 0 18px;
                                            color: #4f5b6d;
                                            font-size: 15px;
                                        ">
                                            Vaš upit smo uspješno zaprimili.
                                            Svakom upitu pristupamo osobno i
                                            <strong style="color: #002e5d;">
                                                odgovorit ćemo vam u najkraćem mogućem roku.
                                            </strong>
                                        </p>

                                        <div style="
                                            margin: 30px 0;
                                            padding: 22px;
                                            background-color: #edf4ff;
                                            border-left: 4px solid #2774ae;
                                            border-radius: 12px;
                                        ">

                                            <div style="
                                                margin-bottom: 10px;
                                                color: #002e5d;
                                                font-size: 13px;
                                                font-weight: 700;
                                                text-transform: uppercase;
                                                letter-spacing: 0.05em;
                                            ">
                                                Vaša poruka
                                            </div>

                                            <div style="
                                                color: #5c6678;
                                                font-size: 14px;
                                                line-height: 1.7;
                                            ">
                                                ${safeMessage}
                                            </div>

                                        </div>

                                        <p style="
                                            margin: 0 0 26px;
                                            color: #4f5b6d;
                                            font-size: 15px;
                                        ">
                                            Ako želite nešto nadopuniti u svom
                                            upitu, slobodno odgovorite direktno
                                            na ovaj e-mail.
                                        </p>

                                        <div style="
                                            padding-top: 5px;
                                        ">

                                            <p style="
                                                margin: 0;
                                                color: #4f5b6d;
                                                font-size: 15px;
                                                line-height: 1.7;
                                            ">
                                                Srdačan pozdrav,
                                                <br>

                                                <strong style="
                                                    color: #002e5d;
                                                    font-size: 17px;
                                                ">
                                                    Azurefiore
                                                </strong>

                                                <br>

                                                Uzgajivačnica Ragdoll mačaka
                                                <br>

                                                Osijek, Hrvatska
                                            </p>

                                        </div>

                                    </div>

                                    <div style="
                                        padding: 23px 30px;
                                        background-color: #f7faff;
                                        border-top: 1px solid #e1eaf2;
                                        text-align: center;
                                    ">

                                        <a
                                            href="https://www.azurefiore.com"
                                            style="
                                                color: #2774ae;
                                                font-size: 14px;
                                                font-weight: 700;
                                                text-decoration: none;
                                            "
                                        >
                                            www.azurefiore.com
                                        </a>

                                        <p style="
                                            margin: 12px 0 0;
                                            color: #8a96a6;
                                            font-size: 11px;
                                            line-height: 1.6;
                                        ">
                                            Ovaj e-mail automatski je poslan
                                            kao potvrda primitka vašeg upita
                                            putem Azurefiore web stranice.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </body>
                    </html>
                `,
            });

        } catch (autoReplyError) {
            console.error(
                "Greška pri slanju automatske potvrde:",
                autoReplyError
            );
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        console.error(
            "Greška pri slanju kontaktnog upita:",
            error
        );

        return res.status(500).json({
            error: "Greška pri slanju emaila"
        });
    }
}