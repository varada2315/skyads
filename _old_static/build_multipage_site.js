const fs = require('fs');

// Common Page Elements
const navbarHtml = `
  <!-- Navigation Bar -->
  <nav class="navbar">
    <a href="index.html" class="nav-logo">
      <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.08em; color: #fff; text-transform: uppercase;">SKY<span style="color: var(--secondary);">ADVERTISING</span></span>
    </a>
    <div class="nav-menu">
      <a href="index.html" class="nav-link" id="nav-home">Home</a>
      <a href="about.html" class="nav-link" id="nav-about">About</a>
      <a href="services.html" class="nav-link" id="nav-services">Services</a>
      <a href="contact.html" class="nav-link" id="nav-contact">Contact</a>
    </div>
    <div class="nav-cta" data-magnetic="true">
      <a href="contact.html" class="btn-premium outline">Let's Connect</a>
    </div>
    <button class="hamburger" aria-label="Toggle Navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>

  <!-- Mobile Nav Overlay -->
  <div class="mobile-nav-overlay">
    <a href="index.html" class="mobile-nav-link">Home</a>
    <a href="about.html" class="mobile-nav-link">About</a>
    <a href="services.html" class="mobile-nav-link">Services</a>
    <a href="contact.html" class="mobile-nav-link">Contact</a>
  </div>
`;

const footerHtml = `
  <!-- Footer -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.08em; color: #fff; text-transform: uppercase; margin-bottom: 12px; display: block;">SKY<span style="color: var(--secondary);">ADVERTISING</span></span>
          <p>End-to-end signage and branding solutions trusted by corporate brands, retail chains, commercial complexes, and hospitality companies across India.</p>
        </div>
        <div class="footer-links-grid">
          <div class="footer-links-col">
            <span class="footer-col-title">Navigation</span>
            <a href="index.html" class="footer-link">Home</a>
            <a href="about.html" class="footer-link">About</a>
            <a href="services.html" class="footer-link">Services</a>
            <a href="contact.html" class="footer-link">Contact</a>
          </div>
          <div class="footer-links-col">
            <span class="footer-col-title">Legal Pages</span>
            <a href="privacy.html" class="footer-link">Privacy Policy</a>
            <a href="terms.html" class="footer-link">Terms of Service</a>
            <a href="refund.html" class="footer-link">Refund Policy</a>
            <a href="disclaimer.html" class="footer-link">Disclaimer</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2026 Sky Advertising. All rights reserved.</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/_sky_advertising/" target="_blank" class="footer-social-icon">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
`;

const brandLogos = [
  { file: 'apple.png', name: 'Apple' },
  { file: 'bosch.png', name: 'Bosch' },
  { file: 'brother.png', name: 'Brother' },
  { file: 'DAIKIN.png', name: 'Daikin' },
  { file: 'samsung.png', name: 'Samsung' },
  { file: 'eureka-forbes.png', name: 'Eureka Forbes' },
  { file: 'icici_bank.png', name: 'ICICI Bank' },
  { file: 'aditya_birla_capital.png', name: 'Aditya Birla Capital' },
  { file: 'au small finance bank.png', name: 'AU Small Finance Bank' },
  { file: 'idfc_bank.png', name: 'IDFC Bank' },
  { file: 'iifl finance.png', name: 'IIFL Finance' },
  { file: 'standard chartered.png', name: 'Standard Chartered' },
  { file: 'Force_Motors.png', name: 'Force Motors' },
  { file: 'Tata-Motors.png', name: 'Tata Motors' },
  { file: 'nissan.png', name: 'Nissan' },
  { file: 'renault.png', name: 'Renault' },
  { file: 'volkwagen.png', name: 'Volkswagen' },
  { file: 'goodrej_properties.png', name: 'Godrej Properties' },
  { file: 'tata realty.png', name: 'Tata Realty' },
  { file: 'sobha.png', name: 'Sobha' },
  { file: 'house of hiranandani.png', name: 'House of Hiranandani' },
  { file: 'kolte patil.png', name: 'Kolte Patil' },
  { file: 'britannia.png', name: 'Britannia' },
  { file: 'MTR_LOGO.png', name: 'MTR' },
  { file: 'Skechers.png', name: 'Skechers' },
  { file: 'provogue.png', name: 'Provogue' },
  { file: 'BJP-logo.png', name: 'BJP' },
  { file: 'the-karnataka-government-kannada.png', name: 'Government of Karnataka' },
  { file: 'balmer lawrine.png', name: 'Balmer Lawrie' },
  { file: 'Indian_National_Congress.png', name: 'Indian National Congress' },
  { file: 'Reserve_Bank_of_India_logo.png', name: 'Reserve Bank of India' },
  { file: 'mofpi.png', name: 'MOFPI' },
  { file: 'jsw.png', name: 'JSW' },
  { file: 'Reliance-Industries-Limited-Logo.png', name: 'Reliance Industries' },
  { file: 'Ultratech_Cement_vector_Logo.png', name: 'UltraTech Cement' },
  { file: 'air asia.png', name: 'Air Asia' },
  { file: 'PVR_INOX.png', name: 'PVR INOX' },
  { file: 'essar.png', name: 'Essar' },
  { file: 'sky jumper.png', name: 'Sky Jumper' },
  { file: 'The_Himalaya.png', name: 'Himalaya' },
  { file: 'pepsi.png', name: 'Pepsi' },
  { file: 'dabur.png', name: 'Dabur' },
  { file: 'baskin robbins.png', name: 'Baskin Robbins' },
  { file: 'house of anita dongre.png', name: 'House of Anita Dongre' },
  { file: 'Aditya_Birla_Fashion_and_Retail.png', name: 'Aditya Birla Fashion & Retail' },
  { file: 'puma.png', name: 'Puma' },
  { file: 'arvind fashioning.png', name: 'Arvind Fashioning' }
];

let tickerHtml = '';
const duplicatedLogos = [...brandLogos, ...brandLogos];
duplicatedLogos.forEach(logo => {
  tickerHtml += `<div class="ticker-item"><img src="logos/${logo.file}" alt="${logo.name}" loading="lazy" /></div>`;
});

const awardFiles = ['aw1.jpg', 'aw2.jpg', 'aw3.jpg', 'aw4.jpg', 'aw5.jpg', 'aw6.jpg', 'aw7.jpg', 'aw8.jpg', 'aw9.jpg', 'aw10.jpg', 'aw11.jpg', 'aw13.jpg'];
let awardsHtml = '';
awardFiles.forEach((file, index) => {
  awardsHtml += `
      <div class="achievement-grid-item">
        <img src="awards/${file}" alt="Award Icon ${index + 1}" loading="lazy" />
        <div class="grid-plus top-right">+</div>
      </div>`;
});

// Load the generated team HTML
const teamHtml = `
        <div class="team-card reveal" data-index="0">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/60f88ca0f193fdd3285604fb75001c0722805c21-333x500.jpg" alt="Ajay Rathod" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">With 13 years of experience in integrated marketing, Ajay specializes in brand communications OOH, retail and BTL activations.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Ajay Rathod</h3>
            <p class="team-role">Region Head: Elevate</p>
          </div>
        </div>
        <div class="team-card reveal" data-index="1">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/d323c3bde5ebd3c0247934ef923ba59b5ab6d8c8-499x748.jpg" alt="Nikhil Rangnekar" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">A media veteran with 25+ years in media planning and brand strategy, leading scaling efforts for some of India's largest FMCG brands.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Nikhil Rangnekar</h3>
            <p class="team-role">CEO: Interspace Media</p>
          </div>
        </div>
        <div class="team-card reveal" data-index="2">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/b53164641cafebbdb9ec228056e601a0cc8e5fb0-333x500.jpg" alt="Arjan Biswas" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">Experienced strategist driving business growth and client relationships across multiple locations in Northern and Western regions.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Arjan Biswas</h3>
            <p class="team-role">Region Head: HyperGlocal</p>
          </div>
        </div>
        <div class="team-card reveal" data-index="3">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/9ae461c5b77f9edbdd41aab1f5bd8c4310178b28-333x500.jpg" alt="Srikanth Raman" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">Leading media planning, data analytics, and performance measurement tracking to deliver optimal campaign ROI.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Srikanth Raman</h3>
            <p class="team-role">Strategy & Planning, Interspace Media</p>
          </div>
        </div>
        <div class="team-card reveal" data-index="4">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/d9793e7c5d7cf3c1d17ddb621f284e6d471e5ff2-250x375.jpg" alt="Prakash Upadhyaya" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">Specialist in OOH buying, vendor networks, rate negotiations and site audits to ensure prime locations and compliance.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Prakash Upadhyaya</h3>
            <p class="team-role">Buying Head: OOH</p>
          </div>
        </div>
        <div class="team-card reveal" data-index="5">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/5dbb112e9799d8ff0de63f9c511cd5067d7ba429-489x738.jpg" alt="Farzeen Batliwalla" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">Managing human resources development, organizational growth, employee talent acquisition, and brand culture.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Farzeen Batliwalla</h3>
            <p class="team-role">Head - HR</p>
          </div>
        </div>
        <div class="team-card reveal" data-index="6">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/c275b7b4991f5e1ade80c014df115d2d1bf013bb-1024x1536.jpg" alt="Ganesh Sagwekar" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">Expert in design, semiotics, pathfinding spatial analysis and executing wayfinding systems for commercial spaces.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Ganesh Sagwekar</h3>
            <p class="team-role">AVP, Navigation Solutions Specialist</p>
          </div>
        </div>
        <div class="team-card reveal" data-index="7">
          <div class="team-img-wrapper">
            <img src="https://cdn.sanity.io/images/sppqaqoh/production/ab15adec20d676bd3a0ad0f13c9a2d902fb89df9-683x1024.jpg" alt="Avinash Tiwari" class="team-img" loading="lazy" />
            <div class="team-overlay">
              <p class="team-bio">Advising on finance structure, operational models, team management, and tech integration across the organization.</p>
            </div>
          </div>
          <div class="team-info">
            <h3 class="team-name">Avinash Tiwari</h3>
            <p class="team-role"> Board Advisor, Financial & HR Strategist</p>
          </div>
        </div>`;

// 1. INDEX / HOME PAGE
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#030712">
  <title>Sky Advertising | Elevating brands, everywhere</title>
  <meta name="description" content="Pan-India signage and branding solutions. We design, manufacture, and install high-quality LED boards, ACP signs, 3D letters, and flex/vinyl printing.">
  <meta name="keywords" content="Sky Advertising, Signage Company Delhi, LED Sign Boards, ACP Signage, Flex Printing Delhi, Retail Branding, 3D Steel Letters, Eco Solvent Printing">
  <link rel="icon" href="icon.png" type="image/png">
  <link rel="stylesheet" href="index.css?v=2.3">
</head>
<body>

  <!-- Preloader Screen -->
  <div id="preloader">
    <div class="loader-grid"></div>
    <div class="loader-content">
      <div class="loader-bg-text">SKY ADVERTISING</div>
      <div class="loader-subtitle">
        <span>Sky Advertising</span>
        <div class="dot"></div>
        <span>Delhi, India</span>
      </div>
      <div class="loader-title-wrapper">
        <h2 class="loader-title">SKY ADVERTISING</h2>
      </div>
      <div class="loader-progress-container">
        <div class="loader-progress-bar"></div>
      </div>
      <div class="loader-percentage">
        <span class="num">0</span><span class="symbol">%</span>
      </div>
    </div>
    <div class="loader-footer">
      <div class="loader-footer-line"></div>
      <p>Impact // Scale // Result</p>
    </div>
  </div>

  <div class="grid-bg"></div>

  ${navbarHtml}

  <main>
    
    <!-- Hero Section (Clean Centered Layout mapped to Reference Site) -->
    <section class="hero" id="home">
      <div class="hero-grid-bg"></div>
      <div class="hero-glow"></div>
      
      <div class="hero-content">
        <div class="hero-titles">
          <div class="hero-line-wrapper">
            <h1 class="hero-title-line">We strategically connect</h1>
          </div>
          <div class="hero-line-wrapper">
            <h1 class="hero-title-line">brands with <span class="accent">audiences</span></h1>
          </div>
          <div class="hero-line-wrapper offset">
            <h2 class="hero-title-line-offset">who <span class="italic">provoke</span>, <span class="italic">inspire</span> &amp; <span class="italic">convert</span></h2>
          </div>
        </div>
        
        <div class="hero-bottom">
          <div class="hero-desc-col">
            <p>End-to-end signage and branding solutions trusted by businesses across India for quality, consistency, and timely execution.</p>
          </div>
          <div class="hero-actions-col">
            <div class="magnetic-btn-wrap" data-magnetic="true">
              <a href="services.html" class="btn-premium solid">Our Services</a>
            </div>
            <div class="magnetic-btn-wrap" data-magnetic="true">
              <a href="contact.html" class="btn-premium outline">Contact our team</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero-scroll-indicator">
        <div class="hero-scroll-indicator-line"></div>
        <span>Scroll</span>
      </div>
    </section>

    <!-- Services Grid Summary -->
    <section class="work" id="work">
      <div class="section-container">
        <div class="reveal">
          <span class="section-tag">Core Offerings</span>
          <h2 class="section-title">Signage & <span>Branding</span></h2>
        </div>
        
        <div class="work-grid">
          <!-- LED Boards -->
          <div class="work-card reveal" onclick="location.href='services.html#led-signage'">
            <div class="work-img-container">
              <img src="work/exp1.jpg" alt="LED Sign Boards" />
              <div class="work-overlay">
                <div class="work-meta">
                  <div class="work-bullet"></div>
                  <span class="work-category">LED Boards & Signage</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- ACP Boards -->
          <div class="work-card reveal" onclick="location.href='services.html#acp-boards'">
            <div class="work-img-container">
              <img src="work/ret1 (1).jpg" alt="ACP Signage Panels" />
              <div class="work-overlay">
                <div class="work-meta">
                  <div class="work-bullet"></div>
                  <span class="work-category">ACP Sign Boards</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 3D Letters -->
          <div class="work-card reveal" onclick="location.href='services.html#letter-boards'">
            <div class="work-img-container">
              <img src="work/exp2.jpg" alt="Metal 3D Letters" />
              <div class="work-overlay">
                <div class="work-meta">
                  <div class="work-bullet"></div>
                  <span class="work-category">3D Letter Sign Boards</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Glow Sign Boards -->
          <div class="work-card reveal" onclick="location.href='services.html#glow-signs'">
            <div class="work-img-container">
              <img src="work/exp5.jpg" alt="Glow Sign Boards" />
              <div class="work-overlay">
                <div class="work-meta">
                  <div class="work-bullet"></div>
                  <span class="work-category">Glow Sign Boards</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Flex & Vinyl Printing -->
          <div class="work-card reveal" onclick="location.href='services.html#flex-vinyl'">
            <div class="work-img-container">
              <img src="work/Mumbai1.jpg" alt="Large hoarding flex printing" />
              <div class="work-overlay">
                <div class="work-meta">
                  <div class="work-bullet"></div>
                  <span class="work-category">Flex & Vinyl Printing</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Retail Branding -->
          <div class="work-card reveal" onclick="location.href='services.html#retail-branding'">
            <div class="work-img-container">
              <img src="https://cdn.sanity.io/images/sppqaqoh/production/f2e28715bb1e7b16a0a82b8349242ec64dbdc643-1000x665.jpg" alt="Retail Branding Solutions" />
              <div class="work-overlay">
                <div class="work-meta">
                  <div class="work-bullet"></div>
                  <span class="work-category">Retail Branding Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="work-actions-container reveal">
          <div class="magnetic-btn-wrap" data-magnetic="true">
            <a href="services.html" class="btn-premium outline">View All Services</a>
          </div>
        </div>
      </div>
    </section>

    <!-- USP / Trust Section -->
    <section class="about" id="usp" style="border-top: 1px solid var(--card-border); border-bottom: 1px solid var(--card-border); background-color: rgba(15, 23, 42, 0.05);">
      <div class="section-container">
        <div class="reveal" style="text-align: center; margin-bottom: 60px;">
          <span class="section-tag">Why Choose Us</span>
          <h2 class="section-title">What Makes Us <span>Different</span></h2>
        </div>
        
        <div class="founders-row" style="margin-top: 0; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
          <!-- USP 1 -->
          <div class="founder-card reveal" style="background-color: var(--card-bg); border: 1px solid var(--card-border); padding: 30px; border-radius: 12px; flex-direction: column; align-items: flex-start; gap: 12px;">
            <h3 class="founder-name" style="font-size: 18px; color: var(--secondary);">Pan-India Service Network</h3>
            <p class="founder-quote" style="border-left: 2px solid var(--secondary); padding-left: 15px; margin: 0; font-style: normal; color: var(--muted-foreground); font-size: 14px;">We execute and deliver signage projects across India, making us the perfect single-point partner for corporate offices, retail chains, and franchise networks with multiple locations.</p>
          </div>
          
          <!-- USP 2 -->
          <div class="founder-card reveal" style="background-color: var(--card-bg); border: 1px solid var(--card-border); padding: 30px; border-radius: 12px; flex-direction: column; align-items: flex-start; gap: 12px;">
            <h3 class="founder-name" style="font-size: 18px; color: var(--secondary);">Complete Branding Under One Roof</h3>
            <p class="founder-quote" style="border-left: 2px solid var(--secondary); padding-left: 15px; margin: 0; font-style: normal; color: var(--muted-foreground); font-size: 14px;">From flex, vinyl, and fabric printing to LED signage, ACP boards, 3D letters, and standees, we cover your complete indoor & outdoor signage needs. No vendor clutter.</p>
          </div>

          <!-- USP 3 -->
          <div class="founder-card reveal" style="background-color: var(--card-bg); border: 1px solid var(--card-border); padding: 30px; border-radius: 12px; flex-direction: column; align-items: flex-start; gap: 12px;">
            <h3 class="founder-name" style="font-size: 18px; color: var(--secondary);">Reliability & Quality Standards</h3>
            <p class="founder-quote" style="border-left: 2px solid var(--secondary); padding-left: 15px; margin: 0; font-style: normal; color: var(--muted-foreground); font-size: 14px;">Experience working with leading names like Amaron, Apple, Philips, and Arun Ice Cream. Professional production, installation, and compliance ensure deadlines are met.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Believers (Brands) Section -->
    <section class="believers" id="believers">
      <div class="believers-title-wrapper reveal">
        <span class="section-tag">Clients Served</span>
        <h2 class="section-title">Brands We <span>Partners With</span></h2>
      </div>
      <div class="ticker-wrap">
        <div class="ticker-fade-left"></div>
        <div class="ticker-fade-right"></div>
        <div class="ticker-track">
          ${tickerHtml}
        </div>
      </div>
    </section>

    <!-- Interactive Verticals Tab Switcher -->
    <section class="verticals" id="verticals">
      <div class="section-container">
        <div class="reveal" style="text-align: center;">
          <span class="section-tag">Capabilities</span>
          <h2 class="section-title">Dimensions of <span>Branding</span></h2>
        </div>
        
        <div class="verticals-tab-container reveal">
          <div class="verticals-tabs-scroll">
            <div class="verticals-tabs-track">
              <!-- Rendered via JS dynamically -->
            </div>
          </div>
          
          <div class="verticals-display">
            <div class="vertical-glow-bg"></div>
            <div class="vertical-watermark">01</div>
            <div class="vertical-content-wrapper">
              <div class="vertical-logo-side">
                <div class="vertical-logo-wrapper">
                  <img src="logos/white-HyperGlocal.png" alt="LED Boards logo" />
                </div>
              </div>
              <div class="vertical-info-side">
                <span class="vertical-badge">Vibrant Night-Time Visibility</span>
                <h3 class="vertical-name">LED Signage</h3>
                <p class="vertical-desc">High-quality energy-efficient LED signs designed for shopfronts, commercial parks, and malls. Flawless pixel brightness and waterproofing ensure your logo shines 24/7 with zero maintenance overhead.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="achievements" id="achievements">
      <div class="section-container">
        <div class="reveal" style="text-align: center;">
          <span class="section-tag">Scale & Quality</span>
          <h2 class="section-title">Trusted <span>Execution</span></h2>
        </div>
        
        <div class="achievement-hero-card reveal" style="box-shadow: none;">
          <img src="awards/mainawards.jpg" alt="Sky Advertising Factory & Production Unit" />
        </div>
        
        <div class="achievements-grid reveal">
          <div class="achievements-border-top"></div>
          <div class="achievements-border-bottom"></div>
          ${awardsHtml}
        </div>
      </div>
    </section>

    <!-- About summary Philosophy Section -->
    <section class="about" id="about">
      <div class="section-container">
        <div class="about-philosophy reveal">
          <span class="section-tag">Brand Story</span>
          <p class="philosophy-text" style="font-size: clamp(1.2rem, 3vw, 2.2rem);">
            Sky Advertising was founded to build <span class="highlight">strong visual presence</span>. What started as a signage business in Delhi has grown into a <span class="gradient">nationwide branding partner</span> serving corporate brand rollouts and retail chains.
          </p>
          <div class="magnetic-btn-wrap" data-magnetic="true" style="margin-top: 40px;">
            <a href="about.html" class="btn-premium solid">Read Our Story</a>
          </div>
        </div>
      </div>
    </section>

  </main>

  ${footerHtml}

  <script src="index.js"></script>
</body>
</html>`;

// 2. ABOUT PAGE
const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#030712">
  <title>About Us | Sky Advertising Delhi</title>
  <meta name="description" content="The story of Sky Advertising, a premier signage company in Delhi. Discover our mission, vision, core values, and leadership team.">
  <link rel="icon" href="icon.png" type="image/png">
  <link rel="stylesheet" href="index.css?v=2.3">
</head>
<body>

  <!-- Preloader Screen (Quick Fade for Subpages) -->
  <div id="preloader" class="loaded"></div>

  <div class="grid-bg"></div>

  ${navbarHtml}

  <main style="padding-top: 120px;">
    
    <!-- About Header -->
    <section class="about-hero">
      <div class="section-container" style="padding-bottom: 20px;">
        <div class="reveal">
          <span class="section-tag">Our History</span>
          <h1 class="section-title">The Sky Advertising <span>Story</span></h1>
        </div>
      </div>
    </section>

    <!-- Detailed Brand Story -->
    <section class="about-story" style="background-color: var(--card-bg); border-top: 1px solid var(--card-border); border-bottom: 1px solid var(--card-border); padding: 60px 0;">
      <div class="section-container" style="padding: 0 6%;">
        <div class="founders-row" style="align-items: flex-start; grid-template-columns: 1fr;">
          <div class="founder-card reveal" style="flex: 1.2;">
            <div class="founder-info">
              <h2 class="founder-name" style="font-size: 28px; margin-bottom: 20px;">How We Started</h2>
              <p class="founder-quote" style="border: none; padding: 0; font-style: normal; font-size: 16px; line-height: 1.8; color: var(--muted-foreground); margin-bottom: 20px;">
                Sky Advertising was founded with a simple vision: to help businesses build a strong and lasting visual presence. What started as a local signage and printing business has grown into a trusted branding partner serving companies across India.
              </p>
              <p class="founder-quote" style="border: none; padding: 0; font-style: normal; font-size: 16px; line-height: 1.8; color: var(--muted-foreground); margin-bottom: 20px;">
                Over the years, we have worked with businesses of all sizes—from local enterprises to nationally recognized brands—delivering high-quality signage, display solutions, and branding materials that help them stand out in competitive markets. Our commitment to quality, reliability, and timely execution has enabled us to build long-term relationships with clients across multiple industries.
              </p>
              <p class="founder-quote" style="border: none; padding: 0; font-style: normal; font-size: 16px; line-height: 1.8; color: var(--muted-foreground);">
                At Sky Advertising, we believe that effective branding begins with visibility. Whether it’s a storefront sign, a 3D letter board, a retail branding project, or a nationwide signage rollout, every project is approached with the same attention to detail and dedication to excellence. Today, we continue to help businesses transform their brand presence through innovative signage solutions, professional craftsmanship, and seamless project execution across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="about-mission" style="padding: 80px 0;">
      <div class="section-container" style="padding: 0 6%;">
        <div class="founders-row" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
          <!-- Mission -->
          <div class="founder-card reveal" style="background-color: var(--card-bg); border: 1px solid var(--card-border); padding: 40px; border-radius: 16px; align-items: flex-start; gap: 16px;">
            <span class="section-tag">To Guide Us</span>
            <h3 class="founder-name" style="font-size: 24px; color: #fff;">Our Mission</h3>
            <p class="founder-quote" style="border-left: 2px solid var(--primary); padding-left: 20px; margin: 0; font-style: normal; color: var(--muted-foreground); font-size: 15px; line-height: 1.7;">To provide businesses with high-quality, innovative, and reliable signage and branding solutions that enhance visibility, strengthen brand identity, and drive growth.</p>
          </div>
          
          <!-- Vision -->
          <div class="founder-card reveal" style="background-color: var(--card-bg); border: 1px solid var(--card-border); padding: 40px; border-radius: 16px; align-items: flex-start; gap: 16px;">
            <span class="section-tag">To Aspire To</span>
            <h3 class="founder-name" style="font-size: 24px; color: #fff;">Our Vision</h3>
            <p class="founder-quote" style="border-left: 2px solid var(--secondary); padding-left: 20px; margin: 0; font-style: normal; color: var(--muted-foreground); font-size: 15px; line-height: 1.7;">To become India’s most trusted signage and branding solutions company by delivering exceptional quality, nationwide service, and lasting value to our clients.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Section -->
    <section class="team" id="team" style="border-top: 1px solid var(--card-border);">
      <div class="section-container" style="padding: 80px 6%;">
        <div class="reveal">
          <span class="section-tag">Leadership</span>
          <h2 class="section-title">Our <span>Management</span></h2>
        </div>
        
        <div class="founders-row" style="grid-template-columns: 1fr; gap: 40px; margin-top: 40px;">
          <!-- Mohd Anas -->
          <div class="founder-card reveal" style="flex-direction: row; align-items: center; gap: 40px; background-color: var(--card-bg); border: 1px solid var(--card-border); padding: 30px; border-radius: 16px;">
            <div class="founder-img-wrapper" style="max-width: 150px; aspect-ratio: 1; border-radius: 50%;">
              <img src="images/vikas-nowel.jpg" alt="Mohd Anas" style="object-fit: cover;" />
            </div>
            <div class="founder-info" style="text-align: left;">
              <h3 class="founder-name" style="font-size: 24px; text-align: left;">Mohd Anas</h3>
              <p class="founder-role" style="text-align: left; color: var(--secondary);">Founder & Director</p>
              <p class="founder-quote" style="border-left: 2px solid var(--secondary); padding-left: 20px; font-size: 15px;">"Sky Advertising was founded to give brands a voice that stands out. We work closely with our corporate and retail clients to turn creative brand visions into physical structural masterpieces. Our commitment is quality, scale, and reliable execution everywhere."</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  ${footerHtml}

  <script src="index.js"></script>
</body>
</html>`;

// 3. SERVICES PAGE
const servicesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#030712">
  <title>Our Services | Signage & Branding Solutions</title>
  <meta name="description" content="View product specifications and details for ACP boards, 3D letter signs, LED display signages, glow signs, and large-scale printing solutions.">
  <link rel="icon" href="icon.png" type="image/png">
  <link rel="stylesheet" href="index.css?v=2.3">
  <style>
    .service-detail-section {
      border-bottom: 1px solid var(--card-border);
      padding: 80px 0;
    }
    .service-detail-section:nth-child(even) {
      background-color: var(--card-bg);
    }
    .service-row {
      display: flex;
      flex-direction: column;
      gap: 50px;
    }
    @media (min-width: 1024px) {
      .service-row {
        flex-direction: row;
        align-items: center;
      }
      .service-row.reverse {
        flex-direction: row-reverse;
      }
    }
    .service-media, .service-desc-side {
      width: 100%;
    }
    @media (min-width: 1024px) {
      .service-media, .service-desc-side {
        width: 50%;
      }
    }
    .service-media-card {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
      aspect-ratio: 1.5;
    }
    .service-media-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .spec-list {
      list-style: none;
      margin: 20px 0 30px 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spec-item {
      font-size: 14px;
      color: var(--muted-foreground);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spec-item::before {
      content: '✓';
      color: var(--secondary);
      font-weight: bold;
    }
  </style>
</head>
<body>

  <!-- Preloader Screen (Quick Fade for Subpages) -->
  <div id="preloader" class="loaded"></div>

  <div class="grid-bg"></div>

  ${navbarHtml}

  <main style="padding-top: 120px;">
    
    <!-- Page Header -->
    <section class="services-hero">
      <div class="section-container" style="padding-bottom: 20px; text-align: center;">
        <div class="reveal">
          <span class="section-tag">What We Do</span>
          <h1 class="section-title">Signage & Branding <span>Catalogue</span></h1>
          <p style="max-width: 600px; margin: 0 auto; color: var(--muted-foreground); line-height: 1.6;">We offer comprehensive production, fabrication, printing, and installation under one roof. Review our products below and contact us for pricing.</p>
        </div>
      </div>
    </section>

    <!-- LED & ACP Signages -->
    <section class="service-detail-section" id="led-signage">
      <div class="section-container" style="padding: 0 6%;">
        <div class="service-row">
          <div class="service-media reveal">
            <div class="service-media-card">
              <img src="work/exp1.jpg" alt="LED Sign Boards" />
            </div>
          </div>
          <div class="service-desc-side reveal">
            <span class="section-tag">Energy Efficient</span>
            <h2 class="vertical-name" style="font-size: 32px; margin-bottom: 12px;">LED Sign Boards & LED Displays</h2>
            <p class="vertical-desc" style="max-width: 100%;">Our LED Signage features top-tier Samsung or Epistar LED modules coupled with premium IP67 waterproof power supply units for extreme longevity. Built using computer-aided design layout to ensure optimal pixel density, zero hot spots, and flawless uniform glow.</p>
            <ul class="spec-list">
              <li class="spec-item">High Lumen Output</li>
              <li class="spec-item">IP67 Waterproofing</li>
              <li class="spec-item">Energy Efficient 12V DC</li>
              <li class="spec-item">Custom Acrylic Diffuser</li>
            </ul>
            <div class="magnetic-btn-wrap" data-magnetic="true">
              <a href="contact.html?subject=LED%20Signage%20Inquiry" class="btn-premium solid">Inquire For Pricing</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ACP Sign Boards -->
    <section class="service-detail-section" id="acp-boards">
      <div class="section-container" style="padding: 0 6%;">
        <div class="service-row reverse">
          <div class="service-media reveal">
            <div class="service-media-card">
              <img src="work/ret1 (1).jpg" alt="ACP Sign Boards" />
            </div>
          </div>
          <div class="service-desc-side reveal">
            <span class="section-tag">Premium Shopfronts</span>
            <h2 class="vertical-name" style="font-size: 32px; margin-bottom: 12px;">ACP Sign Boards & Facades</h2>
            <p class="vertical-desc" style="max-width: 100%;">Aluminium Composite Panels (ACP) are the industry standard for modern shopfronts, franchise showrooms, and corporate building wraps. We use certified fire-grade ACP panels (brands like Aludecor, Eurobond) fabricated on heavy-duty iron frames, giving a perfectly flat, weather-resistant facade.</p>
            <ul class="spec-list">
              <li class="spec-item">Eurobond & Aludecor Panel</li>
              <li class="spec-item">Rust-Proof Iron Structure</li>
              <li class="spec-item">Weather & UV Resistant</li>
              <li class="spec-item">CNC Routing Cutouts</li>
            </ul>
            <div class="magnetic-btn-wrap" data-magnetic="true">
              <a href="contact.html?subject=ACP%20Boards%20Inquiry" class="btn-premium solid">Inquire For Pricing</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3D Letter Signs -->
    <section class="service-detail-section" id="letter-boards">
      <div class="section-container" style="padding: 0 6%;">
        <div class="service-row">
          <div class="service-media reveal">
            <div class="service-media-card">
              <img src="work/exp2.jpg" alt="3D Letter Sign Boards" />
            </div>
          </div>
          <div class="service-desc-side reveal">
            <span class="section-tag">Sophisticated Finish</span>
            <h2 class="vertical-name" style="font-size: 32px; margin-bottom: 12px;">3D Letter Sign Boards</h2>
            <p class="vertical-desc" style="max-width: 100%;">Make your logo stand out physically. We design, manufacture, and install dimensional 3D letters made from stainless steel (grade 304/316), brass, acrylic, or ACP. Letters can be halo-lit (glow on the background wall) or front-lit (diffused through translucent acrylic faces).</p>
            <ul class="spec-list">
              <li class="spec-item">Stainless Steel SS304</li>
              <li class="spec-item">Classic Polished Brass</li>
              <li class="spec-item">Laser-Cut Acrylic</li>
              <li class="spec-item">Halo & Back-lit Effects</li>
            </ul>
            <div class="magnetic-btn-wrap" data-magnetic="true">
              <a href="contact.html?subject=3D%20Letters%20Inquiry" class="btn-premium solid">Inquire For Pricing</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Flex & Vinyl Printing -->
    <section class="service-detail-section" id="flex-vinyl">
      <div class="section-container" style="padding: 0 6%;">
        <div class="service-row reverse">
          <div class="service-media reveal">
            <div class="service-media-card">
              <img src="work/Mumbai1.jpg" alt="Flex and Vinyl Printing" />
            </div>
          </div>
          <div class="service-desc-side reveal">
            <span class="section-tag">Mass Publicity</span>
            <h2 class="vertical-name" style="font-size: 32px; margin-bottom: 12px;">Flex & Vinyl Printing (Solvent & Eco-Solvent)</h2>
            <p class="vertical-desc" style="max-width: 100%;">For outdoor hoardings, retail window graphics, and internal wall branding, we offer high-resolution solvent flex printing and eco-solvent vinyl printing. Vinyl can be laminated and mounted on Sunboard (ACP / Sunboard sheet) for premium visual boards, banners, and standees.</p>
            <ul class="spec-list">
              <li class="spec-item">Heavy Duty Solvent Flex</li>
              <li class="spec-item">Eco-Solvent Vinyl Printing</li>
              <li class="spec-item">Matte / Glossy Lamination</li>
              <li class="spec-item">Sunboard Mounting</li>
            </ul>
            <div class="magnetic-btn-wrap" data-magnetic="true">
              <a href="contact.html?subject=Flex%20Printing%20Inquiry" class="btn-premium solid">Inquire For Pricing</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Retail Branding & Glow signs -->
    <section class="service-detail-section" id="retail-branding">
      <div class="section-container" style="padding: 0 6%;">
        <div class="service-row">
          <div class="service-media reveal">
            <div class="service-media-card">
              <img src="https://cdn.sanity.io/images/sppqaqoh/production/f2e28715bb1e7b16a0a82b8349242ec64dbdc643-1000x665.jpg" alt="Retail Branding" />
            </div>
          </div>
          <div class="service-desc-side reveal">
            <span class="section-tag">Retail Branding</span>
            <h2 class="vertical-name" style="font-size: 32px; margin-bottom: 12px;">Retail Branding & Glow Sign Boards</h2>
            <p class="vertical-desc" style="max-width: 100%;">Create an immersive customer journey inside your store. We provide complete retail outlet branding including fabric lightboxes (tension fabric profiles), vinyl wall graphics, glass manifestation films, indoor standees, and classic double-sided backlit glow sign boards.</p>
            <ul class="spec-list">
              <li class="spec-item">Tension Fabric Lightboxes</li>
              <li class="spec-item">Window Manifestation Vinyls</li>
              <li class="spec-item">Promotional Standees</li>
              <li class="spec-item">Double-Sided Glow Signs</li>
            </ul>
            <div class="magnetic-btn-wrap" data-magnetic="true">
              <a href="contact.html?subject=Retail%20Branding%20Inquiry" class="btn-premium solid">Inquire For Pricing</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  ${footerHtml}

  <script src="index.js"></script>
</body>
</html>`;

// 4. CONTACT PAGE
const contactHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#030712">
  <title>Contact Us | Sky Advertising Delhi</title>
  <meta name="description" content="Get in touch with Mohd Anas at Sky Advertising. Email Skyadvertising2011@gmail.com, call 9990551176 or whatsapp 9315253017.">
  <link rel="icon" href="icon.png" type="image/png">
  <link rel="stylesheet" href="index.css?v=2.3">
  <style>
    .contact-card-info-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 30px;
    }
    .contact-card-icon {
      font-size: 24px;
      color: var(--secondary);
      line-height: 1;
    }
  </style>
</head>
<body>

  <!-- Preloader Screen (Quick Fade for Subpages) -->
  <div id="preloader" class="loaded"></div>

  <div class="grid-bg"></div>

  ${navbarHtml}

  <main style="padding-top: 120px;">
    
    <section class="contact-header">
      <div class="section-container" style="padding-bottom: 20px; text-align: center;">
        <div class="reveal">
          <span class="section-tag">Reach Us</span>
          <h1 class="section-title">Start Your Branding <span>Project</span></h1>
          <p style="max-width: 600px; margin: 0 auto; color: var(--muted-foreground); line-height: 1.6;">Have a signage project or corporate brand rollout? Connect with our team and get professional design and cost estimation.</p>
        </div>
      </div>
    </section>

    <section class="contact-body" style="padding-bottom: 100px;">
      <div class="section-container" style="padding: 0 6%;">
        <div class="contact-layout">
          
          <div class="contact-info reveal">
            
            <div class="contact-card-info-item">
              <div class="contact-card-icon">✉</div>
              <div class="contact-info-block" style="margin: 0;">
                <span class="contact-info-label">Email Us</span>
                <p class="contact-info-value" style="font-size: 20px;"><a href="mailto:Skyadvertising2011@gmail.com">Skyadvertising2011@gmail.com</a></p>
              </div>
            </div>

            <div class="contact-card-info-item">
              <div class="contact-card-icon">📞</div>
              <div class="contact-info-block" style="margin: 0;">
                <span class="contact-info-label">Call Us</span>
                <p class="contact-info-value" style="font-size: 20px; color: #fff;"><a href="tel:9990551176">9990551176</a></p>
              </div>
            </div>

            <div class="contact-card-info-item">
              <div class="contact-card-icon">💬</div>
              <div class="contact-info-block" style="margin: 0;">
                <span class="contact-info-label">WhatsApp Chat</span>
                <p class="contact-info-value" style="font-size: 20px;"><a href="https://wa.me/919315253017" target="_blank">+91 9315253017</a></p>
              </div>
            </div>

            <div class="contact-card-info-item">
              <div class="contact-card-icon">📍</div>
              <div class="contact-info-block" style="margin: 0;">
                <span class="contact-info-label">Our Base</span>
                <p class="contact-info-value" style="font-size: 16px;">Delhi, India<br/>Serving branding rollouts across all major cities in India.</p>
              </div>
            </div>
            
            <!-- Map Placeholder -->
            <div class="achievement-hero-card" style="margin: 30px 0 0 0; border-radius: 12px; height: 180px; position: relative;">
              <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(3, 7, 18, 0.8) 100%); display: flex; align-items: center; justify-content: center; border: 1px solid var(--card-border);">
                <span style="font-size: 13px; color: var(--muted-foreground); letter-spacing: 0.1em; text-transform: uppercase;">Map View: Delhi Base / Pan-India Network</span>
              </div>
            </div>

          </div>
          
          <div class="contact-form-card reveal">
            <form class="contact-form">
              <div class="form-group">
                <label for="form-name" class="form-label">Full Name</label>
                <input type="text" id="form-name" class="form-input" placeholder="Mohd Anas" required />
              </div>
              
              <div class="form-group">
                <label for="form-email" class="form-label">Email Address</label>
                <input type="email" id="form-email" class="form-input" placeholder="anas@example.com" required />
              </div>
              
              <div class="form-group">
                <label for="form-phone" class="form-label">Phone / WhatsApp Number</label>
                <input type="tel" id="form-phone" class="form-input" placeholder="9315253017" required />
              </div>

              <div class="form-group">
                <label for="form-company" class="form-label">Company Name</label>
                <input type="text" id="form-company" class="form-input" placeholder="Sky Advertising" />
              </div>
              
              <div class="form-group">
                <label for="form-msg" class="form-label">Message Details</label>
                <textarea id="form-msg" class="form-input" placeholder="Explain your sign board sizes, materials, or locations..." required></textarea>
              </div>
              
              <div class="magnetic-btn-wrap" data-magnetic="true" style="width: 100%;">
                <button type="submit" class="btn-premium solid" style="width: 100%; border: none;">Send Inquiry</button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </section>

  </main>

  ${footerHtml}

    <script src="index.js"></script>
  <script>
    // Autofill subject line if present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    if (subject) {
      const msgArea = document.getElementById('form-msg');
      msgArea.value = "Hello, I am interested in " + subject + ". Please share details. ";
      msgArea.focus();
    }
  </script>
</body>
</html>`;

// 5. LEGAL PAGES (PRIVACY, TERMS, REFUND, DISCLAIMER)
function generateLegalPage(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#030712">
  <title>${title} | Sky Advertising</title>
  <link rel="icon" href="icon.png" type="image/png">
  <link rel="stylesheet" href="index.css?v=2.3">
</head>
<body>
  <div id="preloader" class="loaded"></div>
  <div class="grid-bg"></div>

  ${navbarHtml}

  <main style="padding-top: 120px; padding-bottom: 80px;">
    <section>
      <div class="section-container" style="max-width: 800px; padding: 0 20px;">
        <div class="reveal">
          <span class="section-tag">Legal Document</span>
          <h1 class="section-title" style="font-size: 3rem; margin-bottom: 30px;">${title}</h1>
          <div style="line-height: 1.8; color: var(--muted-foreground); font-size: 15px; display: flex; flex-direction: column; gap: 20px;">
            ${content}
          </div>
        </div>
      </div>
    </section>
  </main>

  ${footerHtml}

    <script src="index.js"></script>
</body>
</html>`;
}

const privacyContent = `
  <p>Last updated: June 17, 2026</p>
  <p>Sky Advertising ("us", "we", or "our") operates the Sky Advertising website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
  <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>
  <h3 style="color:#fff; margin-top:10px;">Information Collection and Use</h3>
  <p>We collect several different types of information for various purposes to provide and improve our Service to you. Types of data collected include Email address, First name and last name, Phone number, and Cookies and Usage Data.</p>
  <h3 style="color:#fff; margin-top:10px;">Security of Data</h3>
  <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
`;

const termsContent = `
  <p>Last updated: June 17, 2026</p>
  <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website operated by Sky Advertising.</p>
  <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
  <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
  <h3 style="color:#fff; margin-top:10px;">Intellectual Property</h3>
  <p>The Service and its original content, features and functionality are and will remain the exclusive property of Sky Advertising and its licensors. The Service is protected by copyright, trademark, and other laws of both the India and foreign countries.</p>
  <h3 style="color:#fff; margin-top:10px;">Inquiries & Pricing</h3>
  <p>All pricing is provided upon request via formal quotation. Any information submitted through our contact forms is treated in strict confidence to formulate appropriate branding proposals.</p>
`;

const refundContent = `
  <p>Last updated: June 17, 2026</p>
  <p>At Sky Advertising, we manufacture fully custom signage and branding materials. Because all items are custom-built to client specifications, dimensions, logos, and materials, we operate a strict policy regarding refunds and cancellations.</p>
  <h3 style="color:#fff; margin-top:10px;">Cancellations</h3>
  <p>Projects can be cancelled before fabrication has started. Once materials have been ordered and fabrication/cutting begins at our Delhi facility, cancellations are subject to a fee covering raw material and labor costs incurred.</p>
  <h3 style="color:#fff; margin-top:10px;">Defects & Issues</h3>
  <p>We guarantee quality without compromise. If a sign board is delivered with fabrication defects, LED issues, or installation damage caused by our teams, we will repair or replace the affected panels promptly without extra cost.</p>
`;

const disclaimerContent = `
  <p>Last updated: June 17, 2026</p>
  <p>The information contained on the website is for general information purposes only.</p>
  <p>Sky Advertising assumes no responsibility for errors or omissions in the contents on the Service. In no event shall Sky Advertising be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service.</p>
  <h3 style="color:#fff; margin-top:10px;">Structural & Installation Safety</h3>
  <p>Sky Advertising executes professional signage installations. Clients are responsible for obtaining necessary municipal permissions or local authority permits for large outdoor billboards, ACP shopfront modifications, or streetstand hoardings in their respective locations.</p>
`;

// Write HTML Files
fs.writeFileSync('index.html', indexHtml);
console.log('Successfully written index.html');

fs.writeFileSync('about.html', aboutHtml);
console.log('Successfully written about.html');

fs.writeFileSync('services.html', servicesHtml);
console.log('Successfully written services.html');

fs.writeFileSync('contact.html', contactHtml);
console.log('Successfully written contact.html');

fs.writeFileSync('privacy.html', generateLegalPage('Privacy Policy', privacyContent));
fs.writeFileSync('terms.html', generateLegalPage('Terms of Service', termsContent));
fs.writeFileSync('refund.html', generateLegalPage('Refund Policy', refundContent));
fs.writeFileSync('disclaimer.html', generateLegalPage('Disclaimer', disclaimerContent));
console.log('Successfully written all legal pages');
