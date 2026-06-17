document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initScrollAnimations();
  initMagneticButtons();
  initHeroGlow();
  initVerticals();
  initTeamCarousel();
  initContactForm();
});

// 1. Preloader logic (Full count-up for Home page, immediate for subpages)
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  const bar = preloader.querySelector('.loader-progress-bar');
  const numSpan = preloader.querySelector('.loader-percentage .num');
  
  // Check if we are on the Home Page (index.html or root /)
  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('index.html') || path === '' || path.includes('skyads/') && path.endsWith('/');
  
  if (!isHomePage || !bar) {
    // Skip loading count-up on sub-pages to allow instant page transitions
    preloader.classList.add('loaded');
    
    // Instantly reveal navigation and page elements
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.add('visible');
    
    setTimeout(() => {
      const hero = document.querySelector('.hero');
      if (hero) hero.classList.add('active');
      
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
      });
    }, 100);
    return;
  }
  
  // Home Page full preloader loading animation
  let count = 0;
  const totalDuration = 1800; // 1.8 seconds loading
  const stepTime = totalDuration / 100;
  
  const interval = setInterval(() => {
    count++;
    numSpan.textContent = count;
    bar.style.width = count + '%';
    
    if (count >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
        
        setTimeout(() => {
          const navbar = document.querySelector('.navbar');
          if (navbar) navbar.classList.add('visible');
          
          // Trigger reveals immediately in hero section
          const hero = document.querySelector('.hero');
          if (hero) hero.classList.add('active');
          
          document.querySelectorAll('.hero .reveal').forEach(el => {
            el.classList.add('active');
          });
        }, 500);
      }, 400);
    }
  }, stepTime);
}

// 2. Navbar layout & active page state highlight
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  const mobileBtn = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-nav-overlay');
  
  // Check browser path to highlight current navigation item
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (path.endsWith(href) || 
       (href === 'index.html' && (path === '/' || path.endsWith('index.html') || path === '' || path.includes('skyads/') && path.endsWith('/')))) {
      link.classList.add('active');
    }
  });
  
  // Scrolled header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile Hamburger menu toggle
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
}

// 3. Scroll Reveal Animations
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });
  
  reveals.forEach(el => revealObserver.observe(el));
}

// 4. Magnetic Buttons hover physics
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('[data-magnetic="true"]');
  
  magneticElements.forEach(elem => {
    const target = elem.querySelector('.btn-premium') || elem.querySelector('a') || elem.querySelector('button') || elem;
    
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const pullX = x * 0.35;
      const pullY = y * 0.35;
      
      target.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });
    
    elem.addEventListener('mouseleave', () => {
      target.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      target.style.transform = 'translate(0px, 0px)';
      
      setTimeout(() => {
        target.style.transition = '';
      }, 500);
    });
  });
}

// 5. Interactive Verticals Tab Switcher (Sky Advertising services mapping)
const verticals = [
  {
    "id": "1",
    "logo": "logos/white-HyperGlocal.png",
    "name": "LED Signage",
    "tagline": "Vibrant Night-Time Visibility",
    "description": "High-quality energy-efficient LED signs designed for storefronts, office buildings, and shopping complexes. Using premium Samsung LED modules and IP67 waterproof casings, we ensure your logo shines bright with minimal power consumption.",
    "accent": "217 91% 56%", // Electric Blue
    "number": "01"
  },
  {
    "id": "2",
    "logo": "logos/white-Elevate.png",
    "name": "ACP Sign Boards",
    "tagline": "Premium Storefront Identity",
    "description": "Aluminium Composite Panel shopfronts engineered for durability and flat elegance. We use certified brand panels (like Aludecor or Eurobond) fabricated on thick anti-rust metal grids, creating modern, sleek exterior facades.",
    "accent": "195 100% 45%", // Cyber Cyan
    "number": "02"
  },
  {
    "id": "3",
    "logo": "logos/White-MediaCircle.png",
    "name": "3D Letter Signs",
    "tagline": "Sophisticated Dimensional Presence",
    "description": "Make your brand logo physically stand out. We design and install high-precision 3D dimensional lettering cut from Stainless Steel (grade 304), polished brass, acrylic, and ACP, utilizing front diffused or halo-lit backlighting.",
    "accent": "205 100% 55%", // Cobalt Blue
    "number": "03"
  },
  {
    "id": "4",
    "logo": "logos/white-interactx.png",
    "name": "Flex Printing",
    "tagline": "Scalable Outdoor Hoardings",
    "description": "Heavy-duty solvent flex printing for large-scale outdoor banners, billboards, commercial hoardings, and event publicity. Using high-denier vinyl meshes and fade-resistant inks, your promotions withstand extreme weather.",
    "accent": "230 95% 60%", // Violet
    "number": "04"
  },
  {
    "id": "5",
    "logo": "logos/white-multiverse.png",
    "name": "Vinyl Printing",
    "tagline": "Sharp In-Store Visuals",
    "description": "High-resolution eco-solvent vinyl printing mounted on ACP or Sunboard sheets. Perfect for glass manifestations, window graphics, promotional boards, and internal corporate branding displays.",
    "accent": "210 100% 50%", // Sky Blue
    "number": "05"
  },
  {
    "id": "6",
    "logo": "logos/white-lampost.png",
    "name": "Glow Sign Boards",
    "tagline": "24/7 Outdoor Publicity",
    "description": "Sturdy double-sided or single-sided backlit box signs built with thick aluminum profile frames, interior tube/LED arrays, and translucent flex skins for affordable night-time branding.",
    "accent": "180 80% 45%", // Steel Blue-Cyan
    "number": "06"
  },
  {
    "id": "7",
    "logo": "logos/white-WAYPOINT.png",
    "name": "Retail Branding",
    "tagline": "Immersive Retail Spaces",
    "description": "Tension fabric lightboxes, display standees, promo tables, canvas backdrops, and POSM materials built to optimize in-store customer experiences and drive franchise conversions.",
    "accent": "225 90% 55%", // Rich Dark Blue
    "number": "07"
  }
];

function initVerticals() {
  const tabsTrack = document.querySelector('.verticals-tabs-track');
  const wrapper = document.querySelector('.vertical-content-wrapper');
  if (!tabsTrack || !wrapper) return;
  
  const watermark = document.querySelector('.vertical-watermark');
  const logoImg = wrapper.querySelector('.vertical-logo-wrapper img');
  const badge = wrapper.querySelector('.vertical-badge');
  const name = wrapper.querySelector('.vertical-name');
  const desc = wrapper.querySelector('.vertical-desc');
  const glow = document.querySelector('.vertical-glow-bg');
  
  // Render tabs
  tabsTrack.innerHTML = '';
  verticals.forEach((v, index) => {
    const btn = document.createElement('button');
    btn.className = `vertical-tab-btn \${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `<span class="relative z-10">\${v.name}</span>`;
    btn.addEventListener('click', () => {
      switchTab(index);
    });
    tabsTrack.appendChild(btn);
  });
  
  function switchTab(index) {
    const buttons = tabsTrack.querySelectorAll('.vertical-tab-btn');
    const data = verticals[index];
    
    buttons.forEach((btn, idx) => {
      if (idx === index) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    
    wrapper.classList.add('animating');
    
    setTimeout(() => {
      watermark.textContent = data.number;
      logoImg.src = data.logo;
      logoImg.alt = data.name + ' logo';
      badge.textContent = data.tagline;
      badge.style.backgroundColor = `hsla(\${data.accent} / 0.12)`;
      badge.style.color = `hsl(\${data.accent})`;
      name.textContent = data.name;
      desc.textContent = data.description;
      glow.style.background = `linear-gradient(135deg, hsla(\&shy;\${data.accent} / 0.18) 0%, rgba(3, 7, 18, 0.92) 60%)`;
      wrapper.classList.remove('animating');
    }, 400);
  }
}

// 6. Leadership/Team carousel
function initTeamCarousel() {
  const viewport = document.getElementById('team-viewport');
  const track = document.getElementById('team-track');
  const btnPrev = document.getElementById('team-prev');
  const btnNext = document.getElementById('team-next');
  
  if (!viewport || !track) return;
  
  btnNext.addEventListener('click', () => {
    const cardWidth = track.firstElementChild.getBoundingClientRect().width + 24;
    viewport.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
  
  btnPrev.addEventListener('click', () => {
    const cardWidth = track.firstElementChild.getBoundingClientRect().width + 24;
    viewport.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });
  
  // Drag to scroll
  let isDown = false;
  let startX;
  let scrollLeft;
  
  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.style.cursor = 'grabbing';
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });
  
  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });
  
  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });
  
  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeft - walk;
  });
}

// 7. Contact form submission
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = 'Sending Message...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
      btn.textContent = 'Inquiry Sent Successfully!';
      btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Emerald Success
      btn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
      
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        btn.style.opacity = '';
      }, 3000);
    }, 1500);
  });
}

// 8. Mouse tracking glow inside hero
function initHeroGlow() {
  const hero = document.querySelector('.hero');
  const glow = document.querySelector('.hero-glow');
  if (!hero || !glow) return;
  
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    glow.style.setProperty('--mouse-x', `${x}px`);
    glow.style.setProperty('--mouse-y', `${y}px`);
  });
}



