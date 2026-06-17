"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Disclaimer() {
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
              Disclaimer
            </motion.h1>
          </div>
          
          <motion.div 
            className="legal-text-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 }}
          >
            <p>Last updated: June 17, 2026</p>
            <p>The information contained on the website is for general information purposes only.</p>
            <p>Sky Advertising assumes no responsibility for errors or omissions in the contents on the Service. In no event shall Sky Advertising be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service.</p>
            <h3>Structural &amp; Installation Safety</h3>
            <p>Sky Advertising executes professional signage installations. Clients are responsible for obtaining necessary municipal permissions or local authority permits for large outdoor billboards, ACP shopfront modifications, or streetstand hoardings in their respective locations.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
