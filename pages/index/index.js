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
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

// Initialize slider
if (slides.length > 0) {
    showSlide(0);
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Button events
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
}

// Approach Slider Functionality
let currentApproachSlide = 0;
const approachSlides = document.querySelectorAll('.approach-slide');
const approachDots = document.querySelectorAll('.approach-dot');
const approachPrevBtn = document.querySelector('.approach-prev');
const approachNextBtn = document.querySelector('.approach-next');
const approachTrack = document.querySelector('.approach-slider-track');
const totalApproachSlides = approachSlides.length;

function showApproachSlide(index) {
    // Remove active class from all slides and dots
    approachSlides.forEach(slide => slide.classList.remove('active'));
    approachDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (approachSlides[index]) {
        approachSlides[index].classList.add('active');
    }
    if (approachDots[index]) {
        approachDots[index].classList.add('active');
    }
    
    // Move track
    if (approachTrack) {
        approachTrack.style.transform = `translateX(-${index * 100}%)`;
    }
    
    currentApproachSlide = index;
}

function nextApproachSlide() {
    const next = (currentApproachSlide + 1) % totalApproachSlides;
    showApproachSlide(next);
}

function prevApproachSlide() {
    const prev = (currentApproachSlide - 1 + totalApproachSlides) % totalApproachSlides;
    showApproachSlide(prev);
}

// Initialize approach slider
if (approachSlides.length > 0) {
    showApproachSlide(0);
    
    // Auto slide every 6 seconds
    setInterval(nextApproachSlide, 6000);
    
    // Button events
    if (approachNextBtn) {
        approachNextBtn.addEventListener('click', nextApproachSlide);
    }
    
    if (approachPrevBtn) {
        approachPrevBtn.addEventListener('click', prevApproachSlide);
    }
    
    // Dot events
    approachDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showApproachSlide(index));
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    approachTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    approachTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextApproachSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevApproachSlide();
        }
    }
}

// Search Toggle
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');

if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        const searchInput = searchOverlay.querySelector('.search-input');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
    });
}

if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileAboutToggle = document.getElementById('mobileAboutToggle');
const mobileAboutSubmenu = document.getElementById('mobileAboutSubmenu');

if (menuToggle && mobileMenuOverlay) {
    menuToggle.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileMenuClose && mobileMenuOverlay) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (mobileAboutToggle && mobileAboutSubmenu) {
    mobileAboutToggle.addEventListener('click', () => {
        mobileAboutSubmenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (mobileMenuOverlay) {
    const mobileLinks = mobileMenuOverlay.querySelectorAll('.mobile-menu-link, .mobile-submenu-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

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
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link, .nav-menu-desktop a');

// All sections with IDs
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
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

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Header shadow effect
    if (currentScroll > 100) {
        if (header) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        }
    } else {
        if (header) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'var(--color-white)';
            header.style.backdropFilter = 'none';
        }
    }
    
    // Update active navigation
    updateActiveNav();
    
    lastScroll = currentScroll;
});

// Scroll animations for sections
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            
            // Animate children elements with stagger
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animated');
                }, index * 100);
            });
        }
    });
}, scrollObserverOptions);

// Observe all sections
sections.forEach(section => {
    section.classList.add('fade-in-section');
    scrollObserver.observe(section);
});

// Parallax effect for hero sections
function parallaxScroll() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', parallaxScroll);

