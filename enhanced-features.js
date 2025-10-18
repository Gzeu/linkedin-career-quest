// Enhanced Game Features and Visual Effects

// Sound System
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    }

    playSound(type) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        switch (type) {
            case 'click':
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
                break;
            case 'success':
                oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.3);
                break;
            case 'achievement':
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.4);
                break;
        }
    }
}

// Particle System for Visual Effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle(x, y, color = '#0077b5', type = 'circle') {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 4 + 2,
            color: color,
            type: type
        };
    }

    burst(x, y, count = 15, color = '#0077b5') {
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(x, y, color));
        }
    }

    confetti(x, y) {
        const colors = ['#0077b5', '#00a0dc', '#28a745', '#ffc107', '#dc3545'];
        for (let i = 0; i < 25; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.particles.push(this.createParticle(x, y, color, 'confetti'));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            
            if (particle.type === 'confetti') {
                this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size / 2);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced UI Animations
class UIAnimations {
    static slideIn(element, direction = 'up') {
        element.style.opacity = '0';
        element.style.transform = direction === 'up' ? 'translateY(20px)' : 'translateX(-20px)';
        element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
        }, 50);
    }

    static pulse(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'pulse 0.6s ease-in-out';
        }, 10);
    }

    static shake(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = 'none';
        }, 500);
    }

    static glow(element, color = '#0077b5') {
        element.style.boxShadow = `0 0 20px ${color}`;
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 1000);
    }
}

// Notification System
class NotificationSystem {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: all 0.3s ease;
            pointer-events: auto;
            cursor: pointer;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="${this.getIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.container.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
        
        // Click to dismiss
        notification.onclick = () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
    }

    getBackgroundColor(type) {
        switch (type) {
            case 'success': return 'linear-gradient(135deg, #28a745, #20c997)';
            case 'error': return 'linear-gradient(135deg, #dc3545, #fd7e14)';
            case 'warning': return 'linear-gradient(135deg, #ffc107, #fd7e14)';
            default: return 'linear-gradient(135deg, #0077b5, #00a0dc)';
        }
    }

    getIcon(type) {
        switch (type) {
            case 'success': return 'fas fa-check-circle';
            case 'error': return 'fas fa-exclamation-triangle';
            case 'warning': return 'fas fa-exclamation-circle';
            default: return 'fas fa-info-circle';
        }
    }
}

// Game Enhancement Manager
class GameEnhancements {
    constructor() {
        this.soundSystem = new SoundSystem();
        this.particleSystem = new ParticleSystem();
        this.notifications = new NotificationSystem();
        this.init();
    }

    init() {
        this.addClickSounds();
        this.addHoverEffects();
        this.addKeyboardShortcuts();
    }

    addClickSounds() {
        // Add click sounds to buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .action-btn, .menu-card')) {
                this.soundSystem.playSound('click');
            }
        });
    }

    addHoverEffects() {
        // Add enhanced hover effects
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            .enhanced-hover {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .enhanced-hover:hover {
                transform: translateY(-2px);
                filter: brightness(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (window.game && window.game.saveGame) {
                    window.game.saveGame();
                    this.notifications.show('Game saved!', 'success', 2000);
                }
            }
        });
    }

    celebrateAchievement(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        this.particleSystem.confetti(x, y);
        this.soundSystem.playSound('achievement');
        UIAnimations.glow(element, '#ffd700');
    }

    celebratePromotion(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        this.particleSystem.burst(x, y, 30, '#28a745');
        this.soundSystem.playSound('success');
        UIAnimations.pulse(element);
    }

    showSkillIncrease(skillElement, amount) {
        const notification = document.createElement('div');
        notification.textContent = `+${amount}`;
        notification.style.cssText = `
            position: absolute;
            color: #28a745;
            font-weight: bold;
            font-size: 1.2rem;
            z-index: 1000;
            pointer-events: none;
            animation: skillBonus 1.5s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes skillBonus {
                0% { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-20px) scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-40px) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
        
        skillElement.style.position = 'relative';
        skillElement.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 1500);
    }
}

// Initialize enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameEnhancements = new GameEnhancements();
    
    // Add enhanced class to interactive elements
    const interactiveElements = document.querySelectorAll('button, .action-btn, .menu-card, .skill-item');
    interactiveElements.forEach(el => {
        el.classList.add('enhanced-hover');
    });
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.SoundSystem = SoundSystem;
    window.ParticleSystem = ParticleSystem;
    window.UIAnimations = UIAnimations;
    window.NotificationSystem = NotificationSystem;
    window.GameEnhancements = GameEnhancements;
}
