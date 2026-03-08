/* =============================================
   PORTFOLIO — script.js
   Interactions, Canvas, Animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Custom Cursor ---- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  /* ---- Nav Scroll Effect ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ---- Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Hero Canvas — Particle Grid ---- */
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = -9999, mouseY = -9999;
  let W, H;

  function resizeCanvas() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initParticles();
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.baseX = this.x;
      this.baseY = this.y;
      this.size = Math.random() * 1.5 + 0.5;
      this.vx = 0; this.vy = 0;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 120 - dist) / 120;

      if (dist < 120) {
        this.vx -= (dx / dist) * force * 3;
        this.vy -= (dy / dist) * force * 3;
      }

      this.vx += (this.baseX - this.x) * 0.04;
      this.vy += (this.baseY - this.y) * 0.04;
      this.vx *= 0.85; this.vy *= 0.85;
      this.x += this.vx; this.y += this.vy;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,77,0,${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.floor((W * H) / 6000);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,77,0,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateCanvas);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

  resizeCanvas();
  animateCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  /* ---- Animated Counters ---- */
  const counts = document.querySelectorAll('.count');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 30);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counts.forEach(el => countObserver.observe(el));

  /* ---- Skill Bar Animation ---- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => {
          el.style.width = el.dataset.w + '%';
        }, 200);
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  skillFills.forEach(el => skillObserver.observe(el));

  /* ---- Contact Form ---- */
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message ✦';
        btn.disabled = false;
        if (success) { success.style.display = 'block'; }
        form.reset();
        setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
      }, 1400);
    });
  }

  /* ---- Back to Top ---- */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Hero text entrance (stagger) ---- */
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 200);

  /* ---- Parallax subtle tilt on project cards ---- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
      card.style.transition = 'transform 0.1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });

  /* ---- Glitch on logo hover ---- */
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'glitch 0.3s step-end';
      setTimeout(() => logo.style.animation = '', 300);
    });
  }

});
