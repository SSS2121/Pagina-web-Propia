/* ============================================================
   SANTIAGO SERNA SOLARTE — PORTFOLIO
   main.js — Interactions, Animations & Data Loading
   ============================================================ */

/* ===== i18n TRANSLATIONS ===== */
const translations = {
  es: {
    'nav.about':        'Sobre mí',
    'nav.projects':     'Proyectos',
    'nav.certificates': 'Certificados',
    'nav.contact':      'Contacto',
    'hero.greeting':    'Hola, soy',
    'hero.role_prefix': 'Estudiante de ',
    'hero.description': 'Construyendo el futuro desde la Universidad Santiago de Cali. Fortaleciendo mis conocimientos en automatización de sistemas, inteligencia artificial y machine learning.',
    'hero.cta_projects':'Ver Proyectos',
    'hero.cta_contact': 'Contactarme',
    'about.tag':        '// SOBRE MÍ',
    'about.title':      'El Ser Humano\nDetrás del Código',
    'about.subtitle':   'Ingeniero en formación con visión de arquitecto.',
    'about.bio1':       'Soy <strong>Santiago Serna Solarte</strong>, estudiante de Ingeniería de Sistemas en la <strong>Universidad Santiago de Cali</strong>. Mi enfoque está en la intersección entre la automatización inteligente y el aprendizaje automático.',
    'about.bio2':       'He diseñado y desplegado sistemas de automatización de misión crítica usando <strong>n8n</strong>, integrando APIs empresariales, bases de datos relacionales y servicios en la nube. Paralelamente, me encuentro en estudio de <strong>Machine Learning</strong> y modelos de IA para llevar esa automatización al siguiente nivel.',
    'about.h1':         'Universidad Santiago de Cali',
    'about.h2':         'Estudio y aprendizaje de Machine Learning',
    'about.h3':         'Automatización con n8n & APIs',
    'about.skills_label': '// STACK TÉCNICO',
    'projects.tag':     '// PROYECTOS',
    'projects.title':   'Showcase de\nProyectos',
    'projects.subtitle':'Sistemas que resuelven problemas reales con tecnología de punta.',
    'projects.github':  'Ver en GitHub',
    'projects.placeholder_title': '// PRÓXIMO PROYECTO',
    'projects.placeholder_body':  'Agrega tu próximo repositorio en data/projects.json',
    'certs.tag':        '// CERTIFICADOS',
    'certs.title':      'Bóveda de\nCertificados',
    'certs.subtitle':   'Formación académica y técnica en constante expansión.',
    'certs.notice_title':'📂 Cómo agregar tus certificados',
    'certs.notice_body': '1. Coloca la imagen del certificado en <code>assets/certificates/</code>. 2. Abre <code>data/certificates.json</code> y agrega una entrada con el título, institución, fecha e imagen. 3. Haz <code>git push</code> y Vercel actualizará el sitio automáticamente.',
    'certs.empty':      'No hay certificados registrados aún.',
    'contact.tag':      '// CONTACTO',
    'contact.title':    'Hablemos',
    'contact.subtitle': 'Abierto a oportunidades de prácticas, proyectos freelance y colaboraciones en IA.',
    'contact.intro':    '¿Tienes un proyecto interesante o una oportunidad laboral? Me encanta conectar con personas que construyen cosas con impacto.',
    'contact.email_label':  'CORREO ELECTRÓNICO',
    'contact.phone_label':  'TELÉFONO',
    'contact.github_label': 'GITHUB',
    'contact.form_name':    'Tu nombre',
    'contact.form_email':   'Tu correo electrónico',
    'contact.form_msg':     'Cuéntame sobre tu proyecto o propuesta...',
    'contact.form_send':    'Enviar Mensaje',
    'contact.name_label':   'NOMBRE',
    'contact.email_field':  'CORREO',
    'contact.msg_label':    'MENSAJE',
    'contact.form_name':    'Tu nombre',
    'contact.form_email':   'Tu correo electrónico',
    'contact.form_msg':     'Cuéntame sobre tu proyecto o propuesta...',
    'contact.email_protected': '[Protegido, haz clic para revelar]',
    'contact.email_tooltip': 'Haz clic para revelar el correo',
    'footer.copy':      '© 2025 Santiago Serna Solarte. Construido con ☕ y curiosidad.',
    'typewriter_roles': 'Ingeniería de Sistemas|Machine Learning|Automatización Inteligente|Ingeniería en IA',
    'copied':           '¡Copiado al portapapeles!',
    'sent_placeholder': '¡Mensaje preparado en tu cliente de correo!',
    'skill.automation': 'n8n / Automatización',
    'skill.db':         'PostgreSQL / Bases de Datos',
  },
  en: {
    'nav.about':        'About',
    'nav.projects':     'Projects',
    'nav.certificates': 'Certificates',
    'nav.contact':      'Contact',
    'hero.greeting':    "Hi, I'm",
    'hero.role_prefix': 'Student of ',
    'hero.description': 'Building the future from Universidad Santiago de Cali. Strengthening my knowledge in systems automation, artificial intelligence, and machine learning.',
    'hero.cta_projects':'View Projects',
    'hero.cta_contact': 'Contact Me',
    'about.tag':        '// ABOUT ME',
    'about.title':      'The Human\nBehind the Code',
    'about.subtitle':   'Engineer in training with an architect\'s vision.',
    'about.bio1':       'I am <strong>Santiago Serna Solarte</strong>, a Systems Engineering student at <strong>Universidad Santiago de Cali</strong>. My focus lies at the intersection of intelligent automation and machine learning.',
    'about.bio2':       'I have designed and deployed mission-critical automation systems using <strong>n8n</strong>, integrating enterprise APIs, relational databases, and cloud services. In parallel, I am currently studying <strong>Machine Learning</strong> and AI models to take that automation to the next level.',
    'about.h1':         'Universidad Santiago de Cali',
    'about.h2':         'Machine Learning — In Training',
    'about.h3':         'Automation with n8n & APIs',
    'about.skills_label': '// TECH STACK',
    'projects.tag':     '// PROJECTS',
    'projects.title':   'Project\nShowcase',
    'projects.subtitle':'Systems that solve real problems with cutting-edge technology.',
    'projects.github':  'View on GitHub',
    'projects.placeholder_title': '// NEXT PROJECT',
    'projects.placeholder_body':  'Add your next repository in data/projects.json',
    'certs.tag':        '// CERTIFICATES',
    'certs.title':      'Certificate\nVault',
    'certs.subtitle':   'Academic and technical training in constant expansion.',
    'certs.notice_title':'📂 How to add your certificates',
    'certs.notice_body': '1. Place the certificate image in <code>assets/certificates/</code>. 2. Open <code>data/certificates.json</code> and add an entry with title, institution, date and image. 3. Run <code>git push</code> and Vercel will update the site automatically.',
    'certs.empty':      'No certificates registered yet.',
    'contact.tag':      '// CONTACT',
    'contact.title':    "Let's Talk",
    'contact.subtitle': 'Open to internships, freelance projects, and AI collaborations.',
    'contact.intro':    'Do you have an interesting project or job opportunity? I love connecting with people who build things with impact.',
    'contact.email_label':  'EMAIL ADDRESS',
    'contact.phone_label':  'PHONE NUMBER',
    'contact.github_label': 'GITHUB',
    'contact.form_name':    'Your name',
    'contact.form_email':   'Your email address',
    'contact.form_msg':     'Tell me about your project or proposal...',
    'contact.form_send':    'Send Message',
    'contact.name_label':   'NAME',
    'contact.email_field':  'EMAIL',
    'contact.msg_label':    'MESSAGE',
    'contact.form_name':    'Your name',
    'contact.form_email':   'Your email address',
    'contact.form_msg':     'Tell me about your project or proposal...',
    'contact.email_protected': '[Protected, click to reveal]',
    'contact.email_tooltip': 'Click to reveal email address',
    'footer.copy':      '© 2025 Santiago Serna Solarte. Built with ☕ and curiosity.',
    'typewriter_roles': 'Systems Engineering|Machine Learning|Intelligent Automation|AI Engineering',
    'copied':           'Copied to clipboard!',
    'sent_placeholder': 'Message opened in your mail client!',
    'skill.automation': 'n8n / Automation',
    'skill.db':         'PostgreSQL / Databases',
  }
};

/* ===== SECURITY UTILS ===== */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ===== STATE ===== */
let currentLang = 'es';
let typewriterTimeout = null;

/* ===== APPLY i18n ===== */
function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang][key];
    if (value === undefined) return;
    if (key.includes('bio')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  // Manejar placeholders (contact form)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = translations[lang][key];
    if (value !== undefined) el.placeholder = value;
  });

  // Update tooltip for obfuscated email if still hidden
  document.querySelectorAll('.obfuscated-email').forEach(el => {
    if (el.hasAttribute('data-i18n')) {
      el.title = translations[lang]['contact.email_tooltip'];
    }
  });

  // Update titles with newlines
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const value = translations[lang][key];
    if (value) el.innerHTML = value.replace(/\n/g, '<br>');
  });
  // Update lang toggle button label
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
  // Restart typewriter with new roles
  startTypewriter();
  // Re-render dynamic content
  renderProjects(lang);
  renderCertificates(lang);
}

/* ===== LANGUAGE TOGGLE ===== */
function initLangToggle() {
  const btn = document.getElementById('langToggle');
  const btnMobile = document.getElementById('langToggleMobile');
  const toggle = () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyTranslations(currentLang);
  };
  btn?.addEventListener('click', toggle);
  btnMobile?.addEventListener('click', toggle);
}

/* ===== STARFIELD CANVAS ===== */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let mouse = { x: 0, y: 0 };
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars(count = 220) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.2,
        alpha: Math.random() * 0.7 + 0.15,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.25 + 0.05,
        parallax: Math.random() * 0.04 + 0.005,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    const mx = (mouse.x / W - 0.5) * 2;
    const my = (mouse.y / H - 0.5) * 2;

    stars.forEach(s => {
      s.alpha += s.alphaDir * 0.004;
      if (s.alpha >= 0.9 || s.alpha <= 0.1) s.alphaDir *= -1;

      const px = s.x + mx * s.parallax * W * 18;
      const py = s.y + my * s.parallax * H * 18;

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw a few purple "nebula dust" particles
    for (let i = 0; i < 3; i++) {
      const s = stars[i * 15];
      if (!s) continue;
      const px = s.x + mx * s.parallax * W * 30;
      const py = s.y + my * s.parallax * H * 30;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 60);
      grad.addColorStop(0, `rgba(106,13,173,${s.alpha * 0.12})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, 60, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(drawStars);
  }

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('resize', () => { resize(); createStars(); });

  resize();
  createStars();
  drawStars();
}

/* ===== TYPEWRITER ===== */
function startTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  const roles = translations[currentLang]['typewriter_roles'].split('|');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (deleting) {
      el.textContent = current.slice(0, charIdx--);
    } else {
      el.textContent = current.slice(0, charIdx++);
    }

    let delay = deleting ? 55 : 95;
    if (!deleting && charIdx > current.length) {
      delay = 2000; deleting = true;
    } else if (deleting && charIdx < 0) {
      deleting = false; charIdx = 0;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }
    typewriterTimeout = setTimeout(type, delay);
  }
  type();
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger skill bars
        entry.target.querySelectorAll('.skill-fill[data-pct]').forEach(bar => {
          bar.style.width = bar.getAttribute('data-pct') + '%';
        });
        if (entry.target.hasAttribute('data-pct')) {
          entry.target.style.width = entry.target.getAttribute('data-pct') + '%';
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Skill bars observer
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-pct') + '%';
        });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  menuBtn?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
  });

  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });
}

/* ===== PROJECTS RENDER ===== */
let projectsData = [];

function renderProjects(lang) {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !projectsData.length) return;
  const t = translations[lang];

  grid.innerHTML = projectsData.map((p, i) => {
    const desc = lang === 'es' ? p.description_es : p.description_en;
    const statusClass = p.status === 'production' ? 'status-production' : 'status-development';
    const statusLabel = p.status === 'production' ? '● Production' : '● Dev';
    const delay = i < 4 ? `reveal-delay-${i + 1}` : '';

    return `
      <div class="glass-card project-card reveal ${delay}">
        <div class="project-card-header">
          <div class="project-icon-wrap">${p.icon || '🚀'}</div>
          <span class="project-status-badge ${statusClass}">${statusLabel}</span>
        </div>
        <h3 class="project-title">${escapeHTML(p.title)}</h3>
        <p class="project-description">${escapeHTML(desc)}</p>
        <div class="project-tags">
          ${p.tags.map(tag => `<span class="project-tag">${escapeHTML(tag)}</span>`).join('')}
        </div>
        <div class="project-footer">
          <a href="${escapeHTML(p.github)}" target="_blank" rel="noopener noreferrer" class="project-github-link">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            ${t['projects.github']} →
          </a>
        </div>
      </div>
    `;
  }).join('');



  // Re-observe new elements
  document.querySelectorAll('#projectsGrid .reveal').forEach(el => {
    el.classList.remove('visible');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.10 });
    observer.observe(el);
  });
}

async function loadProjects() {
  try {
    const res = await fetch('data/projects.json');
    projectsData = await res.json();
  } catch {
    projectsData = [];
  }
  renderProjects(currentLang);
}

/* ===== CERTIFICATES RENDER ===== */
let certsData = [];

function renderCertificates(lang) {
  const grid = document.getElementById('certsGrid');
  if (!grid) return;
  const t = translations[lang];

  if (!certsData.length) {
    grid.innerHTML = `<p style="color:var(--text-muted);font-family:var(--font-mono);font-size:.85rem;">${t['certs.empty']}</p>`;
    return;
  }

  grid.innerHTML = certsData.map((c, i) => {
    const delay = i < 4 ? `reveal-delay-${i + 1}` : '';
    const desc = lang === 'es' ? (c.description_es || '') : (c.description_en || '');
    const title = lang === 'es' ? c.title : (c.title_en || c.title);
    const cat   = lang === 'es' ? c.category : (c.category_en || c.category);
    
    return `
      <div class="glass-card cert-card reveal ${delay}" 
           data-cert-id="${escapeHTML(c.id)}"
           data-title="${escapeHTML(title)}"
           data-inst="${escapeHTML(c.institution)}"
           data-date="${escapeHTML(c.date)}"
           data-category="${escapeHTML(cat)}"
           data-img="${escapeHTML(c.image)}"
           data-desc="${escapeHTML(desc)}"
           tabindex="0"
           role="button"
           aria-label="Ver certificado: ${escapeHTML(title)}">
        <div class="cert-img-wrap">
          <img src="${escapeHTML(c.image)}" alt="${escapeHTML(title)}" onerror="this.style.display='none';this.parentElement.querySelector('.cert-img-placeholder').style.display='flex'">
          <div class="cert-img-placeholder" style="display:none">
            <span>📜</span>
            <p>SIN IMAGEN</p>
          </div>
          <div class="cert-overlay"><span class="cert-zoom-icon">🔍</span></div>
        </div>
        <div class="cert-info">
          <p class="cert-category">${escapeHTML(cat)}</p>
          <h4 class="cert-title">${escapeHTML(title)}</h4>
          <p class="cert-inst">${escapeHTML(c.institution)}</p>
          <span class="cert-date">${escapeHTML(formatDate(c.date, lang))}</span>
        </div>
      </div>
    `;
  }).join('');

  // Attach lightbox events
  grid.querySelectorAll('.cert-card').forEach(card => {
    const open = () => openLightbox(card.dataset);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });

  // Re-observe
  document.querySelectorAll('#certsGrid .reveal').forEach(el => {
    el.classList.remove('visible');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.10 });
    observer.observe(el);
  });
}

async function loadCertificates() {
  try {
    const res = await fetch('data/certificates.json');
    certsData = await res.json();
    // Filter out template placeholder if title matches
    certsData = certsData.filter(c => c.title !== 'NOMBRE DEL CERTIFICADO');
  } catch {
    certsData = [];
  }
  renderCertificates(currentLang);
}

function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months_es = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const months_en = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const m = parseInt(month, 10) - 1;
  const names = lang === 'es' ? months_es : months_en;
  return `${names[m] || ''} ${year}`;
}

/* ===== LIGHTBOX ===== */
function openLightbox(data) {
  const overlay = document.getElementById('lightboxOverlay');
  const img     = document.getElementById('lightboxImg');
  const title   = document.getElementById('lightboxTitle');
  const cat     = document.getElementById('lightboxCat');
  const inst    = document.getElementById('lightboxInst');
  const date    = document.getElementById('lightboxDate');
  const desc    = document.getElementById('lightboxDesc');
  if (!overlay) return;

  img.src       = data.img;
  img.alt       = data.title;
  title.textContent = data.title;
  cat.textContent   = data.category;
  inst.textContent  = data.inst;
  date.textContent  = formatDate(data.date, currentLang);
  if (desc) desc.textContent = data.desc || '';

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose')?.focus();
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

function initLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

/* ===== EMAIL OBFUSCATION & COPY ===== */
function getEmail() {
  return ['santiago', 'serna2175', '@', 'gmail', '.com'].join('');
}

function initEmailObfuscation() {
  const emailEls = document.querySelectorAll('.obfuscated-email');
  emailEls.forEach(el => { 
    el.style.cursor = 'pointer';
    el.title = translations[currentLang]['contact.email_tooltip'];
    el.addEventListener('click', function() {
      this.textContent = getEmail();
      this.removeAttribute('data-i18n'); // prevent it from returning to placeholder on language toggle
      this.title = '';
      this.style.cursor = 'auto';
    });
  });
  
  const mailtoEls = document.querySelectorAll('.obfuscated-mailto');
  mailtoEls.forEach(el => { el.href = `mailto:${getEmail()}`; });
}

/* ===== COPY TO CLIPBOARD ===== */
function initCopyBtns() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      let text = btn.getAttribute('data-copy');
      if (text === 'email_protected') text = getEmail();

      navigator.clipboard.writeText(text).then(() => {
        showToast(translations[currentLang]['copied']);
      }).catch(() => {
        // Fallback for environments without clipboard API
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(translations[currentLang]['copied']);
      });
    });
  });
}

/* ===== TOAST ===== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = form.querySelector('#formName').value;
    const email = form.querySelector('#formEmail').value;
    const msg   = form.querySelector('#formMsg').value;
    const body  = encodeURIComponent(`Hola Santiago,\n\nMi nombre es ${name} (${email}).\n\n${msg}`);
    window.open(`mailto:${getEmail()}?subject=Contacto desde portafolio&body=${body}`, '_blank');
    showToast(translations[currentLang]['sent_placeholder']);
    form.reset();
  });
}

/* ===== SMOOTH ACTIVE NAV ===== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--purple-light)' : '';
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  startTypewriter();
  initScrollReveal();
  initNavbar();
  initLangToggle();
  initLightbox();
  initEmailObfuscation();
  initCopyBtns();
  initContactForm();
  initActiveNav();
  loadProjects();
  loadCertificates();
  applyTranslations(currentLang);
});
