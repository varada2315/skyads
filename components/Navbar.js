"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Add scrolled class on scroll
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Helper to determine if link is active
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={`navbar visible ${isScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="nav-logo" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logos/logo.png" alt="Sky Advertising" />
          <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "0.08em", color: "#fff", textTransform: "uppercase" }}>
            SKY<span style={{ color: "var(--secondary)" }}>ADVERTISING</span>
          </span>
        </Link>
        
        <div className="nav-menu">
          <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
            About
          </Link>
          <Link href="/services" className={`nav-link ${isActive("/services") ? "active" : ""}`}>
            Services
          </Link>
          <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
            Contact
          </Link>
        </div>

        <div className="nav-cta">
          <Link href="/contact" className="btn-premium outline">
            Let's Connect
          </Link>
        </div>

        <button 
          className={`hamburger ${isOpen ? "open" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? "open" : ""}`}>
        <Link href="/" className="mobile-nav-link" onClick={closeMenu}>
          Home
        </Link>
        <Link href="/about" className="mobile-nav-link" onClick={closeMenu}>
          About
        </Link>
        <Link href="/services" className="mobile-nav-link" onClick={closeMenu}>
          Services
        </Link>
        <Link href="/contact" className="mobile-nav-link" onClick={closeMenu}>
          Contact
        </Link>
      </div>
    </>
  );
}
