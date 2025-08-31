// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Update button text based on current theme
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
    
    // Add some interactive elements for teaching purposes
    const messageBox = document.querySelector('.message-box');
    
    messageBox.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    messageBox.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Console message for students
    console.log('🎓 Welcome to the Teaching Template!');
    console.log('This template includes:');
    console.log('- CSS Grid layout');
    console.log('- Light/Dark theme switching');
    console.log('- Google Fonts (Poppins & Open Sans)');
    console.log('- Responsive design');
    console.log('- CSS custom properties');
    console.log('- Interactive elements');
});

// Example function for teaching JavaScript concepts
function exampleFunction() {
    alert('This is an example function for teaching!');
}