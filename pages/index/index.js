/* ============================================
   NMAA INDEX PAGE - OPTIMIZED JAVASCRIPT
   Removed unused code and improved performance
   ============================================ */

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

// Slider Functionality - Optimized
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const totalSlides = slides.length;

    if (slides.length === 0) return;

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

    // Initialize
    showSlide(0);
    
    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    const sliderEl = document.querySelector('.slider-hero-section');
    if (sliderEl) {
        sliderEl.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        sliderEl.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
                resetInterval();
            }
        }, { passive: true });
    }
});

// Approach Section - Horizontal Scroll Layout - Optimized
document.addEventListener('DOMContentLoaded', function () {
    const approachSlider = document.querySelector('.approach-slider');
    if (!approachSlider) return;

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

        // Responsive slide widths
        function updateLayout() {
            const width = window.innerWidth;
            const slides = wrapper.querySelectorAll('.swiper-slide');

            slides.forEach(slide => {
                slide.style.width = '';
                slide.style.marginLeft = '';
            });

            if (width >= 992) {
                wrapper.style.gap = '2rem';
                slides.forEach((slide, index) => {
                    slide.style.width = '372px';
                    slide.style.marginLeft = index === 0 ? '0' : '30px';
                });
            } else if (width >= 768) {
                wrapper.style.gap = '1.5rem';
            } else if (width >= 480) {
                wrapper.style.gap = '1rem';
            } else {
                wrapper.style.gap = '1.5rem';
            }
        }

        updateLayout();
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateLayout, 150);
        });

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
});

// Animate statistics on scroll - Optimized with Intersection Observer
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                const target = parseInt(statNumber.getAttribute('data-target'));
                animateNumber(statNumber, 0, target, 2000);
                statNumber.dataset.animated = 'true';
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Header scroll effect with active navigation highlighting - Optimized
let lastScroll = 0;
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

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

// Debounced scroll handler - Optimized
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
        const transparentSections = ['home', 'featured', 'slider'];
        const darkSections = ['statistics', 'cta'];
        const isTransparentSection = currentSection && transparentSections.includes(currentSection.id);
        const isDarkSection = currentSection && darkSections.includes(currentSection.id);

        // Reset all classes
        header.classList.remove('transparent-header', 'light-header', 'scrolled');

        if (isTransparentSection || (currentScroll < 100 && !currentSection)) {
            header.classList.add('transparent-header');
            if (currentScroll > 50) header.classList.add('scrolled');
        } else if (isDarkSection) {
            header.classList.add('transparent-header');
            header.classList.add('scrolled');
        } else {
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

// Scroll animations for sections - Optimized
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

// Initialize scroll animations
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

// Performance optimization: Disable parallax effect
// Parallax was causing performance issues and layout shifts
// Keeping this comment for future reference if needed

// Clients Ticker - seamless infinite scroll
document.addEventListener('DOMContentLoaded', function () {
    var rows = [
        { id: 'tickerRow1', dir: -1 },
        { id: 'tickerRow2', dir: -1 }
    ];
    var tickers = [];
    var globalPaused = false;

    rows.forEach(function (cfg) {
        var row = document.getElementById(cfg.id);
        if (!row) return;

        // Measure original items width (before cloning)
        var origItems = Array.from(row.children);
        var origWidth = 0;
        origItems.forEach(function (el) {
            origWidth += el.offsetWidth + 16; // 16 = gap
        });

        // Clone until we have at least 3x screen width
        var needed = window.innerWidth * 3;
        while (row.scrollWidth < needed) {
            origItems.forEach(function (el) {
                row.appendChild(el.cloneNode(true));
            });
        }

        tickers.push({ row: row, pos: 0, speed: cfg.dir * 0.7, origWidth: origWidth });
    });

    // Pause on hover
    document.querySelectorAll('.ticker-wrap').forEach(function (wrap, i) {
        wrap.addEventListener('mouseenter', function () { globalPaused = true; });
        wrap.addEventListener('mouseleave', function () { globalPaused = false; });
    });

    function animate() {
        if (!globalPaused) {
            tickers.forEach(function (t) {
                t.pos += t.speed;
                // Reset when moved one full set of originals
                if (t.pos <= -t.origWidth) t.pos += t.origWidth;
                if (t.pos >= 0 && t.speed > 0) t.pos -= t.origWidth;
                t.row.style.transform = 'translateX(' + t.pos + 'px)';
            });
        }
        requestAnimationFrame(animate);
    }

    if (tickers.length > 0) requestAnimationFrame(animate);
});
