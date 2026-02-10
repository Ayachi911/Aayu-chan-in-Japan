
// FAQ Toggle
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Interactive Checklist Progress
const checkboxes = document.querySelectorAll('.interactive-checklist input[type="checkbox"]');
const progressText = document.getElementById('progress-text');

if (checkboxes.length > 0 && progressText) {
    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.interactive-checklist input[type="checkbox"]:checked').length;
        progressText.textContent = `${checked}/${total} complete`;
        
        // Save to localStorage
        const checklistState = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem('kakehashi-checklist', JSON.stringify(checklistState));
    }
    
    // Load saved state
    const saved = localStorage.getItem('kakehashi-checklist');
    if (saved) {
        const state = JSON.parse(saved);
        checkboxes.forEach((cb, i) => {
            if (state[i]) cb.checked = true;
        });
        updateProgress();
    }
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateProgress);
    });
}

// Reading Progress Bar
const progressBar = document.querySelector('.reading-progress-bar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
}

// Smooth scroll for anchor links
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
