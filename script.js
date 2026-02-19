document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Add cute cursor trail effect (optional - comment out if too much)
    let sparkleCount = 0;
    document.addEventListener('mousemove', function(e) {
        if (sparkleCount % 5 === 0) { // Only create sparkle every 5 mouse moves
            createSparkle(e.pageX, e.pageY);
        }
        sparkleCount++;
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ffcce0, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkleAnim 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }

    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnim {
            0% {
                transform: scale(0) translateY(0);
                opacity: 1;
            }
            100% {
                transform: scale(1.5) translateY(-10px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

});
