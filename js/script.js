  /* LOADER */
    let p = 0;
    const ldPct = document.getElementById('ldPct'), loader = document.getElementById('loader');
    const lt = setInterval(() => {
      p += Math.floor(Math.random() * 14) + 4;
      if (p >= 100) { p = 100; clearInterval(lt); }
      ldPct.textContent = p + '%';
      if (p === 100) setTimeout(() => loader.classList.add('gone'), 320);
    }, 52);

    /* CURSOR */
    const cur = document.getElementById('cur'), curR = document.getElementById('curR');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
      rx += (mx - rx) * .11; ry += (my - ry) * .11;
      curR.style.left = rx + 'px'; curR.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.sk-card,.pc,.step,.stat').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.classList.add('hov'); curR.classList.add('hov'); });
      el.addEventListener('mouseleave', () => { cur.classList.remove('hov'); curR.classList.remove('hov'); });
    });

    /* READING PROGRESS */
    const pb = document.getElementById('pbar');
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      pb.style.width = ((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100) + '%';
    }, { passive: true });

    /* NAV STUCK */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 50), { passive: true });

    /* ACTIVE NAV */
    const secs = document.querySelectorAll('section[id]');
    const navAs = document.querySelectorAll('.nav-links a[data-s]');
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) navAs.forEach(a => a.classList.toggle('active', a.dataset.s === e.target.id));
      });
    }, { threshold: .38 }).observe
      // observe all sections
      ; secs.forEach(s => new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) navAs.forEach(a => a.classList.toggle('active', a.dataset.s === e.target.id)); });
      }, { threshold: .38 }).observe(s));

    /* SCROLL REVEAL */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: .11 });
    document.querySelectorAll('.fu,.fl,.fr').forEach(el => revObs.observe(el));

    /* TYPED */
    const phrases = ['stunning interfaces.', 'responsive layouts.', 'smooth animations.', 'digital experiences.', 'clean, fast code.', 'the future of web.'];
    let pi = 0, ci = 0, del = false;
    const tEl = document.getElementById('tEl');
    function tLoop() {
      const w = phrases[pi];
      if (!del) { tEl.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(tLoop, 1800); return; } }
      else { tEl.textContent = w.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; } }
      setTimeout(tLoop, del ? 46 : 76);
    }
    setTimeout(tLoop, 2100);

    /* PARALLAX ORBS */
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / innerWidth - .5) * 16, y = (e.clientY / innerHeight - .5) * 16;
      document.getElementById('o1').style.transform = `translate(${x * .65}px,${y * .65}px)`;
      document.getElementById('o2').style.transform = `translate(${-x * .5}px,${-y * .5}px)`;
      document.getElementById('o3').style.transform = `translate(${x * .32}px,${y * .32}px)`;
    }, { passive: true });

    /* CONTACT FORM */
    document.getElementById('cform').addEventListener('submit', e => {
      e.preventDefault();
      const btn = document.getElementById('csbtn');
      btn.querySelector('span').textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(120deg,var(--green),#00b87a)';
      setTimeout(() => { btn.querySelector('span').textContent = 'Send Message →'; btn.style.background = ''; e.target.reset(); }, 3200);
    });

    /* SMOOTH ANCHORS */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });

    // Email functionality
    document.getElementById('contact').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh

    // Service ID, Template ID, and Form Element
    emailjs.sendForm('webdev', 'template_6mdj5rj', this)
        .then(() => {
            console.log('SUCCESS!');
            alert("Email sent successfully!");
        }, (error) => {
            console.log('FAILED...', error);
        });
});


    /* COUNTER ANIMATION */
    function animCount(el, raw, dur = 1100) {
      if (raw === '∞') { el.textContent = '∞'; return; }
      const n = parseInt(raw); const plus = raw.includes('+');
      let s = null;
      (function step(ts) {
        if (!s) s = ts;
        const prog = Math.min((ts - s) / dur, 1);
        el.textContent = Math.floor(prog * n) + (plus ? '+' : '');
        if (prog < 1) requestAnimationFrame(step);
      })(performance.now());
    }
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.stat-n').forEach(el => animCount(el, el.textContent.trim()));
          e.target.querySelectorAll('.stat-n').forEach(el => el._done = true);
        }
      });
    }, { threshold: .5 }).observe(document.querySelector('.stats-row'));