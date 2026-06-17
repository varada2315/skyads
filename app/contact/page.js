"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Helper component for reveals
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

function ContactFormContent() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success

  useEffect(() => {
    if (subject) {
      setMessage(`Hello, I am interested in ${subject}. Please share details. `);
    }
  }, [subject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate API submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="form-name" className="form-label">Full Name</label>
        <input 
          type="text" 
          id="form-name" 
          className="form-input" 
          placeholder="Mohd Anas" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="form-email" className="form-label">Email Address</label>
        <input 
          type="email" 
          id="form-email" 
          className="form-input" 
          placeholder="anas@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="form-phone" className="form-label">Phone / WhatsApp Number</label>
        <input 
          type="tel" 
          id="form-phone" 
          className="form-input" 
          placeholder="9315253017" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="form-company" className="form-label">Company Name</label>
        <input 
          type="text" 
          id="form-company" 
          className="form-input" 
          placeholder="Sky Advertising" 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="form-msg" className="form-label">Message Details</label>
        <textarea 
          id="form-msg" 
          className="form-input" 
          placeholder="Explain your sign board sizes, materials, or locations..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      
      <div className="magnetic-btn-wrap" style={{ width: "100%" }}>
        <button 
          type="submit" 
          className="btn-premium solid" 
          style={{ 
            width: "100%", 
            border: "none",
            background: status === "success" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "",
            boxShadow: status === "success" ? "0 0 15px rgba(16, 185, 129, 0.3)" : ""
          }}
          disabled={status !== "idle"}
        >
          {status === "idle" && "Send Inquiry"}
          {status === "sending" && "Sending Message..."}
          {status === "success" && "Inquiry Sent Successfully!"}
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ paddingTop: "40px" }}>
      <section className="contact-header">
        <div className="section-container" style={{ paddingBottom: "20px" }}>
          <div style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span 
              className="section-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
            >
              Reach Us
            </motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h1 
              className="section-title"
              initial={{ opacity: 0, y: 40 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Start Your Branding <span>Project</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 }}
          >
            Have a signage project or corporate brand rollout? Connect with our team and get professional design and cost estimation.
          </motion.p>
        </div>
      </section>

      <section className="contact-body">
        <div className="section-container" style={{ padding: "0 6%" }}>
          <div className="contact-layout">
            
            <div className="contact-info">
              <Reveal delay={0.05} y={20}>
                <div className="contact-card-info-item">
                  <div className="contact-card-icon">✉</div>
                  <div className="contact-info-block">
                    <span className="contact-info-label">Email Us</span>
                    <p className="contact-info-value">
                      <a href="mailto:Skyadvertising2011@gmail.com">Skyadvertising2011@gmail.com</a>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1} y={20}>
                <div className="contact-card-info-item">
                  <div className="contact-card-icon">📞</div>
                  <div className="contact-info-block">
                    <span className="contact-info-label">Call Us</span>
                    <p className="contact-info-value">
                      <a href="tel:9990551176">9990551176</a>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15} y={20}>
                <div className="contact-card-info-item">
                  <div className="contact-card-icon">💬</div>
                  <div className="contact-info-block">
                    <span className="contact-info-label">WhatsApp Chat</span>
                    <p className="contact-info-value">
                      <a href="https://wa.me/919315253017" target="_blank" rel="noopener noreferrer">
                        +91 9315253017
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2} y={20}>
                <div className="contact-card-info-item">
                  <div className="contact-card-icon">📍</div>
                  <div className="contact-info-block">
                    <span className="contact-info-label">Our Base</span>
                    <p className="contact-info-value" style={{ fontSize: "16px", color: "var(--muted-foreground)" }}>
                      Delhi, India<br />Serving branding rollouts across all major cities in India.
                    </p>
                  </div>
                </div>
              </Reveal>
              
              {/* Map Placeholder */}
              <Reveal delay={0.25} y={15}>
                <div className="contact-map-placeholder">
                  <span>
                    Map View: Delhi Base / Pan-India Network
                  </span>
                </div>
              </Reveal>
            </div>
            
            <div className="contact-form-card">
              <Reveal delay={0.1}>
                <Suspense fallback={<div style={{ color: "var(--muted-foreground)" }}>Loading form fields...</div>}>
                  <ContactFormContent />
                </Suspense>
              </Reveal>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
