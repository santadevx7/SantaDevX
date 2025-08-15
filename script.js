// Advanced JavaScript Features for Saif Fikry Portfolio
// Elite Developer Portfolio - Interactive Features

class PortfolioManager {
    constructor() {
        this.isLoaded = false;
        this.currentTheme = 'dark';
        this.currentLang = 'ar';
        this.musicPlaying = false;
        this.particles = [];
        this.achievements = [];
        this.visitCount = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.loadUserPreferences();
        this.startPerformanceMonitoring();
        this.initializeEasterEggs();
        this.setupAdvancedFeatures();
    }

    setupEventListeners() {
        // Loading screen
        window.addEventListener('load', () => this.handlePageLoad());
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize events
        window.addEventListener('resize', () => this.handleResize());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Mouse events
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => this.handleTouch(e));
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        
        // Visibility change
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    handlePageLoad() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                this.isLoaded = true;
                this.showWelcomeMessage();
                this.incrementVisitCount();
            }
        }, 2000);
    }

    showWelcomeMessage() {
        const messages = [
            'مرحباً بك في عالم سيف فكري الرقمي! 🚀',
            'Welcome to Saif Fikry\'s Digital Universe! 🌟',
            'استعد لتجربة تقنية مذهلة! ⚡',
            'Get ready for an amazing tech experience! 💻'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showNotification(randomMessage, 'success', 5000);
    }

    incrementVisitCount() {
        this.visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
        localStorage.setItem('visitCount', this.visitCount.toString());
        
        if (this.visitCount === 1) {
            this.showNotification('مرحباً بك لأول مرة! 🎉', 'info', 3000);
        } else if (this.visitCount % 10 === 0) {
            this.showNotification(`هذه زيارتك رقم ${this.visitCount}! شكراً لك! 🙏`, 'success', 4000);
        }
    }

    initializeComponents() {
        this.initParticles();
        this.initMatrixRain();
        this.initTypedText();
        this.initAOS();
        this.initCounters();
        this.initSkillBars();
        this.initContactForm();
        this.initThemeToggle();
        this.initMusicPlayer();
        this.initLanguageToggle();
        this.initMobileMenu();
        this.initAdvancedCursor();
        this.initPerformanceOptimizations();
    }

    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { 
                        value: this.isMobile() ? 40 : 80, 
                        density: { enable: true, value_area: 800 } 
                    },
                    color: { value: '#00d4ff' },
                    shape: { 
                        type: 'circle',
                        stroke: { width: 0, color: '#000000' }
                    },
                    opacity: { 
                        value: 0.5, 
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                    },
                    size: { 
                        value: 3, 
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00d4ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: this.isMobile() ? 3 : 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: !this.isMobile(), mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }
    }

    initMatrixRain() {
        const canvas = document.getElementById('matrixRain');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}سيف فكري";
        const matrixArray = matrix.split("");
        const fontSize = this.isMobile() ? 8 : 10;
        const columns = canvas.width / fontSize;
        const drops = [];

        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px monospace';

            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        this.matrixInterval = setInterval(drawMatrix, this.isMobile() ? 50 : 35);
    }

    initTypedText() {
        if (typeof Typed !== 'undefined') {
            new Typed('.typed-text', {
                stringsElement: '#typed-strings',
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                smartBackspace: true,
                fadeOut: true,
                fadeOutClass: 'typed-fade-out',
                fadeOutDelay: 500
            });
        }
    }

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic',
                mirror: false,
                anchorPlacement: 'top-bottom'
            });
        }
    }

    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                this.addAchievement('counter_viewed', 'شاهدت الإحصائيات!');
            }
        };

        updateCounter();
    }

    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        const isValid = this.validateForm(form);
        if (!isValid) return;

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
            submitBtn.style.background = 'var(--accent-color)';
            
            // Show success notification
            this.showNotification('تم إرسال رسالتك بنجاح! سأرد عليك قريباً 📧', 'success', 5000);
            
            // Save to localStorage for demo
            this.saveContactMessage(data);
            
            // Reset form after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'var(--gradient-1)';
                submitBtn.disabled = false;
                form.reset();
                this.addAchievement('message_sent', 'أرسلت رسالة!');
            }, 3000);
        }, 2000);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'هذا الحقل مطلوب';
            isValid = false;
        }
        // Email validation
        else if (type === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
            isValid = false;
        }
        // Minimum length validation
        else if (field.name === 'message' && value && value.length < 10) {
            errorMessage = 'الرسالة يجب أن تكون 10 أحرف على الأقل';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ff0080';
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: #ff0080;
                font-size: 0.8rem;
                margin-top: 0.5rem;
                animation: fadeInUp 0.3s ease;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    saveContactMessage(data) {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
    }

    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        const root = document.documentElement;
        if (this.currentTheme === 'light') {
            root.style.setProperty('--color-white', '#ffffff');
            root.style.setProperty('--color-black', '#1a1a1a');
            root.style.setProperty('--dark-bg', '#f5f5f5');
            root.style.setProperty('--darker-bg', '#e5e5e5');
        } else {
            root.style.setProperty('--color-white', '#0a0a0a');
            root.style.setProperty('--color-black', '#ffffff');
            root.style.setProperty('--dark-bg', '#0a0a0a');
            root.style.setProperty('--darker-bg', '#050505');
        }

        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        if (this.currentTheme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }

        localStorage.setItem('theme', this.currentTheme);
        this.showNotification(`تم التبديل إلى المظهر ${this.currentTheme === 'dark' ? 'المظلم' : 'المضيء'}`, 'info', 2000);
    }

    initMusicPlayer() {
        const musicToggle = document.getElementById('musicToggle');
        const backgroundMusic = document.getElementById('backgroundMusic');
        
        if (!musicToggle || !backgroundMusic) return;

        musicToggle.addEventListener('click', () => {
            this.toggleMusic();
        });

        // Create audio context for better control
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 0.3; // Set volume to 30%
    }

    toggleMusic() {
        const musicToggle = document.getElementById('musicToggle');
        const backgroundMusic = document.getElementById('backgroundMusic');
        
        if (this.musicPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('i').classList.remove('fa-pause');
            musicToggle.querySelector('i').classList.add('fa-music');
            this.showNotification('تم إيقاف الموسيقى 🔇', 'info', 2000);
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                this.showNotification('لا يمكن تشغيل الموسيقى. يرجى التفاعل مع الصفحة أولاً.', 'warning', 3000);
            });
            musicToggle.classList.add('playing');
            musicToggle.querySelector('i').classList.remove('fa-music');
            musicToggle.querySelector('i').classList.add('fa-pause');
            this.showNotification('تم تشغيل الموسيقى 🎵', 'success', 2000);
        }
        
        this.musicPlaying = !this.musicPlaying;
    }

    initLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        if (!langToggle) return;

        langToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
        
        const html = document.documentElement;
        const langToggle = document.getElementById('langToggle');
        
        if (this.currentLang === 'ar') {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            langToggle.title = 'English';
        } else {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            langToggle.title = 'العربية';
        }

        localStorage.setItem('language', this.currentLang);
        this.showNotification(`Language switched to ${this.currentLang === 'ar' ? 'Arabic' : 'English'}`, 'info', 2000);
    }

    initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!mobileMenuToggle || !navMenu) return;

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    initAdvancedCursor() {
        if (this.isMobile()) return; // Skip on mobile devices

        const cursor = document.createElement('div');
        cursor.className = 'advanced-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });

        // Enhanced cursor effects
        document.querySelectorAll('a, button, .hover-effect').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'var(--secondary-color)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--primary-color)';
            });
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Parallax effects
        this.updateParallax();
        
        // Progress indicator
        this.updateScrollProgress();
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--gradient-1);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrolled + '%';
    }

    handleResize() {
        // Update matrix rain canvas
        const canvas = document.getElementById('matrixRain');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Update particles
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.fn.canvasSize();
        }
    }

    handleKeyboard(e) {
        // Konami Code
        this.konamiCode = this.konamiCode || [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        this.konamiCode.push(e.keyCode);
        if (this.konamiCode.length > konamiSequence.length) {
            this.konamiCode.shift();
        }
        
        if (this.konamiCode.join(',') === konamiSequence.join(',')) {
            this.activateKonamiCode();
            this.konamiCode = [];
        }

        // Keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'd':
                    e.preventDefault();
                    this.toggleTheme();
                    break;
                case 'm':
                    e.preventDefault();
                    this.toggleMusic();
                    break;
                case 'l':
                    e.preventDefault();
                    this.toggleLanguage();
                    break;
            }
        }

        // ESC key to close modals
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }

    activateKonamiCode() {
        // Rainbow effect
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Show secret message
        this.showNotification('🎉 مبروك! لقد اكتشفت الكود السري! أنت هاكر حقيقي! 🎉', 'success', 10000);
        
        // Add special achievement
        this.addAchievement('konami_master', 'سيد الكونامي كود!');
        
        // Activate special effects
        this.activateSpecialEffects();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }

    activateSpecialEffects() {
        // Create fireworks effect
        this.createFireworks();
        
        // Temporary matrix mode
        this.activateMatrixMode();
        
        // Special cursor trail
        this.activateCursorTrail();
    }

    createFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 500);
        }
    }

    createFirework(x, y) {
        const colors = ['#00d4ff', '#ff0080', '#00ff88', '#ffff00', '#ff6600'];
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${x}px;
                top: ${y}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 2 + Math.random() * 3;
            
            let posX = x;
            let posY = y;
            let velX = Math.cos(angle) * velocity;
            let velY = Math.sin(angle) * velocity;
            
            const animate = () => {
                posX += velX;
                posY += velY;
                velY += 0.1; // gravity
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
                
                if (parseFloat(particle.style.opacity) > 0 && posY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    activateMatrixMode() {
        const matrixOverlay = document.createElement('div');
        matrixOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9998;
            pointer-events: none;
        `;
        
        document.body.appendChild(matrixOverlay);
        
        setTimeout(() => {
            matrixOverlay.remove();
        }, 5000);
    }

    activateCursorTrail() {
        if (this.isMobile()) return;

        const trail = [];
        const trailLength = 10;
        
        const createTrailParticle = (x, y) => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${x}px;
                top: ${y}px;
                opacity: 1;
                transition: opacity 0.5s ease;
            `;
            
            document.body.appendChild(particle);
            trail.push(particle);
            
            if (trail.length > trailLength) {
                const oldParticle = trail.shift();
                oldParticle.style.opacity = '0';
                setTimeout(() => oldParticle.remove(), 500);
            }
        };
        
        const trailHandler = (e) => {
            createTrailParticle(e.clientX, e.clientY);
        };
        
        document.addEventListener('mousemove', trailHandler);
        
        setTimeout(() => {
            document.removeEventListener('mousemove', trailHandler);
            trail.forEach(particle => {
                particle.style.opacity = '0';
                setTimeout(() => particle.remove(), 500);
            });
        }, 10000);
    }

    handleMouseMove(e) {
        // Update custom cursor
        const cursor = document.querySelector('.advanced-cursor');
        if (cursor) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        }

        // Parallax mouse effect
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const parallaxElements = document.querySelectorAll('.mouse-parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    handleTouch(e) {
        // Mobile touch effects
        const touch = e.touches[0];
        this.createTouchRipple(touch.clientX, touch.clientY);
    }

    handleTouchMove(e) {
        // Prevent default scrolling behavior for custom gestures
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }

    createTouchRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 212, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x - 10}px;
            top: ${y - 10}px;
            animation: ripple-expand 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden
            if (this.musicPlaying) {
                const backgroundMusic = document.getElementById('backgroundMusic');
                if (backgroundMusic) backgroundMusic.pause();
            }
            
            // Pause animations
            this.pauseAnimations();
        } else {
            // Page is visible
            if (this.musicPlaying) {
                const backgroundMusic = document.getElementById('backgroundMusic');
                if (backgroundMusic) backgroundMusic.play().catch(e => console.log('Resume play failed:', e));
            }
            
            // Resume animations
            this.resumeAnimations();
        }
    }

    pauseAnimations() {
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
        }
    }

    resumeAnimations() {
        if (!this.matrixInterval) {
            this.initMatrixRain();
        }
    }

    initPerformanceOptimizations() {
        // Lazy loading for images
        this.setupLazyLoading();
        
        // Debounce scroll events
        this.debouncedScroll = this.debounce(this.handleScroll.bind(this), 16);
        window.removeEventListener('scroll', this.handleScroll);
        window.addEventListener('scroll', this.debouncedScroll);
        
        // Throttle resize events
        this.throttledResize = this.throttle(this.handleResize.bind(this), 250);
        window.removeEventListener('resize', this.handleResize);
        window.addEventListener('resize', this.throttledResize);
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    startPerformanceMonitoring() {
        // Monitor FPS
        let lastTime = performance.now();
        let frameCount = 0;
        
        const measureFPS = (currentTime) => {
            frameCount++;
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                this.currentFPS = fps;
                
                // Adjust quality based on FPS
                if (fps < 30 && !this.lowPerformanceMode) {
                    this.enableLowPerformanceMode();
                } else if (fps > 50 && this.lowPerformanceMode) {
                    this.disableLowPerformanceMode();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    enableLowPerformanceMode() {
        this.lowPerformanceMode = true;
        
        // Reduce particle count
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.particles.number.value = 20;
        }
        
        // Reduce animation frequency
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
            this.matrixInterval = setInterval(() => this.drawMatrix(), 100);
        }
        
        console.log('Low performance mode enabled');
    }

    disableLowPerformanceMode() {
        this.lowPerformanceMode = false;
        
        // Restore particle count
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.particles.number.value = this.isMobile() ? 40 : 80;
        }
        
        // Restore animation frequency
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
            this.matrixInterval = setInterval(() => this.drawMatrix(), 35);
        }
        
        console.log('Low performance mode disabled');
    }

    addAchievement(id, title) {
        if (this.achievements.find(a => a.id === id)) return;
        
        const achievement = { id, title, timestamp: Date.now() };
        this.achievements.push(achievement);
        
        this.showNotification(`🏆 إنجاز جديد: ${title}`, 'success', 4000);
        
        // Save to localStorage
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-color)' : type === 'warning' ? 'var(--secondary-color)' : 'var(--primary-color)'};
            color: var(--dark-bg);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
            cursor: pointer;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal, .popup, .overlay');
        modals.forEach(modal => {
            modal.style.display = 'none';
            modal.classList.remove('active');
        });
    }

    loadUserPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && savedTheme !== this.currentTheme) {
            this.toggleTheme();
        }
        
        // Load language
        const savedLang = localStorage.getItem('language');
        if (savedLang && savedLang !== this.currentLang) {
            this.toggleLanguage();
        }
        
        // Load achievements
        const savedAchievements = localStorage.getItem('achievements');
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        }
    }

    isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    initializeEasterEggs() {
        // Secret developer console commands
        window.saifDev = {
            showAchievements: () => {
                console.table(this.achievements);
                this.showNotification('تم عرض الإنجازات في وحدة التحكم', 'info', 3000);
            },
            clearData: () => {
                localStorage.clear();
                this.showNotification('تم مسح جميع البيانات', 'warning', 3000);
            },
            activateGodMode: () => {
                this.activateSpecialEffects();
                this.showNotification('تم تفعيل وضع الإله! 🔥', 'success', 5000);
            },
            showStats: () => {
                console.log({
                    visitCount: this.visitCount,
                    currentFPS: this.currentFPS,
                    lowPerformanceMode: this.lowPerformanceMode,
                    achievements: this.achievements.length
                });
            }
        };
        
        console.log('🚀 مرحباً بك في موقع سيف فكري!');
        console.log('💻 جرب الأوامر التالية:');
        console.log('saifDev.showAchievements() - عرض الإنجازات');
        console.log('saifDev.activateGodMode() - تفعيل وضع الإله');
        console.log('saifDev.showStats() - عرض الإحصائيات');
    }

    setupAdvancedFeatures() {
        // Add CSS animations
        this.addAdvancedAnimations();
        
        // Setup smooth scrolling
        this.setupSmoothScrolling();
        
        // Initialize mini-games
        this.initializeMiniGames();
        
        // Setup advanced interactions
        this.setupAdvancedInteractions();
    }

    addAdvancedAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes ripple-expand {
                from { transform: scale(1); opacity: 0.3; }
                to { transform: scale(4); opacity: 0; }
            }
            
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeMiniGames() {
        // Snake game easter egg
        let snakeSequence = [];
        const snakeCode = ['s', 'n', 'a', 'k', 'e'];
        
        document.addEventListener('keydown', (e) => {
            snakeSequence.push(e.key.toLowerCase());
            if (snakeSequence.length > snakeCode.length) {
                snakeSequence.shift();
            }
            
            if (snakeSequence.join('') === snakeCode.join('')) {
                this.launchSnakeGame();
                snakeSequence = [];
            }
        });
    }

    launchSnakeGame() {
        this.showNotification('🐍 لعبة الثعبان قادمة قريباً!', 'info', 3000);
        this.addAchievement('snake_discoverer', 'مكتشف لعبة الثعبان!');
    }

    setupAdvancedInteractions() {
        // Double-click effects
        document.addEventListener('dblclick', (e) => {
            this.createDoubleClickEffect(e.clientX, e.clientY);
        });
        
        // Long press effects on mobile
        let longPressTimer;
        document.addEventListener('touchstart', (e) => {
            longPressTimer = setTimeout(() => {
                this.handleLongPress(e);
            }, 1000);
        });
        
        document.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });
        
        document.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        });
    }

    createDoubleClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: doubleClickExpand 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 500);
    }

    handleLongPress(e) {
        const touch = e.touches[0];
        this.showNotification('تم اكتشاف ضغطة طويلة! 👆', 'info', 2000);
        this.createTouchRipple(touch.clientX, touch.clientY);
    }
}

// Initialize the portfolio manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
});

// Add additional CSS for new animations
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes doubleClickExpand {
        from { 
            width: 0; 
            height: 0; 
            opacity: 1; 
        }
        to { 
            width: 100px; 
            height: 100px; 
            margin-left: -50px; 
            margin-top: -50px; 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(additionalStyle);

