// About Page - Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));

    // Staggered animation for value cards
    document.querySelectorAll('.value-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
    });
});
