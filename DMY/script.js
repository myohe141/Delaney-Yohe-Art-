document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle with Corrected Line References
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
            
            // Corrected: Reference specific items in the bars NodeList
            const bars = menuToggle.querySelectorAll('.bar');
            if (bars.length === 3) {
                if (menuToggle.classList.contains('open')) {
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });
    }

    // 2. Robust Portfolio Gallery Categorical Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    // Reset entry animation on filter click
                    item.style.animation = 'none';
                    item.offsetHeight; // Forces DOM reflow to re-trigger transition
                    item.style.animation = '';

                    // Evaluate category matching
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // 3. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxYear = document.getElementById('lightbox-year');
    const lightboxDims = document.getElementById('lightbox-dims');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (lightbox && portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.getAttribute('data-title');
                const desc = item.getAttribute('data-desc');
                const year = item.getAttribute('data-year');
                const dims = item.getAttribute('data-dims');

                lightboxImg.src = img.src;
                lightboxTitle.textContent = title;
                lightboxDesc.textContent = desc;
                lightboxYear.textContent = `Year: ${year}`;
                lightboxDims.textContent = `Dimensions: ${dims}`;

                lightbox.classList.add('show');
            });
        });

        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                lightbox.classList.remove('show');
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                lightbox.classList.remove('show');
            }
        });
    }
});