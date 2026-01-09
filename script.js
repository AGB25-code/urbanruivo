// Sticky Header on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Highlight Active Page in Navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animated Counter for Stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const prefix = element.getAttribute('data-prefix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const formatNumber = (num) => {
        // Formata o número com ponto de milhar para português
        return num.toLocaleString('pt-PT');
    };

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            const displayValue = Math.floor(current);
            element.textContent = prefix + formatNumber(displayValue);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + formatNumber(target);
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, observerOptions);

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Service Card Click Action
const serviceCards = document.querySelectorAll('.service-card');
const modalMap = {
    '1': document.getElementById('climateModal'),
    '2': document.getElementById('avacModal'),
    '3': document.getElementById('aqsModal'),
    '4': document.getElementById('renewModal'),
    '5': document.getElementById('supportModal'),
    '6': document.getElementById('complementsModal'),
    '7': document.getElementById('consultingModal')
};

const openModal = (modal) => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
};

const closeModal = (modal) => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

if (serviceCards.length > 0) {
    serviceCards.forEach(card => {
        // Skip if card is wrapped in an anchor link (services.html page)
        if (card.parentElement.tagName === 'A') {
            return;
        }

        const serviceId = card.getAttribute('data-service');
        const modal = modalMap[serviceId];

        if (modal) {
            card.addEventListener('click', () => openModal(modal));
            return;
        }

        card.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

Object.values(modalMap).forEach(modal => {
    if (!modal) return;
    const closeBtn = modal.querySelector('.service-modal-close');
    const backdrop = modal.querySelector('.service-modal-backdrop');

    [closeBtn, backdrop].forEach(el => {
        if (el) {
            el.addEventListener('click', () => closeModal(modal));
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModalEl = Object.values(modalMap).find(m => m && m.getAttribute('aria-hidden') === 'false');
        if (openModalEl) {
            closeModal(openModalEl);
        }
    }
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form-simple');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.style.background = '#27ae60';

            // Reset form
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Intersection Observer for Fade-in Animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in effect to sections
const fadeElements = document.querySelectorAll('.service-card, .stat-item, .info-card');
if (fadeElements.length > 0) {
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(element);
    });
}

// Hero Button Actions
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
if (heroButtons.length > 0) {
    heroButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index === 0) {
                // Scroll to services
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Scroll to contact
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Loading Animation on Page Load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Mobile Dropdown Menu Toggle
const navDropdown = document.querySelector('.nav-dropdown');
if (navDropdown) {
    const dropdownLink = navDropdown.querySelector('.nav-link');

    dropdownLink.addEventListener('click', (e) => {
        // Always prevent default for non-clickable link
        e.preventDefault();

        // Only toggle on mobile
        if (window.innerWidth <= 768) {
            navDropdown.classList.toggle('active');
        }
    });
}

// Service Dropdown Functionality
const serviceDropdown = document.getElementById('serviceDropdown');
if (serviceDropdown) {
    const dropdownToggle = document.getElementById('serviceDropdownToggle');
    const dropdownMenu = document.getElementById('serviceDropdownMenu');
    const dropdownText = dropdownToggle.querySelector('.service-dropdown-text');
    const serviceCheckboxes = dropdownMenu.querySelectorAll('input[type="checkbox"]');

    // Toggle dropdown open/close
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        serviceDropdown.classList.toggle('open');
    });

    // Update dropdown text based on selections
    function updateDropdownText() {
        const checkedCount = Array.from(serviceCheckboxes).filter(cb => cb.checked).length;

        if (checkedCount === 0) {
            dropdownText.textContent = 'Selecione os serviços';
        } else if (checkedCount === 1) {
            const checkedCheckbox = Array.from(serviceCheckboxes).find(cb => cb.checked);
            const label = checkedCheckbox.parentElement.querySelector('span').textContent;
            dropdownText.textContent = label;
        } else {
            dropdownText.textContent = `${checkedCount} serviços selecionados`;
        }
    }

    // Listen for checkbox changes
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateDropdownText);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!serviceDropdown.contains(e.target)) {
            serviceDropdown.classList.remove('open');
        }
    });

    // Prevent dropdown from closing when clicking inside the menu
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}


