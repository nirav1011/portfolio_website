/* ============================================================================
   script.js — renders the page from data.js and wires up interactions.
   You normally don't need to edit this file; change data.js instead.
   ========================================================================= */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const ICONS = {
    mail: '<path d="M4 4h16v16H4z"/><path d="M4 7l8 6 8-6"/>',
    linkedin: '<path d="M4 9h4v11H4zM6 4a2 2 0 100 4 2 2 0 000-4zM11 20V9h4v1.5A4 4 0 0120 14v6h-4v-5.5a1.5 1.5 0 00-3 0V20z"/>',
    github: '<path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.9a3.4 3.4 0 00-1-2.6c3-.3 6.2-1.5 6.2-6.8A5.3 5.3 0 0018.8 3a4.9 4.9 0 00-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 00-6.8 0C5.6-.9 4.5-.6 4.5-.6A4.9 4.9 0 004.4 3 5.3 5.3 0 003 6.7c0 5.3 3.2 6.5 6.2 6.8a3.4 3.4 0 00-1 2.6V20"/>',
    file: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5-9 9"/>',
  };

  function icon(name) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + ICONS[name] + "</svg>"
    );
  }

  function linkBtn(href, label, iconName, primary) {
    const a = document.createElement("a");
    a.className = "btn" + (primary ? " btn--primary" : "");
    a.href = href;
    if (/^https?:/.test(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.innerHTML = (iconName ? icon(iconName) : "") + "<span></span>";
    a.querySelector("span").textContent = label;
    return a;
  }

  /* ------------------------------------------------------------- hero --- */

  function renderHero() {
    $("#heroEyebrow").textContent = PROFILE.location + " · Available for internships & co-ops";
    $("#heroName").textContent = PROFILE.name;
    $("#heroRole").textContent = PROFILE.role;
    $("#heroTagline").textContent = PROFILE.tagline;

    const actions = $("#heroActions");
    actions.appendChild(linkBtn("#projects", "View Projects", "arrow", true));
    actions.appendChild(linkBtn("mailto:" + PROFILE.email, "Get in Touch", "mail"));
    if (PROFILE.resume) {
      actions.appendChild(linkBtn(PROFILE.resume, "Résumé", "file"));
    }
  }

  /* ------------------------------------------------------------ about --- */

  function renderAbout() {
    const body = $("#aboutBody");
    PROFILE.about.forEach((para) => body.appendChild(el("p", null, para)));
    if (PROFILE.seeking) {
      body.appendChild(el("div", "callout", PROFILE.seeking));
    }

    const tl = $("#timeline");
    TIMELINE.forEach((item) => {
      const li = el("li");
      li.appendChild(el("span", "timeline__period", item.period));
      li.appendChild(el("div", "timeline__title", item.title));
      if (item.detail) li.appendChild(el("div", "timeline__detail", item.detail));
      tl.appendChild(li);
    });
  }

  /* ----------------------------------------------------------- skills --- */

  function renderSkills() {
    const grid = $("#skills-grid");
    PROFILE.skills.forEach((group) => {
      const card = el("div", "skillcard");
      card.appendChild(el("h3", null, group.group));
      const ul = el("ul");
      group.items.forEach((s) => ul.appendChild(el("li", null, s)));
      card.appendChild(ul);
      grid.appendChild(card);
    });
  }

  /* --------------------------------------------------------- projects --- */

  // Every gallery image on the page, in DOM order, for lightbox navigation.
  const shots = [];

  function renderGallery(project) {
    if (!project.images || !project.images.length) return null;

    const grid = el("div", "gallery");

    project.images.forEach((img) => {
      const btn = el("button", "shot");
      btn.type = "button";

      const im = document.createElement("img");
      im.src = img.src;
      im.alt = img.caption || project.title;
      im.loading = "lazy";
      btn.appendChild(im);

      const cap = el("span", "shot__caption", img.caption || "");
      btn.appendChild(cap);

      // Placeholder fallback: if the file isn't in public/images yet, show a
      // labelled frame instead of a broken-image icon.
      const ph = el("span", "shot__ph");
      ph.innerHTML = icon("image");
      ph.appendChild(el("span", null, img.caption || "Photo"));
      ph.appendChild(el("span", null, img.src.split("/").pop()));

      const index = shots.length;
      const record = {
        src: img.src,
        caption: img.caption || project.title,
        missing: false,
      };
      shots.push(record);

      im.addEventListener("error", () => {
        // File isn't in images/ yet — show a labelled frame and take this
        // slot out of the lightbox rotation so Next/Prev never land on it.
        record.missing = true;
        btn.classList.add("shot--empty");
        btn.disabled = true;
        cap.remove();
        btn.appendChild(ph);
      });
      btn.addEventListener("click", () => openLightbox(index));
      btn.setAttribute("aria-label", "View: " + (img.caption || project.title));

      grid.appendChild(btn);
    });

    return grid;
  }

  function renderProjects() {
    const list = $("#projects-list");

    PROJECTS.forEach((p) => {
      const card = el("article", "project");
      card.id = p.id;

      const head = el("div", "project__head");
      head.appendChild(el("h3", null, p.title));
      head.appendChild(el("span", "project__period", p.period));
      card.appendChild(head);

      if (p.subtitle) card.appendChild(el("p", "project__sub", p.subtitle));
      if (p.summary) card.appendChild(el("p", "project__summary", p.summary));

      if (p.tags && p.tags.length) {
        const tags = el("div", "tags");
        p.tags.forEach((t) => tags.appendChild(el("span", "tag", t)));
        card.appendChild(tags);
      }

      if (p.bullets && p.bullets.length) {
        const ul = el("ul", "project__bullets");
        p.bullets.forEach((b) => ul.appendChild(el("li", null, b)));
        card.appendChild(ul);
      }

      if (p.links && p.links.length) {
        const links = el("div", "project__links");
        p.links.forEach((l) => links.appendChild(linkBtn(l.href, l.label, "arrow")));
        card.appendChild(links);
      }

      const gallery = renderGallery(p);
      if (gallery) card.appendChild(gallery);

      list.appendChild(card);
    });
  }

  /* ---------------------------------------------------------- contact --- */

  function renderContact() {
    $("#contactBlurb").textContent =
      "I'm looking for hardware engineering internships and co-ops. The fastest way to reach me is email — I read everything.";

    const links = $("#contactLinks");
    links.appendChild(linkBtn("mailto:" + PROFILE.email, PROFILE.email, "mail", true));
    links.appendChild(linkBtn(PROFILE.linkedin, "LinkedIn", "linkedin"));
    links.appendChild(linkBtn(PROFILE.github, "GitHub", "github"));

    $("#footerLeft").textContent =
      "© " + new Date().getFullYear() + " " + PROFILE.name;
  }

  /* --------------------------------------------------------- lightbox --- */

  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let lbIndex = 0;
  let lastFocus = null;

  // Step through the gallery, skipping any image whose file isn't present.
  function showShot(i, dir) {
    if (!shots.length) return;
    const step = dir || 1;
    let idx = ((i % shots.length) + shots.length) % shots.length;

    for (let n = 0; n < shots.length; n++) {
      if (!shots[idx].missing) break;
      idx = ((idx + step) % shots.length + shots.length) % shots.length;
    }
    if (shots[idx].missing) return; // nothing loadable at all

    lbIndex = idx;
    const s = shots[idx];
    const available = shots.filter((x) => !x.missing);
    const position = available.indexOf(s) + 1;

    lbImg.src = s.src;
    lbImg.alt = s.caption;
    lbCap.textContent =
      s.caption + "  ·  " + position + " / " + available.length;
  }

  function openLightbox(i) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    showShot(i);
    $("#lbClose").focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => showShot(lbIndex - 1, -1));
  $("#lbNext").addEventListener("click", () => showShot(lbIndex + 1, 1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showShot(lbIndex - 1, -1);
    if (e.key === "ArrowRight") showShot(lbIndex + 1, 1);
    if (e.key === "Tab") {
      // simple focus trap
      const f = lb.querySelectorAll("button");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  /* -------------------------------------------------------------- nav --- */

  function initNav() {
    const toggle = $("#navToggle");
    const links = $("#navLinks");

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Highlight the section currently in view.
    const sections = ["about", "skills", "projects", "contact"];
    const map = {};
    sections.forEach((id) => {
      map[id] = links.querySelector('a[href="#' + id + '"]');
    });

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const a = map[entry.target.id];
          if (!a) return;
          if (entry.isIntersecting) {
            Object.values(map).forEach((x) => x && x.removeAttribute("aria-current"));
            a.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* -------------------------------------------------------------- go --- */

  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  initNav();
})();
