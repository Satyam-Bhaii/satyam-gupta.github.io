// Interactive effects and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('page-loading');

    // Check if the device is mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Mark page as loaded after DOM is ready
    setTimeout(() => {
        document.body.classList.add('page-loaded');
        document.body.classList.remove('page-loading');
    }, 100);

    // Improved mobile detection with touch support
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Add a simple, non-intrusive cursor effect that won't cause issues
    // Only initialize a simple cursor on desktop devices
    if (!isMobile) {
        // Add class to body to hide default cursor only on desktop
        document.body.classList.add('hide-default-cursor');

        // Create simple custom cursor elements
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        cursor.style.cssText = `
            position: fixed;
            width: 12px;
            height: 12px;
            border: 1px solid #00D4FF;
            border-radius: 50%;
            background: transparent;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            box-shadow: 0 0 3px rgba(0, 212, 255, 0.5);
        `;
        document.body.appendChild(cursor);

        // Track mouse position for cursor
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Add hover effects for cursor
        const interactiveElements = document.querySelectorAll('button, .work-link, .social-link, .feature-card, .work-card, .stat-card, .contact-card, .nav-links a');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#00FFFF';
                cursor.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.8)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#00D4FF';
                cursor.style.boxShadow = '0 0 3px rgba(0, 212, 255, 0.5)';
            });
        });
    } else {
        // On mobile, ensure default cursor by removing any cursor hiding classes
        document.body.classList.remove('hide-default-cursor');
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `* { cursor: auto !important; }`;
        document.head.appendChild(cursorStyle);
    }

    // Performance optimization: Disable resource-heavy features on mobile
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const disableHeavyFeatures = isMobile || shouldReduceMotion;

    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.classList.add('scroll-progress');
    document.body.appendChild(scrollProgress);

    // Add hover effects to interactive elements (without cursor effects)
    const interactiveElements = document.querySelectorAll('button, .work-link, .social-link, .feature-card, .work-card, .stat-card, .contact-card, .nav-links a');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Add glow effect based on element type
            if (element.classList.contains('feature-card')) {
                if (element.classList.contains('purple-glow')) {
                    element.style.boxShadow = '0 20px 40px rgba(138, 43, 226, 0.4)';
                } else if (element.classList.contains('blue-glow')) {
                    element.style.boxShadow = '0 20px 40px rgba(30, 144, 255, 0.4)';
                } else if (element.classList.contains('teal-glow')) {
                    element.style.boxShadow = '0 20px 40px rgba(0, 128, 128, 0.4)';
                }
            } else if (element.classList.contains('work-card')) {
                element.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
            } else if (element.classList.contains('stat-card')) {
                element.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
            } else if (element.classList.contains('contact-card')) {
                element.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.2)';
            } else if (element.classList.contains('btn-primary')) {
                element.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.7)';
            } else if (element.classList.contains('btn-secondary')) {
                element.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.4)';
            } else if (element.classList.contains('nav-links')) {
                element.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.5)';
            }
        });

        element.addEventListener('mouseleave', () => {
            // Remove glow effect based on element type
            if (element.classList.contains('feature-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('work-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('stat-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('contact-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('btn-primary')) {
                element.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
            } else if (element.classList.contains('btn-secondary')) {
                element.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.2)';
            } else if (element.classList.contains('nav-links')) {
                element.style.boxShadow = 'none';
            }
        });
    });

    // Draggable Terminal Functionality (for both desktop and touch devices)
    const terminal = document.getElementById('draggable-terminal');
    const terminalHeader = document.getElementById('terminal-header');

    if (terminal && terminalHeader) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        // Load saved position from localStorage
        const savedPosition = localStorage.getItem('terminalPosition');
        if (savedPosition) {
            const pos = JSON.parse(savedPosition);
            // Only apply position if not on mobile
            if (!isMobile) {
                terminal.style.left = pos.x + 'px';
                terminal.style.top = pos.y + 'px';
            }
        }

        // For mobile, disable dragging and set a default position
        if (isMobile) {
            terminal.style.position = 'relative';
            terminal.style.left = 'auto';
            terminal.style.top = 'auto';
            terminal.style.transform = 'none';
            terminal.style.margin = '1.5rem auto 0 auto';
            terminal.style.alignSelf = 'center';
        } else {
            // Desktop events
            terminalHeader.addEventListener('mousedown', dragStart);
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('mousemove', drag);

            // Touch events
            terminalHeader.addEventListener('touchstart', touchDragStart);
            document.addEventListener('touchend', touchDragEnd);
            document.addEventListener('touchmove', touchDrag);

            function dragStart(e) {
                if (isTouchDevice) return; // Prevent both mouse and touch events on touch devices

                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;

                if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
                    isDragging = true;
                    e.preventDefault(); // Prevent default to avoid text selection
                }
            }

            function touchDragStart(e) {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;

                if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
                    isDragging = true;
                    e.preventDefault(); // Prevent scrolling while dragging
                }
            }

            function dragEnd() {
                if (isTouchDevice) return;

                initialX = currentX;
                initialY = currentY;

                isDragging = false;

                // Save position to localStorage
                const rect = terminal.getBoundingClientRect();
                const pos = {
                    x: rect.left,
                    y: rect.top
                };
                localStorage.setItem('terminalPosition', JSON.stringify(pos));
            }

            function touchDragEnd() {
                initialX = currentX;
                initialY = currentY;

                isDragging = false;

                // Save position to localStorage
                const rect = terminal.getBoundingClientRect();
                const pos = {
                    x: rect.left,
                    y: rect.top
                };
                localStorage.setItem('terminalPosition', JSON.stringify(pos));
            }

            function drag(e) {
                if (isDragging && !isTouchDevice) {
                    e.preventDefault();

                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;

                    xOffset = currentX;
                    yOffset = currentY;

                    setTranslate(currentX, currentY, terminal);
                }
            }

            function touchDrag(e) {
                if (isDragging) {
                    e.preventDefault(); // Prevent scrolling

                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;

                    xOffset = currentX;
                    yOffset = currentY;

                    setTranslate(currentX, currentY, terminal);
                }
            }

            function setTranslate(xPos, yPos, el) {
                el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            }
        }
    }

    // Add scroll progress bar functionality with performance optimization (works on all devices)
    let scrollTimeout;
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        const winHeight = window.innerHeight;

        // Prevent division by zero
        const scrollableHeight = docHeight - winHeight;
        let scrollPercent = 0;

        if (scrollableHeight > 0) {
            scrollPercent = Math.max(0, Math.min(1, scrollTop / scrollableHeight));
        }

        const scrollPercentRounded = Math.round(scrollPercent * 100);

        if (!isMobile) {
            const scrollProgress = document.querySelector('.scroll-progress');
            if (scrollProgress) {
                scrollProgress.style.width = `${scrollPercentRounded}%`;
            }
        }
    }

    // Initialize and update scroll progress with throttling for performance
    updateScrollProgress();

    // Throttle scroll events for better performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(updateScrollProgress, 10);
    }, false);

    window.addEventListener('resize', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(updateScrollProgress, 10);
    }, false);

    // Add scroll effect to navbar with performance optimization
    let ticking = false;

    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add hover effects to work cards
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .hero-title, .hero-subtitle, .hero-buttons, .work-card, .stat-card, .contact-card, .about-description').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add button ripple effects (works on all devices but adapted for touch)
    const buttons = document.querySelectorAll('button, .work-link, .social-link');
    buttons.forEach(button => {
        // Use mousedown for desktop and touchstart for mobile
        const eventType = isMobile ? 'touchstart' : 'mousedown';
        
        button.addEventListener(eventType, function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Position the ripple based on touch/click position
            const rect = button.getBoundingClientRect();
            let clientX, clientY;
            
            if (isMobile && e.touches && e.touches[0]) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            
            const size = Math.max(rect.width, rect.height);
            const x = clientX - rect.left - size / 2;
            const y = clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            // Add ripple to button
            button.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode === button) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Add typing animation to hero title with safety checks
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent.trim() !== '') {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';

        // Ensure the animation doesn't interfere with mobile
        if (!isMobile) {
            let i = 0;
            function typeWriter() {
                if (i < originalText.length && i < 1000) { // Prevent infinite loop
                    heroTitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Add cursor blink effect after typing is complete
                    const cursor = document.createElement('span');
                    cursor.innerHTML = '|';
                    cursor.style.opacity = '1';
                    cursor.style.animation = 'blink 1s infinite';
                    cursor.style.marginLeft = '10px';
                    cursor.setAttribute('aria-hidden', 'true'); // Accessibility
                    heroTitle.appendChild(cursor);
                }
            }

            // Start typing after a delay
            setTimeout(typeWriter, 1000);
        } else {
            // On mobile, just show the text without animation
            heroTitle.textContent = originalText;
        }
    }

    // Add typing animation to section titles on pages that need it
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        if (!title.classList.contains('animated-title') && title.textContent.trim() !== '') {
            title.classList.add('animated-title');
            const originalText = title.textContent;
            title.textContent = '';

            // Only animate on desktop
            if (!isMobile) {
                let i = 0;
                function typeSectionTitle() {
                    if (i < originalText.length && i < 500) { // Prevent infinite loop
                        title.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeSectionTitle, 30);
                    }
                }

                // Start typing after a delay
                setTimeout(typeSectionTitle, 500);
            } else {
                // On mobile, just show the text without animation
                title.textContent = originalText;
            }
        }
    });

    // Add CSS for cursor blink animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add ripple effect CSS
    const rippleCSS = document.createElement('style');
    rippleCSS.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleCSS);

    // Add floating animation to feature card icons
    const icons = document.querySelectorAll('.card-icon i, .contact-icon');
    icons.forEach(icon => {
        // Add random floating animation
        function floatAnimation() {
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 20 - 10;

            icon.style.transform = `translate(${x}px, ${y}px)`;

            setTimeout(() => {
                icon.style.transform = 'translate(0, 0)';
            }, 1000);
        }

        // Apply floating animation periodically
        setInterval(floatAnimation, 3000);
    });

    // Add parallax effect to background elements (only for desktop)
    if (!disableHeavyFeatures) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const cubes = document.querySelectorAll('.floating-cube');

            cubes.forEach((cube, index) => {
                const speed = 0.5 - (index * 0.1);
                const yPos = -(scrolled * speed);
                cube.style.transform = `translateY(${yPos}px) rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg)`;
            });
        });
    }

    // Add enhanced particle background effect (only for desktop due to performance)
    if (!disableHeavyFeatures) {
        createParticleBackground();
    }

    function createParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        let animationFrameId;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5; // Reduced speed
                this.speedY = (Math.random() - 0.5) * 0.5; // Reduced speed
                this.opacity = Math.random() * 0.4 + 0.1;
                this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`; // Limited to blue-cyan range
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Boundary checks with bounce
                if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
                if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

                // Keep particles within bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Add glow effect only if supported
                if (ctx.shadowColor !== undefined) {
                    ctx.shadowColor = this.color;
                    ctx.shadowBlur = Math.min(10, this.size * 2); // Scale glow with particle size
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }

        function initParticles() {
            // Reduce particle count for better performance
            const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 10000));
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            const maxDistance = 80; // Reduced connection distance

            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - distance/maxDistance;
                        if (opacity > 0.05) { // Only draw if visible enough
                            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        function animateParticles() {
            // Clear with transparency for trail effect
            ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            connectParticles();

            animationFrameId = requestAnimationFrame(animateParticles);
        }

        function handleResize() {
            // Store particle positions relative to old size
            const widthRatio = window.innerWidth / canvas.width;
            const heightRatio = window.innerHeight / canvas.height;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Adjust particle positions proportionally
            particles.forEach(particle => {
                particle.x *= widthRatio;
                particle.y *= heightRatio;
            });
        }

        initParticles();
        animateParticles();

        // Handle resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 100);
        });

        // Cleanup function
        function cleanup() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            window.removeEventListener('resize', handleResize);
        }

        // Store cleanup function for potential later use
        window.cleanupParticleBackground = cleanup;
    }

    // Comprehensive mobile menu toggle functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        // Function to open the menu
        function openMenu() {
            navLinks.classList.add('active');
            navLinks.classList.remove('collapsed');
            navToggle.classList.add('active');
            document.body.classList.add('menu-open'); // Add class to body for styling
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        // Function to close the menu
        function closeMenu() {
            navLinks.classList.remove('active');
            navLinks.classList.add('collapsed');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open'); // Remove class from body
            document.body.style.overflow = ''; // Re-enable scrolling
        }

        // Toggle menu on hamburger click
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on a link
        const navLinkElements = document.querySelectorAll('.nav-links a');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navToggle.contains(event.target) || navLinks.contains(event.target);

            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu when touching outside (for touch devices)
        document.addEventListener('touchstart', (event) => {
            const isClickInsideNav = navToggle.contains(event.target) || navLinks.contains(event.target);

            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu when resizing to desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Form submission handling for Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Show a temporary message while form is being submitted
            const messageDiv = document.getElementById('form-message');
            if (messageDiv) {
                messageDiv.textContent = 'Sending message...';
                messageDiv.className = 'form-message';
                messageDiv.style.display = 'block';
            }

            // Form will be handled by Formspree
            // The page will reload after submission due to the form action
        });
    }

    // Check if form was submitted successfully (Formspree redirects back)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.textContent = 'Thank you for your message! I will get back to you soon.';
            messageDiv.className = 'form-message success';
            messageDiv.style.display = 'block';

            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Add active class to current page in navigation with better logic
    const currentPath = window.location.pathname;
    const navLinksArray = document.querySelectorAll('.nav-links a');

    navLinksArray.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Normalize the paths for comparison
        let normalizedLinkHref = linkHref;
        if (normalizedLinkHref === 'index.html' || normalizedLinkHref === './' || normalizedLinkHref === '/') {
            normalizedLinkHref = '/';
        } else if (normalizedLinkHref.startsWith('pages/')) {
            normalizedLinkHref = '/' + normalizedLinkHref;
        }

        // Check if the current path matches the link
        if (currentPath === normalizedLinkHref ||
            (currentPath === '/' && normalizedLinkHref === '/') ||
            currentPath.includes(normalizedLinkHref.replace('pages/', '').replace('../', ''))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Account for fixed navbar offset
                const offsetTop = target.offsetTop - 80; // Adjust for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy load images for better performance
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // If the image has a data-src attribute, load it
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src'); // Remove data-src to prevent reloading
                }

                img.classList.remove('loading');
                img.classList.add('loaded');

                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading when 50px before entering viewport
    });

    images.forEach(img => {
        if ('IntersectionObserver' in window) {
            // If image is already loaded, don't observe it
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                imageObserver.observe(img);
            }
        } else {
            // Fallback for older browsers
            img.classList.add('loaded');
        }
    });

    // Add intersection observer for animations
    const animateElements = document.querySelectorAll('.feature-card, .work-card, .stat-card, .contact-card, .about-description, .hero-title, .hero-subtitle, .hero-buttons');
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        elementObserver.observe(el);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Skip to main content on Tab + Alt
        if (e.key === 'Tab' && e.altKey) {
            e.preventDefault();
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = 'position: absolute; top: -40px; left: 6px; background: #000; color: white; padding: 8px; z-index: 1000; text-decoration: none;';
            skipLink.classList.add('screen-reader-only');
            document.body.insertBefore(skipLink, document.body.firstChild);

            skipLink.focus();
            skipLink.addEventListener('blur', () => {
                skipLink.remove();
            });
        }
    });

    // Add focus management for accessibility
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('a, button, input, textarea, select, [tabindex]')) {
            e.target.classList.add('focused');
        }
    });

    document.addEventListener('focusout', function(e) {
        if (e.target.matches('a, button, input, textarea, select, [tabindex]')) {
            e.target.classList.remove('focused');
        }
    });

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }

    // Add service worker registration for offline support (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Note: This is commented out since we don't have a service worker file yet
            // navigator.serviceWorker.register('/sw.js')
            //     .then(function(registration) {
            //         console.log('ServiceWorker registered with scope:', registration.scope);
            //     })
            //     .catch(function(error) {
            //         console.log('ServiceWorker registration failed:', error);
            //     });
        });
    }

    // Add enhanced visual effects
    function initVisualEffects() {
        // Add passive scroll event listener for better performance
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Update any scroll-dependent effects here
                    updateScrollDependentEffects();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Use passive event listeners for better scrolling performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Add touch event optimizations
        if ('ontouchstart' in window) {
            // Optimize for touch devices
            document.body.style.cssText += '-webkit-touch-callout: manipulation; -webkit-user-select: none;';
        }

        // Add floating animation to cards (only on desktop)
        if (!disableHeavyFeatures) {
            const cards = document.querySelectorAll('.feature-card, .work-card, .stat-card, .contact-card');
            cards.forEach((card, index) => {
                // Add floating animation with staggered delay
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('floating');
            });
        }

        // Add glitch effect to headings on hover (reduce frequency on mobile)
        const glitchHeadings = document.querySelectorAll('.section-title, .hero-title, .about-subtitle');
        glitchHeadings.forEach(heading => {
            heading.addEventListener('mouseenter', () => {
                // Reduce glitch probability on mobile
                const glitchChance = isMobile ? 0.1 : 0.3; // 10% on mobile, 30% on desktop
                if (Math.random() > (1 - glitchChance)) {
                    heading.classList.add('glitch');
                    heading.setAttribute('data-text', heading.textContent);

                    setTimeout(() => {
                        heading.classList.remove('glitch');
                    }, isMobile ? 500 : 1000); // Shorter duration on mobile
                }
            });
        });

        // Add enhanced button effects
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.classList.add('enhanced-btn');

            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        });

        // Add enhanced card hover effects (skip on mobile for performance)
        if (!isMobile) {
            const enhancedCards = document.querySelectorAll('.feature-card, .work-card, .stat-card, .contact-card');
            enhancedCards.forEach(card => {
                card.classList.add('enhanced-card');

                // Add shine effect on mouse move
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                });
            });
        }

        // Add parallax effect to background elements
        if (!disableHeavyFeatures) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.parallax-element');

                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }

        // Add typing effect enhancement
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-typewriter');
            const speed = parseInt(element.getAttribute('data-speed')) || 50;

            if (text && !isMobile) {
                element.textContent = '';
                let i = 0;

                function typeWriter() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    }
                }

                setTimeout(typeWriter, parseInt(element.getAttribute('data-delay')) || 0);
            } else {
                element.textContent = text; // Fallback for mobile or if disabled
            }
        });

        // Add particle cursor effect enhancement (skip on mobile)
        if (!isMobile && !isTouchDevice) {
            document.addEventListener('mousemove', (e) => {
                createSubtleParticleEffect(e.clientX, e.clientY);
            });
        }
    }

    // Function to update scroll-dependent effects
    function updateScrollDependentEffects() {
        // Only update heavy effects on desktop
        if (!disableHeavyFeatures) {
            // Update parallax effects if they exist
            const scrolled = window.pageYOffset;
            const cubes = document.querySelectorAll('.floating-cube');

            cubes.forEach((cube, index) => {
                const speed = 0.5 - (index * 0.1);
                const yPos = -(scrolled * speed);
                cube.style.transform = `translateY(${yPos}px) rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg)`;
            });
        }
    }

    // Function to create ripple effect
    function createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            z-index: 9999;
        `;

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Function to create subtle particle effect
    function createSubtleParticleEffect(x, y) {
        if (Math.random() > 0.3) return; // Only create particles occasionally

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.7);
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            z-index: 9998;
            animation: floatParticle 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    // Add CSS for new animations
    const newStyles = document.createElement('style');
    newStyles.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }

        @keyframes floatParticle {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-20px) scale(0);
                opacity: 0;
            }
        }

        .enhanced-card {
            --mouse-x: 0;
            --mouse-y: 0;
            position: relative;
        }

        .enhanced-card::before {
            content: '';
            position: absolute;
            top: var(--mouse-y);
            left: var(--mouse-x);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .enhanced-card:hover::before {
            opacity: 1;
        }
    `;
    document.head.appendChild(newStyles);

    // Initialize all visual effects
    initVisualEffects();

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add delayed animations for cascading effect
                const elements = entry.target.querySelectorAll('.delay-child');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.features-grid, .works-grid, .stats-grid, .contact-content').forEach(el => {
        observer.observe(el);
    });

    // Add floating effect to elements
    const floatingElements = document.querySelectorAll('.floating-element, .cpu-illustration, .developer-avatar');
    floatingElements.forEach(element => {
        element.classList.add('floating-element');
    });

    // Add enhanced animations to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add enhanced animations to work cards
    const workCardsAll = document.querySelectorAll('.work-card');
    workCardsAll.forEach((card, index) => {
        // Add staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});
