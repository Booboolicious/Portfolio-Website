document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.md\\:hidden');
    const navMenu = document.querySelector('.md\\:flex');

    // Create mobile menu container if it doesn't exist (since original HTML hides md:flex on mobile)
    let mobileNavOverlay;

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isMenuOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';

            if (!mobileNavOverlay) {
                // Build mobile menu dynamically based on desktop links
                mobileNavOverlay = document.createElement('div');
                mobileNavOverlay.className = 'fixed inset-0 z-40 bg-background-dark/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 transition-opacity duration-300 opacity-0 pointer-events-none';
                mobileNavOverlay.innerHTML = `
                    <div class="flex flex-col items-center space-y-6 text-xl font-medium">
                        ${Array.from(document.querySelectorAll('nav .hidden.md\\:flex a')).map(link =>
                    `<a href="${link.getAttribute('href')}" class="text-slate-300 hover:text-primary transition-colors">${link.innerText}</a>`
                ).join('')}
                    </div>
                    <button class="absolute top-6 right-6 text-slate-400 hover:text-white">
                        <span class="material-icons text-3xl">close</span>
                    </button>
                `;
                document.body.appendChild(mobileNavOverlay);

                // Close button logic
                mobileNavOverlay.querySelector('button').addEventListener('click', () => {
                    closeMobileMenu();
                });

                // Close on link click
                mobileNavOverlay.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', closeMobileMenu);
                });
            }

            if (isMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('opacity-0', 'pointer-events-none');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    // 2. Glass Header Scroll Effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('shadow-lg', 'bg-opacity-90', 'backdrop-blur-lg');
                nav.classList.remove('glass'); // Remove default glass if needed or enhance it
                nav.style.background = 'rgba(16, 22, 34, 0.9)'; // Darker on scroll for readability
            } else {
                nav.classList.remove('shadow-lg', 'bg-opacity-90', 'backdrop-blur-lg');
                nav.classList.add('glass');
                nav.style.background = ''; // Revert to CSS default
            }
        });
    }

    // 3. Smooth Reveal on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > div').forEach(section => {
        section.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(section);
    });

    // Add necessary CSS class for clean JS-based animation if not present
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .animate-fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

