import "./Footer.css";

function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="footer">

            <p>
                © {year} Placement Management System | All Rights Reserved.
            </p>

        </footer>
    );
}

export default Footer;