// Countdown Timer Logic
function updateCountdown() {
    // Target end date: October 20, 2025 at 11:59 PM IST
    const targetDate = new Date('2025-10-20T23:59:59+05:30');
    const now = new Date();
    
    // Calculate time difference
    const timeDiff = targetDate.getTime() - now.getTime();
    
    // If time has expired
    if (timeDiff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        
        document.getElementById('small-days').textContent = '0';
        document.getElementById('small-hours').textContent = '0';
        document.getElementById('small-minutes').textContent = '0';
        document.getElementById('small-seconds').textContent = '0';
        
        document.getElementById('final-timer').textContent = 'OFFER EXPIRED';
        return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Update main countdown
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Update small countdown
    document.getElementById('small-days').textContent = days;
    document.getElementById('small-hours').textContent = hours;
    document.getElementById('small-minutes').textContent = minutes;
    document.getElementById('small-seconds').textContent = seconds;
    
    // Update final timer
    if (days > 0) {
        document.getElementById('final-timer').textContent = `${days} Days ${hours} Hours ${minutes} Minutes`;
    } else if (hours > 0) {
        document.getElementById('final-timer').textContent = `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
    } else {
        document.getElementById('final-timer').textContent = `${minutes} Minutes ${seconds} Seconds`;
    }
    
    // Add urgency styling when under 6 hours
    if (timeDiff < 6 * 60 * 60 * 1000) {
        const timeElements = document.querySelectorAll('.time-value, .timer-display, .timer-compact');
        timeElements.forEach(element => {
            element.classList.add('urgency-active');
        });
    }
}

// Animated Counters
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// FAQ Toggle Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Mobile Sticky CTA
function handleMobileCTA() {
    const mobileCTA = document.getElementById('mobile-cta');
    const heroSection = document.querySelector('.hero');
    
    if (!mobileCTA || !heroSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero is visible, hide mobile CTA
                mobileCTA.style.transform = 'translateY(100%)';
            } else {
                // Hero is not visible, show mobile CTA
                mobileCTA.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
}

// Smooth Scroll Animation
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .process-step');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Live Activity Updates (Subtle and Realistic)
function updateLiveActivity() {
    const activities = [
        { text: "Someone from IIT Bombay viewed this offer", time: "18 min ago" },
        { text: "A student from Delhi University started signup", time: "35 min ago" },
        { text: "Someone completed verification", time: "1 hour ago" },
        { text: "A student from NIT Surathkal downloaded the browser", time: "2 hours ago" },
        { text: "Someone from BITS Pilani viewed the FAQ", time: "2.5 hours ago" },
        { text: "A student from IIT Madras completed signup", time: "3 hours ago" }
    ];
    
    const activityFeed = document.getElementById('activity-feed');
    if (!activityFeed) return;
    
    // Show only 4 activities at most to keep it realistic
    const displayActivities = activities.slice(0, 4);
    
    activityFeed.innerHTML = displayActivities.map(activity => `
        <div class="activity-item">
            <span class="activity-text">${activity.text}</span>
            <span class="activity-time">${activity.time}</span>
        </div>
    `).join('');
}

// Initialize Student Count Animation
function initializeStatCounters() {
    const studentsThisWeek = document.getElementById('students-this-week');
    const dailySignups = document.getElementById('daily-signups');
    
    // Only animate when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'students-this-week') {
                    animateCounter(entry.target, 342, 2000);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (studentsThisWeek) observer.observe(studentsThisWeek);
}

// Track CTA Clicks (Analytics)
function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .mobile-cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Track click event (you can integrate with your analytics service)
            console.log('CTA clicked:', button.textContent.trim());
        });
    });
}

// Handle Button Hover Effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Validate Student Email (Basic)
function validateStudentEmail(email) {
    const eduRegex = /\.edu$/i;
    return eduRegex.test(email);
}

// Page Load Performance Tracking
function trackPageLoad() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Show success message if page loads quickly
        if (loadTime < 3000) {
            console.log('✅ Fast loading achieved');
        }
    });
}

// Handle Mobile Menu (if needed)
function initializeMobileMenu() {
    // Add any mobile-specific navigation handling here if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Optimize for mobile interaction
        document.body.classList.add('mobile-optimized');
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown timer immediately
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second
    
    // Initialize all features
    initializeFAQ();
    initializeScrollAnimations();
    initializeStatCounters();
    trackCTAClicks();
    initializeButtonEffects();
    updateLiveActivity();
    handleMobileCTA();
    trackPageLoad();
    initializeMobileMenu();
    
    console.log('🚀 Comet Browser landing page initialized successfully');
});

// Handle page visibility changes (for timer accuracy)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again, update countdown immediately
        updateCountdown();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-optimized');
    } else {
        document.body.classList.remove('mobile-optimized');
    }
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['days', 'hours', 'minutes', 'seconds'];
    
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`Warning: Element with id '${id}' not found`);
        }
    });
}

// Call error handling
handleMissingElements();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCountdown,
        validateStudentEmail,
        animateCounter
    };
}