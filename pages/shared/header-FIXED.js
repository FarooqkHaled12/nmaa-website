// Header JavaScript - COMPLETELY REWRITTEN FOR RELIABILITY
// Version: FINAL FIX

(function () {
    'use strict';

    console.log('🚀 header.js loading...');

    // Find placeholders
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navbarPlaceholder) {
        console.log('✅ Found navbar placeholder');
        loadNavbar(navbarPlaceholder);
    } else {
        console.error('❌ No navbar placeholder found!');
    }

    if (footerPlaceholder) {
        loadFooter(footerPlaceholder);
    }

    function loadNavbar(placeholder) {
        // Determine path to shared folder
        const scripts = document.querySelectorAll('script[src*="header"]');
        let basePath = '../shared/';
        if (scripts.length > 0) {
            const src = scripts[0].getAttribute('src');
            basePath = src.substring(0, src.lastIndexOf('/') + 1);
        }

        const navbarPath = basePath + 'navbar.html';
        console.log('📡 Fetching:', navbarPath);

        fetch(navbarPath)
            .then(response => {
                console.log('📡 Response:', response.status, response.ok);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                console.log('📄 HTML received, length:', html.length);

                // Replace header class placeholder
                const headerClass = placeholder.getAttribute('data-header-class') || '';
                html = html.replace('{{HEADER_CLASS}}', headerClass);
                console.log('🔄 Header class:', headerClass);

                // Insert HTML - SIMPLE AND DIRECT
                const parent = placeholder.parentNode;
                const temp = document.createElement('div');
                temp.innerHTML = html;

                // Get header element
                const header = temp.querySelector('header');
                if (!header) {
                    throw new Error('No <header> element in navbar.html');
                }

                // Insert header into DOM at parent level
                parent.insertBefore(header, placeholder);
                placeholder.remove();

                console.log('✅ Header inserted into DOM');

                // IMMEDIATE verification
                const verify = {
                    header: !!document.getElementById('header'),
                    menuToggle: !!document.getElementById('menuToggle'),
                    mobileMenu: !!document.getElementById('mobileMenu')
                };
                console.log('🔍 Verification:', verify);

                if (!verify.header || !verify.menuToggle || !verify.mobileMenu) {
                    console.error('❌ Elements missing after insertion!');
                    console.log('📋 All IDs in document:');
                    document.querySelectorAll('[id]').forEach(el => {
                        console.log('  -', el.tagName + '#' + el.id);
                    });
                    return;
                }

                // Initialize navbar immediately
                initNavbar();

                // Fire event for other scripts
                document.dispatchEvent(new CustomEvent('navbarLoaded'));
                console.log('🎉 navbarLoaded event fired');
            })
            .catch(error => {
                console.error('❌ Navbar loading failed:', error);
            });
    }

    function loadFooter(placeholder) {
        // Similar logic for footer (not critical for mobile menu)
        console.log('Footer loading skipped for now');
    }

    function initNavbar() {
        console.log('🔧 Initializing navbar...');

        // Get elements
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const searchToggle = document.getElementById('searchToggle');
        const searchModal = document.getElementById('searchModal');
        const searchClose = document.getElementById('searchClose');
        const header = document.getElementById('header');

        console.log('📋 Elements:', {
            menuToggle: !!menuToggle,
            mobileMenu: !!mobileMenu,
            mobileMenuClose: !!mobileMenuClose,
            searchToggle: !!searchToggle,
            searchModal: !!searchModal,
            header: !!header
        });

        // CRITICAL: Check if mobile menu elements exist
        if (!menuToggle || !mobileMenu) {
            console.error('❌ CRITICAL: Mobile menu elements not found!');
            return;
        }

        // ─── Mobile Menu Toggle ───
        console.log('✅ Attaching mobile menu event listeners');

        menuToggle.addEventListener('click', function(e) {
            console.log('🎯 Menu toggle clicked!');
            e.preventDefault();
            e.stopPropagation();

            const isOpen = mobileMenu.classList.contains('active');

            if (isOpen) {
                // Close menu
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                console.log('📂 Menu closed');
            } else {
                // Open menu
                mobileMenu.classList.add('active');
                menuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.top = `-${window.scrollY}px`;
                console.log('📂 Menu opened');
            }
        });

        // Close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                console.log('🎯 Close button clicked');
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
            });
        }

        // Close on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close when clicking menu links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // ─── Search Modal ───
        if (searchToggle && searchModal) {
            searchToggle.addEventListener('click', function() {
                searchModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (searchClose && searchModal) {
            searchClose.addEventListener('click', function() {
                searchModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        if (searchModal) {
            searchModal.addEventListener('click', function(e) {
                if (e.target === searchModal) {
                    searchModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // ─── Header Scroll Effect ───
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }, { passive: true });
        }

        console.log('✅ Navbar initialization complete!');
    }

})();
