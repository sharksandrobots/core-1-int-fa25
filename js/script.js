// Article Template JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const layoutToggle = document.getElementById('layout-toggle');
    const articleContainer = document.getElementById('article-container');
    const body = document.body;
    
    // Theme Management
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });
    
    function updateThemeButton(theme) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
    
    // Layout Management
    const layouts = ['default', 'magazine', 'featured', 'sidebar'];
    let currentLayoutIndex = 0;
    
    const currentLayout = localStorage.getItem('layout') || 'default';
    currentLayoutIndex = layouts.indexOf(currentLayout);
    applyLayout(currentLayout);
    
    layoutToggle.addEventListener('click', function() {
        currentLayoutIndex = (currentLayoutIndex + 1) % layouts.length;
        const newLayout = layouts[currentLayoutIndex];
        
        applyLayout(newLayout);
        localStorage.setItem('layout', newLayout);
        updateLayoutButton(newLayout);
    });
    
    function applyLayout(layout) {
        // Remove all layout classes
        body.className = body.className.replace(/layout-\w+/g, '');
        
        // Apply new layout class
        if (layout !== 'default') {
            body.classList.add(`layout-${layout}`);
        }
        
        updateLayoutButton(layout);
    }
    
    function updateLayoutButton(layout) {
        const icons = {
            default: '📄',
            magazine: '📰',
            featured: '🖼️',
            sidebar: '📱'
        };
        
        layoutToggle.textContent = icons[layout] || '📄';
        layoutToggle.setAttribute('aria-label', `Current layout: ${layout}. Click to change.`);
    }
    
    // Smooth scrolling for better UX
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
    
    // Reading progress indicator
    function updateReadingProgress() {
        const article = document.querySelector('.article-content');
        const scrolled = window.scrollY;
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        
        const progress = Math.max(0, Math.min(1, 
            (scrolled - articleTop + windowHeight * 0.2) / (articleHeight - windowHeight * 0.4)
        ));
        
        document.documentElement.style.setProperty('--reading-progress', `${progress * 100}%`);
    }
    
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress();
    
    // Lazy loading simulation for images
    function handleImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    handleImageLazyLoading();
    
    // Console messages for developers/students
    console.log('🎨 Article Template Loaded!');
    console.log('Available layouts:', layouts);
    console.log('Current layout:', layouts[currentLayoutIndex]);
    console.log('Theme:', currentTheme);
    console.log('');
    console.log('Layout switching: Click the layout button (📱) to cycle through different article layouts');
    console.log('Theme switching: Click the theme button (🌙/☀️) to toggle dark/light mode');
    console.log('');
    console.log('This template demonstrates:');
    console.log('- Multiple CSS Grid layout configurations');
    console.log('- Responsive design patterns');
    console.log('- Modern typography with Google Fonts');
    console.log('- Theme switching with CSS custom properties');
    console.log('- Semantic HTML structure for articles');
    console.log('- Accessibility considerations');
});

// Utility functions for teaching purposes
function showGridLines() {
    document.querySelectorAll('*').forEach(el => {
        if (getComputedStyle(el).display.includes('grid')) {
            el.style.outline = '2px dashed rgba(255, 0, 0, 0.5)';
        }
    });
    console.log('Grid containers highlighted with red dashed lines');
}

function hideGridLines() {
    document.querySelectorAll('*').forEach(el => {
        el.style.outline = '';
    });
    console.log('Grid highlighting removed');
}

// Export for teaching/debugging
window.articleTemplate = {
    showGridLines,
    hideGridLines,
    layouts,
    currentLayout: () => layouts[currentLayoutIndex]
};