// Simple Mobile Menu Handler - NO DYNAMIC LOADING
// Just handles the menu toggle functionality

(function() {
    'use strict';
    
    console.log('🚀 Mobile menu script loading...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('🔧 Initializing mobile menu...');
        
        // Get elements
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const header = document.getElementById('header');
        
        console.log('📋 Elements found:', {
            menuToggle: !!menuToggle,
            mobileMenu: !!mobileMenu,
            mobileMenuClose: !!mobileMenuClose,
            header: !!header
        });
        
        if (!menuToggle || !mobileMenu) {
            console.error('❌ Mobile menu elements not found!');
            return;
        }
        
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            console.log('🎯 Menu toggle clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                console.log('🎯 Close button clicked');
                closeMenu();
            });
        }
        
        // Close on resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close when clicking links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        // Header scroll effect
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }, { passive: true });
        }
        
        function openMenu() {
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
            console.log('📂 Menu opened');
        }
        
        function closeMenu() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
            console.log('📂 Menu closed');
        }
        
        console.log('✅ Mobile menu initialized successfully!');
    }
    
})();
