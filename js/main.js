/**
 * Main Application Entry Point
 * SV Dev Soft TV Viewer for VIDAA Platform
 */

class TVApp {
    constructor() {
        this.initialized = false;
        this.iframe = null;
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('Starting SV Dev Soft TV Application...');
        
        try {
            // Update status
            this.updateStatus('Loading...', false);

            // Initialize VIDAA platform
            const isVIDAA = await vidaaHandler.init();
            
            if (isVIDAA) {
                console.log('Running on VIDAA platform');
            } else {
                console.log('Running in development mode');
            }

            // Get iframe reference
            this.iframe = document.getElementById('store-iframe');
            
            // Setup iframe load handler
            this.iframe.addEventListener('load', () => {
                console.log('TV content loaded successfully');
                this.updateStatus('Ready', true);
            });
            
            this.iframe.addEventListener('error', () => {
                console.error('Error loading TV content');
                this.updateStatus('Error loading store', false);
            });
            
            this.initialized = true;
            console.log('Application initialized successfully');
            
        } catch (error) {
            console.error('Error initializing application:', error);
            this.updateStatus('Error', false);
        }
    }

    /**
     * Reload the content
     */
    reloadStore() {
        console.log('Reloading TV content...');
        if (this.iframe) {
            this.updateStatus('Reloading...', false);
            this.iframe.src = this.iframe.src;
        }
    }

    /**
     * Update application status
     */
    updateStatus(text, isActive) {
        const statusElement = document.getElementById('status');
        statusElement.textContent = text;
        statusElement.className = 'status';
        
        if (isActive) {
            statusElement.classList.add('active');
        } else if (text === 'Error') {
            statusElement.classList.add('error');
        }
    }

    /**
     * Cleanup when app is closed
     */
    cleanup() {
        console.log('Application cleanup complete');
    }
}

// Create app instance
const app = new TVApp();

// Initialize when DOM is ready
window.addEventListener('load', () => {
    app.init();
});

// Cleanup on unload
window.addEventListener('unload', () => {
    app.cleanup();
});

// Handle visibility changes (app pause/resume)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Application paused');
    } else {
        console.log('Application resumed');
    }
});
