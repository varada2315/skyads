"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper component for reveal animations
function Reveal({ children, delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// Gallery images with custom categories and descriptions
const galleryImages = [
  {
    file: "1782823764479-021a2f2e-WhatsApp_Image_2026_06_30_at_5_39_42_PM__1_.jpg",
    title: "Arun Ice Cream Branding",
    category: "Retail Branding",
    description: "Complete freezer wrap and dealer board branding for Arun Ice Creams."
  },
  {
    file: "1782823764683-15f99775-WhatsApp_Image_2026_06_30_at_5_39_42_PM.jpg",
    title: "Castrol Glow Signage",
    category: "Glow Sign Boards",
    description: "Backlit exterior glow sign board for Castrol Modern Oil dealer shopfront."
  },
  {
    file: "1782823764855-ec16a993-WhatsApp_Image_2026_06_30_at_5_39_44_PM__2_.jpg",
    title: "Intex Backlit",
    category: "Glow Sign Boards",
    description: "High-visibility backlit box sign board for Intex showroom."
  },
  {
    file: "1782823765005-68911fba-WhatsApp_Image_2026_06_30_at_5_39_43_PM.jpg",
    title: "Arun Ice Cream Non-lit",
    category: "Retail Branding",
    description: "Non-illuminated retail dealer board for Arun Ice Creams at Banyan Tree Soda Shop."
  },
  {
    file: "1782823765089-288c4430-WhatsApp_Image_2026_06_30_at_5_39_43_PM__1_.jpg",
    title: "Intex 3D Letter",
    category: "3D Letter Signs",
    description: "Premium red acrylic 3D letters mounted on a lobby wall for Intex reception."
  },
  {
    file: "1782823765224-c9505a0f-WhatsApp_Image_2026_06_30_at_5_39_46_PM__1_.jpg",
    title: "Itel Mobile Backlit",
    category: "Glow Sign Boards",
    description: "Custom illuminated counter sign board for itel mobile retail display."
  },
  {
    file: "1782823765339-b801c191-WhatsApp_Image_2026_06_30_at_5_39_44_PM__3_.jpg",
    title: "Intex Backlit",
    category: "Glow Sign Boards",
    description: "Outdoor backlit sign board for Intex retail outlet."
  },
  {
    file: "1782823765431-222148a1-WhatsApp_Image_2026_06_30_at_5_39_46_PM.jpg",
    title: "Itel Mobile 3D Letter",
    category: "3D Letter Signs",
    description: "Dimensional 3D letter signage for itel mobile store frontage."
  },
  {
    file: "1782823765515-f00fb91d-PHOTO_2026_06_30_17_59_52_2.jpg",
    title: "Amaron Pitstop",
    category: "Retail Branding",
    description: "Full dealership branding and signage package for Amaron Pitstop."
  },
  {
    file: "1782823765597-0b98a72e-WhatsApp_Image_2026_06_30_at_5_39_44_PM.jpg",
    title: "Intex Branding",
    category: "Retail Branding",
    description: "In-store visual branding and advertising panels for Intex."
  },
  {
    file: "1782823765812-876c5461-PHOTO_2026_06_30_17_59_52.jpg",
    title: "Kent Branding",
    category: "Retail Branding",
    description: "Corporate showroom front branding and panels for Kent RO."
  },
  {
    file: "1782823766092-4c69159c-WhatsApp_Image_2026_06_30_at_5_39_49_PM__3_.jpg",
    title: "Amaron Pit Stop",
    category: "Retail Branding",
    description: "Backlit canopy and wall branding installation for Amaron Pitstop."
  },
  {
    file: "1782823766218-5432a478-WhatsApp_Image_2026_06_30_at_5_39_50_PM__1_.jpg",
    title: "Hatsun Standees",
    category: "Standees",
    description: "Custom printed promotional standee display for Hatsun Agro products."
  },
  {
    file: "1782823766321-f3640df3-PHOTO_2026_06_30_18_01_15.jpg",
    title: "iPhone Standee",
    category: "Standees",
    description: "Premium roll-up display standee for iPhone 15 Pro promo launch."
  },
  {
    file: "1782823766446-d2cacf40-WhatsApp_Image_2026_06_30_at_5_39_48_PM__2_.jpg",
    title: "Amaron Pitstop",
    category: "Retail Branding",
    description: "Exterior brand board and outlet wall branding for Amaron."
  },
  {
    file: "1782823766576-5b589329-WhatsApp_Image_2026_06_30_at_5_39_49_PM.jpg",
    title: "Kent Branding",
    category: "Retail Branding",
    description: "Promotional dealer shopfront signage for Kent water purifiers."
  },
  {
    file: "1782823766672-647262ed-PHOTO_2026_06_30_18_01_16.jpg",
    title: "Arun Ice Cream Standee",
    category: "Standees",
    description: "Tear-proof pull-up promotional standee for Arun Ice Creams."
  },
  {
    file: "1782823766793-b443adad-WhatsApp_Image_2026_06_30_at_5_39_50_PM__2_.jpg",
    title: "Amaron Branding",
    category: "Retail Branding",
    description: "In-store retail counter and display rack branding for Amaron."
  },
  {
    file: "1782823766896-d7d6c46f-WhatsApp_Image_2026_06_30_at_5_39_50_PM__3_.jpg",
    title: "iPhone Standee",
    category: "Standees",
    description: "Indoor promotional standee banner for Apple iPhone."
  },
  {
    file: "1782823767012-c9f8fe03-WhatsApp_Image_2026_06_30_at_5_39_39_PM.jpg",
    title: "iPhone Standee",
    category: "Standees",
    description: "Exhibition rollup banner standee for iPhone."
  },
  {
    file: "1782823767132-1966b2f2-WhatsApp_Image_2026_06_30_at_5_39_50_PM.jpg",
    title: "Ecolink Branding",
    category: "Retail Branding",
    description: "Commercial lighting dealer board and store branding for Ecolink."
  },
  {
    file: "1782823767256-f49e2fa5-WhatsApp_Image_2026_06_30_at_5_39_40_PM.jpg",
    title: "iPhone Standee",
    category: "Standees",
    description: "Retail showroom entrance standee for iPhone."
  },
  {
    file: "1782823767369-0326326c-WhatsApp_Image_2026_06_30_at_5_39_51_PM.jpg",
    title: "Philips 3D Letter",
    category: "3D Letter Signs",
    description: "Laser-cut acrylic 3D letter branding on front facade for Philips."
  },
  {
    file: "1782823767486-81831ba9-WhatsApp_Image_2026_06_30_at_5_39_51_PM__1_.jpg",
    title: "iPhone Standee",
    category: "Standees",
    description: "Pull-up promo banner standee for iPhone sales launch."
  },
  {
    file: "1782823767602-ee63acdd-WhatsApp_Image_2026_06_30_at_5_39_40_PM__2_.jpg",
    title: "Philips Backlit",
    category: "Glow Sign Boards",
    description: "Mahadev Galaxie store front backlit glow sign board for Philips."
  },
  {
    file: "1782823767706-de06b9ea-WhatsApp_Image_2026_06_30_at_5_39_41_PM__3_.jpg",
    title: "Castrol Glow Signage",
    category: "Glow Sign Boards",
    description: "Dealer shopfront glowing billboard for Castrol Modern Oil."
  },
  {
    file: "1782823767809-3a1e8999-WhatsApp_Image_2026_06_30_at_5_39_41_PM.jpg",
    title: "Brightstar Branding",
    category: "Retail Branding",
    description: "Premium custom wallpaper and corporate lobby branding for Brightstar."
  }
];

export default function OurWorks() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Close lightbox handler
  const closeLightbox = () => setSelectedIdx(null);

  // Navigate lightbox handlers
  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prevIdx) => (prevIdx === 0 ? galleryImages.length - 1 : prevIdx - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prevIdx) => (prevIdx === galleryImages.length - 1 ? 0 : prevIdx + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setSelectedIdx((prevIdx) => (prevIdx === 0 ? galleryImages.length - 1 : prevIdx - 1));
      if (e.key === "ArrowRight") setSelectedIdx((prevIdx) => (prevIdx === galleryImages.length - 1 ? 0 : prevIdx + 1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  return (
    <main className="our-works-page">
      <div className="works-header">
        <Reveal>
          <span className="section-tag">Portfolio</span>
          <h1 className="section-title" style={{ marginTop: "10px" }}>
            Our <span>Works</span>
          </h1>
          <p className="section-subtitle" style={{ color: "var(--muted-foreground)", marginTop: "15px", fontSize: "17px" }}>
            Explore a curated selection of our high-quality branding and signage installations delivered for leading brands across India.
          </p>
        </Reveal>
      </div>

      <div className="works-grid">
        {galleryImages.map((img, idx) => (
          <Reveal key={idx} delay={0.03 * (idx % 8)} y={25}>
            <div className="work-card" onClick={() => setSelectedIdx(idx)}>
              <div className="work-card-img-wrapper">
                <img
                  src={`/gallery/${img.file}`}
                  alt={img.title}
                  loading="lazy"
                />
              </div>
              <div className="work-card-overlay">
                <div className="work-card-info">
                  <h3>{img.title}</h3>
                  <p>{img.category}</p>
                </div>
                <div className="work-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lightbox-backdrop"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
                &times;
              </button>

              {/* Image Container with Nav Buttons */}
              <div className="lightbox-img-container">
                <button className="lightbox-prev" onClick={showPrev} aria-label="Previous Image">
                  &#8592;
                </button>
                
                <img
                  src={`/gallery/${galleryImages[selectedIdx].file}`}
                  alt={galleryImages[selectedIdx].title}
                />

                <button className="lightbox-next" onClick={showNext} aria-label="Next Image">
                  &#8594;
                </button>
              </div>

              {/* Information / Subtitle */}
              <div className="lightbox-info">
                <h4>{galleryImages[selectedIdx].title}</h4>
                <p style={{ color: "var(--secondary)", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
                  {galleryImages[selectedIdx].category}
                </p>
                <p style={{ fontSize: "14px", color: "var(--muted-foreground)", maxWidth: "600px", margin: "0 auto" }}>
                  {galleryImages[selectedIdx].description}
                </p>
                <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.3)", marginTop: "12px" }}>
                  {selectedIdx + 1} of {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
