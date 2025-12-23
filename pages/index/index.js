// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
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

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

