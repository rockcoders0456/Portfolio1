// Portfolio JavaScript - All functionality in one file

// Target percentages for skills
const targetPercentages = [90, 85, 83, 75, 72];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeSkillsAnimation();
    initializeMobileNavigation();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeScrollAnimations();
    initializeTypingAnimation();
    initializeScrollProgress();
});

// Skills Animation with Intersection Observer
function initializeSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class to trigger CSS transitions
                entry.target.classList.add('animate');
                
                // Animate percentage numbers
                const progressValue = entry.target.querySelector('.circular-progress-value');
                const index = Array.from(skillItems).indexOf(entry.target);
                const targetNumber = targetPercentages[index];
                
                animatePercentage(progressValue, targetNumber);
            } else {
                // Remove animate class and reset percentage
                entry.target.classList.remove('animate');
                const progressValue = entry.target.querySelector('.circular-progress-value');
                if (progressValue) {
                    progressValue.textContent = '0%';
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-50px'
    });
    
    skillItems.forEach(item => {
        skillsObserver.observe(item);
    });
}

// Animate percentage numbers
function animatePercentage(element, targetNumber) {
    let currentNumber = 0;
    const increment = targetNumber / 50; // 50 steps for smooth animation
    const duration = 2000; // 2 seconds
    const stepDuration = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        element.textContent = Math.round(currentNumber) + '%';
    }, stepDuration);
}

// Mobile Navigation Toggle
function initializeMobileNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    mobileNavToggle.setAttribute('aria-expanded', 'true');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNavToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Validation and Submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
        
        // Form submission
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError(field);
    
    // Validation rules
    if (field.name === 'name') {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Name can only contain letters and spaces';
        }
    } else if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.name === 'subject') {
        if (value.length < 5) {
            isValid = false;
            errorMessage = 'Subject must be at least 5 characters long';
        }
    } else if (field.name === 'message') {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Validate entire form
function validateForm() {
    const fields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Remove validation classes
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error');
            });
            
            // Show success notification
            createSuccessNotification();
            createConfetti();
            
            // Reset button after 4 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 4000);
            
        }, 2000);
    }
}

// Create full-page congratulations overlay
function createSuccessNotification() {
    const overlay = document.createElement('div');
    overlay.className = 'full-page-congrats';
    overlay.innerHTML = `
        <div class="congrats-background">
            <div class="fire-particles"></div>
            <div class="explosion-particles"></div>
        </div>
        <div class="congrats-content">
            <div class="congrats-icon">
                <i class="fas fa-skull-crossbones"></i>
            </div>
            <h1 class="congrats-title">BOOM! 💥</h1>
            <h2 class="congrats-subtitle">MESSAGE SENT!</h2>
            <p class="congrats-message">Your message is now in the wild! I'll hunt it down and reply fast!</p>
            <div class="congrats-stats">
                <div class="stat">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">SUCCESS</span>
                </div>
                <div class="stat">
                    <span class="stat-number">FAST</span>
                    <span class="stat-label">REPLY</span>
                </div>
                <div class="stat">
                    <span class="stat-number">EPIC</span>
                    <span class="stat-label">RESULT</span>
                </div>
            </div>
            <div class="congrats-actions">
                <button class="close-congrats" onclick="closeCongrats()">
                    <i class="fas fa-times"></i> CLOSE
                </button>
            </div>
        </div>
        <div class="floating-elements">
            <span class="floating-icon">💀</span>
            <span class="floating-icon">⚡</span>
            <span class="floating-icon">🔥</span>
            <span class="floating-icon">💣</span>
            <span class="floating-icon">⚔️</span>
            <span class="floating-icon">🛡️</span>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Show overlay with animation
    setTimeout(() => {
        overlay.classList.add('show');
    }, 100);
    
    // Auto-close after 8 seconds
    setTimeout(() => {
        closeCongrats();
    }, 8000);
}

// Close congratulations overlay
function closeCongrats() {
    const overlay = document.querySelector('.full-page-congrats');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 1000);
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#00ffff', '#7cf03d', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Active Section Tracking
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Scroll-based Animations
function initializeScrollAnimations() {
    // Animation observer options - more sensitive for viewport detection
    const animationObserverOptions = {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -100px 0px' // Trigger 100px before element enters viewport
    };

    // Create animation observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, animationObserverOptions);

    // Observe all animated elements
    observeAnimatedElements(animationObserver);
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        parallaxEffect();
        revealOnScroll();
        updateScrollProgress();
        updateActiveSection();
    });
}

// Observe animated elements
function observeAnimatedElements(observer) {
    // Add animation classes to elements
    document.querySelectorAll('.hero article, .hero figure').forEach(el => {
        el.classList.add('fade-up');
    });

    document.querySelectorAll('.about figure').forEach(el => {
        el.classList.add('fade-up');
    });

    document.querySelectorAll('.about article').forEach(el => {
        el.classList.add('fade-up');
    });

    document.querySelectorAll('.service-item').forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.animationDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.contact-info-section').forEach(el => {
        el.classList.add('fade-up');
    });

    document.querySelectorAll('.contact-form-section').forEach(el => {
        el.classList.add('fade-up');
    });

    document.querySelectorAll('.skill-item').forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Add fade-up to section headings
    document.querySelectorAll('section h2, section h3').forEach(el => {
        el.classList.add('fade-up');
    });

    // Add fade-up to paragraphs and lists
    document.querySelectorAll('section p, .service-features li').forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Observe all elements with animation classes
    const allAnimatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, .scale-in');
    allAnimatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Infinite typing animation for hero text
function initializeTypingAnimation() {
    const heroText = document.querySelector('#text');
    if (heroText) {
        const roles = [
            'Frontend Developer',
            'Backend Developer', 
            'Full Stack Developer',
            'Designer'
        ];
        
        let currentRoleIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let typingSpeed = 80; // Faster initial typing speed
        
        function typeWriter() {
            const targetText = roles[currentRoleIndex];
            
            if (isDeleting) {
                // Delete characters
                currentText = targetText.substring(0, currentText.length - 1);
                typingSpeed = 50; // Much faster deletion
            } else {
                // Type characters
                currentText = targetText.substring(0, currentText.length + 1);
                typingSpeed = 80; // Faster typing speed
            }
            
            heroText.textContent = currentText;
            
            if (!isDeleting && currentText === targetText) {
                // Pause at the end of typing
                typingSpeed = 1200; // 1.2 second pause (shorter)
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                // Move to next role
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typingSpeed = 300; // Shorter pause before next word
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the infinite typing animation
        setTimeout(typeWriter, 1000);
    }
}

// Update scroll progress bar
function initializeScrollProgress() {
    updateScrollProgress();
}

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
} 