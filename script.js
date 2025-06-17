// Birthday Website Interactive Features
class BirthdayWebsite {
    constructor() {
        this.musicPlaying = false;
        this.candlesBlown = 0;
        this.totalCandles = 5;
        this.confettiInterval = null;
        this.countdownInterval = null;
        this.targetTime = null;
        
        this.initCountdown();
    }

    initCountdown() {
        // Set target time to 1 minute from now (for demo purposes)
        // In real implementation, you might want to set a specific time
        this.targetTime = new Date();
        this.targetTime.setMinutes(this.targetTime.getMinutes() + 1);
        this.targetTime.setSeconds(0);
        this.targetTime.setMilliseconds(0);
        
        this.startCountdown();
    }

    startCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        const overlay = document.getElementById('countdown-overlay');
        const birthdayContent = document.getElementById('birthday-content');
        
        this.countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = this.targetTime.getTime() - now;
            
            if (timeLeft <= 0) {
                // Countdown finished - show birthday content
                clearInterval(this.countdownInterval);
                overlay.style.display = 'none';
                birthdayContent.classList.add('show');
                this.init(); // Initialize birthday website
                this.showSpecialMessage("🎉 HAPPY BIRTHDAY DADAVAI! 🎉");
                
                // Auto start celebration
                setTimeout(() => {
                    this.triggerSurprise();
                    this.launchFireworks();
                }, 1000);
                
                return;
            }
            
            // Calculate time components
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Format time display
            const timeString = `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            countdownElement.textContent = timeString;
            
            // Add urgency effects when close to zero
            if (timeLeft < 10000) { // Last 10 seconds
                countdownElement.style.color = '#ff0000';
                countdownElement.style.animation = 'timerPulse 0.5s ease-in-out infinite';
            }
        }, 100);
    }

    init() {
        this.setupEventListeners();
        this.startConfetti();
        this.startFloatingElements();
        this.startFloatingHearts();
        this.setupAutoMusic();
    }

    setupEventListeners() {
        // Music control
        const musicToggle = document.getElementById('music-toggle');
        const birthdayMusic = document.getElementById('birthday-music');
        
        musicToggle.addEventListener('click', () => {
            this.toggleMusic();
        });

        // Cake interaction
        const birthdayCake = document.getElementById('birthday-cake');
        birthdayCake.addEventListener('click', (e) => {
            this.handleCakeClick(e);
        });

        // Individual candles
        const candles = document.querySelectorAll('.candle');
        candles.forEach((candle, index) => {
            candle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.blowOutCandle(candle, index);
            });
        });

        // Balloons interaction
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            balloon.addEventListener('click', () => {
                this.popBalloon(balloon);
            });
        });

        // Interactive buttons
        const surpriseBtn = document.getElementById('surprise-btn');
        const fireworksBtn = document.getElementById('fireworks-btn');

        surpriseBtn.addEventListener('click', () => {
            this.triggerSurprise();
        });

        fireworksBtn.addEventListener('click', () => {
            this.launchFireworks();
        });

        // Keyboard interactions
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Photo gallery interactions
        const polaroids = document.querySelectorAll('.polaroid');
        polaroids.forEach(polaroid => {
            polaroid.addEventListener('click', () => {
                this.animatePolaroid(polaroid);
            });
        });
    }

    setupAutoMusic() {
        // Try to play music automatically (some browsers block this)
        setTimeout(() => {
            this.toggleMusic();
        }, 1000);
    }

    toggleMusic() {
        const musicToggle = document.getElementById('music-toggle');
        const birthdayMusic = document.getElementById('birthday-music');

        if (this.musicPlaying) {
            birthdayMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            this.musicPlaying = false;
        } else {
            // Try to play music, fallback to Web Audio API tone if file doesn't load
            birthdayMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.musicPlaying = true;
            }).catch(() => {
                // Fallback: create a simple birthday tune with Web Audio API
                this.playBirthdayTune();
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.musicPlaying = true;
            });
        }
    }

    playBirthdayTune() {
        if (!window.AudioContext && !window.webkitAudioContext) return;
        
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Simple birthday melody notes (frequencies)
        const melody = [
            { freq: 262, duration: 0.5 }, // C
            { freq: 262, duration: 0.5 }, // C
            { freq: 294, duration: 1 },   // D
            { freq: 262, duration: 1 },   // C
            { freq: 349, duration: 1 },   // F
            { freq: 330, duration: 2 },   // E
        ];

        let currentTime = audioContext.currentTime;
        
        melody.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration);
            
            currentTime += note.duration;
        });
    }

    handleCakeClick(e) {
        const cake = e.currentTarget;
        
        // Add click animation
        cake.classList.add('surprise-active');
        setTimeout(() => {
            cake.classList.remove('surprise-active');
        }, 1000);

        // Blow out all candles
        this.blowOutAllCandles();
        
        // Create special effect
        this.createCakeClickEffect();
    }

    blowOutCandle(candle, index) {
        if (candle.classList.contains('blown-out')) return;
        
        candle.classList.add('blown-out');
        this.candlesBlown++;
        
        // Add blow effect
        this.createBlowEffect(candle);
        
        // Check if all candles are blown out
        if (this.candlesBlown >= this.totalCandles) {
            setTimeout(() => {
                this.celebrateAllCandlesBlown();
            }, 500);
        }
    }

    blowOutAllCandles() {
        const candles = document.querySelectorAll('.candle');
        candles.forEach((candle, index) => {
            setTimeout(() => {
                this.blowOutCandle(candle, index);
            }, index * 100);
        });
    }

    createBlowEffect(candle) {
        const rect = candle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        
        // Create smoke effect
        for (let i = 0; i < 5; i++) {
            const smoke = document.createElement('div');
            smoke.style.position = 'fixed';
            smoke.style.left = x + 'px';
            smoke.style.top = y + 'px';
            smoke.style.width = '10px';
            smoke.style.height = '10px';
            smoke.style.background = 'rgba(200, 200, 200, 0.8)';
            smoke.style.borderRadius = '50%';
            smoke.style.pointerEvents = 'none';
            smoke.style.zIndex = '1000';
            smoke.style.animation = `smokeRise 2s ease-out forwards`;
            
            document.body.appendChild(smoke);
            
            setTimeout(() => {
                smoke.remove();
            }, 2000);
        }
    }

    celebrateAllCandlesBlown() {
        // Add special celebration
        document.body.classList.add('party-mode');
        
        // Show special message
        this.showSpecialMessage("🎉 All candles blown! Make a wish, Dadavai! 🎉");
        
        // Launch fireworks
        if (window.particleSystem) {
            window.particleSystem.launchRandomFireworks();
        }
        
        // Stop party mode after 3 seconds
        setTimeout(() => {
            document.body.classList.remove('party-mode');
        }, 3000);
    }

    createCakeClickEffect() {
        const effects = ['🎉', '✨', '🎊', '💫', '⭐'];
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const effect = document.createElement('div');
                effect.textContent = effects[Math.floor(Math.random() * effects.length)];
                effect.style.position = 'fixed';
                effect.style.left = Math.random() * window.innerWidth + 'px';
                effect.style.top = Math.random() * window.innerHeight + 'px';
                effect.style.fontSize = '2rem';
                effect.style.pointerEvents = 'none';
                effect.style.zIndex = '1000';
                effect.style.animation = 'fadeUpOut 2s ease-out forwards';
                
                document.body.appendChild(effect);
                
                setTimeout(() => {
                    effect.remove();
                }, 2000);
            }, i * 100);
        }
    }

    popBalloon(balloon) {
        // Create pop effect
        balloon.style.transform = 'scale(1.5)';
        balloon.style.opacity = '0';
        
        // Create pop particles
        const rect = balloon.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        this.createPopEffect(x, y);
        
        // Reset balloon after animation
        setTimeout(() => {
            balloon.style.transform = '';
            balloon.style.opacity = '';
        }, 1000);
    }

    createPopEffect(x, y) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.style.animation = `popParticle 1s ease-out forwards`;
            particle.style.setProperty('--vx', vx + 'px');
            particle.style.setProperty('--vy', vy + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    triggerSurprise() {
        const surpriseBtn = document.getElementById('surprise-btn');
        surpriseBtn.classList.add('surprise-active');
        
        // Multiple surprise effects
        this.showSpecialMessage("🎁 SURPRISE! You're amazing, Dadavai! 🎁");
        this.createConfettiBurst();
        this.startPartyMode();
        
        setTimeout(() => {
            surpriseBtn.classList.remove('surprise-active');
        }, 1000);
    }

    launchFireworks() {
        const fireworksBtn = document.getElementById('fireworks-btn');
        fireworksBtn.classList.add('surprise-active');
        
        if (window.particleSystem) {
            window.particleSystem.launchRandomFireworks();
        }
        
        this.showSpecialMessage("🚀 Happy Birthday Fireworks! 🎆");
        
        setTimeout(() => {
            fireworksBtn.classList.remove('surprise-active');
        }, 1000);
    }

    startPartyMode() {
        document.body.classList.add('party-mode');
        setTimeout(() => {
            document.body.classList.remove('party-mode');
        }, 5000);
    }

    showSpecialMessage(message) {
        // Remove existing message
        const existingMessage = document.querySelector('.special-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'special-message';
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '50%';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translate(-50%, -50%)';
        messageDiv.style.background = 'rgba(255, 255, 255, 0.95)';
        messageDiv.style.color = '#333';
        messageDiv.style.padding = '20px 40px';
        messageDiv.style.borderRadius = '20px';
        messageDiv.style.fontSize = '1.5rem';
        messageDiv.style.fontWeight = 'bold';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.zIndex = '10000';
        messageDiv.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        messageDiv.style.animation = 'messagePopIn 0.5s ease-out';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'messagePopOut 0.5s ease-in forwards';
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 3000);
    }

    createConfettiBurst() {
        const confettiContainer = document.getElementById('confetti-container');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 50);
        }
    }

    startConfetti() {
        this.confettiInterval = setInterval(() => {
            this.createConfettiBurst();
        }, 5000);
    }

    startFloatingElements() {
        // Restart floating elements animation periodically
        setInterval(() => {
            const floatingElements = document.querySelectorAll('.floating-icon');
            floatingElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.animation = 'none';
                    element.offsetHeight; // Trigger reflow
                    element.style.animation = `floatingIcon 8s linear infinite`;
                    element.style.animationDelay = `-${index * 1.5}s`;
                }, index * 200);
            });
        }, 30000);
    }

    startFloatingHearts() {
        const heartsContainer = document.getElementById('floating-hearts');
        
        // Create hearts continuously
        setInterval(() => {
            this.createFloatingHeart(heartsContainer);
        }, 2000);

        // Create initial hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createFloatingHeart(heartsContainer);
            }, i * 1000);
        }
    }

    createFloatingHeart(container) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }

    animatePolaroid(polaroid) {
        // Create heart burst effect
        const rect = polaroid.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💕';
                heart.style.position = 'fixed';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.fontSize = '20px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';
                heart.style.color = '#ff1493';
                
                const angle = (i / 6) * Math.PI * 2;
                const distance = 80;
                const targetX = centerX + Math.cos(angle) * distance;
                const targetY = centerY + Math.sin(angle) * distance;
                
                heart.style.animation = `heartBurst 1.5s ease-out forwards`;
                heart.style.setProperty('--target-x', targetX + 'px');
                heart.style.setProperty('--target-y', targetY + 'px');
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 1500);
            }, i * 100);
        }
        
        // Show love message
        this.showSpecialMessage("💖 Beautiful memories with Dadavai! 💖");
    }

    handleKeyboard(e) {
        switch(e.key.toLowerCase()) {
            case ' ': // Spacebar
                e.preventDefault();
                this.launchFireworks();
                break;
            case 'm':
                this.toggleMusic();
                break;
            case 's':
                this.triggerSurprise();
                break;
            case 'c':
                this.blowOutAllCandles();
                break;
        }
    }
}

// Add required CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes smokeRise {
        0% { transform: translateY(0) scale(1); opacity: 0.8; }
        100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
    }
    
    @keyframes fadeUpOut {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
    }
    
    @keyframes popParticle {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--vx), var(--vy)) scale(0); opacity: 0; }
    }
    
    @keyframes messagePopIn {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes messagePopOut {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
    }
    
    @keyframes heartBurst {
        0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translate(calc(var(--target-x) - 50vw), calc(var(--target-y) - 50vh)) scale(0.5); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(style);

// Initialize the birthday website
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayWebsite();
});

// Add a welcome message when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const welcomeMessage = "🎂 Welcome to Dadavai's Birthday Celebration! 🎂\n\n" +
                              "🎵 Click the music button to play/pause music\n" +
                              "🕯️ Click candles or cake to blow them out\n" +
                              "🎈 Click balloons to pop them\n" +
                              "🎁 Use the buttons for surprises and fireworks\n" +
                              "⌨️ Keyboard shortcuts: Space=Fireworks, M=Music, S=Surprise, C=Candles\n\n" +
                              "Have an amazing birthday celebration! 🎉";
        
        // Only show alert on desktop, use a custom message on mobile
        if (window.innerWidth > 768) {
            alert(welcomeMessage);
        }
    }, 2000);
});
