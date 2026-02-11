
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
// Copy to clipboard
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            const originalText = btn.textContent;
            btn.textContent = '✅ Copied!';
            btn.classList.add('copied');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});
// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// Cyberpunk card hover effect - RGB split
document.querySelectorAll('.archive-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Glitch effect on h1
const h1 = document.querySelector('h1');
if (h1) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            h1.style.textShadow = `
                0 0 10px var(--neon-cyan),
                0 0 20px var(--neon-cyan),
                2px 2px 0 var(--neon-pink),
                -2px -2px 0 var(--neon-purple)
            `;
            
            setTimeout(() => {
                h1.style.textShadow = `
                    0 0 10px var(--neon-pink),
                    0 0 20px var(--neon-pink),
                    0 0 30px var(--neon-pink),
                    0 0 40px var(--hot-pink)
                `;
            }, 100);
        }
    }, 3000);
}
