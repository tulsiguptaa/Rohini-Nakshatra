// Dark Mode Theme Switcher
class ThemeSwitcher {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Setup event listener
        if (this.themeToggle) {
            this.themeToggle.checked = this.currentTheme === 'dark';
            this.themeToggle.addEventListener('change', () => this.toggleTheme());
        }
        
        // Add keyboard shortcut (Ctrl+Shift+D)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Detect system preference
        this.detectSystemTheme();
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle state
        if (this.themeToggle) {
            this.themeToggle.checked = theme === 'dark';
        }
        
        // Update theme icon
        this.updateThemeIcon(theme);
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.currentTheme = newTheme;
        this.setTheme(newTheme);
    }
    
    updateThemeIcon(theme) {
        const sunIcon = document.querySelector('.fa-sun');
        const moonIcon = document.querySelector('.fa-moon');
        
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline-block';
            } else {
                sunIcon.style.display = 'inline-block';
                moonIcon.style.display = 'none';
            }
        }
    }
    
    detectSystemTheme() {
        // Check if user has a theme preference
        if (localStorage.getItem('theme')) return;
        
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDark.matches) {
            this.setTheme('dark');
        }
        
        // Listen for system theme changes
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Method to check current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Method to force a theme
    forceTheme(theme) {
        this.currentTheme = theme;
        this.setTheme(theme);
    }
}

// Initialize theme switcher
document.addEventListener('DOMContentLoaded', () => {
    window.themeSwitcher = new ThemeSwitcher();
});