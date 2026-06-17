"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Terms() {
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
              Terms of Service
            </motion.h1>
          </div>
          
          <motion.div 
            className="legal-text-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 }}
          >
            <p>Last updated: June 17, 2026</p>
            <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website operated by Sky Advertising.</p>
            <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
            <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
            <h3>Intellectual Property</h3>
            <p>The Service and its original content, features and functionality are and will remain the exclusive property of Sky Advertising and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.</p>
            <h3>Inquiries &amp; Pricing</h3>
            <p>All pricing is provided upon request via formal quotation. Any information submitted through our contact forms is treated in strict confidence to formulate appropriate branding proposals.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
