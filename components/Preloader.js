"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "OUT OF HOME",
  "RETAIL BRANDING",
  "EXPERIENTIAL",
  "CREATIVE SIGNAGE"
];

export default function Preloader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initial loading sequence
    let count = 0;
    const totalDuration = 2000; // 2 seconds loading duration
    const stepTime = totalDuration / 100;

    const interval = setInterval(() => {
      count++;
      setProgress(count);

      if (count >= 100) {
        clearInterval(interval);
        
        if (typeof window !== "undefined") {
          sessionStorage.setItem("skyads_preloaded", "true");
        }
        
        setTimeout(() => {
          setIsLoaded(true);
          // Dispatch event to trigger animations on the page
          setTimeout(() => {
            window.dispatchEvent(new Event("preloaderFinished"));
            
            // Remove loader from DOM entirely after transition animation (800ms)
            setTimeout(() => {
              setShouldRender(false);
            }, 800);
          }, 500);
        }, 400);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // During SSR (Server Side Rendering), render a static layout of 0% progress to avoid hydration mismatch
  if (!mounted) {
    return (
      <div id="preloader">
        <div className="loader-grid"></div>
        <div className="loader-frame-corner tl" />
        <div className="loader-frame-corner br" />
        <div className="loader-bg-watermark-container">
          <span className="loader-bg-watermark">{words[0]}</span>
        </div>
        <div className="loader-content">
          <div className="loader-subtitle">
            <span>Sky Advertising</span>
            <div className="dot"></div>
            <span className="est">Est. 2010</span>
          </div>
          <div className="loader-title-wrapper">
            <h2 className="loader-title">{words[0]}</h2>
          </div>
          <div className="loader-progress-container">
            <div className="loader-progress-bar" style={{ width: "0%" }}></div>
          </div>
          <div className="loader-percentage">
            <span className="num">0</span>
            <span className="symbol">%</span>
          </div>
        </div>
        <div className="loader-footer">
          <div className="loader-footer-line"></div>
          <p>Impact // Scale // Result</p>
        </div>
      </div>
    );
  }

  if (!shouldRender) return null;

  const activeWordIndex = Math.min(Math.floor(progress / 25), words.length - 1);

  return (
    <div id="preloader" className={isLoaded ? "loaded" : ""}>
      {/* Background Grid */}
      <div className="loader-grid"></div>

      {/* Frame Corners */}
      <div className="loader-frame-corner tl" />
      <div className="loader-frame-corner br" />

      {/* Giant Watermark Background Text */}
      <div className="loader-bg-watermark-container">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeWordIndex}
            className="loader-bg-watermark"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1.0, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {words[activeWordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="loader-content">
        {/* Header Block */}
        <div className="loader-subtitle">
          <span>Sky Advertising</span>
          <div className="dot"></div>
          <span className="est">Est. 2010</span>
        </div>

        {/* Dynamic Title Slide */}
        <div className="loader-title-wrapper">
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeWordIndex}
              className="loader-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {words[activeWordIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Progress Bar (using scaleX transform for absolute performance) */}
        <div className="loader-progress-container">
          <div 
            className="loader-progress-bar" 
            style={{ 
              width: "100%", 
              transform: `scaleX(${progress / 100})`, 
              transformOrigin: "left" 
            }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <div className="loader-percentage">
          <span className="num">{progress}</span>
          <span className="symbol">%</span>
        </div>
      </div>

      {/* Tagline Footer */}
      <div className="loader-footer">
        <div className="loader-footer-line"></div>
        <p>Impact // Scale // Result</p>
      </div>
    </div>
  );
}
