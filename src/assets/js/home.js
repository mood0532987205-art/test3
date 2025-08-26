/**
 * Enhanced Home Page JavaScript
 * Modern interactions, animations, and performance optimizations
 */

import anime from 'animejs/lib/anime.es.js';

class ModernHomeEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initModernSliders();
        this.initLazyLoading();
        this.initPerformanceOptimizations();
        this.initAccessibilityFeatures();
    }

    /**
     * Modern scroll-triggered animations using Intersection Observer
     */
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in-up, .slide-in-left, .slide-in-right');
        
        if (animatedElements.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Animate individual elements with modern effects
     */
    animateElement(element) {
        const animationType = element.dataset.animation || 'fadeInUp';
        
        const animations = {
            fadeInUp: {
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            slideInLeft: {
                translateX: [-100, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutCubic'
            },
            slideInRight: {
                translateX: [100, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutCubic'
            },
            scaleUp: {
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 700,
                easing: 'easeOutBack'
            }
        };

        anime({
            targets: element,
            ...animations[animationType],
            delay: parseInt(element.dataset.delay) || 0
        });
    }

    /**
     * Enhanced parallax effects for hero sections
     */
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }

    /**
     * Enhanced slider interactions
     */
    initModernSliders() {
        // Enhanced slider navigation with smooth transitions
        const sliders = document.querySelectorAll('salla-slider');
        
        sliders.forEach(slider => {
            slider.addEventListener('salla::slider.slide-change', (event) => {
                this.animateSlideContent(event.detail.activeSlide);
            });
        });

        // Add custom navigation enhancements
        this.enhanceSliderNavigation();
    }

    /**
     * Animate slide content on change
     */
    animateSlideContent(slide) {
        const content = slide.querySelectorAll('.animate-fadeInUp');
        
        anime({
            targets: content,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });
    }

    /**
     * Enhanced slider navigation with modern interactions
     */
    enhanceSliderNavigation() {
        const navButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
        
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    /**
     * Modern lazy loading with Intersection Observer
     */
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src], [data-bg]');
        
        if (lazyImages.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /**
     * Load image with fade-in effect
     */
    loadImage(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
            element.onload = () => {
                anime({
                    targets: element,
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutCubic'
                });
            };
        }

        if (element.dataset.bg) {
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            anime({
                targets: element,
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutCubic'
            });
        }
    }

    /**
     * Performance optimizations
     */
    initPerformanceOptimizations() {
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Prefetch critical resources
        this.prefetchCriticalResources();
    }

    /**
     * Handle responsive optimizations on resize
     */
    handleResize() {
        // Recalculate parallax elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            element.style.transform = 'translateY(0)';
        });
    }

    /**
     * Prefetch critical resources for better performance
     */
    prefetchCriticalResources() {
        const criticalImages = document.querySelectorAll('[data-critical-src]');
        
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = img.dataset.criticalSrc;
            document.head.appendChild(link);
        });
    }

    /**
     * Enhanced accessibility features
     */
    initAccessibilityFeatures() {
        // Keyboard navigation for sliders
        this.enhanceKeyboardNavigation();
        
        // Reduced motion preference
        this.handleReducedMotion();
        
        // Focus management
        this.improveFocusManagement();
    }

    /**
     * Enhanced keyboard navigation
     */
    enhanceKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const focusedSlider = document.activeElement.closest('salla-slider');
                if (focusedSlider) {
                    e.preventDefault();
                    const direction = e.key === 'ArrowLeft' ? 'prev' : 'next';
                    focusedSlider.dispatchEvent(new CustomEvent(`salla::slider.${direction}`));
                }
            }
        });
    }

    /**
     * Respect reduced motion preferences
     */
    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Improve focus management for better accessibility
     */
    improveFocusManagement() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary-600 text-white p-2 z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Enhanced focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Modern hover effects for cards
class ModernCardEffects {
    constructor() {
        this.initCardEffects();
    }

    initCardEffects() {
        const cards = document.querySelectorAll('.group, .card, .banner-entry');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateCardHover(card, true));
            card.addEventListener('mouseleave', () => this.animateCardHover(card, false));
        });
    }

    animateCardHover(card, isHover) {
        const timeline = anime.timeline({
            duration: 400,
            easing: 'easeOutCubic'
        });

        if (isHover) {
            timeline.add({
                targets: card,
                translateY: -8,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            });
        } else {
            timeline.add({
                targets: card,
                translateY: 0,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            });
        }
    }
}

// Initialize enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernHomeEnhancements();
    new ModernCardEffects();
});

// Enhanced glowing effects for home page
class GlowEffects {
    constructor() {
        this.initGlowEffects();
    }

    initGlowEffects() {
        // Add enhanced glow effects to interactive elements
        const glowElements = document.querySelectorAll('.btn, .card, .product-card');

        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = 'var(--glow-primary)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
            });
        });
    }
}

// Initialize glow effects
new GlowEffects();