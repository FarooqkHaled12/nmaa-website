// Header JavaScript - Shared across all pages

document.addEventListener('DOMContentLoaded', () => {
    // Search Modal
    const searchToggle = document.getElementById('searchToggle');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('searchClose');

    if (searchToggle && searchModal) {
        searchToggle.addEventListener('click', () => {
            searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            const searchField = searchModal.querySelector('.search-field');
            if (searchField) {
                setTimeout(() => searchField.focus(), 100);
            }
        });
    }

    if (searchClose && searchModal) {
        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileAboutBtn = document.getElementById('mobileAboutBtn');
    const mobileAboutMenu = document.getElementById('mobileAboutMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            // Restore body scroll
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        });
    }

    if (mobileAboutBtn && mobileAboutMenu) {
        const mobileNavItem = mobileAboutBtn.closest('.mobile-nav-item');
        mobileAboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileAboutMenu.classList.toggle('active');
            if (mobileNavItem) {
                mobileNavItem.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-submenu-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                // Restore body scroll
                const scrollY = document.body.style.top;
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            });
        });
    }

    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
});
