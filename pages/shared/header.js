(function () {
'use strict';
const navbarPlaceholder = document.getElementById('navbar-placeholder');
const footerPlaceholder = document.getElementById('footer-placeholder');
let navbarInitTriggered = false;
if (navbarPlaceholder) {
navbarInitTriggered = true;
loadSharedComponent(navbarPlaceholder, 'navbar.html', initNavbar);
}
if (footerPlaceholder) {
loadSharedComponent(footerPlaceholder, 'footer.html');
}
if (!navbarInitTriggered && document.getElementById('header')) {
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
} else {
initNavbar();
}
}
function loadSharedComponent(container, fileName, callback) {
const scriptEl = document.querySelector('script[src*="header.js"]');
const basePath = scriptEl
? scriptEl.getAttribute('src').replace(/[^/]+$/, '')
: '../shared/';
fetch(basePath + fileName)
.then(function (response) {
if (!response.ok) throw new Error('Failed to load ' + fileName + ': ' + response.status);
return response.text();
})
.then(function (html) {
if (fileName === 'navbar.html') {
var headerClass = container.getAttribute('data-header-class') || '';
html = html.replace('{{HEADER_CLASS}}', headerClass);
var pathname = window.location.pathname.replace(/\\/g, '/');
var parts = pathname.split('/').filter(function(p) { return p.length > 0; });
parts.pop();
var rootPath = parts.length > 0 ? parts.map(function() { return '../'; }).join('') : '';
html = html.replace(/\{\{ROOT_PATH\}\}/g, rootPath);
}
var parent = container.parentNode;
var fragment = document.createDocumentFragment();
var tempDiv = document.createElement('div');
tempDiv.innerHTML = html;
var headerElement = tempDiv.querySelector('#header');
if (headerElement) {
fragment.appendChild(headerElement);
} else {
while (tempDiv.firstChild) {
fragment.appendChild(tempDiv.firstChild);
}
}
parent.insertBefore(fragment, container);
container.remove();
setTimeout(function () {
if (callback) {
try { callback(); } catch (e) { console.error('Header init error:', e); }
}
if (window.languageManager) {
try {
window.languageManager.refreshListeners();
window.languageManager.translatePage();
} catch (e) {  }
}
document.dispatchEvent(new CustomEvent(fileName.split('.')[0] + 'Loaded'));
}, 50);
})
.catch(function (err) {
console.error(fileName + ' loading error:', err);
});
}
var initRetryCount = 0;
var MAX_RETRIES = 10;
function initNavbar() {
var menuToggle = document.getElementById('menuToggle');
var mobileMenu = document.getElementById('mobileMenu');
if (!menuToggle || !mobileMenu) {
if (++initRetryCount < MAX_RETRIES) {
setTimeout(initNavbar, 300);
} else {
console.error('Header: failed to find navbar elements after ' + MAX_RETRIES + ' attempts.');
}
return;
}
var searchToggle = document.getElementById('searchToggle');
var searchModal  = document.getElementById('searchModal');
var searchClose  = document.getElementById('searchClose');
function openSearchModal() {
if (!searchModal) return;
searchModal.classList.add('active');
document.body.style.overflow = 'hidden';
var field = searchModal.querySelector('.search-field');
if (field) setTimeout(function () { field.focus(); }, 100);
}
function closeSearchModal() {
if (!searchModal) return;
searchModal.classList.remove('active');
document.body.style.overflow = '';
}
if (searchToggle) searchToggle.addEventListener('click', openSearchModal);
if (searchClose)  searchClose.addEventListener('click', closeSearchModal);
if (searchModal)  searchModal.addEventListener('click', function (e) {
if (e.target === searchModal) closeSearchModal();
});
var mobileMenuClose = document.getElementById('mobileMenuClose');
var mobileAboutBtn  = document.getElementById('mobileAboutBtn');
var mobileAboutMenu = document.getElementById('mobileAboutMenu');
function openMobileMenu() {
mobileMenu.classList.add('active');
menuToggle.classList.add('active');
document.body.style.overflow  = 'hidden';
document.body.style.position  = 'fixed';
document.body.style.width     = '100%';
document.body.style.top       = '-' + window.scrollY + 'px';
}
function closeMobileMenu() {
var scrollY = document.body.style.top;
mobileMenu.classList.remove('active');
menuToggle.classList.remove('active');
document.body.style.overflow  = '';
document.body.style.position  = '';
document.body.style.width     = '';
document.body.style.top       = '';
if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
}
menuToggle.addEventListener('click', function (e) {
e.preventDefault();
e.stopPropagation();
mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
});
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenu) {
mobileMenu.addEventListener('click', function (e) {
if (e.target === mobileMenu) closeMobileMenu();
});
mobileMenu.addEventListener('click', function (e) {
if (e.target.matches('a.mobile-nav-link, a.mobile-submenu-link')) {
closeMobileMenu();
}
});
}
if (mobileAboutBtn && mobileAboutMenu) {
var mobileNavItem = mobileAboutBtn.closest('.mobile-nav-item');
mobileAboutBtn.addEventListener('click', function (e) {
e.preventDefault();
mobileAboutMenu.classList.toggle('active');
if (mobileNavItem) mobileNavItem.classList.toggle('active');
});
}
window.addEventListener('resize', function () {
if (window.innerWidth > 768) closeMobileMenu();
}, { passive: true });
var desktopDropdownItem   = document.querySelector('.nav-item.dropdown');
var desktopDropdownToggle = desktopDropdownItem && desktopDropdownItem.querySelector(':scope > .nav-link');
if (desktopDropdownItem && desktopDropdownToggle) {
desktopDropdownToggle.addEventListener('click', function (e) {
e.preventDefault();
e.stopPropagation();
desktopDropdownItem.classList.toggle('open');
});
}
document.addEventListener('click', function (e) {
if (desktopDropdownItem && !desktopDropdownItem.contains(e.target)) {
desktopDropdownItem.classList.remove('open');
}
if (mobileMenu && mobileMenu.classList.contains('active')) {
var clickedToggle = e.target === menuToggle || menuToggle.contains(e.target);
if (!clickedToggle && !mobileMenu.contains(e.target)) closeMobileMenu();
}
});
document.addEventListener('keydown', function (e) {
if (e.key !== 'Escape') return;
if (desktopDropdownItem) desktopDropdownItem.classList.remove('open');
closeMobileMenu();
closeSearchModal();
});
var currentPath = window.location.pathname;
var navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-submenu-link');
for (var i = 0; i < navLinks.length; i++) {
var link = navLinks[i];
var href = link.getAttribute('href');
if (href && currentPath.includes(href.replace(/\.\.\//g, '').replace('./', ''))) {
link.classList.add('active');
var parentItem = link.closest('.nav-item');
if (parentItem) {
var parentLink = parentItem.querySelector(':scope > .nav-link');
if (parentLink) parentLink.classList.add('active');
}
}
}
var header = document.getElementById('header');
if (header) {
var ticking = false;
function onScroll() {
if (!ticking) {
requestAnimationFrame(function() {
header.classList.toggle('scrolled', window.pageYOffset > 50);
ticking = false;
});
ticking = true;
}
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // apply on init
}
}
})();