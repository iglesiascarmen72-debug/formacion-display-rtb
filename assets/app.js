/* ESIC · Display & RTB · app.js compartido */
(function () {
  const mode = document.body.dataset.mode;

  // ── Active nav highlight on scroll ──────────────────────
  const links    = [...document.querySelectorAll('.nav a')];
  const sections = [...document.querySelectorAll('.screen')];

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a =>
          a.classList.toggle('active',
            a.getAttribute('href') === '#' + e.target.id)
        );
        // Update progress indicator if present
        const prog = document.getElementById('progress-fill');
        if (prog) {
          const idx = sections.indexOf(e.target);
          prog.style.width = ((idx / (sections.length - 1)) * 100) + '%';
          const label = document.getElementById('progress-label');
          if (label) label.textContent = `Pantalla ${idx + 1} de ${sections.length}`;
        }
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));

  // ── Profesor mode (Sesión 1) ────────────────────────────
  if (mode === 'profesor') {
    const overlay = document.querySelector('.overlay');
    const input   = document.querySelector('#pass');
    const btn     = document.querySelector('#unlock');
    const err     = document.querySelector('#err');
    const saved   = sessionStorage.getItem('esic_profesor_ok');

    if (saved !== '1') overlay.classList.add('show');

    function unlock() {
      const PASSWORD = 'esic2026';
      if (input.value === PASSWORD) {
        sessionStorage.setItem('esic_profesor_ok', '1');
        overlay.classList.remove('show');
      } else {
        err.textContent = 'Clave incorrecta.';
        input.focus();
      }
    }
    btn.addEventListener('click', unlock);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') unlock(); });
  }
})();
