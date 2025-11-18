/**
 * Komitex TV Application
 * Ukrainian TV Channels Viewer for VIDAA Platform
 */

class KomitexTV {
    constructor() {
        this.channels = [
            { number: 1, icon: '📺', name: '1+1 Україна', url: 'https://tv.svdevsoft.com' },
            { number: 2, icon: '📺', name: '1+1 Марафон', url: 'https://tv.svdevsoft.com' },
            { number: 3, icon: '📺', name: 'ICTV', url: 'https://tv.svdevsoft.com' },
            { number: 4, icon: '📺', name: 'ICTV 2', url: 'https://tv.svdevsoft.com' },
            { number: 5, icon: '🆕', name: 'Новий канал', url: 'https://tv.svdevsoft.com' },
            { number: 6, icon: '📺', name: 'СТБ', url: 'https://tv.svdevsoft.com' },
            { number: 7, icon: '📺', name: 'Ми Україна +', url: 'https://tv.svdevsoft.com' },
            { number: 8, icon: '📺', name: '2+2', url: 'https://tv.svdevsoft.com' },
            { number: 9, icon: '📺', name: 'ТЕТ', url: 'https://tv.svdevsoft.com' },
            { number: 10, icon: '🪖', name: 'Армія TV', url: 'https://tv.svdevsoft.com' },
            { number: 11, icon: '📺', name: 'Перший', url: 'https://tv.svdevsoft.com' }
        ];

        this.programs = [
            { time: '10:30', title: '"Одруження наосліп"' },
            { time: '12:25', title: 'Т/с "Центральна лікарня", 54-56 с.', isLive: true },
            { time: '15:15', title: 'Т/с "Метод Бугіл", 2 сезон, 5-7 с.' },
            { time: '18:00', title: 'Т/с "Таємниці архівів", 8 с.' }
        ];

        this.currentChannelIndex = 0;
        this.focusedElement = null;
        this.init();
    }

    async init() {
        console.log('Initializing Komitex TV...');

        // Initialize VIDAA platform
        if (window.vidaaHandler) {
            await vidaaHandler.init();
        }

        // Render UI
        this.renderChannels();
        this.renderPrograms();
        this.setupEventListeners();
        this.selectChannel(0);

        // Create logo if not exists
        this.createLogo();

        console.log('Komitex TV initialized');
    }

    createLogo() {
        const logoImg = document.getElementById('logo-img');
        if (!logoImg) return;

        // Create SVG logo similar to Komitex
        const logoSvg = `
            <svg width="400" height="80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#00c8ff;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#0080ff;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <text x="10" y="60" font-family="Arial, sans-serif" font-size="72" font-weight="bold" 
                      fill="url(#grad1)" style="font-style:italic;">Komitex</text>
            </svg>
        `;

        logoImg.src = 'data:image/svg+xml;base64,' + btoa(logoSvg);
        logoImg.alt = 'Komitex';
    }

    renderChannels() {
        const channelsList = document.getElementById('channels-list');
        if (!channelsList) return;

        channelsList.innerHTML = '';

        this.channels.forEach((channel, index) => {
            const channelItem = document.createElement('div');
            channelItem.className = 'channel-item focusable';
            channelItem.dataset.index = index;
            
            channelItem.innerHTML = `
                <span class="channel-number">${channel.number}</span>
                <span class="channel-icon">${channel.icon}</span>
                <span class="channel-name">${channel.name}</span>
                <span class="channel-status">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.5">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </span>
            `;

            channelItem.addEventListener('click', () => this.selectChannel(index));
            channelsList.appendChild(channelItem);
        });
    }

    renderPrograms() {
        const programList = document.getElementById('program-list');
        if (!programList) return;

        programList.innerHTML = '';

        this.programs.forEach((program, index) => {
            const programItem = document.createElement('div');
            programItem.className = 'program-item focusable';
            if (program.isLive) {
                programItem.classList.add('active');
            }

            programItem.innerHTML = `
                <span class="program-time">${program.time}</span>
                <span class="program-title">${program.title}</span>
                ${program.isLive ? '<span class="program-badge">Ефір</span>' : ''}
            `;

            programList.appendChild(programItem);
        });
    }

    selectChannel(index) {
        // Remove active class from all channels
        document.querySelectorAll('.channel-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to selected channel
        const channelItems = document.querySelectorAll('.channel-item');
        if (channelItems[index]) {
            channelItems[index].classList.add('active');
            this.currentChannelIndex = index;

            // Update channel display
            const currentChannelEl = document.getElementById('current-channel');
            if (currentChannelEl) {
                currentChannelEl.textContent = this.channels[index].name;
            }

            console.log('Selected channel:', this.channels[index].name);
        }
    }

    setupEventListeners() {
        // Keyboard navigation for development
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    this.navigateChannels(-1);
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    this.navigateChannels(1);
                    e.preventDefault();
                    break;
                case 'Enter':
                    // Play selected channel
                    console.log('Playing channel:', this.channels[this.currentChannelIndex].name);
                    break;
                case 'Escape':
                    if (window.vidaaHandler) {
                        vidaaHandler.exitApp();
                    }
                    break;
            }
        });

        // Control buttons
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                }
            });
        }
    }

    navigateChannels(direction) {
        const newIndex = this.currentChannelIndex + direction;
        if (newIndex >= 0 && newIndex < this.channels.length) {
            this.selectChannel(newIndex);

            // Scroll channel into view
            const channelItems = document.querySelectorAll('.channel-item');
            if (channelItems[newIndex]) {
                channelItems[newIndex].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        }
    }
}

// Initialize app when DOM is ready
window.addEventListener('load', () => {
    window.app = new KomitexTV();
});

// Cleanup on unload
window.addEventListener('unload', () => {
    console.log('Komitex TV cleanup');
});
