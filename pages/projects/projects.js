document.addEventListener('DOMContentLoaded', () => {
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentFilter = 'all';
let visibleProjects = 12;
const projectsPerLoad = 6;
filterButtons.forEach(button => {
button.addEventListener('click', () => {
filterButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
currentFilter = button.getAttribute('data-filter');
filterProjects(currentFilter);
});
});
function filterProjects(filter) {
let visibleCount = 0;
projectCards.forEach((card, index) => {
const category = card.getAttribute('data-category');
if (filter === 'all' || category === filter) {
card.classList.remove('hidden');
card.style.display = '';
if (visibleCount < visibleProjects) {
card.style.opacity = '1';
card.style.transform = 'scale(1)';
} else {
card.style.opacity = '0';
card.style.transform = 'scale(0.95)';
}
visibleCount++;
} else {
card.classList.add('hidden');
card.style.display = 'none';
}
});
const totalVisible = Array.from(projectCards).filter(card => {
const category = card.getAttribute('data-category');
return (filter === 'all' || category === filter) && !card.classList.contains('hidden');
}).length;
if (loadMoreBtn) {
if (visibleCount >= totalVisible) {
loadMoreBtn.style.display = 'none';
} else {
loadMoreBtn.style.display = 'inline-block';
}
}
}
if (loadMoreBtn) {
loadMoreBtn.addEventListener('click', () => {
visibleProjects += projectsPerLoad;
filterProjects(currentFilter);
setTimeout(() => {
const firstHidden = Array.from(projectCards).find(card => {
return !card.classList.contains('hidden') &&
card.style.opacity === '0';
});
if (firstHidden) {
firstHidden.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
}, 100);
});
}
filterProjects('all');
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};
const scrollObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fade-in-visible');
if (entry.target.classList.contains('project-card') && !entry.target.classList.contains('hidden')) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
scrollObserver.unobserve(entry.target);
}
});
}, observerOptions);
const sections = document.querySelectorAll('.projects-hero, .projects-filter-section, .projects-grid-section');
sections.forEach(section => {
if (section.classList.contains('fade-in-section')) {
scrollObserver.observe(section);
}
});
projectCards.forEach((card, index) => {
if (!card.classList.contains('hidden')) {
card.style.opacity = '0';
card.style.transform = 'translateY(30px)';
card.style.transition = `opacity 0.6s ease ${index * 0.03}s, transform 0.6s ease ${index * 0.03}s`;
scrollObserver.observe(card);
}
});
});
document.querySelectorAll('.project-image-wrapper').forEach(wrapper => {
const imgs = wrapper.querySelectorAll('.project-image');
if (imgs.length <= 1) return;
let current = imgs.length - 1;
imgs.forEach((img, i) => {
img.style.position = 'absolute';
img.style.top = '0'; img.style.left = '0';
img.style.width = '100%'; img.style.height = '100%';
img.style.objectFit = 'cover';
img.style.transition = 'opacity 0.8s ease';
img.style.opacity = (i === current) ? '1' : '0';
img.style.display = '';
});
wrapper.style.position = 'relative';
function goTo(n) {
imgs[current].style.opacity = '0';
current = (n + imgs.length) % imgs.length;
imgs[current].style.opacity = '1';
}
let timer = setInterval(() => goTo(current + 1), 3000);
const prev = document.createElement('button');
prev.className = 'img-arrow prev';
prev.innerHTML = '&#10094;';
prev.addEventListener('click', e => { e.preventDefault(); clearInterval(timer); goTo(current - 1); timer = setInterval(() => goTo(current + 1), 3000); });
const next = document.createElement('button');
next.className = 'img-arrow next';
next.innerHTML = '&#10095;';
next.addEventListener('click', e => { e.preventDefault(); clearInterval(timer); goTo(current + 1); timer = setInterval(() => goTo(current + 1), 3000); });
wrapper.appendChild(prev);
wrapper.appendChild(next);
});