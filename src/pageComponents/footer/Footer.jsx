import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <p className="footer-note">
                    <strong>Napomena: sve mace s fotografija su iz naše uzgajivačnice.</strong>
                </p>

                <div className="footer-links">
                    <h3>Azurefiore linkovi</h3>

                    <div className="footer-links-row">
                        <a href="https://www.instagram.com/azurefiore_/">Instagram</a>
                        <a href="https://www.tiktok.com/@azurefiore">TikTok</a>
                        <a href="https://www.facebook.com/profile.php?id=61560536721870">Facebook</a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>Web stranicu izradio i održava - univ.mag.ing.comp. Robert Marković</p>
            </div>

        </footer>
    );
}