// Theme Setup
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check local storage for theme preference, default light
const savedTheme = localStorage.getItem('anim-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeUI(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('anim-theme', newTheme);
        updateThemeUI(newTheme);
    });
}

function updateThemeUI(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeToggle.innerHTML = '<span id="themeIcon">☀️</span> Light Mode';
    } else {
        themeIcon.textContent = '🌙';
        themeToggle.innerHTML = '<span id="themeIcon">🌙</span> Dark Mode';
    }
}

// Gallery Logic (Only runs if #gallery exists on the page)
const gallery = document.getElementById('gallery');
if (gallery) {
    const animations = [
        { id: 'float', name: 'Float', icon: '🛸', class: 'anim-float' },
        { id: 'pulse', name: 'Pulse', icon: '💓', class: 'anim-pulse' },
        { id: 'spin', name: 'Spin', icon: '🌀', class: 'anim-spin' },
        { id: 'bounce', name: 'Bounce', icon: '🏀', class: 'anim-bounce' },
        { id: 'shake', name: 'Shake', icon: '👋', class: 'anim-shake' },
        { id: 'flip', name: 'Flip', icon: '🎴', class: 'anim-flip' },
        { id: 'wobble', name: 'Wobble', icon: '🥴', class: 'anim-wobble' },
        { id: 'heartbeat', name: 'Heartbeat', icon: '❤️', class: 'anim-heartbeat' }
    ];

    function renderGallery() {
        gallery.innerHTML = animations.map(anim => `
            <div class="card" onclick="toggleAnimation(this)">
                <div class="card-header">
                    <span class="card-title">${anim.name}</span>
                    <button class="trigger-btn">Toggle</button>
                </div>
                <div class="anim-object ${anim.class}">
                    ${anim.icon}
                </div>
            </div>
        `).join('');
    }

    window.toggleAnimation = function(cardEl) {
        const object = cardEl.querySelector('.anim-object');
        object.classList.toggle('paused');
        
        cardEl.style.transform = 'scale(0.95)';
        setTimeout(() => {
            cardEl.style.transform = '';
        }, 150);
    };

    document.querySelectorAll('.control-btn[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const objects = document.querySelectorAll('.anim-object');
            
            objects.forEach(obj => {
                if (action === 'play-all') {
                    obj.classList.remove('paused');
                } else if (action === 'pause-all') {
                    obj.classList.add('paused');
                }
            });
        });
    });

    // Initial render
    renderGallery();
}
