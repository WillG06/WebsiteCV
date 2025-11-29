

// background NEW
(function() {
  const canvas = document.getElementById('interactiveBackground');
  const ctx = canvas.getContext('2d'); // 2d domain
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let mouseX = canvas.width / 2;  // where is mouse on screen
  let mouseY = canvas.height / 2;
  
  const orbs = [];
  const orbCount = 8;
  
  //  orbs for bg (was too dull before)
  for (let i = 0; i < orbCount; i++) {
    orbs.push({

      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      radius: 80 + Math.random() * 120,


      baseColor: { r: 226, g: 107, b: 107 }, 
      hoverColor: { r: 107, g: 185, b: 226 }, 
      currentColor: { r: 226, g: 107, b: 107 },

      speedX: (Math.random() - 0.3) * 0.3,
      speedY: (Math.random() - 0.3) * 0.3,

      pulseSpeed: 0.01 + Math.random() * 0.01,
      pulsePhase: Math.random() * Math.PI * 2

    });
  }
  
  // mouse moves where on screen
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    orbs.forEach(orb => {
      
      orb.x += orb.speedX;
      orb.y += orb.speedY;
      
      if (orb.x < 0 || orb.x > canvas.width) orb.speedX *= -1;   // bounce off edge
      if (orb.y < 0 || orb.y > canvas.height) orb.speedY *= -1;
      
      const dx = mouseX - orb.x;
      const dy = mouseY - orb.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Change color in relation to mouse
      const maxDistance = 300;
      const influence = Math.max(0, 1 - distance / maxDistance);
      
      orb.currentColor.r = orb.baseColor.r + (orb.hoverColor.r - orb.baseColor.r) * influence;
      orb.currentColor.g = orb.baseColor.g + (orb.hoverColor.g - orb.baseColor.g) * influence;      // colour scheme when hovered over or approched
      orb.currentColor.b = orb.baseColor.b + (orb.hoverColor.b - orb.baseColor.b) * influence;
      
      //effect --pulse 
      orb.pulsePhase += orb.pulseSpeed;
      const pulse = Math.sin(orb.pulsePhase) * 0.15 + 0.85;
      const currentRadius = orb.radius * pulse;
      
      
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius); //ghradient
      
      const alpha = 0.15 + influence * 0.15;
      gradient.addColorStop(0, `rgba(${Math.round(orb.currentColor.r)}, ${Math.round(orb.currentColor.g)}, ${Math.round(orb.currentColor.b)}, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(${Math.round(orb.currentColor.r)}, ${Math.round(orb.currentColor.g)}, ${Math.round(orb.currentColor.b)}, ${alpha * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();

  
  //resize issue sorted
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();










//new curser surrounding circle with animation fitting for bg balls
(function() {
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  let lastParticleTime = 0;

  document.addEventListener('mouseenter', () => {
    follower.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    follower.classList.remove('active');
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    follower.classList.add('active');

    const currentTime = Date.now();
    if (currentTime - lastParticleTime > 100) {  
      createParticle(e.clientX, e.clientY);
      lastParticleTime = currentTime;
    }

    // interaction methods for hover
    const target = e.target;
    const isInteractive = target.matches('a, button, input, textarea, select, [role="button"], .skill-card, .project-card, .timeline-item') // inputs added to expand on
                        || target.closest('a, button, input, textarea, select, [role="button"], .skill-card, .project-card, .timeline-item');
    
    if (isInteractive) {
      follower.classList.add('hover');
    } else {                                                    //!!!!   TODO add so when hovers over a partlcle the mouse ring expands as you get closer!!
      follower.classList.remove('hover');
    }
  });

  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 800);
  }

  function animateFollower() {
    const speed = 0.1;       // delayed for effects
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;

    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateFollower);
  }

  animateFollower();
})();






//back to top addition
(function() {
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();









// Particle Sphere Animation in bg 
(function () {
  const canvas = document.getElementById('particleSphere');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = 1000;
  let height = canvas.height = 1000;
  let scrollRotation = 0;

  const particleCount = 1000;
  const radius = 150;
  const thickness = 80;
  const particles = [];
  const rings = [];

  // create particles
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radiusVariation = radius + (Math.random() - 0.5 ) * thickness;
    const x = Math.cos(angle) * radiusVariation;
    const y = Math.sin(angle) * radiusVariation;
    const z = (Math.random() - 0.5) * radiusVariation;

    // red colour
    const hue = 340 + Math.random() * 40; // red 340
    const color = `hsl(${hue}, 70%, 65%)`;

    particles.push({ x, y, z, color });
  }

  // create rings

  for (let i = 0; i < 3; i++) {     // 3 loops
    const ringRadius = radius + i * 52;   // enlarge loops (bigger num)
    const ringParticles = []; 
    const ringParticleCount = 120;  // 100

    for (let j = 0; j < ringParticleCount; j++) {
      const angle = (j / ringParticleCount) * Math.PI * 3;  // speed of ring rotatiob
      const hue = 340 + Math.random() * 40; // same hue as inside balls
      ringParticles.push({
        angle,                  //making center
        radius: ringRadius,
        color: `hsl(${hue}, 60%, 55%)`,
        speed: 0.01 + i * 0.005 // how fast middle ones movew 
      });
    }

    rings.push({
      particles: ringParticles,
      tilt: Math.PI / 4 + i * 0.3,      // how the rings are angled
      rotation: 0
    });
  }

  // Handle scroll rotation
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const delta = (currentScroll - lastScroll) * 0.001;
    scrollRotation += delta;
    lastScroll = currentScroll;
  }, { passive: true });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const time = Date.now() * 0.001;
    const centerX = width / 2;
    const centerY = height / 2;          //keep centered

    const rotationX = scrollRotation;
    const rotationY = time * 0.3;   // speed based on scroll

  
    const sortedParticles = particles.map(p => {

      let x = p.x;
      let y = p.y;   //rotate particles
      let z = p.z;

      // Rotate y
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const tempX = x * cosY - z * sinY;
      const tempZ = x * sinY + z * cosY;
      x = tempX;
      z = tempZ;

      // roatte x
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const tempY = y * cosX - z * sinX;
      z = y * sinX + z * cosX;
      y = tempY;

      return { x, y, z, color: p.color };
    }).sort((a, b) => b.z - a.z);

    sortedParticles.forEach(p => {
      const scale = 300 / (300 + p.z);
      const x2d = p.x * scale + centerX;
      const y2d = p.y * scale + centerY;
      const size = scale * 2;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = (p.z + radius) / (radius * 2) * 0.8;
      ctx.beginPath();
      ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw orbit rings
    rings.forEach(ring => {
      ring.rotation += 0.005;

      const sortedRing = ring.particles.map(rp => {
        const angle = rp.angle + ring.rotation + scrollRotation * 2;
        let x = Math.cos(angle) * rp.radius;
        let y = Math.sin(angle) * rp.radius;
        let z = 0;

        // Tilt the ring
        const cosTilt = Math.cos(ring.tilt);
        const sinTilt = Math.sin(ring.tilt);
        const tempY = y * cosTilt - z * sinTilt;
        z = y * sinTilt + z * cosTilt;
        y = tempY;

        // Rotate with sphere
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const tempX = x * cosY - z * sinY;
        z = x * sinY + z * cosY;
        x = tempX;

        return { x, y, z, color: rp.color };
      }).sort((a, b) => b.z - a.z);

      sortedRing.forEach(rp => {
        const scale = 300 / (300 + rp.z);
        const x2d = rp.x * scale + centerX;
        const y2d = rp.y * scale + centerY;
        const size = scale * 1.5;

        ctx.fillStyle = rp.color;
        ctx.globalAlpha = (rp.z + radius * 2) / (radius * 4) * 0.7;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();


  window.addEventListener('resize', () => {
    width = canvas.width = Math.min(1000, window.innerWidth * 0.8);
    height = canvas.height = Math.min(1000, window.innerHeight * 0.8);  // looks good enougfh 
  });
})();

//topbar stays at top
(function () {
  const topbar = document.getElementById('topbar');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  function onScroll() {
    if (window.scrollY > 40) topbar.classList.add('scrolled');
    else topbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  window.toggleMobileNav = function () {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    nav.classList.toggle('active');
  };

  // nav smooth scroll
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const id = a.getAttribute('href');
      if (!id.startsWith('#')) return;
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const nav = document.getElementById('mainNav');
        if (nav) nav.classList.remove('active');
      }
    })
  });

  // particles at top
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {  //how many particles
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%'; // spreads out through top (50 is just on left side)
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }

  // fade 
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    observer.observe(section);
  });

  // Download CV
  const dl = document.getElementById('downloadResume');
  dl && dl.addEventListener('click', function (e) {
    e.preventDefault();

    const cvPath = '/fileLinks/WillGilesCV.pdf';

    const a = document.createElement('a');
    a.href = cvPath;
    a.download = '/fileLinks/WillGilesCV.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

})();
