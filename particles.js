class ParticleNetwork {
  constructor(container = document.body, options = {}) {
    this.container = container;
    this.options = {
      particleCount: 200,
      maxDistance: 150,
      mouseForce: 2,
      damping: 0.99,
      repulsionForce: 2,
      renderRadius: 200,
      isActive: true,
      ...options
    };

    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0, active: false };
    this.animationId = null;

    this.init();
  }

  init() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.background = 'transparent';
    
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Set canvas size
    this.resizeCanvas();

    // Initialize particles
    this.initParticles();

    // Add event listeners
    this.addEventListeners();

    // Start animation
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 1.2 + 1,
        connections: []
      });
    }
  }

  calculateForces() {
    // Reset connections
    this.particles.forEach(p => p.connections = []);

    // Calculate repulsion and attraction forces
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      
      // Mouse attraction with continuous movement
      if (this.mouse.active) {
        const dx = this.mouse.x - p1.x;
        const dy = this.mouse.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < 250) {
          const force = this.options.mouseForce / (distance * distance);
          p1.vx += (dx / distance) * force;
          p1.vy += (dy / distance) * force;
        }
      }

      // Add some random movement to prevent stagnation
      p1.vx += (Math.random() - 0.5) * 0.1;
      p1.vy += (Math.random() - 0.5) * 0.1;

      // Particle interactions
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0 && distance < this.options.maxDistance) {
          // Connection
          p1.connections.push(j);
          p2.connections.push(i);

          // Repulsion force
          if (distance < 40) {
            const force = this.options.repulsionForce / (distance * distance);
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            
            p1.vx -= fx;
            p1.vy -= fy;
            p2.vx += fx;
            p2.vy += fy;
          }
        }
      }
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Apply damping
      particle.vx *= this.options.damping;
      particle.vy *= this.options.damping;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges with more energy
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1.2;
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1.2;
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Only render particles within render radius of mouse
    const visibleParticles = this.particles.filter(particle => {
      if (!this.mouse.active) return false;
      
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.options.renderRadius;
    });

    // Draw connections only between visible particles
    visibleParticles.forEach((particle, i) => {
      particle.connections.forEach(connectionIndex => {
        const connectedParticle = this.particles[connectionIndex];
        if (connectedParticle && visibleParticles.includes(connectedParticle) && i < visibleParticles.indexOf(connectedParticle)) {
          const dx = connectedParticle.x - particle.x;
          const dy = connectedParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const opacity = Math.max(0, 1 - (distance / this.options.maxDistance));
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(connectedParticle.x, connectedParticle.y);
          this.ctx.stroke();
        }
      });
    });

    // Draw visible particles with distance-based opacity
    visibleParticles.forEach(particle => {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const opacity = Math.max(0.2, 1 - (distance / this.options.renderRadius));
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate() {
    if (!this.options.isActive) {
      // Clear canvas when inactive
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.calculateForces();
    this.updateParticles();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  addEventListeners() {
    this.handleMouseMove = (e) => {
      if (!this.options.isActive) return;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    };

    this.handleMouseLeave = () => {
      if (!this.options.isActive) return;
      this.mouse.active = false;
    };

    this.handleResize = () => {
      this.resizeCanvas();
    };

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('resize', this.handleResize);
  }

  setActive(isActive) {
    this.options.isActive = isActive;
    if (!isActive) {
      this.mouse.active = false;
    }
  }

  destroy() {
    // Remove event listeners
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseleave', this.handleMouseLeave);
    window.removeEventListener('resize', this.handleResize);

    // Cancel animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // Remove canvas
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Initialize particle network when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create particle network instance
  window.particleNetwork = new ParticleNetwork(document.body, {
    particleCount: 200,
    maxDistance: 150,
    mouseForce: 2,
    damping: 0.99,
    repulsionForce: 2,
    renderRadius: 200,
    isActive: true
  });

  console.log('ParticleNetwork: Starting animation with 200 particles');
});
