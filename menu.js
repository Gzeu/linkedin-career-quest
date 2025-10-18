// Menu System JavaScript
class MenuSystem {
    constructor() {
        this.init();
    }

    init() {
        this.loadMenuData();
        this.setupEventListeners();
    }

    loadMenuData() {
        // Load saved game data for menu display
        const savedGame = localStorage.getItem('linkedinCareerQuest');
        
        if (savedGame) {
            const gameState = JSON.parse(savedGame);
            document.getElementById('last-save').textContent = 
                `${gameState.player.currentRole} at ${gameState.player.currentCompany}`;
            
            // Update profile preview
            const profilePreview = document.getElementById('profile-preview');
            if (profilePreview) {
                profilePreview.innerHTML = 
                    `<span>${gameState.player.currentRole} | $${gameState.player.salary.toLocaleString()}</span>`;
            }
        } else {
            const profilePreview = document.getElementById('profile-preview');
            if (profilePreview) {
                profilePreview.textContent = 'No career started';
            }
        }
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.startGame();
            }
        });
    }

    // Game Navigation
    startGame() {
        // Navigate to game
        window.location.href = 'index.html';
    }

    continueGame() {
        const savedGame = localStorage.getItem('linkedinCareerQuest');
        if (savedGame) {
            this.startGame();
        } else {
            alert('No saved game found. Starting a new career!');
            this.startGame();
        }
    }

    showTutorial() {
        alert('Tutorial: Build your network, develop skills, apply for jobs, and create content to advance your career!');
    }

    showProfile() {
        const savedGame = localStorage.getItem('linkedinCareerQuest');
        if (savedGame) {
            const gameState = JSON.parse(savedGame);
            alert(`Profile:\nRole: ${gameState.player.currentRole}\nCompany: ${gameState.player.currentCompany}\nSalary: $${gameState.player.salary.toLocaleString()}\nConnections: ${gameState.player.connections}`);
        } else {
            alert('No profile data available. Start a new career!');
        }
    }
}

// Global functions for onclick handlers
let menuSystem;

document.addEventListener('DOMContentLoaded', () => {
    menuSystem = new MenuSystem();
});

function startGame() {
    menuSystem.startGame();
}

function continueGame() {
    menuSystem.continueGame();
}

function showTutorial() {
    menuSystem.showTutorial();
}

function showProfile() {
    menuSystem.showProfile();
}
