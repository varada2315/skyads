"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Privacy() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <section style={{ padding: "80px 0" }}>
        <div className="legal-container">
          <div style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span 
              className="section-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
            >
              Legal Document
            </motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h1 
              className="section-title"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", marginBottom: "30px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
            >
              Privacy Policy
            </motion.h1>
          </div>
          
          <motion.div 
            className="legal-text-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 }}
          >
            <p>Last updated: June 17, 2026</p>
            <p>Sky Advertising ("us", "we", or "our") operates the Sky Advertising website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
            <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>
            <h3>Information Collection and Use</h3>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you. Types of data collected include Email address, First name and last name, Phone number, and Cookies and Usage Data.</p>
            <h3>Security of Data</h3>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
