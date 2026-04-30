document.addEventListener('DOMContentLoaded', () => {
const filterButtons = document.querySelectorAll('.filter-btn');
const newsCards = document.querySelectorAll('.news-card');
const loadMoreBtn = document.getElementById('loadMoreNews');
filterButtons.forEach(button => {
button.addEventListener('click', () => {
filterButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
const filterValue = button.getAttribute('data-filter');
newsCards.forEach(card => {
const category = card.getAttribute('data-category');
if (filterValue === 'all' || category === filterValue) {
card.style.display = 'flex';
card.style.opacity = '0';
card.style.transform = 'translateY(20px)';
setTimeout(() => {
card.style.opacity = '1';
card.style.transform = 'translateY(0)';
}, 50);
} else {
card.style.display = 'none';
}
});
});
});
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
newsletterForm.addEventListener('submit', (e) => {
e.preventDefault();
const email = newsletterForm.querySelector('input').value;
if (email) {
alert('شكراً لثقتكم. تم تسجيل بريدكم بنجاح في نشرتنا الإخبارية.');
newsletterForm.reset();
}
});
}
if (loadMoreBtn) {
loadMoreBtn.addEventListener('click', () => {
loadMoreBtn.innerText = 'جاري التحميل...';
setTimeout(() => {
loadMoreBtn.style.display = 'none';
}, 1000);
});
}
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};
const scrollObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fade-in-visible');
scrollObserver.unobserve(entry.target);
}
});
}, observerOptions);
newsCards.forEach(card => {
card.style.transition = 'all 0.8s ease-out';
scrollObserver.observe(card);
});
});