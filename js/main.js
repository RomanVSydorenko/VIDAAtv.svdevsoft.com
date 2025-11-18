/**
 * Main Application Entry Point
 * TV Monitoring Application for VIDAA Platform
 */

class MonitoringApp {
    constructor() {
        this.initialized = false;
        this.updateInterval = null;
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('Starting TV Monitoring Application...');
        
        try {
            // Update status
            this.updateStatus('Initializing...', false);

            // Initialize VIDAA platform
            const isVIDAA = await vidaaHandler.init();
            
            if (isVIDAA) {
                console.log('Running on VIDAA platform');
            } else {
                console.log('Running in development mode');
            }

            // Display system information
            this.displaySystemInfo();

            // Start monitoring
            this.startMonitoring();

            // Update status to active
            this.updateStatus('Active', true);
            
            this.initialized = true;
            console.log('Application initialized successfully');
            
        } catch (error) {
            console.error('Error initializing application:', error);
            this.updateStatus('Error', false);
        }
    }

    /**
     * Display system information
     */
    displaySystemInfo() {
        const systemInfo = vidaaHandler.getSystemInfo();
        
        document.getElementById('device-model').textContent = systemInfo.model || 'Unknown';
        document.getElementById('network-status').textContent = 
            systemInfo.isConnected ? 'Connected' : 'Disconnected';
        
        // Start clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    /**
     * Update clock display
     */
    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        document.getElementById('current-time').textContent = timeString;
    }

    /**
     * Start monitoring functionality
     */
    startMonitoring() {
        console.log('Starting monitoring...');
        
        // Initial update
        this.updateMonitoringData();
        
        // Update every 5 seconds
        this.updateInterval = setInterval(() => {
            this.updateMonitoringData();
        }, 5000);
    }

    /**
     * Update monitoring data display
     */
    updateMonitoringData() {
        const monitoringData = document.getElementById('monitoring-data');
        
        // Example monitoring data - replace with actual monitoring logic
        const data = {
            uptime: this.getUptime(),
            memoryUsage: this.getMemoryUsage(),
            activeConnections: this.getActiveConnections(),
            lastUpdate: new Date().toLocaleTimeString()
        };
        
        monitoringData.innerHTML = `
            <p>Uptime: <strong>${data.uptime}</strong></p>
            <p>Memory Usage: <strong>${data.memoryUsage}</strong></p>
            <p>Active Connections: <strong>${data.activeConnections}</strong></p>
            <p>Last Update: <strong>${data.lastUpdate}</strong></p>
        `;
    }

    /**
     * Get application uptime (mock)
     */
    getUptime() {
        const uptime = Math.floor(performance.now() / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    /**
     * Get memory usage (mock)
     */
    getMemoryUsage() {
        if (performance.memory) {
            const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
            const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
            return `${used} MB / ${total} MB`;
        }
        return 'N/A';
    }

    /**
     * Get active connections (mock)
     */
    getActiveConnections() {
        return Math.floor(Math.random() * 10) + 1;
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
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        console.log('Application cleanup complete');
    }
}

// Create app instance
const app = new MonitoringApp();

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
