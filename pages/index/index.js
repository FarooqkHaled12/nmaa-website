document.addEventListener('DOMContentLoaded', function () {
const belowFoldImages = document.querySelectorAll(
'.ticker-item img, .approach-image, .about-company-logo'
);
belowFoldImages.forEach(function (img) {
if (!img.hasAttribute('loading')) {
img.setAttribute('loading', 'lazy');
img.setAttribute('decoding', 'async');
}
});
});
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = this.getAttribute('href');
if (target && target !== '#') {
smoothScrollTo(target, 80);
}
});
});
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
heroVideo.play().catch(error => {
console.log('Video autoplay prevented:', error);
});
}
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
showSlide(0);
let slideInterval = setInterval(nextSlide, 5000);
function resetInterval() {
clearInterval(slideInterval);
slideInterval = setInterval(nextSlide, 5000);
}
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
document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowRight') {
nextSlide();
resetInterval();
} else if (e.key === 'ArrowLeft') {
prevSlide();
resetInterval();
}
});
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
document.addEventListener('DOMContentLoaded', function () {
const approachSlider = document.querySelector('.approach-slider');
if (!approachSlider) return;
const wrapper = approachSlider.querySelector('.swiper-wrapper');
const nextBtn = document.getElementById('approachNext');
const prevBtn = document.getElementById('approachPrev');
const scrollContainer = document.querySelector('.approach-scroll-container') || approachSlider;
if (wrapper) {
wrapper.style.display = 'flex';
wrapper.style.flexDirection = 'row';
wrapper.style.transform = 'none';
wrapper.style.width = 'auto';
wrapper.style.flexWrap = 'nowrap';
function updateLayout() {
const width = window.innerWidth;
const slides = wrapper.querySelectorAll('.swiper-slide');
slides.forEach(slide => {
slide.style.width = '';
slide.style.marginLeft = '';
});
if (width >= 992) {
wrapper.style.gap = '1.5rem';
slides.forEach((slide, index) => {
slide.style.width = '300px';
slide.style.marginLeft = index === 0 ? '0' : '0';
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
requestAnimationFrame(() => {
scrollContainer.scrollLeft = scrollContainer.scrollWidth;
});
let resizeTimeout;
window.addEventListener('resize', () => {
clearTimeout(resizeTimeout);
resizeTimeout = setTimeout(updateLayout, 150);
});
const scrollAmount = 400;
if (nextBtn) {
nextBtn.addEventListener('click', () => {
scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
}
if (prevBtn) {
prevBtn.addEventListener('click', () => {
scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
}
}
});
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
let currentSection = null;
sections.forEach(section => {
const sectionTop = section.offsetTop - headerHeight - 100;
const sectionHeight = section.offsetHeight;
if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
currentSection = section;
}
});
if (header) {
const transparentSections = ['home', 'featured', 'slider'];
const darkSections = ['statistics', 'cta'];
const isTransparentSection = currentSection && transparentSections.includes(currentSection.id);
const isDarkSection = currentSection && darkSections.includes(currentSection.id);
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
updateActiveNav();
lastScroll = currentScroll;
}
if (header && window.pageYOffset < 100) {
header.classList.add('transparent-header');
}
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
(function () {
var configs = [
{ id: 'tickerRow1', dir: -1 },
{ id: 'tickerRow2', dir:  1 }
];
var tickers = [];
var paused = false;
function setupRow(cfg) {
var row = document.getElementById(cfg.id);
if (!row) return;
var origItems = Array.from(row.children);
var needed = window.innerWidth * 4;
while (row.scrollWidth < needed) {
origItems.forEach(function (el) {
row.appendChild(el.cloneNode(true));
});
}
function getOrigWidth() {
var w = 0;
origItems.forEach(function (el) {
w += el.getBoundingClientRect().width + 16;
});
return w || (origItems.length * 196); // fallback: 180px + 16px gap
}
var origWidth = getOrigWidth();
var startPos  = cfg.dir > 0 ? -(origWidth / 2) : 0;
var ticker = { row: row, pos: startPos, speed: cfg.dir * 0.6, origWidth: origWidth };
tickers.push(ticker);
window.addEventListener('load', function () {
ticker.origWidth = getOrigWidth();
});
}
function startPauseListeners() {
document.querySelectorAll('.ticker-wrap').forEach(function (wrap) {
wrap.addEventListener('mouseenter',  function () { paused = true;  });
wrap.addEventListener('mouseleave',  function () { paused = false; });
wrap.addEventListener('touchstart',  function () { paused = true;  }, { passive: true });
wrap.addEventListener('touchend',    function () { paused = false; }, { passive: true });
wrap.addEventListener('touchcancel', function () { paused = false; }, { passive: true });
});
}
function tick() {
if (!paused) {
tickers.forEach(function (t) {
t.pos += t.speed;
if (t.pos <= -t.origWidth) t.pos += t.origWidth;
if (t.pos >= 0)            t.pos -= t.origWidth;
t.row.style.transform = 'translateX(' + t.pos + 'px)';
});
}
requestAnimationFrame(tick);
}
document.addEventListener('DOMContentLoaded', function () {
configs.forEach(setupRow);
startPauseListeners();
requestAnimationFrame(tick); // single loop, starts immediately
});
}());