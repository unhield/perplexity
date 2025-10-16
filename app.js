// Global variables for state management
let countdownIntervals = [];
let testimonialInterval;
let activityInterval;
let exitTimerInterval;
let currentTestimonial = 0;
let exitPopupShown = false;
let exitTimerStarted = false;
let activityItems = [
    { name: "Someone from IIT Bombay", university: "", action: "viewed this offer", time: "12 min ago" },
    { name: "A student from Delhi University", university: "", action: "started signup", time: "28 min ago" },
    { name: "Someone", university: "", action: "completed verification", time: "1 hour ago" },
    { name: "A student from NIT Surathkal", university: "", action: "downloaded the browser", time: "2 hours ago" },
    { name: "Someone from BITS Pilani", university: "", action: "viewed this offer", time: "3 hours ago" },
    { name: "A student from IIT Delhi", university: "", action: "started signup", time: "4 hours ago" }
];
let currentActivityIndex = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeScrollAnimations();
    initializeCounters();
    initializeProgressBars();
    initializeFeatureCards();
    initializeTypingAnimation();
    initializeTestimonialCarousel();
    initializeLiveActivity();
    initializeLiveViewerCount();
    initializeMobileStickyTCA();
    initializeExitIntent();
    
    // Add smooth scrolling for any anchor links
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
});

// Countdown Timer Functions - EXACT IMPLEMENTATION AS SPECIFIED
function updateCountdown() {
    // Set exact target date in IST
    const targetDate = new Date('2025-10-19T23:59:59+05:30');
    const now = new Date();
    
    // Calculate time difference in milliseconds
    const timeDiff = targetDate.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
        // Timer expired
        const countdownElements = document.querySelectorAll('.countdown-timer');
        countdownElements.forEach(element => {
            element.innerHTML = 'OFFER EXPIRED';
        });
        
        // Update individual countdown displays
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const hoursSmallEl = document.getElementById('hours-small');
        const minutesSmallEl = document.getElementById('minutes-small');
        const secondsSmallEl = document.getElementById('seconds-small');
        const finalEl = document.getElementById('countdown-final');
        
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        if (hoursSmallEl) hoursSmallEl.textContent = '00';
        if (minutesSmallEl) minutesSmallEl.textContent = '00';
        if (secondsSmallEl) secondsSmallEl.textContent = '00';
        if (finalEl) finalEl.textContent = 'OFFER EXPIRED';
        
        return;
    }
    
    // Convert to days, hours, minutes, seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Calculate total hours for display
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    
    // Format display
    let displayText = '';
    if (days > 0) {
        displayText = `${days} Days ${hours} Hours ${minutes} Minutes`;
    } else if (hours > 0) {
        displayText = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        displayText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Update main countdown display elements
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (hoursEl) hoursEl.textContent = totalHours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    
    // Update small countdown display
    const hoursSmallEl = document.getElementById('hours-small');
    const minutesSmallEl = document.getElementById('minutes-small');
    const secondsSmallEl = document.getElementById('seconds-small');
    
    if (hoursSmallEl) hoursSmallEl.textContent = totalHours.toString().padStart(2, '0');
    if (minutesSmallEl) minutesSmallEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsSmallEl) secondsSmallEl.textContent = seconds.toString().padStart(2, '0');
    
    // Update final countdown
    const finalEl = document.getElementById('countdown-final');
    if (finalEl) {
        if (days > 0) {
            finalEl.textContent = `${days} Days ${hours} Hours ${minutes} Minutes`;
        } else {
            finalEl.textContent = `${totalHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    // Add urgency styling when under 6 hours
    if (timeDiff < 6 * 60 * 60 * 1000) {
        const countdownElements = document.querySelectorAll('.countdown-timer, .countdown-timer-small, .countdown-label, .countdown-label-small');
        countdownElements.forEach(element => {
            element.style.color = '#ff4444';
            element.style.animation = 'pulse 1s infinite';
        });
        
        // Add urgent styling to time units
        const timeUnits = document.querySelectorAll('.time-unit');
        timeUnits.forEach(unit => {
            unit.style.background = 'rgba(239, 68, 68, 0.2)';
            unit.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            unit.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
        });
        
        // Update countdown label to show urgency
        const urgencyLabel = document.querySelector('.countdown-label');
        if (urgencyLabel && !urgencyLabel.textContent.includes('EXPIRES SOON')) {
            urgencyLabel.innerHTML = '🚨 OFFER EXPIRES SOON:';
        }
    }
}

function initializeCountdown() {
    // Start countdown immediately and update every second
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    countdownIntervals.push(interval);
}



// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if this element has a counter
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        animateCounter(counter);
                    }
                });
                
                // Trigger progress bar animation
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    if (!bar.classList.contains('animated')) {
                        animateProgressBar(bar);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    // Counters will be animated when they come into view via scroll observer
}

// This function is now defined in the enhanced counter section above

// Progress Bar Animation
function initializeProgressBars() {
    // Progress bars will be animated when they come into view via scroll observer
}

function animateProgressBar(element) {
    const progress = parseInt(element.getAttribute('data-progress'));
    
    element.classList.add('animated');
    
    // Animate to the target width
    setTimeout(() => {
        element.style.width = `${progress}%`;
    }, 100);
}

// Feature Cards Animation
function initializeFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// FAQ Toggle Function
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    if (isActive) {
        faqItem.classList.remove('active');
    } else {
        faqItem.classList.add('active');
    }
}

// Utility Functions
function addPulseEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-primary-large');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add smooth parallax scrolling effect to hero background
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-bg');
    
    if (!hero || !heroBackground) return;
    
    const throttledScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScroll);
}

// Initialize additional effects after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addPulseEffect();
    initializeParallax();
    initializeEnhancedInteractions();
});

function initializeEnhancedInteractions() {
    // Enhanced button interactions with ripple effects
    document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-secondary, .btn-sticky, .btn-exit-claim').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Haptic feedback simulation for mobile
            if (navigator.vibrate && 'ontouchstart' in window) {
                navigator.vibrate(10);
            }
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Enhanced hover effects for cards
    document.querySelectorAll('.feature-card, .testimonial-slide, .trust-badge-large').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Scroll-triggered animations for social proof
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const socialProofObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger enhanced animations for social proof elements
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.transform = 'scale(1.1)';
                        stat.style.color = 'var(--color-primary)';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 300);
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.live-stats').forEach(el => {
        socialProofObserver.observe(el);
    });
    
    // Add dynamic progress bar animations
    document.querySelectorAll('.progress-fill').forEach(bar => {
        const progress = parseInt(bar.getAttribute('data-progress'));
        bar.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.transition = 'width 2s cubic-bezier(0.16, 1, 0.3, 1)';
                        bar.style.width = `${progress}%`;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
    
    // Add urgency pulses to countdown elements when time is low
    function addUrgencyEffects() {
        const timeUnits = document.querySelectorAll('.time-unit');
        const countdownLabels = document.querySelectorAll('.countdown-label, .countdown-label-small');
        
        timeUnits.forEach(unit => {
            const timeNumber = unit.querySelector('.time-number');
            if (timeNumber && parseInt(timeNumber.textContent) < 10) {
                unit.style.animation = 'urgentPulse 0.5s infinite alternate';
            }
        });
    }
    
    // Check urgency every 10 seconds
    setInterval(addUrgencyEffects, 10000);
}

// Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = 'Perplexity Pro + Comet Browser';
    const originalText = typingElement.textContent;
    
    setTimeout(() => {
        typingElement.textContent = '';
        typingElement.classList.add('typing');
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    typingElement.classList.remove('typing');
                }, 1000);
            }
        }
        typeWriter();
    }, 2000);
}

// Testimonial Carousel
function initializeTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.nav-dot');
    
    if (slides.length === 0) return;
    
    function showTestimonial(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            dots[index]?.classList.add('active');
        }
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const nextIndex = (currentTestimonial + 1) % slides.length;
        showTestimonial(nextIndex);
    }
    
    // Auto-rotate testimonials
    testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    });
}

// Make showTestimonial global for onclick handlers
function showTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.nav-dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index]?.classList.add('active');
    }
    
    currentTestimonial = index;
}

// Live Activity Feed
function initializeLiveActivity() {
    const activityFeed = document.getElementById('activity-feed');
    if (!activityFeed) return;
    
    function updateActivity() {
        // Show up to 3 recent activities for more believable display
        const recentActivities = [];
        const startIndex = Math.max(0, currentActivityIndex - 2);
        
        for (let i = 0; i < 3 && i < activityItems.length; i++) {
            const index = (startIndex + i) % activityItems.length;
            recentActivities.push(activityItems[index]);
        }
        
        const activityHTML = recentActivities.map(activity => `
            <div class="activity-item">
                <span class="activity-name">${activity.name}</span>
                <span class="activity-action">${activity.action}</span>
                <span class="activity-time">${activity.time}</span>
            </div>
        `).join('');
        
        activityFeed.innerHTML = activityHTML;
        
        currentActivityIndex = (currentActivityIndex + 1) % activityItems.length;
        
        // Update spots remaining
        const spotsRemaining = document.getElementById('spots-remaining');
        if (spotsRemaining) {
            const currentSpots = parseInt(spotsRemaining.textContent) || 267;
            if (currentSpots > 200) {
                spotsRemaining.textContent = currentSpots - Math.floor(Math.random() * 3) - 1;
            }
        }
    }
    
    // Update activity every 15-30 minutes for more realistic feel
    activityInterval = setInterval(updateActivity, Math.random() * 900000 + 900000); // 15-30 minutes
    
    // Show initial activity immediately
    updateActivity();
}

// Live Viewer Counter
function initializeLiveViewerCount() {
    const viewerCount = document.getElementById('viewer-count');
    if (!viewerCount) return;
    
    function updateViewerCount() {
        const baseCount = 127;
        const variation = Math.floor(Math.random() * 15) - 7; // Smaller, more realistic variations
        const newCount = Math.max(baseCount + variation, 95); // Keep it realistic
        viewerCount.textContent = newCount;
    }
    
    // Update viewer count every 2-5 minutes for more believable changes
    setInterval(updateViewerCount, Math.random() * 180000 + 120000);
}

// Mobile Sticky CTA
function initializeMobileStickyTCA() {
    const mobileCTA = document.getElementById('mobile-cta');
    if (!mobileCTA) return;
    
    let hasScrolled = false;
    
    function handleScroll() {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show after scrolling 30% of page or past hero section
        if (scrollPosition > windowHeight * 0.3 && window.innerWidth <= 768) {
            if (!hasScrolled) {
                mobileCTA.classList.add('show');
                hasScrolled = true;
            }
        }
        
        // Hide when near bottom (footer area)
        if (scrollPosition + windowHeight > documentHeight - 200) {
            mobileCTA.classList.remove('show');
        } else if (hasScrolled && scrollPosition > windowHeight * 0.3 && window.innerWidth <= 768) {
            mobileCTA.classList.add('show');
        }
    }
    
    window.addEventListener('scroll', throttle(handleScroll, 100));
}

// Exit Intent Popup
function initializeExitIntent() {
    const exitPopup = document.getElementById('exit-popup');
    if (!exitPopup) return;
    
    let mouseLeaveCount = 0;
    
    function showExitPopup() {
        if (exitPopupShown || window.innerWidth <= 768) return;
        
        exitPopup.classList.add('show');
        exitPopupShown = true;
        
        if (!exitTimerStarted) {
            startExitTimer();
        }
        
        // Track popup show
        document.body.style.overflow = 'hidden';
    }
    
    function hideExitPopup() {
        exitPopup.classList.remove('show');
        document.body.style.overflow = '';
        
        if (exitTimerInterval) {
            clearInterval(exitTimerInterval);
        }
    }
    
    // Mouse leave detection
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitPopupShown) {
            mouseLeaveCount++;
            if (mouseLeaveCount >= 1) {
                showExitPopup();
            }
        }
    });
    
    // Time-based trigger (after 30 seconds)
    setTimeout(() => {
        if (!exitPopupShown) {
            showExitPopup();
        }
    }, 30000);
    
    // Close popup function
    window.closeExitPopup = hideExitPopup;
}

function startExitTimer() {
    if (exitTimerStarted) return;
    exitTimerStarted = true;
    
    let timeLeft = 300; // 5 minutes in seconds
    const timerElement = document.getElementById('exit-timer');
    
    if (!timerElement) return;
    
    exitTimerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(exitTimerInterval);
            timerElement.textContent = 'EXPIRED';
            timerElement.style.color = '#EF4444';
        }
    }, 1000);
}

// Enhanced Counter Animation with More Natural Movement
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500; // Slightly longer for more impact
    const start = performance.now();
    
    element.classList.add('animated');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // More dramatic easing function
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeProgress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Clean up intervals when page is unloaded
window.addEventListener('beforeunload', function() {
    countdownIntervals.forEach(interval => clearInterval(interval));
    if (testimonialInterval) clearInterval(testimonialInterval);
    if (activityInterval) clearInterval(activityInterval);
    if (exitTimerInterval) clearInterval(exitTimerInterval);
});(1 - progress, 4);
        const current = Math.floor(easeProgress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Clean up intervals when page is unloaded
window.addEventListener('beforeunload', function() {
    countdownIntervals.forEach(interval => clearInterval(interval));
    if (testimonialInterval) clearInterval(testimonialInterval);
    if (activityInterval) clearInterval(activityInterval);
    if (exitTimerInterval) clearInterval(exitTimerInterval);
});