/**
 * VIDAA Platform Handler
 * Manages VIDAA-specific APIs and platform integration
 */

class VIDAAHandler {
    constructor() {
        this.isVIDAAPlatform = false;
        this.systemInfo = {};
        this.initialized = false;
    }

    /**
     * Initialize VIDAA platform APIs
     */
    async init() {
        console.log('Initializing VIDAA Handler...');
        
        try {
            // Check if running on VIDAA platform
            if (typeof webapis !== 'undefined') {
                this.isVIDAAPlatform = true;
                console.log('VIDAA platform detected');
                
                // Initialize platform APIs
                await this.initializeAPIs();
                this.initialized = true;
                
                return true;
            } else {
                console.warn('Not running on VIDAA platform - using mock mode');
                this.initializeMockMode();
                this.initialized = true;
                return false;
            }
        } catch (error) {
            console.error('Error initializing VIDAA Handler:', error);
            this.initializeMockMode();
            this.initialized = true;
            return false;
        }
    }

    /**
     * Initialize VIDAA APIs
     */
    async initializeAPIs() {
        try {
            // Get device information
            if (webapis.tv) {
                this.systemInfo.model = webapis.tv.getModel();
                this.systemInfo.firmware = webapis.tv.getFirmware();
                console.log('Device Model:', this.systemInfo.model);
                console.log('Firmware:', this.systemInfo.firmware);
            }

            // Get network information
            if (webapis.network) {
                this.systemInfo.macAddress = webapis.network.getMac();
                this.systemInfo.isConnected = webapis.network.isConnectedToGateway();
                console.log('Network connected:', this.systemInfo.isConnected);
            }

            // Register key event handler
            this.registerKeyHandler();
            
        } catch (error) {
            console.error('Error initializing VIDAA APIs:', error);
        }
    }

    /**
     * Initialize mock mode for development/testing
     */
    initializeMockMode() {
        console.log('Running in mock mode');
        this.systemInfo = {
            model: 'VIDAA-MOCK-TV',
            firmware: '1.0.0-DEV',
            macAddress: '00:00:00:00:00:00',
            isConnected: true
        };
    }

    /**
     * Register remote control key handler
     */
    registerKeyHandler() {
        if (!this.isVIDAAPlatform) {
            // Fallback to keyboard for development
            document.addEventListener('keydown', this.handleKeyPress.bind(this));
            return;
        }

        // Register VIDAA key events
        try {
            if (webapis.tv && webapis.tv.registerKeyHandler) {
                webapis.tv.registerKeyHandler([
                    'VK_BACK',
                    'VK_EXIT',
                    'VK_ENTER',
                    'VK_UP',
                    'VK_DOWN',
                    'VK_LEFT',
                    'VK_RIGHT'
                ], this.handleRemoteKey.bind(this));
            }
        } catch (error) {
            console.error('Error registering key handler:', error);
        }
    }

    /**
     * Handle remote control keys
     */
    handleRemoteKey(event) {
        console.log('Remote key pressed:', event.keyCode);
        
        switch(event.keyCode) {
            case 10009: // VK_BACK
            case 10182: // VK_EXIT
                this.exitApp();
                break;
            case 13: // VK_ENTER
                // Handle select/enter
                break;
            case 37: // VK_LEFT
                // Handle left navigation
                break;
            case 38: // VK_UP
                // Handle up navigation
                break;
            case 39: // VK_RIGHT
                // Handle right navigation
                break;
            case 40: // VK_DOWN
                // Handle down navigation
                break;
        }
    }

    /**
     * Handle keyboard for development
     */
    handleKeyPress(event) {
        console.log('Key pressed:', event.key);
        
        switch(event.key) {
            case 'Escape':
            case 'Backspace':
                this.exitApp();
                break;
            case 'Enter':
                // Handle select
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
                // Handle navigation
                break;
        }
    }

    /**
     * Exit the application
     */
    exitApp() {
        console.log('Exiting application...');
        
        if (this.isVIDAAPlatform && webapis.tv) {
            try {
                webapis.tv.exit();
            } catch (error) {
                console.error('Error exiting app:', error);
            }
        } else {
            // In development mode, just show message
            if (confirm('Exit application?')) {
                window.close();
            }
        }
    }

    /**
     * Get system information
     */
    getSystemInfo() {
        return this.systemInfo;
    }

    /**
     * Check if running on VIDAA platform
     */
    isVIDAA() {
        return this.isVIDAAPlatform;
    }
}

// Create global instance
const vidaaHandler = new VIDAAHandler();
