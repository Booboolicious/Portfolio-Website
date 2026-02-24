// Tailwind Configuration
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
}

document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Main Application JavaScript
// Add any global functions and utilities here

// Theme Toggle (if needed)
function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else if (savedTheme === 'dark' || prefersDark) {
    document.documentElement.classList.add('dark');
  }
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton || !mobileMenu) return;
  
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    // Change icon if needed
    const icon = menuButton.querySelector('.material-icons');
    if (icon) {
      icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
    }
  });
}

// Set active nav link based on current page
// function setActiveNavLink() {
//   const currentPath = window.location.pathname;
//   const navLinks = document.querySelectorAll('a[href*=".html"]');
  
//   navLinks.forEach(link => {
//     link.classList.remove('active', 'text-primary', 'border-b-2', 'border-primary');
//     if (link.getAttribute('href') === currentPath) {
//       link.classList.add('active', 'text-primary');
//     }
//   });
// }

// Smooth scroll for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Form submission handler
function setupFormHandlers() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // You can send this to your backend API
      console.log('Form submitted:', data);
      
      // Show success message (optional)
      alert('Thank you! Your message has been sent.');
      this.reset();
    });
  });
}

// Intersection Observer for fade-in animations
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('[class*="animate"]').forEach(el => {
    observer.observe(el);
  });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupMobileMenu();
  setActiveNavLink();
  setupSmoothScroll();
  setupFormHandlers();
  setupIntersectionObserver();
});

// Export functions for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleTheme,
    initTheme,
    setupMobileMenu,
    setActiveNavLink,
    setupSmoothScroll,
    setupFormHandlers,
    setupIntersectionObserver
  };
}

