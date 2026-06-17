import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Sky Advertising | Elevating brands, everywhere",
  description: "Pan-India signage and branding solutions. We design, manufacture, and install high-quality LED boards, ACP signs, 3D letters, and flex/vinyl printing.",
  keywords: "Sky Advertising, Signage Company Delhi, LED Sign Boards, ACP Signage, Flex Printing Delhi, Retail Branding, 3D Steel Letters, Eco Solvent Printing",
};

export const viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body>
        <Preloader />
        <SmoothScroll>
          <div className="grid-bg"></div>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
