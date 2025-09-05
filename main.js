// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    };
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .certificate-item, .skill-category, .education-item, .info-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Project cards tilt effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// -------------------- Portfolio: Data-driven rendering + Filters + Modal --------------------
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = [
        {
            id: 'proj-ml-books',
            title: 'Smart Book Recommendation System',
            category: 'AI/ML',
            description: 'Python + Tkinter GUI that recommends books based on user preferences and history.',
            tags: ['Python', 'Tkinter', 'Recommender'],
            image: 'assets/profile.jpg',
            links: [
                { label: 'Details', href: '#', type: 'modal' }
            ]
        },
        {
            id: 'proj-stock-web',
            title: 'Online Stock Maintenance System',
            category: 'Web',
            description: 'CRUD stock manager built with HTML, CSS, JavaScript and UML-guided design.',
            tags: ['HTML', 'CSS', 'JavaScript', 'UML'],
            image: 'assets/profile.jpg',
            links: [
                { label: 'Details', href: '#', type: 'modal' }
            ]
        },
        {
            id: 'proj-exam-java',
            title: 'Exam Timetable Scheduling',
            category: 'Java',
            description: 'Backtracking-based scheduler to allocate rooms and timeslots without conflicts.',
            tags: ['Java', 'Backtracking', 'OOP'],
            image: 'assets/profile.jpg',
            links: [
                { label: 'Details', href: '#', type: 'modal' }
            ]
        },
        {
            id: 'certificates',
            title: 'Certificates Showcase',
            category: 'Certificates',
            description: 'A curated set of professional certificates and achievements.',
            tags: ['NPTEL', 'Microsoft', 'IBM'],
            image: 'assets/profile.jpg',
            links: [
                { label: 'Open Section', href: '#certificates', type: 'link' }
            ]
        }
    ];

    const grid = document.getElementById('portfolio-grid');
    const filters = document.getElementById('portfolio-filters');
    const modal = document.getElementById('portfolio-modal');
    const modalBackdrop = document.getElementById('portfolio-modal-backdrop');
    const modalClose = document.getElementById('portfolio-modal-close');
    const modalBody = document.getElementById('portfolio-modal-body');

    if (!grid || !filters) return;

    const renderGrid = (items) => {
        grid.innerHTML = items.map(item => `
            <div class="portfolio-card" data-id="${item.id}" data-category="${item.category}">
                <img class="portfolio-thumb" src="${item.image}" alt="${item.title}">
                <div class="portfolio-body">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <div class="portfolio-meta">
                        <span>${item.category}</span>
                    </div>
                    <div class="portfolio-tags">
                        ${item.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}
                    </div>
                    <div class="portfolio-actions">
                        ${item.links.map(l => `<a href="${l.href}" class="portfolio-btn" data-type="${l.type}">${l.label}</a>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // animate in (reuse observer)
        const cards = grid.querySelectorAll('.portfolio-card');
        cards.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            if (typeof observer !== 'undefined') {
                observer.observe(el);
            } else {
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }
        });

        // card actions
        grid.querySelectorAll('.portfolio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = btn.getAttribute('data-type');
                if (type === 'modal') {
                    e.preventDefault();
                    const card = btn.closest('.portfolio-card');
                    const id = card?.getAttribute('data-id');
                    const item = portfolioItems.find(i => i.id === id);
                    if (item) openModal(item);
                }
            });
        });
    };

    const applyFilter = (category) => {
        if (category === 'all') {
            renderGrid(portfolioItems);
        } else {
            renderGrid(portfolioItems.filter(i => i.category === category));
        }
    };

    const openModal = (item) => {
        if (!modal || !modalBody) return;
        modalBody.innerHTML = `
            <div class="portfolio-modal-body">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-modal-details">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="portfolio-tags">
                        ${item.tags.map(t => `<span class=\"portfolio-tag\">${t}</span>`).join('')}
                    </div>
                    <div class="portfolio-modal-links">
                        ${item.links.map(l => `<a href=\"${l.href}\">${l.label}</a>`).join('')}
                    </div>
                </div>
            </div>
        `;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // init grid
    renderGrid(portfolioItems);

    // filter clicks
    filters.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            applyFilter(category);
        });
    });

    // modal events
    modalBackdrop?.addEventListener('click', closeModal);
    modalClose?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

// -------------------- Export to PDF and Share Link --------------------
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('btn-download-pdf');
    const shareBtn = document.getElementById('btn-share-link');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            try {
                const { jsPDF } = window.jspdf || {};
                if (!jsPDF || typeof html2canvas === 'undefined') {
                    showNotification('PDF libraries failed to load. Check your internet connection.', 'error');
                    return;
                }

                // Hide floating/interactive UI for clean export
                const hiddenSelectors = ['.scroll-to-top', '.hamburger', '#btn-download-pdf', '#btn-share-link'];
                const hiddenEls = [];
                hiddenSelectors.forEach(sel => {
                    document.querySelectorAll(sel).forEach(el => {
                        hiddenEls.push({ el, prev: el.style.display });
                        el.style.display = 'none';
                    });
                });

                // Ensure navbar is at top and not sticky offset during rasterization
                const navbar = document.querySelector('.navbar');
                const prevShadow = navbar?.style.boxShadow;
                if (navbar) navbar.style.boxShadow = 'none';

                // Render page to canvas
                const page = document.body;
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    windowWidth: document.documentElement.scrollWidth,
                    windowHeight: document.documentElement.scrollHeight
                });

                // Restore UI
                hiddenEls.forEach(({ el, prev }) => { el.style.display = prev; });
                if (navbar) navbar.style.boxShadow = prevShadow || '';

                const imgData = canvas.toDataURL('image/jpeg', 0.92);
                const pdf = new jsPDF('p', 'mm', 'a4');

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                const imgWidth = pageWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    pdf.addPage();
                    position = heightLeft * -1;
                    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
                    heightLeft -= pageHeight;
                }

                pdf.save('B_Vamshiraj_Goud_Portfolio.pdf');
                showNotification('Portfolio downloaded as PDF.', 'success');
            } catch (err) {
                console.error(err);
                showNotification('Failed to generate PDF.', 'error');
            }
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            try {
                const url = window.location.href;
                if (navigator.share) {
                    await navigator.share({ title: document.title, url });
                } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    showNotification('Link copied to clipboard. Share it with anyone!', 'success');
                } else {
                    // Fallback
                    const input = document.createElement('input');
                    input.value = url;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                    showNotification('Link copied to clipboard. Share it with anyone!', 'success');
                }
            } catch (e) {
                showNotification('Could not copy/share the link.', 'error');
            }
        });
    }
});