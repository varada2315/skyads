"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Helper components for scroll reveals
function Reveal({ children, delay = 0, y = 30, x = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ paddingTop: "40px" }}>
      {/* Page Header */}
      <section className="services-hero">
        <div className="section-container" style={{ paddingBottom: "20px" }}>
          <div style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span 
              className="section-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
            >
              What We Do
            </motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h1 
              className="section-title"
              initial={{ opacity: 0, y: 40 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Signage &amp; Branding <span>Catalogue</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 }}
          >
            We offer comprehensive production, fabrication, printing, and installation under one roof. Review our products below and contact us for pricing.
          </motion.p>
        </div>
      </section>

      {/* LED & ACP Signages */}
      <section className="service-detail-section" id="led-signage">
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="service-row">
            <div className="service-media">
              <Reveal y={40}>
                <div className="service-media-card">
                  <img src="/work/led_signage.png" alt="LED Sign Boards" />
                </div>
              </Reveal>
            </div>
            <div className="service-desc-side">
              <Reveal delay={0.1} y={30}>
                <span className="section-tag">Energy Efficient</span>
                <h2 className="vertical-name">LED Sign Boards &amp; LED Displays</h2>
                <p className="vertical-desc">
                  Our LED Signage features top-tier Samsung or Epistar LED modules coupled with premium IP67 waterproof power supply units for extreme longevity. Built using computer-aided design layout to ensure optimal pixel density, zero hot spots, and uniform visual glow.
                </p>
                <ul className="spec-list">
                  <li className="spec-item">High Lumen Output</li>
                  <li className="spec-item">IP67 Waterproofing</li>
                  <li className="spec-item">Energy Efficient 12V DC</li>
                  <li className="spec-item">Custom Acrylic Diffuser</li>
                </ul>
                <div className="magnetic-btn-wrap">
                  <Link href="/contact?subject=LED%20Signage%20Inquiry" className="btn-premium solid">
                    Inquire For Pricing
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ACP Sign Boards */}
      <section className="service-detail-section" id="acp-boards">
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="service-row reverse">
            <div className="service-media">
              <Reveal y={40}>
                <div className="service-media-card">
                  <img src="/work/acp_signage.png" alt="ACP Sign Boards" />
                </div>
              </Reveal>
            </div>
            <div className="service-desc-side">
              <Reveal delay={0.1} y={30}>
                <span className="section-tag">Premium Shopfronts</span>
                <h2 className="vertical-name">ACP Sign Boards &amp; Facades</h2>
                <p className="vertical-desc">
                  Aluminium Composite Panels (ACP) are the industry standard for modern shopfronts, franchise showrooms, and corporate building wraps. We use certified fire-grade ACP panels (brands like Aludecor, Eurobond) fabricated on heavy-duty iron frames, giving a perfectly flat, weather-resistant facade.
                </p>
                <ul className="spec-list">
                  <li className="spec-item">Eurobond &amp; Aludecor Panel</li>
                  <li className="spec-item">Rust-Proof Iron Structure</li>
                  <li className="spec-item">Weather &amp; UV Resistant</li>
                  <li className="spec-item">CNC Routing Cutouts</li>
                </ul>
                <div className="magnetic-btn-wrap">
                  <Link href="/contact?subject=ACP%20Boards%20Inquiry" className="btn-premium solid">
                    Inquire For Pricing
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Letter Signs */}
      <section className="service-detail-section" id="letter-boards">
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="service-row">
            <div className="service-media">
              <Reveal y={40}>
                <div className="service-media-card">
                  <img src="/work/three_d_letters.png" alt="3D Letter Sign Boards" />
                </div>
              </Reveal>
            </div>
            <div className="service-desc-side">
              <Reveal delay={0.1} y={30}>
                <span className="section-tag">Sophisticated Finish</span>
                <h2 className="vertical-name">3D Letter Sign Boards</h2>
                <p className="vertical-desc">
                  Make your logo stand out physically. We design, manufacture, and install dimensional 3D letters made from stainless steel (grade 304/316), brass, acrylic, or ACP. Letters can be halo-lit (glow on the background wall) or front-lit (diffused Front-lit through translucent acrylic faces).
                </p>
                <ul className="spec-list">
                  <li className="spec-item">Stainless Steel SS304</li>
                  <li className="spec-item">Classic Polished Brass</li>
                  <li className="spec-item">Laser-Cut Acrylic</li>
                  <li className="spec-item">Halo &amp; Back-lit Effects</li>
                </ul>
                <div className="magnetic-btn-wrap">
                  <Link href="/contact?subject=3D%20Letters%20Inquiry" className="btn-premium solid">
                    Inquire For Pricing
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Flex & Vinyl Printing */}
      <section className="service-detail-section" id="flex-vinyl">
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="service-row reverse">
            <div className="service-media">
              <Reveal y={40}>
                <div className="service-media-card">
                  <img src="/work/flex_printing.png" alt="Flex and Vinyl Printing" />
                </div>
              </Reveal>
            </div>
            <div className="service-desc-side">
              <Reveal delay={0.1} y={30}>
                <span className="section-tag">Mass Publicity</span>
                <h2 className="vertical-name">Flex &amp; Vinyl Printing (Solvent &amp; Eco-Solvent)</h2>
                <p className="vertical-desc">
                  For outdoor hoardings, retail window graphics, and internal wall branding, we offer high-resolution solvent flex printing and eco-solvent vinyl printing. Vinyl can be laminated and mounted on Sunboard (ACP / Sunboard sheet) for premium visual boards, banners, and standees.
                </p>
                <ul className="spec-list">
                  <li className="spec-item">Heavy Duty Solvent Flex</li>
                  <li className="spec-item">Eco-Solvent Vinyl Printing</li>
                  <li className="spec-item">Matte / Glossy Lamination</li>
                  <li className="spec-item">Sunboard Mounting</li>
                </ul>
                <div className="magnetic-btn-wrap">
                  <Link href="/contact?subject=Flex%20Printing%20Inquiry" className="btn-premium solid">
                    Inquire For Pricing
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Retail Branding & Glow signs */}
      <section className="service-detail-section" id="retail-branding">
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="service-row">
            <div className="service-media">
              <Reveal y={40}>
                <div className="service-media-card">
                  <img src="/work/retail_branding.png" alt="Retail Branding" />
                </div>
              </Reveal>
            </div>
            <div className="service-desc-side">
              <Reveal delay={0.1} y={30}>
                <span className="section-tag">Retail Branding</span>
                <h2 className="vertical-name">Retail Branding &amp; Glow Sign Boards</h2>
                <p className="vertical-desc">
                  Create an immersive customer journey inside your store. We provide complete retail outlet branding including fabric lightboxes (tension fabric profiles), vinyl wall graphics, glass manifestation films, indoor standees, and classic double-sided backlit glow sign boards.
                </p>
                <ul className="spec-list">
                  <li className="spec-item">Tension Fabric Lightboxes</li>
                  <li className="spec-item">Window Manifestation Vinyls</li>
                  <li className="spec-item">Promotional Standees</li>
                  <li className="spec-item">Double-Sided Glow Signs</li>
                </ul>
                <div className="magnetic-btn-wrap">
                  <Link href="/contact?subject=Retail%20Branding%20Inquiry" className="btn-premium solid">
                    Inquire For Pricing
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
