// Header JavaScript - Shared across all pages
// Dynamically loads navbar.html and initializes all interactions

(function () {
    'use strict';

    const DEBUG_NAV = new URLSearchParams(window.location.search).has('debugNav');
    const log = (...args) => {
        if (DEBUG_NAV) console.log(...args);
    };
    const warn = (...args) => {
        if (DEBUG_NAV) console.warn(...args);
    };

    // Find placeholders
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

    // Support pages with a static navbar (e.g. index.html) that don't use dynamic loading.
    // Avoid double-initialization on pages that already loaded navbar.html.
    if (!navbarInitTriggered && document.getElementById('header')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
        } else {
            initNavbar();
        }
    }

    function loadSharedComponent(container, fileName, callback = null) {
        // Determine the path to shared folder
        const scripts = document.querySelectorAll('script[src*="header.js"]');
        let basePath = '../shared/';
        if (scripts.length > 0) {
            const src = scripts[0].getAttribute('src');
            basePath = src.substring(0, src.lastIndexOf('/') + 1);
        }

        fetch(basePath + fileName)
            .then(response => {
                log(`📡 Fetch response for ${fileName}:`, response.status, response.ok);
                if (!response.ok) throw new Error(`Failed to load ${fileName}: ${response.status}`);
                return response.text();
            })
            .then(html => {
                log(`📄 Received HTML for ${fileName}, length:`, html.length);
                
                if (fileName === 'navbar.html') {
                    // Replace header class placeholder
                    const headerClass = container.getAttribute('data-header-class') || '';
                    html = html.replace('{{HEADER_CLASS}}', headerClass);
                    log('🔄 Replaced header class:', headerClass);
                }

                // Insert the HTML properly using insertAdjacentHTML
                log('📦 HTML length:', html.length);
                log('📦 HTML contains mobileMenu:', html.includes('id="mobileMenu"'));
                log('📦 HTML contains menuToggle:', html.includes('id="menuToggle"'));
                log('📦 HTML contains <header:', html.includes('<header'));
                
                // FIXED: Replace placeholder with actual content
                const parent = container.parentNode;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Get the header element from temp div
                const headerElement = tempDiv.querySelector('#header');
                
                if (headerElement) {
                    // Insert header BEFORE placeholder
                    parent.insertBefore(headerElement, container);
                    // Remove placeholder
                    container.remove();
                    
                    log('📦 HTML inserted - header moved to parent level');
                    log('📦 Header element:', headerElement.tagName, headerElement.id);
                } else {
                    console.error('❌ No header element found in HTML!');
                }
                
                log('✅ HTML inserted into DOM');
                
                // Check immediately if elements exist at document level
                const immediateCheck = {
                    header: !!document.getElementById('header'),
                    menuToggle: !!document.getElementById('menuToggle'),
                    mobileMenu: !!document.getElementById('mobileMenu')
                };
                log('🔍 Immediate check (document level):', immediateCheck);

                // Use shorter timeout to check DOM
                setTimeout(() => {
                    log('⏰ Callback executing after delay...');
                    
                    const headerCheck = document.getElementById('header');
                    const toggleCheck = document.getElementById('menuToggle');
                    const menuCheck = document.getElementById('mobileMenu');
                    
                    log('🔍 Elements in DOM:', {
                        header: !!headerCheck,
                        menuToggle: !!toggleCheck,
                        mobileMenu: !!menuCheck,
                        mobileMenuViaQuery: !!document.querySelector('#mobileMenu'),
                        mobileMenuViaClass: !!document.querySelector('.mobile-menu')
                    });
                    
                    // If still not found, log the actual DOM structure
                    if (!headerCheck || !toggleCheck || !menuCheck) {
                        console.error('❌ Elements still not found after insertion!');
                        log('📋 Body children:', document.body.children.length);
                        log('📋 All elements with ID:');
                        document.querySelectorAll('[id]').forEach(el => {
                            log('  - ' + el.tagName + '#' + el.id);
                        });
                    }
                    
                    // Run callback if provided
                    if (callback) {
                        try {
                            callback();
                        } catch (e) {
                            console.error('Callback error:', e);
                        }
                    }

                    // Re-apply translations if LanguageManager exists
                    if (window.languageManager) {
                        try {
                            window.languageManager.refreshListeners();
                            window.languageManager.translatePage();
                        } catch (e) {
                            warn('LanguageManager refresh failed:', e);
                        }
                    }

                    // Dispatch custom event
                    document.dispatchEvent(new CustomEvent(`${fileName.split('.')[0]}Loaded`));
                }, 50);
            })
            .catch(err => {
                console.error(`${fileName} loading error:`, err);
            });
    }

    let initRetryCount = 0;
    const MAX_RETRIES = 10;

    function initNavbar() {
        log('🔧 Initializing navbar... v5 (attempt ' + (initRetryCount + 1) + ')');
        
        // Wait a bit more to ensure DOM is ready
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        log('📋 DOM Check:', {
            header: !!document.getElementById('header'),
            menuToggle: !!menuToggle,
            mobileMenu: !!mobileMenu,
            allDivs: document.querySelectorAll('div').length
        });
        
        // If elements not found, try again after a delay
        if (!menuToggle || !mobileMenu) {
            initRetryCount++;
            if (initRetryCount < MAX_RETRIES) {
                warn('⚠️ Elements not ready, retrying in 300ms... (attempt ' + initRetryCount + '/' + MAX_RETRIES + ')');
                setTimeout(initNavbar, 300);
                return;
            } else {
                console.error('❌ Failed to find elements after ' + MAX_RETRIES + ' attempts!');
                console.error('❌ This means navbar.html was not loaded or inserted correctly.');
                return;
            }
        }
        
        log('✅ Elements found! Proceeding with initialization...');
        
        // ─── Search Modal ───
        const searchToggle = document.getElementById('searchToggle');
        const searchModal = document.getElementById('searchModal');
        const searchClose = document.getElementById('searchClose');

        if (searchToggle && searchModal) {
            log('✅ Search elements found');
            searchToggle.addEventListener('click', () => {
                searchModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                const searchField = searchModal.querySelector('.search-field');
                if (searchField) {
                    setTimeout(() => searchField.focus(), 100);
                }
            });
        } else {
            warn('⚠️ Search elements not found');
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

        function closeSearchModal() {
            if (!searchModal) return;
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // ─── Mobile Menu ───
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileAboutBtn = document.getElementById('mobileAboutBtn');
        const mobileAboutMenu = document.getElementById('mobileAboutMenu');

        log('📱 Mobile menu elements:', {
            menuToggle: !!menuToggle,
            mobileMenu: !!mobileMenu,
            mobileMenuClose: !!mobileMenuClose,
            mobileAboutBtn: !!mobileAboutBtn
        });

        function closeMobileMenu() {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        function openMobileMenu() {
            if (!mobileMenu) return;
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        }

        // Attach click event to menu toggle
        log('✅ Attaching click event to menuToggle');
        menuToggle.addEventListener('click', (e) => {
            log('🎯 Menu toggle clicked!');
            e.preventDefault();
            e.stopPropagation();

            const isOpen = mobileMenu.classList.contains('active');
            if (isOpen) {
                closeMobileMenu();
                log('📂 Mobile menu closed');
            } else {
                openMobileMenu();
                log('📂 Mobile menu opened');
            }
        });

        // Handle window resize - close mobile menu on desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu) {
                closeMobileMenu();
            }
        });

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Close mobile menu when clicking the backdrop area
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) closeMobileMenu();
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

        // Close mobile menu when clicking a link
        if (mobileMenu) {
            const mobileLinks = mobileMenu.querySelectorAll('a.mobile-nav-link, a.mobile-submenu-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }

        // ─── Desktop Dropdown (touch-friendly) ───
        const desktopDropdownItem = document.querySelector('.nav-item.dropdown');
        const desktopDropdownToggle = desktopDropdownItem?.querySelector(':scope > .nav-link');
        if (desktopDropdownItem && desktopDropdownToggle) {
            desktopDropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                desktopDropdownItem.classList.toggle('open');
            });
        }

        // Global close handlers: click outside + Escape key
        document.addEventListener('click', (e) => {
            if (desktopDropdownItem && !desktopDropdownItem.contains(e.target)) {
                desktopDropdownItem.classList.remove('open');
            }
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                const clickedToggle = e.target === menuToggle || menuToggle.contains(e.target);
                const clickedInsideMenu = mobileMenu.contains(e.target);
                if (!clickedToggle && !clickedInsideMenu) closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            if (desktopDropdownItem) desktopDropdownItem.classList.remove('open');
            closeMobileMenu();
            closeSearchModal();
        });

        // ─── Active Navigation Highlighting ───
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-submenu-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace(/\.\.\//g, '').replace('./', ''))) {
                link.classList.add('active');
                // If it's a dropdown link, also activate parent
                const parentItem = link.closest('.nav-item');
                if (parentItem) {
                    const parentLink = parentItem.querySelector(':scope > .nav-link');
                    if (parentLink) parentLink.classList.add('active');
                }
            }
        });

        // ─── Header Scroll Effect ───
        const header = document.getElementById('header');

        if (header) {
            const onScroll = () => {
                if (window.pageYOffset > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            // Run once on init
            onScroll();
        }
        
        log('✅ Navbar initialization complete');
    }
})();
