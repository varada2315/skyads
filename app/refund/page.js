"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Refund() {
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
              Refund Policy
            </motion.h1>
          </div>
          
          <motion.div 
            className="legal-text-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 }}
          >
            <p>Last updated: June 17, 2026</p>
            <p>At Sky Advertising, we manufacture fully custom signage and branding materials. Because all items are custom-built to client specifications, dimensions, logos, and materials, we operate a strict policy regarding refunds and cancellations.</p>
            <h3>Cancellations</h3>
            <p>Projects can be cancelled before fabrication has started. Once materials have been ordered and fabrication/cutting begins at our Delhi facility, cancellations are subject to a fee covering raw material and labor costs incurred.</p>
            <h3>Defects &amp; Issues</h3>
            <p>We guarantee quality without compromise. If a sign board is delivered with fabrication defects, LED issues, or installation damage caused by our teams, we will repair or replace the affected panels promptly without extra cost.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
