// Enhanced Smooth Scrolling with Offset for Fixed Header
function smoothScrollTo(target, offset = 80) {
    const element = document.querySelector(target);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target && target !== '#') {
            smoothScrollTo(target, 80);
        }
    });
});

// Video Hero Section - Auto play video
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.play().catch(error => {
        console.log('Video autoplay prevented:', error);
    });
}

// Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    });
}
});

// Approach Section - Horizontal Scroll Layout
document.addEventListener('DOMContentLoaded', function () {
    const approachSlider = document.querySelector('.approach-slider');

    if (approachSlider) {
        const wrapper = approachSlider.querySelector('.swiper-wrapper');
        const nextBtn = document.getElementById('approachNext');
        const prevBtn = document.getElementById('approachPrev');
        const scrollContainer = document.querySelector('.approach-scroll-container') || approachSlider;

        if (wrapper) {
            // Ensure flex layout for horizontal scroll
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'row';
            wrapper.style.transform = 'none';
            wrapper.style.width = 'auto';
            wrapper.style.flexWrap = 'nowrap';

            // Responsive slide widths - FIXED FOR MOBILE
            function updateLayout() {
                const width = window.innerWidth;
                const slides = wrapper.querySelectorAll('.swiper-slide');

                // Remove all inline styles first
                slides.forEach(slide => {
                    slide.style.width = '';
                    slide.style.marginLeft = '';
                    slide.style.minWidth = '';
                    slide.style.maxWidth = '';
                });

                if (width >= 992) {
                    wrapper.style.gap = '2rem';
                    slides.forEach(slide => {
                        slide.style.width = '372px';
                        slide.style.marginLeft = '30px';
                    });
                    if (slides[0]) slides[0].style.marginLeft = '0';
                } else if (width >= 768) {
                    wrapper.style.gap = '1.5rem';
                    // Let CSS handle it
                } else if (width >= 480) {
                    wrapper.style.gap = '1rem';
                    // Let CSS handle it
                } else {
                    wrapper.style.gap = '1.5rem';
                    // Let CSS handle it - don't override
                }
            }

            updateLayout();
            window.addEventListener('resize', updateLayout);

            // Navigation buttons scroll
            const scrollAmount = 400;
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            }
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            }
        }
    }
});

// Search Modal - REMOVED (handled by header.js)
// Mobile Menu - REMOVED (handled by header.js)

// Animate statistics on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateNumber(statNumber, 0, target, 2000);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Header scroll effect with active navigation highlighting
let lastScroll = 0;

// Initialize immediately since navbar is static HTML
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

console.log('🎯 index.js: Header elements initialized', {
    header: !!header,
    navLinks: navLinks ? navLinks.length : 0,
    sections: sections ? sections.length : 0
});

function updateActiveNav() {
    if (!sections || !navLinks || sections.length === 0) return;
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 0;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Handle home section (top of page)
    if (scrollY < 100) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#home' || link.getAttribute('href') === '/') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Debounced scroll handler
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

function handleScroll() {
    const currentScroll = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 0;

    // Determine which section we're in
    let currentSection = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            currentSection = section;
        }
    });

    // Change header style based on section
    if (header) {
        // Transparent sections: video-hero, image-hero, slider-hero (sections with images/videos)
        const transparentSections = ['home', 'featured', 'slider'];
        const isTransparentSection = currentSection && transparentSections.includes(currentSection.id);

        // Dark sections: statistics, cta
        const darkSections = ['statistics', 'cta'];
        const isDarkSection = currentSection && darkSections.includes(currentSection.id);

        // Light sections: about, awards, news
        const lightSections = ['about', 'awards', 'media'];
        const isLightSection = currentSection && lightSections.includes(currentSection.id);

        // Reset all classes
        header.classList.remove('transparent-header', 'light-header', 'scrolled');

        if (isTransparentSection || (currentScroll < 100 && !currentSection)) {
            header.classList.add('transparent-header');
            if (currentScroll > 50) header.classList.add('scrolled');
        } else if (isDarkSection) {
            // Re-use transparent-header logic for dark sections to get white text
            header.classList.add('transparent-header');
            header.classList.add('scrolled');
            // Allow CSS to handle the background for .scrolled
        } else {
            // Light sections or default
            header.classList.add('light-header');
            if (currentScroll > 100) header.classList.add('scrolled');
        }
    }

    // Update active navigation
    updateActiveNav();

    lastScroll = currentScroll;
}

// Initial header state
if (header && window.pageYOffset < 100) {
    header.classList.add('transparent-header');
}

// Scroll animations for sections - simplified, no stagger
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            entry.target.querySelectorAll('.animate-on-scroll').forEach(child => {
                child.classList.add('animated');
            });
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section[id]').forEach(section => {
        if (section.id === 'home') {
            section.classList.add('fade-in-visible');
            section.querySelectorAll('.animate-on-scroll').forEach(c => c.classList.add('animated'));
            return;
        }
        section.classList.add('fade-in-section');
        scrollObserver.observe(section);
    });
});

// Parallax effect disabled to prevent spacing issues
// function parallaxScroll() {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.parallax-element');
//
//     parallaxElements.forEach(element => {
//         const speed = element.dataset.speed || 0.5;
//         const yPos = -(scrolled * speed);
//         element.style.transform = `translateY(${yPos}px)`;
//     });
// }

// window.addEventListener('scroll', parallaxScroll);


