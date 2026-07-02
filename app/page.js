"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Helper components for scroll reveals
function Reveal({ children, delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// Client brand logos data
const brandLogos = [
  // Famous / Top Companies
  { file: "arokya.jpg", name: "Arokya" },
  { file: "hatsun.jpg", name: "Hatsun" },
  { file: "iphone_new.png", name: "iPhone" },
  { file: "oppo.png", name: "Oppo" },
  { file: "vivo.png", name: "Vivo" },
  { file: "37.png", name: "Philips" },
  { file: "5.png", name: "Castrol" },
  { file: "7.png", name: "Croma" },
  { file: "9.webp", name: "Eureka Forbes" },
  { file: "25.png", name: "Polycab" },
  { file: "4.png", name: "Cars24" },
  { file: "AMARONN.png", name: "Amaron" },
  { file: "40.jpg.jpeg", name: "Saint-Gobain" },
  { file: "11.webp", name: "Frooti" },
  { file: "38.png", name: "OYO" },
  { file: "19.jpg.jpeg", name: "Lava" },
  { file: "15.jpg.jpeg", name: "Intex" },
  { file: "14.jpg.jpeg", name: "itel" },
  { file: "34.png", name: "Ingram Micro" },
  { file: "35.avif", name: "Redington" },
  { file: "22.png", name: "Livpure" },
  { file: "39.jpg.jpeg", name: "Arun Icecreams" },
  { file: "2.jpg.jpeg", name: "Beetel" },
  { file: "13.png", name: "iBall" },

  // Other / Niche / Less-Known Companies
  { file: "30.png", name: "Stanza Living" },
  { file: "36.png", name: "Amara Raja" },
  { file: "8.png", name: "Duravit" },
  { file: "10.png", name: "fcuk" },
  { file: "1.png", name: "Baba Elaichi" },
  { file: "24.jpg.jpeg", name: "Okaya" },
  { file: "23.webp", name: "Nova" },
  { file: "26.jpg.jpeg", name: "Powerzone" },
  { file: "3.png", name: "Blankslate" },
  { file: "6.png", name: "cnvrs8" },
  { file: "16.jpg.jpeg", name: "Jelly Drink" },
  { file: "18.png", name: "Lapcare" },
  { file: "20.jpg.jpeg", name: "Lemon" },
  { file: "27.jpg.jpeg", name: "Rahimafrooz" },
  { file: "28.png", name: "Ramsons" },
  { file: "29.jpg.jpeg", name: "Servokon" },
  { file: "31.png", name: "TLG India" },
  { file: "32.jpg.jpeg", name: "Videotex" },
  { file: "33.png", name: "Zopo" }
];


// Interactive verticals data
const verticalsData = [
  {
    id: "1",
    logo: "/logos/white-HyperGlocal.png",
    name: "LED Signage",
    tagline: "Vibrant Night-Time Visibility",
    description: "High-quality energy-efficient LED signs designed for storefronts, office buildings, and shopping complexes. Using premium Samsung LED modules and IP67 waterproof casings, we ensure your logo shines bright with minimal power consumption.",
    accent: "217 91% 56%",
    number: "01"
  },
  {
    id: "2",
    logo: "/logos/white-Elevate.png",
    name: "ACP Sign Boards",
    tagline: "Premium Storefront Identity",
    description: "Aluminium Composite Panel shopfronts engineered for durability and flat elegance. We use certified brand panels (like Aludecor or Eurobond) fabricated on thick anti-rust metal grids, creating modern, sleek exterior facades.",
    accent: "195 100% 45%",
    number: "02"
  },
  {
    id: "3",
    logo: "/White-MediaCircle.png",
    name: "3D Letter Signs",
    tagline: "Sophisticated Dimensional Presence",
    description: "Make your brand logo physically stand out. We design and install high-precision 3D dimensional lettering cut from Stainless Steel (grade 304), polished brass, acrylic, and ACP, utilizing front diffused or halo-lit backlighting.",
    accent: "205 100% 55%",
    number: "03"
  },
  {
    id: "4",
    logo: "/logos/white-interactx.png",
    name: "Flex Printing",
    tagline: "Scalable Outdoor Hoardings",
    description: "Heavy-duty solvent flex printing for large-scale outdoor banners, billboards, commercial hoardings, and event publicity. Using high-denier vinyl meshes and fade-resistant inks, your promotions withstand extreme weather.",
    accent: "230 95% 60%",
    number: "04"
  },
  {
    id: "5",
    logo: "/logos/white-multiverse.png",
    name: "Vinyl Printing",
    tagline: "Sharp In-Store Visuals",
    description: "High-resolution eco-solvent vinyl printing mounted on ACP or Sunboard sheets. Perfect for glass manifestations, window graphics, promotional boards, and internal corporate branding displays.",
    accent: "210 100% 50%",
    number: "05"
  },
  {
    id: "6",
    logo: "/logos/white-lampost.png",
    name: "Glow Sign Boards",
    tagline: "24/7 Outdoor Publicity",
    description: "Sturdy double-sided or single-sided backlit box signs built with thick aluminum profile frames, interior tube/LED arrays, and translucent flex skins for affordable night-time branding.",
    accent: "180 80% 45%",
    number: "06"
  },
  {
    id: "7",
    logo: "/logos/white-WAYPOINT.png",
    name: "Retail Branding",
    tagline: "Immersive Retail Spaces",
    description: "Tension fabric lightboxes, display standees, promo tables, canvas backdrops, and POSM materials built to optimize in-store customer experiences and drive franchise conversions.",
    accent: "225 90% 55%",
    number: "07"
  },
  {
    id: "8",
    logo: "/logos/white-WAYPOINT.png",
    name: "Standees",
    tagline: "Portable Promotional Displays",
    description: "Premium roll-up standees, X-banners, and tripod display stands. Lightweight, durable, and highly portable, they are perfect for retail storefronts, events, product launches, and indoor advertising.",
    accent: "185 90% 50%",
    number: "08"
  }
];
// Render custom visual representation for each vertical category
const renderVisualElement = (id, accent) => {
  const getImagePath = () => {
    switch(id) {
      case "1": return "/work/led_signage.png";
      case "2": return "/work/acp_signage.png";
      case "3": return "/work/three_d_letters.png";
      case "4": return "/work/flex_printing.png";
      case "5": return "/work/vinyl_printing.png";
      case "6": return "/work/glow_sign_board.png";
      case "7": return "/work/retail_branding.png";
      case "8": return "/work/standees.png";
      default: return "";
    }
  };

  const getAltText = () => {
    switch(id) {
      case "1": return "LED Signage Showcase";
      case "2": return "ACP Sign Board Showcase";
      case "3": return "3D Letter Sign Showcase";
      case "4": return "Flex Printing Showcase";
      case "5": return "Vinyl Printing Showcase";
      case "6": return "Glow Sign Board Showcase";
      case "7": return "Retail Branding Showcase";
      case "8": return "Standees Showcase";
      default: return "";
    }
  };

  const imgPath = getImagePath();
  if (!imgPath) return null;

  return (
    <div className="vertical-image-wrapper">
      <div className="image-radial-glow" style={{ background: `radial-gradient(circle, hsla(${accent} / 0.4) 0%, transparent 70%)` }}></div>
      <div className="image-frame" style={{ boxShadow: `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 15px hsla(${accent} / 0.1)` }}>
        <img src={imgPath} alt={getAltText()} loading="lazy" />
        <div className="image-overlay-glow" style={{ border: `1.5px solid hsla(${accent} / 0.25)` }}></div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isTabAnimating, setIsTabAnimating] = useState(false);
  const heroRef = useRef(null);

  // Scroll Parallax fade-out and scale-down effect for Hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  useEffect(() => {
    console.log("Home component mounted. Checking preloaded status:", sessionStorage.getItem("skyads_preloaded"));
    
    // Check if preloader has already finished in this session
    if (sessionStorage.getItem("skyads_preloaded") === "true") {
      console.log("Preloader already completed. Triggering animations with 150ms delay...");
      const timer = setTimeout(() => {
        setIsAnimated(true);
        console.log("State isAnimated set to true (cached visit)");
      }, 150);
      return () => clearTimeout(timer);
    }

    const handlePreloaderFinish = () => {
      console.log("Received preloaderFinished event. Triggering animations with 50ms delay...");
      setTimeout(() => {
        setIsAnimated(true);
        console.log("State isAnimated set to true (first visit)");
      }, 50);
    };

    window.addEventListener("preloaderFinished", handlePreloaderFinish);
    return () => window.removeEventListener("preloaderFinished", handlePreloaderFinish);
  }, []);

  // Hero section mouse tracking for radial glow
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    heroRef.current.style.setProperty("--mouse-x", `${x}px`);
    heroRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleTabChange = (index) => {
    if (index === activeTab || isTabAnimating) return;
    setIsTabAnimating(true);
    setTimeout(() => {
      setActiveTab(index);
      setIsTabAnimating(false);
    }, 400);
  };

  const currentTab = verticalsData[activeTab];

  return (
    <main>
      {/* Hero Section */}
      <section 
        className={`hero ${isAnimated ? "active" : ""}`} 
        id="home" 
        ref={heroRef}
        onMouseMove={handleMouseMove}
      >
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        
        <motion.div 
          className="hero-content-split"
          style={{ y: yParallax, opacity: opacityParallax, scale: scaleParallax }}
        >
          <div className="hero-text-side">
            <div className="hero-titles">
              <div className="hero-line-wrapper">
                <motion.h1 
                  className="hero-title-line"
                  initial={{ y: "110%" }}
                  animate={isAnimated ? { y: 0 } : { y: "110%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                >
                  Elevating
                </motion.h1>
              </div>
              <div className="hero-line-wrapper">
                <motion.h1 
                  className="hero-title-line"
                  initial={{ y: "110%" }}
                  animate={isAnimated ? { y: 0 } : { y: "110%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                >
                  <span className="accent">brands</span>
                </motion.h1>
              </div>
              <div className="hero-line-wrapper offset">
                <motion.h1 
                  className="hero-title-line-offset"
                  initial={{ y: "110%" }}
                  animate={isAnimated ? { y: 0 } : { y: "110%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                >
                  <span className="italic">everywhere</span>
                </motion.h1>
              </div>
            </div>
            
            <div className="hero-bottom-compact">
              <motion.div 
                className="hero-desc-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <p>End-to-end signage and branding solutions trusted by businesses across India for quality, consistency, and timely execution. Delivering high-quality signage, displays, and branding projects for businesses, franchises, and corporate brands across India.</p>
              </motion.div>
              <motion.div 
                className="hero-actions-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <div className="magnetic-btn-wrap">
                  <Link href="/services" className="btn-premium solid">Our Services</Link>
                </div>
                <div className="magnetic-btn-wrap">
                  <Link href="/contact" className="btn-premium outline">Contact our team</Link>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="hero-image-side">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={isAnimated ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="hero-illustration-wrapper"
            >
              <img src="/images/natural_marketer.png" alt="Digital Marketing Portrait" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={isAnimated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="hero-scroll-indicator-line"></div>
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <section className="work" id="work">
        <div className="section-container">
          <Reveal>
            <span className="section-tag">Core Offerings</span>
            <h2 className="section-title">Signage &amp; <span>Branding</span></h2>
          </Reveal>
          
          <div className="work-grid">
            {/* LED Boards */}
            <Reveal delay={0.05} y={40}>
              <div className="work-card" onClick={() => window.location.href='/services#led-signage'}>
                <div className="work-img-container">
                  <img src="/work/led_signage.png" alt="LED Sign Boards" />
                  <div className="work-overlay">
                    <div className="work-meta">
                      <div className="work-bullet"></div>
                      <span className="work-category">LED Boards &amp; Signage</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            {/* ACP Boards */}
            <Reveal delay={0.1} y={40}>
              <div className="work-card" onClick={() => window.location.href='/services#acp-boards'}>
                <div className="work-img-container">
                  <img src="/work/acp_signage.png" alt="ACP Signage Panels" />
                  <div className="work-overlay">
                    <div className="work-meta">
                      <div className="work-bullet"></div>
                      <span className="work-category">ACP Sign Boards</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            {/* 3D Letters */}
            <Reveal delay={0.15} y={40}>
              <div className="work-card" onClick={() => window.location.href='/services#letter-boards'}>
                <div className="work-img-container">
                  <img src="/work/three_d_letters.png" alt="Metal 3D Letters" />
                  <div className="work-overlay">
                    <div className="work-meta">
                      <div className="work-bullet"></div>
                      <span className="work-category">3D Letter Sign Boards</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            {/* Glow Sign Boards */}
            <Reveal delay={0.05} y={40}>
              <div className="work-card" onClick={() => window.location.href='/services#glow-signs'}>
                <div className="work-img-container">
                  <img src="/work/glow_sign_board.png" alt="Glow Sign Boards" />
                  <div className="work-overlay">
                    <div className="work-meta">
                      <div className="work-bullet"></div>
                      <span className="work-category">Glow Sign Boards</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            {/* Flex & Vinyl Printing */}
            <Reveal delay={0.1} y={40}>
              <div className="work-card" onClick={() => window.location.href='/services#flex-vinyl'}>
                <div className="work-img-container">
                  <img src="/work/flex_printing.png" alt="Large hoarding flex printing" />
                  <div className="work-overlay">
                    <div className="work-meta">
                      <div className="work-bullet"></div>
                      <span className="work-category">Flex &amp; Vinyl Printing</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            {/* Retail Branding */}
            <Reveal delay={0.15} y={40}>
              <div className="work-card" onClick={() => window.location.href='/services#retail-branding'}>
                <div className="work-img-container">
                  <img src="/work/retail_branding.png" alt="Retail Branding Solutions" />
                  <div className="work-overlay">
                    <div className="work-meta">
                      <div className="work-bullet"></div>
                      <span className="work-category">Retail Branding Solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="work-actions-container">
            <Reveal delay={0.2}>
              <div className="magnetic-btn-wrap">
                <Link href="/services" className="btn-premium outline">View All Services</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* USP / Trust Section */}
      <section className="about" id="usp" style={{ borderTop: "1px solid var(--card-border)", borderBottom: "1px solid var(--card-border)", backgroundColor: "rgba(15, 23, 42, 0.05)" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <span className="section-tag">Why Choose Us</span>
              <h2 className="section-title">What Makes Us <span>Different</span></h2>
            </div>
          </Reveal>
          
          <div className="founders-row" style={{ marginTop: 0, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            <Reveal delay={0.05} y={20}>
              <div className="founder-card" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "30px", borderRadius: "12px", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                <h3 className="founder-name" style={{ fontSize: "18px", color: "var(--secondary)" }}>Pan-India Service Network</h3>
                <p className="founder-quote" style={{ borderLeft: "2px solid var(--secondary)", paddingLeft: "15px", margin: 0, fontStyle: "normal", color: "var(--muted-foreground)", fontSize: "14px" }}>
                  We execute and deliver signage projects across India, making us the perfect single-point partner for corporate offices, retail chains, and franchise networks with multiple locations.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.1} y={20}>
              <div className="founder-card" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "30px", borderRadius: "12px", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                <h3 className="founder-name" style={{ fontSize: "18px", color: "var(--secondary)" }}>Complete Branding Under One Roof</h3>
                <p className="founder-quote" style={{ borderLeft: "2px solid var(--secondary)", paddingLeft: "15px", margin: 0, fontStyle: "normal", color: "var(--muted-foreground)", fontSize: "14px" }}>
                  From flex, vinyl, and fabric printing to LED signage, ACP boards, 3D letters, and standees, we cover your complete indoor &amp; outdoor signage needs. No vendor clutter.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15} y={20}>
              <div className="founder-card" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "30px", borderRadius: "12px", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                <h3 className="founder-name" style={{ fontSize: "18px", color: "var(--secondary)" }}>Reliability &amp; Quality Standards</h3>
                <p className="founder-quote" style={{ borderLeft: "2px solid var(--secondary)", paddingLeft: "15px", margin: 0, fontStyle: "normal", color: "var(--muted-foreground)", fontSize: "14px" }}>
                  Experience working with leading names like Amaron, Apple, Philips, and Arun Ice Cream. Professional production, installation, and compliance ensure deadlines are met.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Believers Section */}
      <section className="believers" id="believers">
        <Reveal>
          <div className="believers-title-wrapper">
            <span className="section-tag">Clients Served</span>
            <h2 className="section-title">Brands We <span>Partner With</span></h2>
          </div>
        </Reveal>
        
        <div className="ticker-wrap">
          <div className="ticker-fade-left"></div>
          <div className="ticker-fade-right"></div>
          <div className="ticker-track">
            {brandLogos.map((logo, index) => (
              <div className="ticker-item" key={index}>
                {logo.file ? (
                  <img src={`/brandlogos/${logo.file}`} alt={logo.name} loading="lazy" />
                ) : (
                  <span className="ticker-text-logo">{logo.name}</span>
                )}
              </div>
            ))}
            {/* Duplicated track for infinite loops */}
            {brandLogos.map((logo, index) => (
              <div className="ticker-item" key={`dup-${index}`}>
                {logo.file ? (
                  <img src={`/brandlogos/${logo.file}`} alt={logo.name} loading="lazy" />
                ) : (
                  <span className="ticker-text-logo">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Verticals Tab Switcher */}
      <section className="verticals" id="verticals">
        <div className="section-container">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <span className="section-tag">Capabilities</span>
              <h2 className="section-title">Dimensions of <span>Branding</span></h2>
            </div>
          </Reveal>
          
          <div className="verticals-tab-container">
            <Reveal delay={0.05}>
              <div className="verticals-tabs-scroll">
                <div className="verticals-tabs-track">
                  {verticalsData.map((v, index) => (
                    <button
                      key={v.id}
                      className={`vertical-tab-btn ${index === activeTab ? "active" : ""}`}
                      onClick={() => handleTabChange(index)}
                    >
                      <span className="relative z-10">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.1} y={40}>
              <div className="verticals-display">
                <div 
                  className="vertical-glow-bg" 
                  style={{
                    background: `linear-gradient(135deg, hsla(${currentTab.accent} / 0.18) 0%, rgba(3, 7, 18, 0.92) 60%)`
                  }}
                ></div>
                <div className="vertical-watermark">{currentTab.number}</div>
                <div className={`vertical-content-wrapper ${isTabAnimating ? "animating" : ""}`}>
                  <div className="vertical-logo-side">
                    {renderVisualElement(currentTab.id, currentTab.accent)}
                  </div>
                  <div className="vertical-info-side">
                    <span 
                      className="vertical-badge"
                      style={{
                        backgroundColor: `hsla(${currentTab.accent} / 0.12)`,
                        color: `hsl(${currentTab.accent})`
                      }}
                    >
                      {currentTab.tagline}
                    </span>
                    <h3 className="vertical-name">{currentTab.name}</h3>
                    <p className="vertical-desc">{currentTab.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements" id="achievements">
        <div className="section-container">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <span className="section-tag">Scale &amp; Quality</span>
              <h2 className="section-title">Trusted <span>Execution</span></h2>
            </div>
          </Reveal>
          
          <Reveal delay={0.05} y={45}>
            <div className="achievement-hero-card" style={{ boxShadow: "none" }}>
              <img src="/awards/mainawards.png" alt="Sky Advertising Factory &amp; Production Unit" />
            </div>
          </Reveal>
          
          <div className="achievements-grid">
            <div className="achievements-border-top"></div>
            <div className="achievements-border-bottom"></div>
            
            {/* Render achievements icons */}
            {brandLogos.map((logo, idx) => (
              <Reveal key={idx} delay={0.02 * (idx % 12)} y={20}>
                <div className="achievement-grid-item">
                  <img src={`/brandlogos/${logo.file}`} alt={logo.name} loading="lazy" />
                  <div className="grid-plus top-right">+</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="about" id="about">
        <div className="section-container">
          <Reveal>
            <div className="about-philosophy">
              <span className="section-tag">Brand Story</span>
              <p className="philosophy-text" style={{ fontSize: "clamp(1.2rem, 3vw, 2.2rem)" }}>
                Sky Advertising is a <span className="highlight">leading signage &amp; branding solutions company</span> based in Delhi, India. We specialize in <span className="gradient">designing, manufacturing, and installing</span> high-quality advertising materials across the nation.
              </p>
              <div className="magnetic-btn-wrap" style={{ marginTop: "40px" }}>
                <Link href="/about" className="btn-premium solid">Read Our Story</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
