"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for any page-level anchor link scrolls
    window.lenisInstance = lenis;

    return () => {
      lenis.destroy();
      window.lenisInstance = null;
    };
  }, []);

  // Handle route change: scroll to top immediately and resize lenis
  useEffect(() => {
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(0, { immediate: true });
      // Short delay to allow layout to settle before resizing
      setTimeout(() => {
        window.lenisInstance?.resize();
      }, 80);
    }
  }, [pathname]);

  return <>{children}</>;
}
