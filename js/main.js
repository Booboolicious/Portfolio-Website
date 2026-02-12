document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.md\\:hidden');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            console.log('Mobile menu clicked');
            // Add mobile menu logic here
        });
    }

    // Scroll Header Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('glass-scrolled');
        } else {
            nav.classList.remove('glass-scrolled');
        }
    });

    // Dark Mode Toggle (if needed)
    // The current implementation uses the 'dark' class on <html>
});
