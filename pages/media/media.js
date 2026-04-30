// Media Page JavaScript - Nmaa Almudun

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const loadMoreBtn = document.getElementById('loadMoreNews');

    // Filtering Logic
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter Cards
            newsCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Animation
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

            // Re-check featured layout if needed
            // (In this CSS, 'featured' grid-column is static, but we could update it dynamically)
        });
    });

    // Newsletter Form Submission (Mockup)
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

    // Load More Mockup
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerText = 'جاري التحميل...';
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
                // In a real app, you would append new items here
            }, 1000);
        });
    }

    // Scroll Fade-in Animation
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
