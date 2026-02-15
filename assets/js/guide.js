document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       FAQ Toggle
    ========================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });


    /* =========================
       Interactive Checklist
    ========================== */
    const checkboxes = document.querySelectorAll('.interactive-checklist input[type="checkbox"]');
    const progressText = document.getElementById('progress-text');

    if (checkboxes.length > 0 && progressText) {
        function updateProgress() {
            const total = checkboxes.length;
            const checked = document.querySelectorAll('.interactive-checklist input[type="checkbox"]:checked').length;
            progressText.textContent = `${checked}/${total} complete`;

            const checklistState = Array.from(checkboxes).map(cb => cb.checked);
            localStorage.setItem('kakehashi-checklist', JSON.stringify(checklistState));
        }

        const saved = localStorage.getItem('kakehashi-checklist');
        if (saved) {
            const state = JSON.parse(saved);
            checkboxes.forEach((cb, i) => {
                if (state[i]) cb.checked = true;
            });
            updateProgress();
        }

        checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
    }


    /* =========================
       Reading Progress Bar
    ========================== */
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


    /* =========================
       Smooth Scroll
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });


    /* =========================
       Copy to Clipboard
    ========================== */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

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
                console.error('Copy failed:', err);
            }
        });
    });


    /* =========================
       Back To Top
    ========================== */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 500);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* =========================
       Archive Hover RGB
    ========================== */
    document.querySelectorAll('.archive-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });


    /* =========================
       Glitch Effect
    ========================== */
    const h1 = document.querySelector('h1');
    if (h1) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                h1.style.textShadow = `
                    0 0 10px var(--neon-cyan),
                    2px 2px 0 var(--neon-pink),
                    -2px -2px 0 var(--neon-purple)
                `;

                setTimeout(() => {
                    h1.style.textShadow = `
                        0 0 10px var(--neon-pink),
                        0 0 20px var(--hot-pink)
                    `;
                }, 100);
            }
        }, 3000);
    }


    /* =====================================================
       ✿ 3x3 SLIDING PUZZLE (My Stamps Section)
    ====================================================== */

    const puzzle = document.getElementById("puzzle");
    const shuffleBtn = document.getElementById("shuffleBtn");
    const winMessage = document.getElementById("winMessage");

    if (puzzle && shuffleBtn && winMessage) {

        const size = 3;
        const tileSize = 90;
        const imageSrc = "../assets/images/stamp-main.jpg"; // adjust path
        let tiles = [];
        let emptyIndex = 8;

        function initPuzzle() {
            puzzle.innerHTML = "";
            tiles = [];

            for (let i = 0; i < 9; i++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.index = i;

                if (i === 8) {
                    tile.classList.add("empty");
                    emptyIndex = i;
                } else {
                    const row = Math.floor(i / size);
                    const col = i % size;

                    tile.style.backgroundImage = `url(${imageSrc})`;
                    tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
                    tile.style.backgroundSize = `${tileSize * size}px ${tileSize * size}px`;
                }

                tile.addEventListener("click", () => moveTile(i));
                puzzle.appendChild(tile);
                tiles.push(tile);
            }
        }

        function isAdjacent(i1, i2) {
            const r1 = Math.floor(i1 / size);
            const c1 = i1 % size;
            const r2 = Math.floor(i2 / size);
            const c2 = i2 % size;
            return (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;
        }

        function swap(i1, i2) {
            const tempBg = tiles[i1].style.backgroundPosition;
            const tempImg = tiles[i1].style.backgroundImage;

            tiles[i1].style.backgroundPosition = tiles[i2].style.backgroundPosition;
            tiles[i1].style.backgroundImage = tiles[i2].style.backgroundImage;

            tiles[i2].style.backgroundPosition = tempBg;
            tiles[i2].style.backgroundImage = tempImg;

            tiles[i1].classList.toggle("empty");
            tiles[i2].classList.toggle("empty");
        }

        function moveTile(index) {
            if (isAdjacent(index, emptyIndex)) {
                swap(index, emptyIndex);
                emptyIndex = index;
                checkWin();
            }
        }

        function shufflePuzzle() {
            for (let i = 0; i < 200; i++) {
                const neighbors = [];
                for (let j = 0; j < 9; j++) {
                    if (isAdjacent(j, emptyIndex)) neighbors.push(j);
                }
                const rand = neighbors[Math.floor(Math.random() * neighbors.length)];
                swap(rand, emptyIndex);
                emptyIndex = rand;
            }
            winMessage.style.display = "none";
        }

        function checkWin() {
            let correct = true;
            for (let i = 0; i < 8; i++) {
                const row = Math.floor(i / size);
                const col = i % size;
                const expected = `-${col * tileSize}px -${row * tileSize}px`;

                if (tiles[i].style.backgroundPosition !== expected) {
                    correct = false;
                    break;
                }
            }
            if (correct) winMessage.style.display = "block";
        }

        shuffleBtn.addEventListener("click", shufflePuzzle);

        initPuzzle();
        shufflePuzzle();
    }

});
