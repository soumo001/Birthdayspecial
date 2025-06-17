// Sparkle Particles System
class SparkleParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = this.getRandomColor();
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
        this.twinkle = Math.random() * Math.PI * 2;
    }

    getRandomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8a65', '#ba68c8',
            '#81c784', '#64b5f6', '#ffb74d', '#f06292', '#aed581'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.twinkle += 0.1;

        // Fade out as life decreases
        this.opacity = (this.life / this.maxLife) * (0.8 + Math.sin(this.twinkle) * 0.2);

        // Reset particle when it dies or goes off screen
        if (this.life <= 0 || this.x < 0 || this.x > this.canvas.width || 
            this.y < 0 || this.y > this.canvas.height) {
            this.reset();
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.color;
        
        // Draw sparkle shape (star-like)
        this.ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const x = this.x + Math.cos(angle) * this.size;
            const y = this.y + Math.sin(angle) * this.size;
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.fill();
        
        // Add cross sparkle
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - this.size, this.y);
        this.ctx.lineTo(this.x + this.size, this.y);
        this.ctx.moveTo(this.x, this.y - this.size);
        this.ctx.lineTo(this.x, this.y + this.size);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        this.ctx.restore();
    }
}

// Firework Particle System
class FireworkParticle {
    constructor(x, y, canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 60;
        this.maxLife = 60;
        this.color = this.getRandomColor();
        this.size = Math.random() * 3 + 2;
        this.gravity = 0.1;
        this.friction = 0.98;
    }

    getRandomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8a65', '#ba68c8',
            '#81c784', '#64b5f6', '#ffb74d', '#f06292', '#aed581'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.life--;
    }

    draw() {
        const alpha = this.life / this.maxLife;
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = this.color;
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

// Particle System Manager
class ParticleSystem {
    constructor() {
        this.sparkleCanvas = document.getElementById('sparkles-canvas');
        this.fireworksCanvas = document.getElementById('fireworks-canvas');
        this.sparkleParticles = [];
        this.fireworkParticles = [];
        this.isAnimating = true;

        this.setupCanvas();
        this.createSparkleParticles();
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }

    setupCanvas() {
        const canvases = [this.sparkleCanvas, this.fireworksCanvas];
        canvases.forEach(canvas => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    createSparkleParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        this.sparkleParticles = [];
        for (let i = 0; i < particleCount; i++) {
            this.sparkleParticles.push(new SparkleParticle(this.sparkleCanvas));
        }
    }

    createFirework(x, y) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            this.fireworkParticles.push(new FireworkParticle(x, y, this.fireworksCanvas));
        }
    }

    animate() {
        if (!this.isAnimating) return;

        // Clear canvases
        const sparkleCtx = this.sparkleCanvas.getContext('2d');
        const fireworksCtx = this.fireworksCanvas.getContext('2d');
        
        sparkleCtx.clearRect(0, 0, this.sparkleCanvas.width, this.sparkleCanvas.height);
        fireworksCtx.clearRect(0, 0, this.fireworksCanvas.width, this.fireworksCanvas.height);

        // Update and draw sparkle particles
        this.sparkleParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Update and draw firework particles
        this.fireworkParticles = this.fireworkParticles.filter(particle => {
            particle.update();
            particle.draw();
            return !particle.isDead();
        });

        requestAnimationFrame(() => this.animate());
    }

    launchRandomFireworks() {
        const count = 5;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = Math.random() * this.fireworksCanvas.width;
                const y = Math.random() * (this.fireworksCanvas.height * 0.6) + (this.fireworksCanvas.height * 0.1);
                this.createFirework(x, y);
            }, i * 200);
        }
    }

    stop() {
        this.isAnimating = false;
    }

    start() {
        this.isAnimating = true;
        this.animate();
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystem();
});
