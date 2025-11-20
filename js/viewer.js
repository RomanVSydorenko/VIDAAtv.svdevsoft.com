/**
 * Komitex TV Web Viewer Application
 * Displays tv.svdevsoft.com website in VIDAA Platform
 */

class KomitexWebViewer {
    constructor() {
        this.iframe = null;
        this.loadingScreen = null;
        this.errorScreen = null;
        this.loadTimeout = null;
        this.isLoaded = false;
        this.init();
    }

    async init() {
        console.log('Initializing Komitex Web Viewer...');

        // Initialize VIDAA platform
        if (window.vidaaHandler) {
            await vidaaHandler.init();
        }

        // Get elements
        this.iframe = document.getElementById('web-viewer');
        this.loadingScreen = document.getElementById('loading-screen');
        this.errorScreen = document.getElementById('error-screen');

        // Setup iframe event listeners
        this.setupIframeListeners();
        
        // Setup control buttons
        this.setupControlButtons();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();

        // Set loading timeout (30 seconds)
        this.loadTimeout = setTimeout(() => {
            if (!this.isLoaded) {
                this.showError();
            }
        }, 30000);

        console.log('Komitex Web Viewer initialized');
    }

    setupIframeListeners() {
        if (!this.iframe) return;

        // Handle iframe load
        this.iframe.addEventListener('load', () => {
            console.log('Website loaded successfully');
            this.isLoaded = true;
            this.hideLoading();
            clearTimeout(this.loadTimeout);
        });

        // Handle iframe error
        this.iframe.addEventListener('error', () => {
            console.error('Failed to load website');
            this.showError();
        });

        // Fallback: Hide loading after a short delay even if load event doesn't fire
        setTimeout(() => {
            if (!this.isLoaded) {
                console.log('Assuming iframe loaded (fallback)');
                this.hideLoading();
                this.isLoaded = true;
            }
        }, 3000);
    }

    setupControlButtons() {
        // Reload button
        const reloadBtn = document.getElementById('reload-btn');
        if (reloadBtn) {
            reloadBtn.addEventListener('click', () => {
                console.log('Reloading website...');
                this.reloadWebsite();
            });
        }

        // Fullscreen button
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        // Back button
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.goBack();
            });
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'F5':
                case 'r':
                case 'R':
                    // Reload
                    this.reloadWebsite();
                    e.preventDefault();
                    break;
                case 'f':
                case 'F':
                case 'F11':
                    // Fullscreen
                    this.toggleFullscreen();
                    e.preventDefault();
                    break;
                case 'Backspace':
                    // Back (only if not in input field)
                    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                        this.goBack();
                        e.preventDefault();
                    }
                    break;
                case 'Escape':
                    // Exit fullscreen or app
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else if (window.vidaaHandler) {
                        vidaaHandler.exitApp();
                    }
                    e.preventDefault();
                    break;
            }
        });
    }

    hideLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    showError() {
        console.error('Showing error screen');
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'none';
        }
        if (this.errorScreen) {
            this.errorScreen.classList.add('visible');
        }
        clearTimeout(this.loadTimeout);
    }

    reloadWebsite() {
        console.log('Reloading iframe...');
        this.isLoaded = false;
        
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
            this.loadingScreen.classList.remove('hidden');
        }
        
        if (this.errorScreen) {
            this.errorScreen.classList.remove('visible');
        }

        if (this.iframe) {
            this.iframe.src = this.iframe.src; // Reload iframe
        }

        // Reset timeout
        clearTimeout(this.loadTimeout);
        this.loadTimeout = setTimeout(() => {
            if (!this.isLoaded) {
                this.showError();
            }
        }, 30000);
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            console.log('Entered fullscreen mode');
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            console.log('Exited fullscreen mode');
        }
    }

    goBack() {
        // Try to go back in iframe history
        try {
            if (this.iframe && this.iframe.contentWindow) {
                this.iframe.contentWindow.history.back();
                console.log('Navigating back in iframe');
            }
        } catch (e) {
            console.warn('Cannot access iframe history due to CORS:', e);
            // Fallback: reload the main URL
            this.reloadWebsite();
        }
    }
}

// Initialize app when DOM is ready
window.addEventListener('load', () => {
    window.app = new KomitexWebViewer();
});

// Cleanup on unload
window.addEventListener('unload', () => {
    console.log('Komitex Web Viewer cleanup');
});
