/**
 * Satyam Bhaii Portfolio - Interactive Scripts
 * Features: Terminal Greeting, Magnetic Buttons, Smooth Scroll, Cursor Glow
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initTerminalGreeting();
    initMobileNav();
    initMagneticButtons();
    initCursorGlow();
    initSmoothScroll();
    initScrollAnimations();
    initCurrentYear();
    initIdentityToggle();
    initLivePing();
});

/**
 * Terminal Greeting based on user's local time
 */
function initTerminalGreeting() {
    const terminalGreeting = document.getElementById('terminalGreeting');
    if (!terminalGreeting) return;

    const hour = new Date().getHours();
    let greeting;
    let emoji;

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning";
        emoji = "☀️";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon";
        emoji = "🌤️";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good evening";
        emoji = "🌅";
    } else {
        greeting = "Good night";
        emoji = "🌙";
    }

    // Get formatted time
    const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Typewriter effect for greeting
    const fullText = `echo "${greeting}! ${emoji} It's ${time}"`;
    let index = 0;
    terminalGreeting.textContent = '';

    function typeWriter() {
        if (index < fullText.length) {
            terminalGreeting.textContent += fullText.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (!navToggle || !mobileNav) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
}

/**
 * Magnetic Button Effect
 * Buttons move slightly towards cursor on hover
 */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic pull effect (subtle)
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Cursor Glow Effect
 * A subtle glow follows the cursor (optimized with passive listeners)
 */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    // Only enable on non-touch devices and larger screens
    if ('ontouchstart' in window || window.innerWidth < 768) {
        cursorGlow.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    // Passive listener for better scroll performance
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // Smooth follow animation with RAF throttling
    function animateGlow() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;

        rafId = requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // Cleanup on visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && rafId) {
            cancelAnimationFrame(rafId);
        } else {
            animateGlow();
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    }, { passive: true });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.3';
    }, { passive: true });
}

/**
 * Smooth Scrolling for anchor links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80; // Account for fixed navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations using Intersection Observer
 * Elements fade in when they enter the viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animatedElements = document.querySelectorAll(
        '.section-title, .glass-card, .bento-card, .project-card, .stat-card'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
}

/**
 * Set current year in footer
 */
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Navbar background change on scroll (throttled for performance)
 */
(function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        navbar.style.background = currentScrollY > 50 
            ? 'rgba(10, 10, 15, 0.95)' 
            : 'rgba(10, 10, 15, 0.8)';
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
})();

/**
 * Active navigation link highlighting
 */
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
})();

/**
 * Preload check - Hide loading if exists
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero-content > *, .terminal-card');
    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.6s ease ${i * 0.1}s forwards`;
    });
});

/**
 * Identity Toggle - Switch between Developer and Professional modes
 */
function initIdentityToggle() {
    const toggle = document.getElementById('identityToggle');
    const toggleLabel = document.getElementById('toggleLabel');
    const logoName = document.getElementById('logoName');
    const logoAlias = document.getElementById('logoAlias');
    const heroName = document.getElementById('heroName');
    const heroNameSub = document.getElementById('heroNameSub');
    const heroRole = document.getElementById('heroRole');
    
    if (!toggle) return;
    
    let isProfessionalMode = false;

    // Initialize the content on page load
    function updateContent() {
        if (isProfessionalMode) {
            // Professional Mode - Satyam Gupta
            toggleLabel.textContent = 'PRO';
            toggleLabel.style.color = '#ff9500';
            if (logoName) logoName.textContent = 'Satyam';
            if (logoAlias) logoAlias.textContent = 'Gupta';
            if (heroName) heroName.textContent = 'Satyam Gupta';
            if (heroNameSub) heroNameSub.textContent = '(Satyam Bhaii)';
            if (heroRole) {
                heroRole.innerHTML = 'Junior Infrastructure Specialist<br>I am a junior developer at Citadel Labs';
            }
        } else {
            // Developer Mode - Satyam Bhaii
            toggleLabel.textContent = 'DEV';
            toggleLabel.style.color = '#6366f1';
            if (logoName) logoName.textContent = 'Satyam';
            if (logoAlias) logoAlias.textContent = 'Bhaii';
            if (heroName) heroName.textContent = 'Satyam Bhaii';
            if (heroNameSub) heroNameSub.textContent = '(Satyam Gupta)';
            if (heroRole) {
                heroRole.innerHTML = 'Infrastructure Developer in Haridwar<br>I am a junior developer at Citadel Labs';
            }
        }
    }

    // Set initial content
    updateContent();

    toggle.addEventListener('click', () => {
        isProfessionalMode = !isProfessionalMode;
        toggle.classList.toggle('active', isProfessionalMode);
        document.body.classList.toggle('professional-mode', isProfessionalMode);
        updateContent();
    });
}

/**
 * Live Ping Status - Simulates real-time server status
 */
function initLivePing() {
    const pingValue = document.getElementById('pingValue');
    const uptimeValue = document.getElementById('uptimeValue');
    const nodesValue = document.getElementById('nodesValue');
    
    if (!pingValue) return;
    
    // Simulate ping updates
    function updatePing() {
        // Random ping between 6-18ms (ultra-fast connection)
        const ping = Math.floor(Math.random() * 13) + 6;
        pingValue.textContent = `${ping}ms`;
        
        // Color coding based on ping (all green for fast pings)
        if (ping < 12) {
            pingValue.style.color = '#27ca40'; // Green - Excellent
        } else {
            pingValue.style.color = '#4ade80'; // Light Green - Great
        }
    }
    
    // Simulate uptime fluctuation (stays around 99.9%)
    function updateUptime() {
        const uptimes = ['99.9%', '99.95%', '99.99%', '100%'];
        const randomUptime = uptimes[Math.floor(Math.random() * uptimes.length)];
        if (uptimeValue) uptimeValue.textContent = randomUptime;
    }
    
    // Simulate nodes count
    function updateNodes() {
        const nodes = Math.floor(Math.random() * 50) + 480; // 480-530 range
        if (nodesValue) nodesValue.textContent = `${nodes}+`;
    }
    
    // Initial update
    updatePing();
    updateUptime();
    updateNodes();
    
    // Update ping every 2 seconds for live feel
    setInterval(updatePing, 2000);
    
    // Update uptime every 30 seconds
    setInterval(updateUptime, 30000);
    
    // Update nodes every 60 seconds
    setInterval(updateNodes, 60000);
}

/**
 * Console Easter Egg
 */
console.log(`
%c🎮 Satyam Bhaii's Portfolio
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%cWelcome, fellow developer! 👋
%cSatyam Gupta = Satyam Bhaii (Same Person!)
%cLooking for the source code? Check out my GitHub!
%chttps://github.com/satyam-bhaii

%c⚡ Built with vanilla HTML, CSS & JavaScript
%c📍 From Haridwar, India with ❤️
%c🎯 Founder: SenCiHost | PluginsHub.in | KillerNodes | Unlock SMP
`, 
'color: #6366f1; font-size: 20px; font-weight: bold;',
'color: #6366f1;',
'color: #a78bfa; font-size: 14px;',
'color: #ff9500; font-size: 13px; font-weight: bold;',
'color: #94a3b8; font-size: 12px;',
'color: #6366f1; font-size: 12px;',
'color: #64748b; font-size: 11px;',
'color: #64748b; font-size: 11px;',
'color: #27ca40; font-size: 11px;'
);
