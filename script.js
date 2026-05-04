// ===== API CONFIGURATION =====
var API_URL = 'http://localhost/abdulrahman/save_message.php';

// ===== CONTACT FORM =====
function toggleContactForm() {
    var box = document.getElementById('contactFormBox');
    var icon = document.getElementById('contactToggleIcon');
    if (box.classList.contains('show')) {
        box.classList.remove('show');
        icon.className = 'fas fa-chevron-down';
    } else {
        box.classList.add('show');
        icon.className = 'fas fa-chevron-up';
    }
}

function sendContactMessage() {
    var btn = document.getElementById('contactSubmitBtn');
    var status = document.getElementById('contactFormStatus');
    var name = document.getElementById('contactName').value.trim();
    var email = document.getElementById('contactEmail').value.trim();
    var message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
        status.textContent = (translations[currentLang] && translations[currentLang]['contact_form.fill_fields']) || 'Please fill all fields';
        status.className = 'contact-form-status error';
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    status.textContent = '';
    status.className = 'contact-form-status';

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Email: email, MessageText: message })
    })
        .then(function (response) {
            if (!response.ok) { throw new Error('Network error'); }
            return response.text();
        })
        .then(function (data) {
            status.textContent = (translations[currentLang] && translations[currentLang]['contact_form.success']) || 'Message sent successfully ✔';
            status.className = 'contact-form-status success';
            document.getElementById('contactName').value = '';
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMessage').value = '';
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span data-i18n="contact_form.send">Send</span>';
            setTimeout(function () { status.textContent = ''; status.className = 'contact-form-status'; }, 5000);
        })
        .catch(function (error) {
            console.log('Error:', error);
            status.textContent = (translations[currentLang] && translations[currentLang]['contact_form.error']) || 'Error sending message ❌';
            status.className = 'contact-form-status error';
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span data-i18n="contact_form.send">Send</span>';
        });
}

// ===== PARTICLES =====
(function () {
    var c = document.getElementById('particlesCanvas');
    var ctx = c.getContext('2d');
    var p = [];
    var m = innerWidth < 768;
    var n = m ? 16 : 28;
    var f;

    function rs() {
        c.width = innerWidth;
        c.height = innerHeight;
        m = innerWidth < 768;
        n = m ? 16 : 28;
        cp();
    }

    function cp() {
        p = [];
        for (var i = 0; i < n; i++) {
            p.push({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                r: Math.random() * 1.4 + 0.4,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                alpha: Math.random() * 0.4 + 0.06,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    function dr() {
        ctx.clearRect(0, 0, c.width, c.height);
        var l = document.body.classList.contains('light');
        var cl = l ? '30,128,224' : '230,57,70';
        for (var i = 0; i < p.length; i++) {
            var pt = p[i];
            pt.x += pt.vx;
            pt.y += pt.vy;
            if (pt.x < -20) pt.x = c.width + 20;
            if (pt.x > c.width + 20) pt.x = -20;
            if (pt.y < -20) pt.y = c.height + 20;
            if (pt.y > c.height + 20) pt.y = -20;
            pt.alpha += Math.sin(pt.pulse) * 0.002;
            pt.pulse += 0.02;
            pt.alpha = Math.max(0.04, Math.min(0.5, pt.alpha));
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.r + Math.sin(pt.pulse) * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + cl + ',' + pt.alpha + ')';
            ctx.fill();
        }
        if (!m) {
            for (var i = 0; i < p.length; i++) {
                for (var j = i + 1; j < p.length; j++) {
                    var dx = p[i].x - p[j].x;
                    var dy = p[i].y - p[j].y;
                    var d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p[i].x, p[i].y);
                        ctx.lineTo(p[j].x, p[j].y);
                        ctx.strokeStyle = 'rgba(' + cl + ',' + (0.05 * (1 - d / 110)) + ')';
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }
        }
        f = requestAnimationFrame(dr);
    }

    window.addEventListener('resize', rs);
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) cancelAnimationFrame(f);
        else f = requestAnimationFrame(dr);
    });
    rs();
    cp();
    f = requestAnimationFrame(dr);
})();

// ===== TRANSLATIONS =====
var translations = {
    en: {
        'hero.greeting': "Hi, I'm",
        'hero.role.prefix': "I'm a",
        'hero.desc': 'I build modern, responsive websites and constantly learn through real projects.',
        'hero.cta1': 'Learn More About Me',
        'hero.cta2': 'Get In Touch',
        'nav.home': 'Home',
        'nav.personal': 'Personal Info',
        'nav.languages': 'Languages',
        'nav.projects': 'Projects',
        'nav.education': 'Education',
        'nav.excel': 'Strengths',
        'nav.different': 'Why Different',
        'nav.softskills': 'Soft Skills',
        'nav.contact': 'Contact',
        'personal.title': 'About Me',
        'personal.desc': "I'm a self-learning developer focused on web development and problem solving.",
        'languages.title': 'Programming Languages I Master',
        'projects.title': 'My Projects',
        'projects.item1.title': 'Abdulrahman TEC',
        'projects.item1.desc': 'A modern technology website showcasing services and solutions with a sleek, responsive design.',
        'education.title': 'Education',
        'excel.title': 'My Strengths',
        'excel.desc': 'I have strong experience with <strong>HTML5</strong> and <strong>CSS3</strong>. I write clean <strong>JavaScript</strong>. I work with <strong>Python</strong> and <strong>C++</strong>. Skilled in <strong>SQL Server</strong>, <strong>Cisco Packet Tracer</strong> and hold <strong>CCNA</strong>. <br><br><em>Dedicated, fast-learning, and always eager to build something meaningful.</em>',
        'different.title': 'What Sets Me Apart',
        'different.desc': "I dive deep into every technology. Strong <strong>analytical thinking</strong> and problem-solving. I work with <strong>passion, discipline, and consistency</strong>. I never give up.",
        'softskills.title': 'Personal Qualities',
        'contact.title': 'Contact Me Via',
        'contact.subtitle': 'Reach out to me on any of these platforms',
        'footer.rights': 'All rights reserved',
        'contact_form.toggle': 'Send Message',
        'contact_form.title': 'Contact Me',
        'contact_form.name': 'Your Name',
        'contact_form.email': 'Your Email',
        'contact_form.message': 'Your Message',
        'contact_form.send': 'Send',
        'contact_form.success': 'Message sent successfully ✔',
        'contact_form.error': 'Error sending message ❌',
        'contact_form.fill_fields': 'Please fill all fields'
    },
    de: {
        'hero.greeting': 'Hallo, ich bin',
        'hero.role.prefix': 'Ich bin',
        'hero.desc': 'Ich entwickle moderne, responsive Websites.',
        'hero.cta1': 'Erfahre mehr',
        'hero.cta2': 'Kontakt',
        'nav.home': 'Start',
        'nav.personal': 'Persönliches',
        'nav.languages': 'Sprachen',
        'nav.projects': 'Projekte',
        'nav.education': 'Bildung',
        'nav.excel': 'Stärken',
        'nav.different': 'Warum anders',
        'nav.softskills': 'Soft Skills',
        'nav.contact': 'Kontakt',
        'personal.title': 'Über mich',
        'personal.desc': 'Ich bin ein selbstlernender Entwickler.',
        'languages.title': 'Programmiersprachen',
        'projects.title': 'Meine Projekte',
        'projects.item1.title': 'Abdulrahman TEC',
        'projects.item1.desc': 'Eine moderne Technologie-Website mit Dienstleistungen und Lösungen in elegantem, responsivem Design.',
        'education.title': 'Bildung',
        'excel.title': 'Meine Stärken',
        'excel.desc': 'Fundierte Erfahrung mit <strong>HTML5</strong> und <strong>CSS3</strong>. <strong>JavaScript</strong>, <strong>Python</strong>, <strong>C++</strong>, <strong>SQL Server</strong>, <strong>CCNA</strong>. <br><br><em>Engagiert und lernbegierig.</em>',
        'different.title': 'Was mich auszeichnet',
        'different.desc': 'Starke <strong>analytische Denkfähigkeiten</strong>. <strong>Leidenschaft und Disziplin</strong>.',
        'softskills.title': 'Persönliche Qualitäten',
        'contact.title': 'Kontaktiere mich über',
        'contact.subtitle': 'Erreiche mich auf einer dieser Plattformen',
        'footer.rights': 'Alle Rechte vorbehalten',
        'contact_form.toggle': 'Nachricht senden',
        'contact_form.title': 'Kontaktiere mich',
        'contact_form.name': 'Dein Name',
        'contact_form.email': 'Deine E-Mail',
        'contact_form.message': 'Deine Nachricht',
        'contact_form.send': 'Senden',
        'contact_form.success': 'Nachricht erfolgreich gesendet ✔',
        'contact_form.error': 'Fehler beim Senden ❌',
        'contact_form.fill_fields': 'Bitte alle Felder ausfüllen'
    },
    ar: {
        'hero.greeting': 'مرحباً، أنا',
        'hero.role.prefix': 'أنا',
        'hero.desc': 'أبني مواقع ويب حديثة ومتجاوبة.',
        'hero.cta1': 'اعرف المزيد عني',
        'hero.cta2': 'تواصل معي',
        'nav.home': 'الرئيسية',
        'nav.personal': 'معلومات شخصية',
        'nav.languages': 'لغات البرمجة',
        'nav.projects': 'مشاريع',
        'nav.education': 'التعليم',
        'nav.excel': 'نقاط القوة',
        'nav.different': 'لماذا أنا مختلف',
        'nav.softskills': 'مهارات شخصية',
        'nav.contact': 'تواصل',
        'personal.title': 'عنّي',
        'personal.desc': 'أنا مطور أتعلم ذاتياً.',
        'languages.title': 'لغات البرمجة التي أجيدها',
        'projects.title': 'مشاريعي',
        'projects.item1.title': 'عبدالرحمن تك',
        'projects.item1.desc': 'موقع تقني حديث يعرض الخدمات والحلول بتصميم أنيق ومتجاوب.',
        'education.title': 'التعليم',
        'excel.title': 'نقاط قوتي',
        'excel.desc': 'خبرة قوية في <strong>HTML5</strong> و <strong>CSS3</strong>. <strong>JavaScript</strong>، <strong>Python</strong>، <strong>C++</strong>، <strong>SQL Server</strong>، <strong>CCNA</strong>. <br><br><em>ملتزم وسريع التعلم.</em>',
        'different.title': 'ما يميزني',
        'different.desc': 'قدرة عالية على <strong>التفكير التحليلي</strong>. <strong>شغف وانضباط</strong>.',
        'softskills.title': 'صفاتي الشخصية',
        'contact.title': 'تواصل معي عبر',
        'contact.subtitle': 'تواصل معي على أي من هذه المنصات',
        'footer.rights': 'جميع الحقوق محفوظة',
        'contact_form.toggle': 'إرسال رسالة',
        'contact_form.title': 'تواصل معي',
        'contact_form.name': 'الاسم',
        'contact_form.email': 'الإيميل',
        'contact_form.message': 'اكتب رسالتك',
        'contact_form.send': 'إرسال',
        'contact_form.success': 'تم إرسال الرسالة بنجاح ✔',
        'contact_form.error': 'حصل خطأ في الإرسال ❌',
        'contact_form.fill_fields': 'الرجاء ملء جميع الحقول'
    }
};

// Data definitions
var pi = [
    { lk: 'Full Name', v: 'Abdulrahman' },
    { lk: 'Age', vk: 'age' },
    { lk: 'Date of Birth', vk: 'dob' },
    { lk: 'Nationality', vk: 'nat' },
    { lk: 'Specialization', vk: 'spec' },
    { lk: 'Department', vk: 'dept' },
    { lk: 'Status', vk: 'status', ia: true }
];

var pv = {
    en: { age: '20 Years', dob: 'August 1, 2005', nat: 'Egyptian', spec: 'Information Systems', dept: 'Computer Science', status: 'Currently Studying' },
    de: { age: '20 Jahre', dob: '1. August 2005', nat: 'Ägypter', spec: 'Informationssysteme', dept: 'Informatik', status: 'Studierend' },
    ar: { age: '20 سنة', dob: '1 أغسطس 2005', nat: 'مصري', spec: 'نظم المعلومات', dept: 'علوم الحاسب', status: 'قيد الدراسة' }
};

var pl = {
    en: { 'Full Name': 'Full Name', 'Age': 'Age', 'Date of Birth': 'Date of Birth', 'Nationality': 'Nationality', 'Specialization': 'Specialization', 'Department': 'Department', 'Status': 'Status' },
    de: { 'Full Name': 'Vollständiger Name', 'Age': 'Alter', 'Date of Birth': 'Geburtsdatum', 'Nationality': 'Nationalität', 'Specialization': 'Spezialisierung', 'Department': 'Fachbereich', 'Status': 'Status' },
    ar: { 'Full Name': 'الاسم الكامل', 'Age': 'العمر', 'Date of Birth': 'تاريخ الميلاد', 'Nationality': 'الجنسية', 'Specialization': 'التخصص', 'Department': 'القسم', 'Status': 'الحالة الدراسية' }
};

var ed = [
    { dk: '2023 - Present', tk: 'New Cairo Academy', dsk: 'Bachelor of Computer Science - IS', st: true, sk: 'Currently Studying' },
    { dk: '2020 - 2023', tk: 'General Secondary School', dsk: 'Technology foundation', st: false }
];

var ei = {
    en: { '2023 - Present': '2023 - Present', 'New Cairo Academy': 'New Cairo Academy', 'Bachelor of Computer Science - IS': 'BSc Computer Science - IS', 'Currently Studying': 'Currently Studying', '2020 - 2023': '2020 - 2023', 'General Secondary School': 'General Secondary School', 'Technology foundation': 'Technology foundation' },
    de: { '2023 - Present': '2023 - Heute', 'New Cairo Academy': 'New Cairo Academy', 'Bachelor of Computer Science - IS': 'BSc Informatik - IS', 'Currently Studying': 'Studierend', '2020 - 2023': '2020 - 2023', 'General Secondary School': 'Allgemeine Sekundarschule', 'Technology foundation': 'Technologiegrundlage' },
    ar: { '2023 - Present': '2023 - الحالي', 'New Cairo Academy': 'أكاديمية القاهرة الجديدة', 'Bachelor of Computer Science - IS': 'بكالوريوس علوم حاسب', 'Currently Studying': 'قيد الدراسة', '2020 - 2023': '2020 - 2023', 'General Secondary School': 'ثانوية عامة', 'Technology foundation': 'أساسيات التكنولوجيا' }
};

var ld = [
    { i: 'fab fa-html5', n: 'HTML5', dk: 'Semantic markup' },
    { i: 'fab fa-css3-alt', n: 'CSS3', dk: 'Responsive layouts' },
    { i: 'fab fa-js', n: 'JavaScript', dk: 'Dynamic interactivity' },
    { i: 'fab fa-python', n: 'Python', dk: 'Backend & automation' },
    { i: 'fas fa-code', n: 'C++', dk: 'High-performance software' },
    { i: 'fas fa-network-wired', n: 'CCNA', dk: 'Networking certified' }
];

var ldi = { en: {}, de: {}, ar: {} };
['Semantic markup', 'Responsive layouts', 'Dynamic interactivity', 'Backend & automation', 'High-performance software', 'Networking certified'].forEach(function (k) {
    ldi.en[k] = k;
    ldi.de[k] = k;
    ldi.ar[k] = k;
});

var sd = [
    { i: 'fas fa-puzzle-piece', n: 'Problem Solving', dk: 'Complex issues' },
    { i: 'fas fa-chart-line', n: 'Analytical Thinking', dk: 'Data-driven logic' },
    { i: 'fas fa-users', n: 'Team Collaboration', dk: 'Effective teamwork' },
    { i: 'fas fa-clock', n: 'Time Management', dk: 'Task prioritization' },
    { i: 'fas fa-book-open', n: 'Self-Learning', dk: 'Fast tool adoption' },
    { i: 'fas fa-rotate', n: 'Adaptability', dk: 'Quick environment shifts' }
];

var si = { en: {}, de: {}, ar: {} };
['Problem Solving', 'Complex issues', 'Analytical Thinking', 'Data-driven logic', 'Team Collaboration', 'Effective teamwork', 'Time Management', 'Task prioritization', 'Self-Learning', 'Fast tool adoption', 'Adaptability', 'Quick environment shifts'].forEach(function (k) {
    si.en[k] = k;
    si.de[k] = k;
    si.ar[k] = k;
});

var pt = [
    { i: 'fab fa-github', c: '#6e5494', n: 'GitHub', u: 'https://github.com/Abdo-1818', dk: 'Repos' },
    { i: 'fab fa-linkedin-in', c: '#0077b5', n: 'LinkedIn', u: 'https://www.linkedin.com/in/ab-do-097783272', dk: 'Connect' },
    { i: 'fab fa-instagram', c: '#e4405f', n: 'Instagram', u: 'https://www.instagram.com/bboda_7', dk: 'Follow' }
];

var pdi = {
    en: { 'Repos': 'Repos', 'Connect': 'Connect', 'Follow': 'Follow' },
    de: { 'Repos': 'Repos', 'Connect': 'Verbinden', 'Follow': 'Folgen' },
    ar: { 'Repos': 'مستودعات', 'Connect': 'تواصل', 'Follow': 'متابعة' }
};

var cl = localStorage.getItem('abd_lang_v22') || 'en';
var ct = localStorage.getItem('abd_theme_v22') || 'dark';
var tsa = {
    en: ['Web Developer', 'Frontend Developer', 'Programmer'],
    de: ['Webentwickler', 'Frontend-Entwickler', 'Programmierer'],
    ar: ['مطور ويب', 'مطور واجهات', 'مبرمج']
};
var ts = tsa[cl], ti = 0, ci = 0, id = false, tt;

function te() {
    var el = document.getElementById('typedText');
    if (!el) return;
    var cur = ts[ti];
    if (id) {
        el.textContent = cur.substring(0, ci - 1);
        ci--;
        if (ci === 0) {
            id = false;
            ti = (ti + 1) % ts.length;
            tt = setTimeout(te, 280);
            return;
        }
    } else {
        el.textContent = cur.substring(0, ci + 1);
        ci++;
        if (ci === cur.length) {
            tt = setTimeout(function () { id = true; te(); }, 1600);
            return;
        }
    }
    tt = setTimeout(te, id ? 28 : 60);
}

function rt() {
    clearTimeout(tt);
    ti = 0;
    ci = 0;
    id = false;
    ts = tsa[cl];
    te();
}

function bpi() {
    var g = document.getElementById('infoGrid');
    if (!g) return;
    var v = pv[cl], l = pl[cl], h = '';
    for (var i = 0; i < pi.length; i++) {
        var info = pi[i], val = info.vk ? v[info.vk] : info.v, s = info.ia ? 'color:var(--accent-bright);' : '';
        h += '<div class="info-cell stagger-item"><div class="info-label">' + (l[info.lk] || info.lk) + '</div><div class="info-value" style="' + s + '">' + val + '</div></div>';
    }
    g.innerHTML = h;
}

function be() {
    var t = document.getElementById('educationTimeline');
    if (!t) return;
    var i18 = ei[cl], h = '';
    for (var i = 0; i < ed.length; i++) {
        var item = ed[i];
        h += '<div class="tl-item"><div class="tl-date">' + (i18[item.dk] || item.dk) + '</div><div class="tl-title">' + (i18[item.tk] || item.tk) + '</div><div class="tl-desc">' + (i18[item.dsk] || item.dsk) + '</div>';
        if (item.st) h += '<span class="status-badge"><span class="live-dot"></span>' + (i18[item.sk] || item.sk) + '</span>';
        h += '</div>';
    }
    t.innerHTML = h;
}

function bl() {
    var g = document.getElementById('languagesGrid');
    if (!g) return;
    var d = ldi[cl], h = '';
    for (var i = 0; i < ld.length; i++) {
        var s = ld[i];
        h += '<div class="skill-item stagger-item"><i class="' + s.i + '"></i><div class="skill-info"><h4>' + s.n + '</h4><p>' + (d[s.dk] || s.dk) + '</p></div></div>';
    }
    g.innerHTML = h;
}

function bs() {
    var g = document.getElementById('softSkillsGrid');
    if (!g) return;
    var i18 = si[cl], h = '';
    for (var i = 0; i < sd.length; i++) {
        var s = sd[i];
        h += '<div class="skill-item stagger-item"><i class="' + s.i + '"></i><div class="skill-info"><h4>' + (i18[s.n] || s.n) + '</h4><p>' + (i18[s.dk] || s.dk) + '</p></div></div>';
    }
    g.innerHTML = h;
}

function bc() {
    var g = document.getElementById('contactPlatforms');
    if (!g) return;
    var d = pdi[cl], h = '';
    for (var i = 0; i < pt.length; i++) {
        var p = pt[i];
        h += '<a href="' + p.u + '" target="_blank" rel="noopener" class="platform-card stagger-item"><div class="platform-icon" style="background:' + p.c + '20;color:' + p.c + ';"><i class="' + p.i + '"></i></div><div class="platform-info"><h4>' + p.n + '</h4><p>' + (d[p.dk] || p.dk) + '</p></div></a>';
    }
    g.innerHTML = h;
}

function ra() {
    bpi();
    bl();
    be();
    bs();
    bc();
}

function switchLang(l) {
    cl = l;
    localStorage.setItem('abd_lang_v22', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', l === 'ar');
    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
    document.getElementById(l === 'en' ? 'btnEn' : l === 'de' ? 'btnDe' : 'btnAr').classList.add('active');
    document.title = {
        en: 'Abdulrahman | Frontend Developer',
        de: 'Abdulrahman | Frontend-Entwickler',
        ar: 'عبدالرحمن | مطور واجهات'
    }[l];

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
        var k = els[i].getAttribute('data-i18n');
        if (translations[l] && translations[l][k]) els[i].innerHTML = translations[l][k];
    }
    var nls = document.querySelectorAll('[data-i18n-placeholder]');
    for (var i = 0; i < nls.length; i++) {
        var k = nls[i].getAttribute('data-i18n-placeholder');
        if (translations[l] && translations[l][k]) nls[i].placeholder = translations[l][k];
    }
    var navs = document.querySelectorAll('[data-i18n-nav]');
    for (var i = 0; i < navs.length; i++) {
        var k = navs[i].getAttribute('data-i18n-nav');
        if (translations[l] && translations[l]['nav.' + k]) navs[i].textContent = translations[l]['nav.' + k];
    }
    ra();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    rt();
    setTimeout(function () {
        var revs = document.querySelectorAll('.reveal,.stagger-container');
        for (var i = 0; i < revs.length; i++) revs[i].classList.remove('visible');
        hs();
    }, 150);
}

function applyTheme() {
    if (ct === 'light') {
        document.body.classList.add('light');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f0f4fa');
    } else {
        document.body.classList.remove('light');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#060000');
    }
}

function toggleTheme() {
    ct = ct === 'dark' ? 'light' : 'dark';
    localStorage.setItem('abd_theme_v22', ct);
    applyTheme();
}

function toggleMobileMenu() {
    var m = document.getElementById('mobileMenu');
    var o = document.getElementById('mobileOverlay');
    if (m.classList.contains('open')) {
        m.classList.remove('open');
        o.classList.remove('open');
    } else {
        m.classList.add('open');
        o.classList.add('open');
    }
}

function hs() {
    var h = document.getElementById('header');
    var st = document.getElementById('scrollTop');
    var sy = window.scrollY;
    if (sy > 60) {
        h.classList.add('scrolled');
        st.classList.add('visible');
    } else {
        h.classList.remove('scrolled');
        st.classList.remove('visible');
    }
    var secs = document.querySelectorAll('section[id]'),
        cur = 'home';
    for (var i = 0; i < secs.length; i++) {
        if (secs[i].offsetTop - 160 <= sy) cur = secs[i].id;
    }
    var links = document.querySelectorAll('.nav-desktop li a,.mobile-nav li a');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
        if (links[i].getAttribute('href') === '#' + cur) links[i].classList.add('active');
    }
    var revs = document.querySelectorAll('.reveal,.stagger-container'),
        wh = window.innerHeight;
    for (var i = 0; i < revs.length; i++) {
        if (revs[i].getBoundingClientRect().top < wh - 60) revs[i].classList.add('visible');
    }
    var wrappers = document.querySelectorAll('.section-wrapper');
    for (var i = 0; i < wrappers.length; i++) {
        var rect = wrappers[i].getBoundingClientRect();
        if (rect.top < wh * 0.5 && rect.bottom > wh * 0.2) {
            wrappers[i].classList.add('active-border');
        } else {
            wrappers[i].classList.remove('active-border');
        }
    }
}

function init() {
    applyTheme();
    var sl = localStorage.getItem('abd_lang_v22') || 'en';
    document.getElementById(sl === 'de' ? 'btnDe' : sl === 'ar' ? 'btnAr' : 'btnEn').classList.add('active');
    ra();
    if (sl !== 'en') {
        var tmp = sl;
        cl = 'en';
        switchLang(tmp);
    } else switchLang('en');
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    setTimeout(te, 500);
    window.addEventListener('scroll', hs, { passive: true });
    hs();
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;
            var tgt = document.querySelector(href);
            if (tgt) {
                e.preventDefault();
                tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (history.pushState) history.pushState(null, null, href);
            }
        });
    }
    document.addEventListener('contextmenu', function (e) { if (e.target.closest('img')) e.preventDefault(); });
    document.addEventListener('dragstart', function (e) { if (e.target.closest('img')) e.preventDefault(); });
    document.addEventListener('keydown', function (e) { if (e.ctrlKey && e.key === 't') { e.preventDefault(); toggleTheme(); } });
}

init();