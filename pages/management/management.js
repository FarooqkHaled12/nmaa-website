const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -100px 0px'
};
const scrollObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fade-in-visible');
}
});
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
const sections = document.querySelectorAll('.leadership-section, .chairman-section, .executive-section');
sections.forEach(section => {
section.classList.add('fade-in-section', 'fade-in-visible');
scrollObserver.observe(section);
});
const executiveCards = document.querySelectorAll('.executive-card');
executiveCards.forEach((card, index) => {
card.style.opacity = '0';
card.style.transform = 'translateY(30px)';
card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
const cardObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
cardObserver.unobserve(entry.target);
}
});
}, observerOptions);
cardObserver.observe(card);
});
});