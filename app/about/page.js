"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

// Interactive Counter that triggers when in view
function Counter({ value }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/\d/g, "");
  const [hasRun, setHasRun] = useState(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (hasRun) return;
        setHasRun(true);
        let start = 0;
        const end = target;
        const duration = 1200; // ms
        const steps = 40;
        const stepTime = duration / steps;
        const stepValue = end / steps;

        const timer = setInterval(() => {
          start += stepValue;
          if (start >= end) {
            clearInterval(timer);
            setCount(end);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

// SVGs for Core Values
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const UserCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// SVGs for Mission / Vision
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const CompassIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// SVGs for Timeline
const HammerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
    <path d="m16 19 3-3" />
    <path d="M19 21h.01" />
    <path d="M22 18h.01" />
    <path d="M15.5 13.5 19 17" />
    <path d="M10 8 5.5 12.5" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" />
    <path d="M9 9 3 3m6 6V4.2M9 9H4.2" />
    <path d="m15 9 6-6m-6 6V4.2m0 4.8h4.8" />
    <path d="M9 15 3 21m6-6v4.8M9 15H4.2" />
  </svg>
);

const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
    <path d="M12 12c-2 2-5 3-7 3s1-2 3-4" />
    <path d="M12 12c2-2 3-5 3-7s-2 1-4 3" />
    <path d="M13 4.5 20 3l-1.5 7L13 4.5Z" />
    <path d="m9 15 3.5 3.5L21 21l-2.5-8.5L9 15Z" />
  </svg>
);

export default function About() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ paddingTop: "40px", position: "relative" }}>
      {/* Background Glow */}
      <div className="about-ambient-glow" />

      {/* About Hero Section */}
      <section className="about-hero">
        <div className="section-container" style={{ paddingBottom: "40px", position: "relative", zIndex: 2 }}>
          <div style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span 
              className="section-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
            >
              Our History
            </motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h1 
              className="section-title"
              initial={{ opacity: 0, y: 40 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              The Sky Advertising <span>Story</span>
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginTop: "16px" }}>
            <motion.p
              style={{ fontSize: "18px", color: "var(--muted-foreground)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              Crafting iconic physical experiences and visual landmarks across India.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Detailed Brand Story - Asymmetric Split Timeline */}
      <section className="about-story" style={{ background: "transparent", border: "none", padding: "80px 0" }}>
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="about-split-grid">
            
            {/* Left Column (Sticky Headers) */}
            <div className="about-sticky-side">
              <Reveal>
                <span className="section-tag">Evolution</span>
                <h2 className="sub-section-title">How We <span>Started</span></h2>
                <p className="about-side-desc">
                  Explore the key milestones in the journey of Sky Advertising. What began as a dedicated local workshop has evolved into a leading nationwide force in corporate signage, retail design, and physical branding solutions.
                </p>
              </Reveal>
            </div>

            {/* Right Column (Timeline Content) */}
            <div className="timeline-container-split">
              <div className="timeline-line-split" />

              {/* Timeline Item 1 */}
              <div className="timeline-item-split">
                <div className="timeline-badge-split" />
                <Reveal delay={0.05} y={20}>
                  <div className="timeline-card-split">
                    <span className="timeline-step">Stage 01 — 2016</span>
                    <h3 className="timeline-title">The Foundation</h3>
                    <div className="icon-wrapper-circle" style={{ margin: "10px 0 15px 0" }}>
                      <HammerIcon />
                    </div>
                    <p className="timeline-desc">
                      Sky Advertising was founded with a simple vision: to help local businesses establish a strong and lasting visual presence. What started as a local signage and printing workshop quickly earned a reputation for sharp execution and dedicated craftsmanship.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Timeline Item 2 */}
              <div className="timeline-item-split">
                <div className="timeline-badge-split" />
                <Reveal delay={0.1} y={20}>
                  <div className="timeline-card-split">
                    <span className="timeline-step">Stage 02 — 2020</span>
                    <h3 className="timeline-title">Expansion &amp; Scaling</h3>
                    <div className="icon-wrapper-circle" style={{ margin: "10px 0 15px 0" }}>
                      <ExpandIcon />
                    </div>
                    <p className="timeline-desc">
                      We scaled up by investing in heavy CNC routing machines, advanced metal fabrication tools, and high-efficiency LED technologies. We expanded our reach to serve retail stores and corporate brands across the state, delivering high-impact, premium visual displays.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Timeline Item 3 */}
              <div className="timeline-item-split">
                <div className="timeline-badge-split" />
                <Reveal delay={0.15} y={20}>
                  <div className="timeline-card-split">
                    <span className="timeline-step">Stage 03 — Present</span>
                    <h3 className="timeline-title">Nationwide Rollouts</h3>
                    <div className="icon-wrapper-circle" style={{ margin: "10px 0 15px 0" }}>
                      <RocketIcon />
                    </div>
                    <p className="timeline-desc">
                      Today, Sky Advertising is a trusted branding partner executing massive retail rollouts, corporate showroom signages, and 3D architectural displays across India. We deliver complete, turn-key solutions with fire-grade, certified materials.
                    </p>
                  </div>
                </Reveal>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Sky by the Numbers - Stats Section */}
      <section className="stats-section">
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">
                <Counter value="10+" />
              </span>
              <span className="stat-label">Years of Craftsmanship</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                <Counter value="500+" />
              </span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                <Counter value="15+" />
              </span>
              <span className="stat-label">Cities Connected</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                <Counter value="100%" />
              </span>
              <span className="stat-label">Quality Commitment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission" style={{ padding: "80px 0" }}>
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="about-mission-grid">
            {/* Mission */}
            <Reveal delay={0.05} y={30}>
              <div className="about-mission-card mission">
                <div className="icon-wrapper-mission">
                  <TargetIcon />
                </div>
                <span className="section-tag">To Guide Us</span>
                <h3 className="about-mission-title">Our Mission</h3>
                <p className="about-mission-quote">
                  To provide businesses with high-quality, innovative, and reliable signage and branding solutions that enhance visibility, strengthen brand identity, and drive growth.
                </p>
              </div>
            </Reveal>
            
            {/* Vision */}
            <Reveal delay={0.15} y={30}>
              <div className="about-mission-card vision">
                <div className="icon-wrapper-mission">
                  <CompassIcon />
                </div>
                <span className="section-tag">To Aspire To</span>
                <h3 className="about-mission-title">Our Vision</h3>
                <p className="about-mission-quote">
                  To become India’s most trusted signage and branding solutions company by delivering exceptional quality, nationwide service, and lasting value to our clients.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values" style={{ padding: "40px 0" }}>
        <div className="section-container" style={{ padding: "0 6%" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-tag">Values</span>
              <h2 className="sub-section-title" style={{ marginBottom: "15px" }}>Our Core <span>Principles</span></h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "15px", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                These guiding standards define our craftsmanship, delivery integrity, and long-term client focus.
              </p>
            </div>
          </Reveal>
          
          <div className="about-values-grid">
            {[
              { 
                title: "Quality Without Compromise", 
                desc: "Delivering precision, durability, and flawless finishes in every signage project we build.",
                icon: <ShieldIcon />
              },
              { 
                title: "Customer-First Approach", 
                desc: "Every project is tailored to the client's custom branding, location, and business objectives.",
                icon: <UserCheckIcon />
              },
              { 
                title: "Innovation & Creativity", 
                desc: "Using modern materials, high-efficiency LEDs, and advanced CNC routing techniques.",
                icon: <SparklesIcon />
              },
              { 
                title: "Timely Project Delivery", 
                desc: "Professional project management ensures deadlines are met without quality compromise.",
                icon: <ClockIcon />
              },
              { 
                title: "Professional Integrity", 
                desc: "Honest pricing, certified fire-grade materials, and transparent client communication.",
                icon: <AwardIcon />
              },
              { 
                title: "Long-Term Partnerships", 
                desc: "Establishing deep-rooted trust across nationwide corporate showroom rollouts.",
                icon: <GroupIcon />
              }
            ].map((val, idx) => (
              <Reveal key={idx} delay={0.05 * idx} y={20}>
                <div className="about-values-card">
                  <div className="icon-wrapper-circle">
                    {val.icon}
                  </div>
                  <h4 className="about-values-title">{val.title}</h4>
                  <p className="about-values-desc">{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="team" id="team" style={{ padding: "80px 0" }}>
        <div className="section-container" style={{ padding: "0 6%" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-tag">Leadership</span>
              <h2 className="sub-section-title" style={{ marginBottom: "15px" }}>Our <span>Management</span></h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "15px", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                Driven by decades of manufacturing expertise and a mission to execute architectural signages anywhere in India.
              </p>
            </div>
          </Reveal>
          
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* Mohd Anas */}
            <Reveal delay={0.1}>
              <div className="leader-card-creative">
                <div className="leader-img-wrapper-creative">
                  <img src="/images/mohd_anas_founder.png" alt="Mohd Anas" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="leader-info">
                  <h3 className="leader-name">Mohd Anas</h3>
                  <p className="leader-role">Founder &amp; Director</p>
                  <div style={{ color: "var(--secondary)", opacity: 0.15, height: "10px", marginBottom: "5px" }}>
                    <svg width="45" height="45" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="leader-quote" style={{ borderLeft: "2px solid var(--secondary)", paddingLeft: "20px" }}>
                    "Sky Advertising was founded to give brands a voice that stands out. We work closely with our corporate and retail clients to turn creative brand visions into physical structural masterpieces. Our commitment is quality, scale, and reliable execution everywhere."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="about-sectors" style={{ padding: "60px 0 100px 0" }}>
        <div className="section-container" style={{ padding: "0 6%" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-tag">Target Audience</span>
              <h2 className="sub-section-title" style={{ marginBottom: "15px" }}>Sectors We <span>Empower</span></h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "15px", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                Designing, manufacturing, and installing specialized exterior and interior systems for multiple corporate and public niches.
              </p>
            </div>
          </Reveal>
          
          <div className="about-sectors-wrapper">
            {[
              "Corporate Offices & Business Parks",
              "Retail Chains & Franchise Networks",
              "Automobile Dealerships",
              "Shopping Malls & Commercial Complexes",
              "Restaurants & Food Chains",
              "Real Estate Developers",
              "Hospitals & Healthcare Groups",
              "Educational Institutions",
              "Hotels & Hospitality Brands",
              "Manufacturing Companies",
              "Marketing & Branding Agencies"
            ].map((sector, idx) => (
              <Reveal key={idx} delay={0.02 * idx} y={15}>
                <div className="sector-pill-creative">
                  {sector}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
