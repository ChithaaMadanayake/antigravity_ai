document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    
    // Simulate loading time for visual impact
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            initAnimations(); // Only start animations after loading
        }, 800);
    }, 1500);

    // --- Smooth Scrolling (Lenis) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Particles.js for Antigravity Background ---
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00F0FF", "#7A00FF", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": { "enable": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "repulse": { "distance": 100, "duration": 0.4 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

    // --- GSAP Animations ---
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Text Reveal
        gsap.from(".reveal-text", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
        });

        gsap.from(".hero-subtitle, .hero-buttons", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: "power3.out"
        });

        // Scroll Fades
        const scrollFades = document.querySelectorAll('.scroll-fade');
        scrollFades.forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Stat Cards Staggered Rise
        gsap.from(".stat-card", {
            scrollTrigger: {
                trigger: ".about-cards",
                start: "top 75%",
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // App Cards Stagger
        gsap.from(".app-card", {
            scrollTrigger: {
                trigger: ".app-grid",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Parallax Effect for engine core
        gsap.to(".engine-core-image", {
            scrollTrigger: {
                trigger: ".engine-visual",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -50,
            ease: "none"
        });
    }

    // --- Interactive Demo Area Vanilla JS ---
    const demoCanvas = document.getElementById('demo-canvas');
    let demoActive = false;
    
    demoCanvas.addEventListener('mouseenter', () => {
        demoActive = true;
        demoCanvas.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.2) inset';
    });
    
    demoCanvas.addEventListener('mouseleave', () => {
        demoActive = false;
        demoCanvas.style.boxShadow = 'none';
        demoCanvas.innerHTML = ''; // clear visual nodes optionally
    });

    demoCanvas.addEventListener('mousemove', (e) => {
        if(!demoActive) return;
        
        // Create a fast-fading blip on cursor trail
        const blip = document.createElement('div');
        blip.style.position = 'absolute';
        blip.style.width = '10px';
        blip.style.height = '10px';
        blip.style.background = '#00F0FF';
        blip.style.borderRadius = '50%';
        blip.style.pointerEvents = 'none';
        blip.style.left = `${e.offsetX}px`;
        blip.style.top = `${e.offsetY}px`;
        blip.style.boxShadow = '0 0 10px #00F0FF';
        blip.style.transform = 'translate(-50%, -50%)';
        blip.style.transition = 'all 0.5s ease-out';
        
        demoCanvas.appendChild(blip);
        
        requestAnimationFrame(() => {
            blip.style.opacity = '0';
            blip.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        
        setTimeout(() => {
            if(blip.parentElement) blip.remove();
        }, 500);
    });

});
