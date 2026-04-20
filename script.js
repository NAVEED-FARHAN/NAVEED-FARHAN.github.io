document.addEventListener('DOMContentLoaded', () => {
    // Maintenance Overlay Logic
    const overlay = document.getElementById('maintenance-overlay');
    const bg = document.querySelector('.fixed-background');
    
    // Dismiss on click ANYWHERE on the overlay
    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scroll if it was locked
        
        // Trigger initial reveal
        setTimeout(revealOnScroll, 300);
    });

    // Background Dimming & Navbar Logic
    const nav = document.getElementById('main-nav');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Background Dimming (becomes faint as we scroll)
        // Starts at 0.3 opacity (css) and goes lower
        const opacity = Math.max(0.05, 0.3 - (scrolled / 1000));
        bg.style.opacity = opacity;

        // Navbar appearance
        if (scrolled > 50) {
            nav.style.background = 'rgba(7, 7, 10, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            nav.style.padding = '10px 5%';
        } else {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.padding = '15px 5%';
        }

        revealOnScroll();
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const viewportHeight = window.innerHeight;
        const revealPoint = 120;
        
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < viewportHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Console branding
    console.log("%c NF. Portfolio Refined ", "background: #556b2f; color: #fff; font-size: 18px; font-weight: bold; padding: 10px; border-radius: 5px;");
});
