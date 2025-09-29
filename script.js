document.addEventListener('DOMContentLoaded', function () {
    
    // Function to handle the overlay menu for mobile devices
    const initializeOverlayMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navOverlay = document.getElementById('nav-overlay');
        const closeBtn = document.querySelector('.close-btn');
        
        if (menuToggle && navOverlay && closeBtn) {
            menuToggle.addEventListener('click', () => { navOverlay.style.width = '100%'; });
            closeBtn.addEventListener('click', () => { navOverlay.style.width = '0'; });
        }

        // Handle dropdowns within the overlay (on click)
        const dropdownBtns = document.querySelectorAll('.dropbtn-overlay');
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const dropdownContent = btn.nextElementSibling;
                document.querySelectorAll('.dropdown-content-overlay').forEach(content => {
                    if (content !== dropdownContent) content.classList.remove('show');
                });
                dropdownContent.classList.toggle('show');
            });
        });

        // Close overlay when a main link is clicked
        const overlayLinks = document.querySelectorAll('.nav-links-overlay > li > a:not(.dropbtn-overlay)');
        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(navOverlay) navOverlay.style.width = '0';
            });
        });
    };

    // Function to hide header on scroll down, show on scroll up
    const initializeScrollEffect = () => {
        let lastScrollTop = 0;
        const header = document.querySelector('.site-header');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Add 'scrolled' for shrinking effect
            document.body.classList.toggle('scrolled', currentScroll > 50);

            if (currentScroll > lastScrollTop) {
                // scrolling down
                header.classList.add('hide');
            } else {
                // scrolling up
                header.classList.remove('hide');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    };

    // Main function to load templates and then initialize scripts
    const loadTemplatesAndInit = async () => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        try {
            if (headerPlaceholder) {
                const headerResponse = await fetch('header.html');
                if (headerResponse.ok) {
                    headerPlaceholder.innerHTML = await headerResponse.text();
                }
            }
            if (footerPlaceholder) {
                const footerResponse = await fetch('footer.html');
                if (footerResponse.ok) {
                    footerPlaceholder.innerHTML = await footerResponse.text();
                }
            }
            // Initialize functionalities after templates are loaded
            initializeOverlayMenu();
            initializeScrollEffect();
        } catch (error) {
            console.error('Error loading templates:', error);
        }
    };

    loadTemplatesAndInit();
});
