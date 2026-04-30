document.addEventListener('DOMContentLoaded', () => {
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
if (contactForm) {
contactForm.addEventListener('submit', async (e) => {
e.preventDefault();
submitBtn.classList.add('loading');
submitBtn.disabled = true;
await new Promise(resolve => setTimeout(resolve, 1500));
contactForm.style.display = 'none';
formSuccess.classList.add('show');
formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
}
const observerOptions = {
threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('is-visible');
}
});
}, observerOptions);
document.querySelectorAll('.animate-on-scroll').forEach(el => {
observer.observe(el);
});
});
function resetForm() {
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
contactForm.reset();
contactForm.style.display = 'block';
formSuccess.classList.remove('show');
submitBtn.classList.remove('loading');
submitBtn.disabled = false;
}