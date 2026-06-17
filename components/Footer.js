import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", textDecoration: "none" }}>
              <img src="/logos/logo.png" alt="Sky Advertising" style={{ height: "36px", width: "auto" }} />
              <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "0.08em", color: "#fff", textTransform: "uppercase" }}>
                SKY<span style={{ color: "var(--secondary)" }}>ADVERTISING</span>
              </span>
            </Link>
            <p>
              End-to-end signage and branding solutions trusted by corporate brands, retail chains, commercial complexes, and hospitality companies across India.
            </p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-links-col">
              <span className="footer-col-title">Navigation</span>
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/about" className="footer-link">About</Link>
              <Link href="/services" className="footer-link">Services</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="footer-links-col">
              <span className="footer-col-title">Legal Pages</span>
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-link">Terms of Service</Link>
              <Link href="/refund" className="footer-link">Refund Policy</Link>
              <Link href="/disclaimer" className="footer-link">Disclaimer</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Sky Advertising. All rights reserved.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/_sky_advertising/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
