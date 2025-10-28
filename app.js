// Smooth scroll animation enhancement
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Don't handle the affiliate link placeholder
      if (href === '#INSERT-YOUR-AMAZON-AFFILIATE-LINK-HERE') {
        e.preventDefault();
        showAffiliateWarning();
        return;
      }
      
      // Handle internal anchor links
      if (href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Show warning when clicking placeholder affiliate links
function showAffiliateWarning() {
  const message = '⚠️ Please replace this placeholder with your Amazon affiliate link!\n\nSearch for "#INSERT-YOUR-AMAZON-AFFILIATE-LINK-HERE" in the HTML code and replace it with your actual affiliate link.';
  alert(message);
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
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

  // Observe feature cards
  const cards = document.querySelectorAll('.feature-card, .benefit-item, .showcase-item');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// Add scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #32B4C6, #1B3B4D);
    width: 0%;
    z-index: 9999;
    transition: width 0.2s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Add floating CTA button on scroll
function initFloatingCTA() {
  const floatingCTA = document.createElement('a');
  floatingCTA.href = '#INSERT-YOUR-AMAZON-AFFILIATE-LINK-HERE';
  floatingCTA.target = '_blank';
  floatingCTA.rel = 'noopener';
  floatingCTA.className = 'floating-cta';
  floatingCTA.innerHTML = '🛒 Buy Now';
  floatingCTA.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 16px 24px;
    background: #32B4C6;
    color: #1B3B4D;
    font-weight: 600;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(50, 180, 198, 0.4);
    text-decoration: none;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 16px;
  `;

  floatingCTA.addEventListener('click', function(e) {
    if (this.href.includes('#INSERT-YOUR-AMAZON-AFFILIATE-LINK-HERE')) {
      e.preventDefault();
      showAffiliateWarning();
    }
  });

  document.body.appendChild(floatingCTA);

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 800) {
      floatingCTA.style.opacity = '1';
      floatingCTA.style.transform = 'translateY(0)';
    } else {
      floatingCTA.style.opacity = '0';
      floatingCTA.style.transform = 'translateY(100px)';
    }
  });

  // Hover effect
  floatingCTA.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(0) scale(1.05)';
  });

  floatingCTA.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
}

// Track CTA clicks (useful for analytics)
function initCTATracking() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Don't track placeholder clicks
      if (!this.href.includes('#INSERT-YOUR-AMAZON-AFFILIATE-LINK-HERE')) {
        // Here you could add Google Analytics or other tracking
        console.log('CTA clicked:', this.textContent.trim());
      }
    });
  });
}

// Add star rating animation
function animateStars() {
  const stars = document.querySelectorAll('.star.filled');
  stars.forEach((star, index) => {
    setTimeout(() => {
      star.style.transform = 'scale(1.2)';
      setTimeout(() => {
        star.style.transform = 'scale(1)';
      }, 200);
    }, index * 100);
  });

  stars.forEach(star => {
    star.style.transition = 'transform 0.2s ease';
  });
}

// Initialize all functionality when DOM is ready
function init() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }
}

function runInit() {
  initSmoothScroll();
  initScrollAnimations();
  initScrollProgress();
  initFloatingCTA();
  initCTATracking();
  
  // Animate stars after a short delay
  setTimeout(animateStars, 500);
}

// Start the application
init();