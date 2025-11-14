// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content, .code-animation');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Dynamic glow effect on skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Typing animation for hero text
    const typeWriter = function(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Dynamic cursor effect
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Matrix rain effect enhancement
    const matrixBg = document.querySelector('.matrix-bg');
    let matrixChars = '01';
    let matrixColumns = Math.floor(window.innerWidth / 20);
    let matrixDrops = [];

    for (let i = 0; i < matrixColumns; i++) {
        matrixDrops[i] = Math.floor(Math.random() * 100);
    }

    // Add floating particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: float-up ${Math.random() * 10 + 5}s linear;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) translateX(0);
                opacity: ${Math.random() * 0.8 + 0.2};
            }
            25% {
                transform: translateY(-25vh) translateX(${Math.random() * 100 - 50}px);
            }
            50% {
                transform: translateY(-50vh) translateX(${Math.random() * 100 - 50}px);
            }
            75% {
                transform: translateY(-75vh) translateX(${Math.random() * 100 - 50}px);
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Project cards hover effect with 3D transform
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(-5deg) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksActive = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksActive.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '';
            }
        });
    });

    // Terminal typing effect for code animation
    const codeLines = document.querySelectorAll('.code-lines .line');
    let currentLine = 0;

    function typeCodeLine() {
        if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];
            const originalText = line.textContent;
            line.textContent = '';

            let charIndex = 0;
            function typeChar() {
                if (charIndex < originalText.length) {
                    line.textContent += originalText[charIndex];
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    setTimeout(() => {
                        line.style.opacity = '0.7';
                        currentLine++;
                        setTimeout(typeCodeLine, 300);
                    }, 1000);
                }
            }

            line.style.opacity = '1';
            typeChar();
        } else {
            // Reset and restart
            setTimeout(() => {
                codeLines.forEach(line => line.style.opacity = '0');
                currentLine = 0;
                setTimeout(typeCodeLine, 1000);
            }, 3000);
        }
    }

    // Start code animation
    setTimeout(typeCodeLine, 1000);

    // Add glitch effect to headings randomly
    const headings = document.querySelectorAll('.glitch-text h1, .glitch-text h2');

    setInterval(() => {
        const randomHeading = headings[Math.floor(Math.random() * headings.length)];
        randomHeading.style.animation = 'none';
        setTimeout(() => {
            randomHeading.style.animation = 'glitch 0.3s';
        }, 10);
    }, 3000);

    // Progress indicators for skills
    const skillItems = document.querySelectorAll('.skill-card li');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)';
            this.style.paddingLeft = '2rem';
        });

        item.addEventListener('mouseleave', function() {
            this.style.background = 'none';
            this.style.paddingLeft = '1.5rem';
        });
    });

    // Social media links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.background = 'var(--gradient-1)';
            this.style.borderColor = 'transparent';
        });

        link.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.borderColor = 'var(--border-color)';
        });
    });

    // Email copy functionality
    const emailElement = document.querySelector('.contact-item i.fa-envelope').nextElementSibling;
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = '点击复制邮箱地址';

        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.textContent;
                this.textContent = '已复制到剪贴板!';
                this.style.color = 'var(--primary-color)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    }

    console.log('%c🚀 Welcome to Kenvie\'s Digital Universe!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%cFull-Stack Developer | Cloud Architect | System Engineer', 'color: #00a8ff; font-size: 14px;');
    console.log('%c// Crafted with passion and code', 'color: #888; font-style: italic;');
});