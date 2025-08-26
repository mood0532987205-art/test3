/**
 * Dark Mode Toggle Functionality
 * Handles theme switching between light and dark modes
 */

class DarkModeToggle {
    constructor() {
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light mode
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply the current theme
        this.applyTheme(this.currentTheme);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Update toggle button state
        this.updateToggleButton();
    }

    setupEventListeners() {
        // Find the dark mode toggle button
        const toggleButton = document.getElementById('dark-mode-toggle');
        
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateToggleButton();
        
        // Save preference
        localStorage.setItem('theme', this.currentTheme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: this.currentTheme }
        }));
    }

    applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;
        
        if (theme === 'dark') {
            html.classList.add('dark');
            body.classList.add('dark');
            html.setAttribute('data-theme', 'dark');
        } else {
            html.classList.remove('dark');
            body.classList.remove('dark');
            html.setAttribute('data-theme', 'light');
        }
        
        this.currentTheme = theme;
    }

    updateToggleButton() {
        const toggleButton = document.getElementById('dark-mode-toggle');
        if (!toggleButton) return;

        const moonIcon = toggleButton.querySelector('.sicon-moon');
        const sunIcon = toggleButton.querySelector('.sicon-sun');
        
        if (this.currentTheme === 'dark') {
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'inline-block';
            toggleButton.setAttribute('aria-label', 'Switch to light mode');
            toggleButton.setAttribute('title', 'Switch to light mode');
        } else {
            if (moonIcon) moonIcon.style.display = 'inline-block';
            if (sunIcon) sunIcon.style.display = 'none';
            toggleButton.setAttribute('aria-label', 'Switch to dark mode');
            toggleButton.setAttribute('title', 'Switch to dark mode');
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize dark mode toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeToggle = new DarkModeToggle();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}
