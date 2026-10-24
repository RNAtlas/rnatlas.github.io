/* ==========================================================
   RNAtlas — page script
   ----------------------------------------------------------
   HOW TO UPDATE CONTENT
   • Deliverables: put the PDF in /docs and fill in `file`,
     `date` and `size` for that entry below. Entries with
     file: null show as "Coming soon".
   • Team: fill in names, roles and (optionally) a photo path
     such as "assets/img/team/name.jpg" and a LinkedIn/GitHub URL.
   ========================================================== */

const DELIVERABLES = [
  { title: "Project Information Form",        file: "docs/project-information-form.pdf", date: "Oct 24 2026", size: "303 KB" },
  { title: "Project Specification Document",  file: null, date: "", size: "" },
  { title: "Analysis and Requirements Report", file: null, date: "", size: "" },
  { title: "Demo Presentation",               file: null, date: "", size: "" },
  { title: "Detailed Design Report",          file: null, date: "", size: "" },
  { title: "Final Report",                    file: null, date: "", size: "" },
  { title: "Final Presentation",              file: null, date: "", size: "" },
  { title: "User Manual",                     file: null, date: "", size: "" },
  // Example of a published item:
  // { title: "Final Report", file: "docs/final-report.pdf", date: "May 8 2027", size: "1.5 MB" },
];

const TEAM = {
  supervisors: [
    { name: "Ercüment Çiçek", role: "Project Supervisor", photo: null,
      links: { linkedin: "https://www.linkedin.com/in/ercumentcicek/" } },
  ],
  members: [
    { name: "Mehmet Batuhan Neziroğlu", role: "Developer", photo: null,
      links: { linkedin: "https://www.linkedin.com/in/mehmet-batuhan-neziroglu" } },
    { name: "Elif Tuğçe Neziroğlu", role: "Developer", photo: null,
      links: { linkedin: "https://www.linkedin.com/in/elif-tugce-neziroglu/" } },
    { name: "Alperen Karslıoğlu", role: "Developer", photo: null,
      links: { linkedin: "https://www.linkedin.com/in/alperenkarslioglu/" } },
    { name: "Furkan Karademir", role: "Developer", photo: null,
      links: { linkedin: "https://www.linkedin.com/in/furkankarademir1/" } },
    { name: "Ahmet Eren Gözübenli", role: "Developer", photo: null,
      links: { linkedin: "https://www.linkedin.com/in/ahmet-eren-g%C3%B6z%C3%BCbenli-6a7725338/" } },
  ],
  // links example: { linkedin: "https://linkedin.com/in/...", github: "https://github.com/..." }
};

/* ---------------- Render: deliverables ---------------- */
const FILE_ICON = '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>';

function renderDeliverables() {
  const list = document.getElementById("deliverablesList");
  if (!list) return;
  list.innerHTML = DELIVERABLES.map((d) => {
    const ready = Boolean(d.file);
    const meta = ready
      ? [d.date && `Added: ${d.date}`, d.size && `Size: ${d.size}`].filter(Boolean).join(" · ")
      : "Will be added when available";
    const action = ready
      ? `<a class="deliverable__action" href="${d.file}" target="_blank" rel="noopener">Open PDF</a>`
      : `<em class="badge">Coming soon</em>`;
    return `
      <li class="deliverable reveal${ready ? " is-ready" : ""}">
        <div class="deliverable__icon">${FILE_ICON}</div>
        <div class="deliverable__body">
          <div class="deliverable__title">${d.title}</div>
          <div class="deliverable__meta">${meta}</div>
        </div>
        ${action}
      </li>`;
  }).join("");
}

/* ---------------- Render: team ---------------- */
function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
};

function memberCard(p) {
  const avatar = p.photo
    ? `<img src="${p.photo}" alt="${p.name}" loading="lazy" />`
    : initials(p.name);
  const links = Object.entries(p.links || {})
    .map(([label, url]) => {
      const icon = ICONS[label];
      const title = label === "linkedin" ? "LinkedIn" : label === "github" ? "GitHub" : label;
      return `<a class="social" href="${url}" target="_blank" rel="noopener" aria-label="${p.name} on ${title}" title="${title}">${icon || title}</a>`;
    })
    .join("");
  return `
    <div class="member reveal">
      <div class="member__avatar">${avatar}</div>
      <div class="member__name">${p.name}</div>
      <div class="member__role">${p.role}</div>
      ${links ? `<div class="member__links">${links}</div>` : ""}
    </div>`;
}

function renderTeam() {
  const sup = document.getElementById("supervisorList");
  const team = document.getElementById("teamList");
  if (sup) sup.innerHTML = TEAM.supervisors.map(memberCard).join("");
  if (team) team.innerHTML = TEAM.members.map(memberCard).join("");
}

/* ---------------- Nav ---------------- */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // highlight active section
  const anchors = [...links.querySelectorAll("a")];
  const sections = anchors.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        anchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* ---------------- Reveal on scroll ---------------- */
function initReveal() {
  const targets = document.querySelectorAll(
    ".section__title, .prose, .targets, .pipeline__step, .feature, .extensions, .link-card, .reveal"
  );
  targets.forEach((el) => el.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
}

/* ---------------- Hero: RNA strand particle animation ---------------- */
function initRNACanvas() {
  const canvas = document.getElementById("rnaCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SEQ = "GGACUAGCCUAUGCGAUCCAGUACGGAUCUUAGCGCAUGGCUAAUCGGAUCCAGUGCAUAGCUAGGCUACCGAUGGC";
  const N = SEQ.length;

  let W = 0, H = 0, DPR = 1;
  let dust = [];       // jittered sparkle particles along the backbone
  let ambient = [];    // background floating particles
  let mouseX = 0, mouseY = 0, px = 0, py = 0;
  let running = true;

  const rand = (a, b) => a + Math.random() * (b - a);

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const count = Math.round(Math.min(160, (W * H) / 9000));
    ambient = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      z: Math.random(),                     // depth 0 (far) .. 1 (near)
      vx: rand(-0.08, 0.08), vy: rand(-0.12, -0.02),
      tw: Math.random() * Math.PI * 2,
    }));

    dust = [];
    for (let i = 0; i < N - 1; i++) {
      for (let k = 0; k < 7; k++) {
        dust.push({ i, f: Math.random(), jx: rand(-1, 1), jy: rand(-1, 1), tw: Math.random() * 6.28 });
      }
    }
    setupScene();
  }

  /* ======== Target protein with binding pockets + docking RNA fragments ======== */
  let protein = null;
  let frags = [];

  const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
  const v3 = (x, y, z) => ({ x, y, z });
  const add = (a, b) => v3(a.x + b.x, a.y + b.y, a.z + b.z);
  const sub = (a, b) => v3(a.x - b.x, a.y - b.y, a.z - b.z);
  const mul = (a, k) => v3(a.x * k, a.y * k, a.z * k);
  const len3 = (a) => Math.hypot(a.x, a.y, a.z);
  const norm = (a) => mul(a, 1 / (len3(a) || 1));
  const cross = (a, b) => v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

  function ribbonColor(s) {
    const x = Math.min(0.999, Math.max(0, s)) * (PAL.ribbon.length - 1);
    const i = Math.floor(x), f = x - i, a = PAL.ribbon[i], b = PAL.ribbon[i + 1];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }

  // Catmull-Rom spline through 3D points
  function spline(pts, steps) {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < steps; k++) {
        const t = k / steps, t2 = t * t, t3 = t2 * t;
        const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
        out.push(v3(f(p0.x, p1.x, p2.x, p3.x), f(p0.y, p1.y, p2.y, p3.y), f(p0.z, p1.z, p2.z, p3.z)));
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  // A globin-like fold: 7 alpha helices packed into a globule, joined by loops (unit-sphere coords).
  const HELICES = [                       // roughly the 8 helices (A–H) of a globin
    [v3(-0.72, -0.52, 0.22), v3(0.02, -0.78, 0.36)],
    [v3(0.30, -0.66, 0.02), v3(0.74, -0.08, 0.12)],
    [v3(0.66, 0.16, 0.38), v3(0.26, 0.34, 0.68)],
    [v3(-0.02, 0.16, 0.74), v3(-0.58, 0.42, 0.46)],
    [v3(-0.74, 0.12, 0.02), v3(-0.34, 0.78, -0.18)],
    [v3(0.02, 0.74, -0.26), v3(0.60, 0.48, -0.38)],
    [v3(0.70, 0.22, -0.18), v3(0.10, -0.36, -0.64)],
    [v3(-0.20, -0.44, -0.46), v3(-0.70, -0.10, -0.44)],
  ];

  function buildFold() {
    const pieces = [];                  // {type, pts:[{p, w, n}]}
    const HR = 0.1, HW = 0.062;        // helix radius, ribbon half-width
    let prevEnd = v3(-0.95, -0.15, 0.4); // N-terminal tail start
    HELICES.forEach(([P0, P1], hi) => {
      const axis = sub(P1, P0), L = len3(axis), a = norm(axis);
      const ref = Math.abs(a.y) < 0.9 ? v3(0, 1, 0) : v3(1, 0, 0);
      const u = norm(cross(a, ref)), v = cross(a, u);
      const turns = Math.max(3, Math.round(L / 0.15));
      const n = turns * 18, pts = [];
      for (let k = 0; k <= n; k++) {
        const phi = (k / 18) * Math.PI * 2;
        const radial = add(mul(u, Math.cos(phi)), mul(v, Math.sin(phi)));
        // taper the radius at helix ends so loops join smoothly
        const taper = Math.min(1, k / 6, (n - k) / 6);
        pts.push({ p: add(add(P0, mul(a, (k / n) * L)), mul(radial, HR * taper)), w: mul(a, HW * (0.4 + 0.6 * taper)), n: radial });
      }
      // loop from the previous element to this helix, bowed outward
      const s0 = prevEnd, s1 = pts[0].p, mid = mul(add(s0, s1), 0.5);
      const bow = add(mid, mul(norm(mid), 0.22));
      pieces.push({ type: "loop", pts: spline([s0, bow, s1], 10).map((p) => ({ p })) });
      pieces.push({ type: "helix", pts });
      prevEnd = pts[pts.length - 1].p;
    });
    const tail = v3(-0.85, -0.75, -0.1);
    pieces.push({ type: "loop", pts: spline([prevEnd, add(mul(add(prevEnd, tail), 0.5), v3(0, -0.15, 0.1)), tail], 10).map((p) => ({ p })) });

    // assign N→C fraction for coloring
    const total = pieces.reduce((s, pc) => s + pc.pts.length, 0);
    let c = 0;
    pieces.forEach((pc) => pc.pts.forEach((q) => { q.s = c++ / total; }));
    return pieces;
  }

  function setupScene() {
    const mobile = W < 760;
    const R = mobile ? Math.min(W * 0.32, 140) : Math.min(Math.min(W, H) * 0.23, 210);
    const cx = mobile ? W * 0.8 : W * 0.81;
    const cy = mobile ? H * 0.84 : H * 0.53;

    // binding pockets in grooves on the left-facing side of the fold
    const pockets = [v3(-0.86, -0.22, 0.3), v3(-0.62, 0.62, 0.32), v3(-0.5, -0.78, 0.25)].map((d) => ({
      pos: mul(norm(d), 0.9), glow: 0, glowGoal: 0, color: PAL.strong, busy: false,
      mouth: { x: 0, y: 0 }, n: { x: -1, y: 0 }, z: 0,
    }));

    protein = { cx, cy, R, pockets, fold: buildFold(), rotY: 0, rotX: 0 };
    const count = mobile ? 2 : 3;
    frags = Array.from({ length: count }, (_, i) => newFrag(i * 2.2 + 0.5));
  }

  // rotate (gentle rocking) + weak perspective projection
  function project(p) {
    const { rotY, rotX, cx, cy, R } = protein;
    const cyR = Math.cos(rotY), syR = Math.sin(rotY), cxR = Math.cos(rotX), sxR = Math.sin(rotX);
    let x = p.x * cyR + p.z * syR, z = -p.x * syR + p.z * cyR, y = p.y;
    const y2 = y * cxR - z * sxR; z = y * sxR + z * cxR; y = y2;
    const s = 1 / (1 - z * 0.18);
    return { x: cx + px * 0.8 + x * R * s, y: cy + py * 0.8 + y * R * s, z, s };
  }
  function rotN(n) {
    const { rotY, rotX } = protein;
    const x = n.x * Math.cos(rotY) + n.z * Math.sin(rotY), z = -n.x * Math.sin(rotY) + n.z * Math.cos(rotY);
    return n.y * Math.sin(rotX) + z * Math.cos(rotX);
  }

  function updatePockets(t) {
    protein.rotY = 0.38 * Math.sin(t * 0.16);
    protein.rotX = 0.12 * Math.sin(t * 0.11 + 1);
    const c = project(v3(0, 0, 0));
    for (const p of protein.pockets) {
      const m = project(p.pos);
      const dx = m.x - c.x, dy = m.y - c.y, d = Math.hypot(dx, dy) || 1;
      p.mouth = { x: m.x, y: m.y };
      p.n = { x: dx / d, y: dy / d };
      p.z = m.z;
    }
  }

  function newFrag(delay) {
    const len = 7 + Math.floor(Math.random() * 5);
    let seq = "";
    for (let i = 0; i < len; i++) seq += "AUGC"[Math.floor(Math.random() * 4)];
    return { seq, state: "wait", timer: delay, pocket: null, alpha: 0, dir: { x: -1, y: 0 }, head: { x: 0, y: 0 } };
  }

  function launch(f, t) {
    const free = protein.pockets.filter((p) => !p.busy);
    if (!free.length) { f.timer = 1; return; }
    const p = free[Math.floor(Math.random() * free.length)];
    p.busy = true;
    f.pocket = p;
    f.strong = Math.random() < 0.65;          // strong vs weak binder
    // approach from above/below the pocket so fragments stay clear of the centered title
    const pa = Math.atan2(p.n.y, p.n.x);
    const side = Math.sin(pa) < -0.2 ? -1 : Math.sin(pa) > 0.2 ? 1 : (Math.random() < 0.5 ? -1 : 1);
    const a = pa - side * rand(0.7, 1.2) * (Math.cos(pa) < 0 ? 1 : -1);
    const dist = protein.R * rand(1.5, 2.0);
    f.start = { x: p.mouth.x + Math.cos(a) * dist, y: p.mouth.y + Math.sin(a) * dist };
    f.ctrlOff = rand(-1, 1) * protein.R * 0.8;
    f.t0 = t;
    f.dur = rand(5, 7);
    f.state = "approach";
  }

  function updateFrag(f, t, dt) {
    const p = f.pocket;
    if (f.state === "wait") {
      f.timer -= dt;
      if (f.timer <= 0) launch(f, t);
      return;
    }
    const mouth = p.mouth;
    const n = p.n;
    let target = { x: n.x, y: n.y };                 // body points away from the pocket

    if (f.state === "approach") {
      const u = Math.min(1, (t - f.t0) / f.dur), e = ease(u);
      const end = { x: mouth.x + n.x * 4, y: mouth.y + n.y * 4 };
      const ctrl = {
        x: (f.start.x + end.x) / 2 - n.y * f.ctrlOff, y: (f.start.y + end.y) / 2 + n.x * f.ctrlOff,
      };
      const q = (a, b, c) => (1 - e) * (1 - e) * a + 2 * (1 - e) * e * b + e * e * c;
      const nx = q(f.start.x, ctrl.x, end.x), ny = q(f.start.y, ctrl.y, end.y);
      const vx = nx - f.head.x, vy = ny - f.head.y, vl = Math.hypot(vx, vy);
      if (vl > 0.01 && u < 0.85) target = { x: -vx / vl, y: -vy / vl };
      f.head = { x: nx, y: ny };
      f.alpha = Math.min(1, u * 3);
      if (u >= 1) { f.state = "docked"; f.t0 = t; f.hold = f.strong ? rand(3.5, 5) : rand(1.2, 1.8); }
    } else if (f.state === "docked") {
      const wobble = f.strong ? 0.6 : 3.2;
      f.head = { x: mouth.x + n.x * 4 + Math.sin(t * 9) * wobble * (f.strong ? 0.3 : 1), y: mouth.y + n.y * 4 + Math.cos(t * 7) * wobble * 0.5 };
      if (t - f.t0 > f.hold) { f.state = "leave"; f.t0 = t; f.leaveDir = { x: n.x + rand(-0.4, 0.4), y: n.y + rand(-0.4, 0.4) }; }
    } else if (f.state === "leave") {
      const u = (t - f.t0) / 2.6;
      f.head = { x: f.head.x + f.leaveDir.x * 0.9, y: f.head.y + f.leaveDir.y * 0.9 };
      target = { x: f.leaveDir.x, y: f.leaveDir.y };
      f.alpha = Math.max(0, 1 - u);
      if (u >= 1) { p.busy = false; Object.assign(f, newFrag(rand(0.8, 2.5))); return; }
    }

    // smooth the body direction so turns look organic
    f.dir.x += (target.x - f.dir.x) * 0.06;
    f.dir.y += (target.y - f.dir.y) * 0.06;
    const dl = Math.hypot(f.dir.x, f.dir.y) || 1;
    f.dir.x /= dl; f.dir.y /= dl;

    // pocket glow responds to binding
    const goal = f.state === "docked" ? (f.strong ? 1 : 0.55 + 0.45 * Math.sin(t * 22)) : 0;
    p.color = f.strong ? PAL.strong : PAL.weak;
    p.glowGoal = goal;
  }

  function drawProtein(t) {
    const { R, fold, pockets } = protein;
    const c = project(v3(0, 0, 0));

    // soft halo behind the molecule
    const g = ctx.createRadialGradient(c.x, c.y, R * 0.2, c.x, c.y, R * 1.5);
    g.addColorStop(0, `rgba(${PAL.c1},0.08)`);
    g.addColorStop(1, `rgba(${PAL.c1},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c.x, c.y, R * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // build depth-sorted ribbon quads (helices) and tube segments (loops)
    const items = [];
    for (const pc of fold) {
      const pr = pc.pts.map((q) => {
        const o = { c: project(q.p), s: q.s };
        if (pc.type === "helix") {
          o.a = project(add(q.p, q.w));
          o.b = project(sub(q.p, q.w));
          o.face = Math.abs(rotN(q.n));
        }
        return o;
      });
      for (let i = 0; i < pr.length - 1; i++) {
        const A = pr[i], B = pr[i + 1];
        items.push({ type: pc.type, A, B, z: (A.c.z + B.c.z) / 2 });
      }
    }
    items.sort((m, n) => m.z - n.z);

    for (const it of items) {
      const col = ribbonColor(it.A.s);
      const fade = 0.6 * (1 - (it.z + 1) / 2);              // farther = fades into the paper
      const tone = (c, k) => {
        const v = [0, 1, 2].map((i) => col[i] * k);
        return v.map((x, i) => (x + (PAL.bg[i] - x) * fade) | 0).join(",");
      };
      if (it.type === "helix") {
        const rgb = tone(col, 0.6 + 0.45 * it.A.face);
        ctx.fillStyle = `rgba(${rgb},0.95)`;
        ctx.strokeStyle = `rgba(${rgb},0.95)`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(it.A.a.x, it.A.a.y);
        ctx.lineTo(it.B.a.x, it.B.a.y);
        ctx.lineTo(it.B.b.x, it.B.b.y);
        ctx.lineTo(it.A.b.x, it.A.b.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.strokeStyle = `rgba(${tone(col, 0.85)},0.95)`;
        ctx.lineWidth = Math.max(1.5, R * 0.022 * it.A.c.s);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(it.A.c.x, it.A.c.y);
        ctx.lineTo(it.B.c.x, it.B.c.y);
        ctx.stroke();
      }
    }

    // binding pockets: soft rings that light up when an RNA docks
    for (const p of pockets) {
      p.glow += ((p.glowGoal || 0) - p.glow) * 0.08;
      const r = R * 0.13;
      const idle = 0.35 + 0.15 * Math.sin(t * 1.4 + p.pos.y * 3);
      ctx.setLineDash([3, 4]);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(${PAL.ink},${idle})`;
      ctx.beginPath();
      ctx.arc(p.mouth.x, p.mouth.y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      if (p.glow > 0.02) {
        const gg = ctx.createRadialGradient(p.mouth.x, p.mouth.y, 0, p.mouth.x, p.mouth.y, r * 1.8);
        gg.addColorStop(0, `rgba(${p.color},${0.55 * p.glow})`);
        gg.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(p.mouth.x, p.mouth.y, r * 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(${p.color},${0.3 + 0.7 * p.glow})`;
        ctx.beginPath();
        ctx.arc(p.mouth.x, p.mouth.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  function drawFrags(t) {
    for (const f of frags) {
      if (f.state === "wait" || f.alpha <= 0) continue;
      const perp = { x: -f.dir.y, y: f.dir.x };
      const docked = f.state === "docked";
      const amp = docked ? (f.strong ? 2 : 4) : 6;
      const nodes = [];
      for (let i = 0; i < f.seq.length; i++) {
        const w = Math.sin(i * 0.9 - t * 3) * amp * Math.min(1, i / 2);
        nodes.push({
          x: f.head.x + f.dir.x * i * 12 + perp.x * w,
          y: f.head.y + f.dir.y * i * 12 + perp.y * w,
          b: f.seq[i],
        });
      }

      // hydrogen-bond style contacts while docked
      if (docked) {
        const p = f.pocket;
        const c = f.strong ? PAL.strong : PAL.weak;
        ctx.setLineDash([2, 4]);
        ctx.lineWidth = 1;
        const bonds = f.strong ? 3 : 1;
        for (let k = 0; k < bonds; k++) {
          const flick = f.strong ? 0.7 : 0.35 + 0.35 * Math.sin(t * 25 + k);
          const off = (k - (bonds - 1) / 2) * protein.R * 0.09;
          const rim = { x: p.mouth.x - p.n.y * off, y: p.mouth.y + p.n.x * off };
          const nd = nodes[Math.min(k, nodes.length - 1)];
          ctx.strokeStyle = `rgba(${c},${flick * f.alpha})`;
          ctx.beginPath();
          ctx.moveTo(nd.x, nd.y);
          ctx.lineTo(rim.x, rim.y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // backbone
      ctx.strokeStyle = `rgba(${PAL.ink},${0.45 * f.alpha})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      nodes.forEach((nd, i) => (i ? ctx.lineTo(nd.x, nd.y) : ctx.moveTo(nd.x, nd.y)));
      ctx.stroke();

      // nucleotides with base stubs
      nodes.forEach((nd) => {
        const c = PAL.base[nd.b];
        ctx.strokeStyle = `rgba(${c},${0.6 * f.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nd.x, nd.y);
        ctx.lineTo(nd.x + perp.x * 9, nd.y + perp.y * 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${PAL.ink},${0.9 * f.alpha})`;
        ctx.arc(nd.x, nd.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  let lastT = 0;

  // Strand axis: a gentle S-curve sweeping diagonally across the left of the hero.
  function axis(s) {
    const mobile = W < 760;
    const x0 = mobile ? -0.3 : -0.05, x1 = mobile ? 0.3 : 0.36;
    const x = W * (x0 + (x1 - x0) * s) + Math.sin(s * Math.PI * 1.6) * W * 0.05;
    const y = H * (1.12 - 1.24 * s);
    return { x, y };
  }

  // three parallel strands: the main one plus two smaller, dimmer copies to its left (depth layers)
  const STRANDS = [
    { dx: -0.19, rs: 0.62, ph: 2.1, sp: 0.42, am: 0.45 },
    { dx: -0.07, rs: 0.8,  ph: 4.0, sp: 0.5,  am: 0.7 },
    { dx: 0.05,  rs: 1,    ph: 0,   sp: 0.55, am: 1 },
  ];

  function strandPoints(t, cfg) {
    const R = Math.max(38, Math.min(W, H) * 0.075) * cfg.rs;
    const shift = W < 760 ? 0 : W * cfg.dx;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const s = i / (N - 1);
      const a = axis(s), b = axis(Math.min(1, s + 0.002));
      let tx = b.x - a.x, ty = b.y - a.y;
      const len = Math.hypot(tx, ty) || 1;
      tx /= len; ty /= len;
      const nx = -ty, ny = tx;
      const theta = i * 0.52 + t * cfg.sp + cfg.ph;
      const off = Math.sin(theta) * R;
      const z = (Math.cos(theta) + 1) / 2; // 0 back .. 1 front
      const par = cfg.rs;                     // farther strands move less with the mouse
      pts.push({
        x: a.x + shift + nx * off + px * (0.4 + z) * par, y: a.y + ny * off + py * (0.4 + z) * par,
        ax: a.x + shift + nx * off * 0.15 + px * 0.6 * par, ay: a.y + ny * off * 0.15 + py * 0.6 * par,
        z, base: SEQ[i],
      });
    }
    return pts;
  }

  function drawStrand(pts, t, am) {

      // base stubs (drawn back-to-front)
      const order = pts.map((p, i) => i).sort((a, b) => pts[a].z - pts[b].z);
      for (const i of order) {
        const p = pts[i];
        const c = PAL.base[p.base];
        ctx.strokeStyle = `rgba(${c},${(0.08 + p.z * 0.45) * am})`;
        ctx.lineWidth = 0.6 + p.z * 1.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.ax, p.ay);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${c},${(0.2 + p.z * 0.7) * am})`;
        ctx.arc(p.ax, p.ay, 0.8 + p.z * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // backbone sparkle dust
      for (const d of dust) {
        const a = pts[d.i], b = pts[d.i + 1];
        const z = a.z + (b.z - a.z) * d.f;
        const spread = 2 + z * 4;
        const x = a.x + (b.x - a.x) * d.f + d.jx * spread;
        const y = a.y + (b.y - a.y) * d.f + d.jy * spread;
        const alpha = (0.12 + z * 0.75) * (0.7 + 0.3 * Math.sin(t * 2 + d.tw)) * am;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${PAL.ink},${alpha})`;
        ctx.arc(x, y, 0.5 + z * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // phosphate nodes with soft glow on the front side
      for (const i of order) {
        const p = pts[i];
        if (p.z > 0.65) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10 * p.z);
          g.addColorStop(0, `rgba(${PAL.ink},${0.08 * p.z * am})`);
          g.addColorStop(1, `rgba(${PAL.ink},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10 * p.z, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${PAL.ink},${(0.25 + p.z * 0.75) * am})`;
        ctx.arc(p.x, p.y, 1 + p.z * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
  }

  function draw(time) {
    const t = time / 1000;
    ctx.clearRect(0, 0, W, H);

    // smooth parallax
    px += (mouseX - px) * 0.04;
    py += (mouseY - py) * 0.04;

    // ambient particles
    for (const p of ambient) {
      if (!reduceMotion) {
        p.x += p.vx * (0.4 + p.z); p.y += p.vy * (0.4 + p.z);
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      }
      const alpha = (0.08 + p.z * 0.25) * (0.65 + 0.35 * Math.sin(t * 1.3 + p.tw));
      const r = 0.4 + p.z * 1.6;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${PAL.ink},${alpha})`;
      ctx.arc(p.x + px * p.z * 1.5, p.y + py * p.z * 1.5, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // target protein + docking fragments
    const dt = Math.min(0.05, Math.max(0, t - lastT));
    lastT = t;
    updatePockets(reduceMotion ? 0 : t);
    if (!reduceMotion) frags.forEach((f) => updateFrag(f, t, dt));
    drawProtein(reduceMotion ? 0 : t);

    for (const cfg of STRANDS) {
      if (W < 760 && cfg.am < 1) continue;   // keep phones uncluttered
      drawStrand(strandPoints(reduceMotion ? 0 : t, cfg), t, cfg.am);
    }

    drawFrags(t);

    if (running && !reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * -18;
    mouseY = (e.clientY / window.innerHeight - 0.5) * -12;
  }, { passive: true });

  // pause the animation while the hero is off-screen
  if ("IntersectionObserver" in window && !reduceMotion) {
    new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning) requestAnimationFrame(draw);
    }).observe(canvas);
  }

  requestAnimationFrame(draw);
}


/* ---------------- Cursor-following RNA strand ---------------- */
function initCursorRNA() {
  const canvas = document.getElementById("cursorRna");
  if (!canvas) return;
  if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");

  const SEQ = "AUGGCUA";
  const SPACING = 11;
  let W = 0, H = 0, DPR = 1;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let active = false, alpha = 0, lastMove = 0;
  const nodes = SEQ.split("").map((b, i) => ({ x: mx - i * SPACING, y: my, b }));

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    if (!active) nodes.forEach((n, i) => { n.x = mx - i * 2; n.y = my + i * 2; });
    active = true; lastMove = performance.now();
  }, { passive: true });
  document.addEventListener("mouseleave", () => { active = false; });

  function frame(now) {
    const t = now / 1000;
    alpha += ((active ? 1 : 0) - alpha) * 0.08;
    ctx.clearRect(0, 0, W, H);

    if (alpha > 0.01) {
      // head trails slightly behind the pointer and wiggles when the mouse rests
      const idle = Math.min(1, (now - lastMove) / 1200);
      const tx = mx + 16 + Math.sin(t * 2.1) * 10 * idle;
      const ty = my + 20 + Math.cos(t * 1.6) * 8 * idle;
      const head = nodes[0];
      const prevX = head.x, prevY = head.y;
      head.x += (tx - head.x) * 0.2;
      head.y += (ty - head.y) * 0.2;
      const speed = Math.min(1, Math.hypot(head.x - prevX, head.y - prevY) / 12);

      // follow-the-leader chain
      for (let i = 1; i < nodes.length; i++) {
        const a = nodes[i - 1], b = nodes[i];
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
        b.x = a.x + (dx / d) * SPACING;
        b.y = a.y + (dy / d) * SPACING;
      }

      // apply a travelling wave perpendicular to the chain for a lively look
      const pts = nodes.map((n, i) => {
        const nb = nodes[Math.min(nodes.length - 1, i + 1)], pa = nodes[Math.max(0, i - 1)];
        let dx = nb.x - pa.x, dy = nb.y - pa.y;
        const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
        const amp = (2 + 5 * (speed + 0.4 * idle)) * (i / nodes.length);
        const w = Math.sin(i * 0.75 - t * 7) * amp;
        return { x: n.x - dy * w, y: n.y + dx * w, px: -dy, py: dx, b: n.b };
      });

      // backbone
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.strokeStyle = `rgba(${PAL.ink},${0.7 * alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mxp = (pts[i].x + pts[i + 1].x) / 2, myp = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mxp, myp);
      }
      ctx.stroke();

      // bases + phosphates
      pts.forEach((q, i) => {
        const fadeTail = 1 - (i / pts.length) * 0.55;
        const c = PAL.base[q.b];
        ctx.strokeStyle = `rgba(${c},${0.9 * alpha * fadeTail})`;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(q.x + q.px * 9, q.y + q.py * 9);
        ctx.stroke();
        ctx.fillStyle = `rgba(${c},${alpha * fadeTail})`;
        ctx.beginPath();
        ctx.arc(q.x + q.px * 10, q.y + q.py * 10, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${PAL.ink},${0.85 * alpha * fadeTail})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, i === 0 ? 3.4 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}


/* ---------------- Theme: palettes + light/dark ---------------- */
const PALETTES = [
  { id: "paper",     name: "Paper",     sw: ["#1f3fbf", "#e5533d", "#2a9d6f"] },
  { id: "botanical", name: "Botanical", sw: ["#2f6b4f", "#c8553d", "#7b4b94"] },
  { id: "nordic",    name: "Nordic",    sw: ["#4f46e5", "#e11d74", "#0284c7"] },
  { id: "editorial", name: "Editorial", sw: ["#8c1c3a", "#e0662a", "#2b4c7e"] },
  { id: "signal",    name: "Signal",    sw: ["#ff4f00", "#2b59ff", "#00a676"] },
];

// Canvas colors, read from the active CSS palette (as "r,g,b" strings / arrays)
const PAL = { base: {}, ribbon: [], bg: [0, 0, 0] };

function hexToRgb(h) {
  h = h.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const get = (v) => hexToRgb(cs.getPropertyValue(v));
  const [bg, ink, c1, c2, c3, c4] = ["--bg", "--text", "--c1", "--c2", "--c3", "--c4"].map(get);
  const str = (a) => a.join(",");
  Object.assign(PAL.base, { A: str(c2), U: str(c4), G: str(c3), C: str(c1) });
  PAL.ribbon.splice(0, PAL.ribbon.length, c1, c3, c4, c2);   // N → C terminus
  PAL.bg.splice(0, 3, ...bg);
  PAL.ink = str(ink);
  PAL.c1 = str(c1);
  PAL.strong = str(c3);   // stable binding
  PAL.weak = str(c2);     // weak binding
}

function setTheme(palette, mode) {
  const root = document.documentElement;
  root.setAttribute("data-palette", palette);
  root.setAttribute("data-theme", mode);
  const pal = PALETTES.find((p) => p.id === palette) || PALETTES[0];
  const label = document.getElementById("paletteLabel");
  if (label) label.textContent = pal.name;
  document.querySelectorAll("#paletteMenu button").forEach((b) =>
    b.setAttribute("aria-checked", String(b.dataset.palette === palette)));
  readPalette();
}

function initTheme() {
  const root = document.documentElement;
  const menu = document.getElementById("paletteMenu");
  const btn = document.getElementById("paletteBtn");
  const modeBtn = document.getElementById("modeBtn");

  menu.innerHTML = PALETTES.map((p) => `
    <button role="menuitemradio" data-palette="${p.id}" aria-checked="false">
      <span class="swatches">${p.sw.map((c) => `<i style="background:${c}"></i>`).join("")}</span>
      ${p.name}
    </button>`).join("");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-palette]");
    if (!b) return;
    setTheme(b.dataset.palette, root.getAttribute("data-theme") || "dark");
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  });
  document.addEventListener("click", () => { menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); });
  modeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(root.getAttribute("data-palette") || "botanical", next);
  });

  setTheme(root.getAttribute("data-palette") || "botanical", root.getAttribute("data-theme") || "dark");
}


/* ---------------- University logo (hidden if the file is missing) ---------------- */
function initUniLogo() {
  const badge = document.getElementById("uniBadge");
  const img = document.getElementById("uniLogo");
  if (!badge || !img) return;
  const tries = ["assets/img/bilkent-logo.svg"];
  const ok = () => badge.classList.add("has-logo");
  img.addEventListener("load", ok);
  img.addEventListener("error", () => {
    const next = tries.shift();
    if (next) img.src = next; else badge.hidden = true;
  });
  if (img.complete && img.naturalWidth) ok();
}

/* ---------------- Boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  initTheme();
  initUniLogo();
  renderDeliverables();
  renderTeam();
  initNav();
  initReveal();
  initRNACanvas();
  initCursorRNA();
});
