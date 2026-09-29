/* ============================================================================
   script.js — renders the page from data.js.
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
    download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };

  function icon(name) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + ICONS[name] + "</svg>"
    );
  }

  function linkBtn(href, label, iconName, variant) {
    const a = document.createElement("a");
    a.className = "btn" + (variant ? " btn--" + variant : "");
    a.href = href;
    if (/^https?:/.test(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.innerHTML = (iconName ? icon(iconName) : "") + "<span></span>";
    a.querySelector("span").textContent = label;
    return a;
  }

  function pdfBtn(variant) {
    const a = linkBtn(PROFILE.portfolio.href, "Download full portfolio (PDF)", "download", variant);
    a.setAttribute("download", "");
    return a;
  }

  /* ------------------------------------------------------------- hero --- */

  function renderHero() {
    $("#heroEyebrow").textContent = PROFILE.location + " · Open to internships & co-ops";
    $("#heroName").textContent = PROFILE.name;
    $("#heroRole").textContent = PROFILE.role;
    $("#heroAbout").textContent = PROFILE.about;

    const photo = $("#heroPhoto");
    if (PROFILE.photo) {
      photo.src = PROFILE.photo;
      photo.alt = PROFILE.name;
      photo.addEventListener("error", () => photo.remove());
    } else {
      photo.remove();
    }

    const actions = $("#heroActions");
    actions.appendChild(pdfBtn("primary"));
    actions.appendChild(linkBtn("mailto:" + PROFILE.email, "Email", "mail"));
    actions.appendChild(linkBtn(PROFILE.linkedin, "LinkedIn", "linkedin"));
    actions.appendChild(linkBtn(PROFILE.github, "GitHub", "github"));

    $("#heroPdfNote").textContent = PROFILE.portfolio.detail;

    const nav = $("#navPdf");
    nav.href = PROFILE.portfolio.href;
    nav.setAttribute("download", "");
  }

  /* --------------------------------------------------------- projects --- */

  function renderProjects() {
    const list = $("#projects-list");

    PROJECTS.forEach((p, i) => {
      const card = el("article", "project");
      card.id = p.id;

      if (p.image) {
        const fig = el("div", "project__media");
        const im = document.createElement("img");
        im.src = p.image.src;
        im.alt = p.image.alt || p.title;
        im.loading = i === 0 ? "eager" : "lazy";
        if (p.image.position) im.style.objectPosition = p.image.position;
        im.addEventListener("error", () => fig.classList.add("project__media--empty"));
        fig.appendChild(im);
        card.appendChild(fig);
      }

      const body = el("div", "project__body");

      const meta = el("p", "project__meta");
      meta.textContent = String(i + 1).padStart(2, "0") + (p.period ? "  ·  " + p.period : "");
      body.appendChild(meta);

      body.appendChild(el("h3", null, p.title));
      if (p.status) body.appendChild(el("p", "project__status", p.status));
      body.appendChild(el("p", "project__blurb", p.blurb));

      if (p.tags && p.tags.length) {
        const tags = el("div", "tags");
        p.tags.forEach((t) => tags.appendChild(el("span", "tag", t)));
        body.appendChild(tags);
      }

      if (p.link) {
        const links = el("div", "project__links");
        links.appendChild(linkBtn(p.link.href, p.link.label, "github"));
        body.appendChild(links);
      }

      card.appendChild(body);
      list.appendChild(card);
    });
  }

  /* ---------------------------------------------------------- contact --- */

  function renderContact() {
    const links = $("#contactLinks");
    links.appendChild(pdfBtn("primary"));
    links.appendChild(linkBtn("mailto:" + PROFILE.email, PROFILE.email, "mail"));
    links.appendChild(linkBtn(PROFILE.linkedin, "LinkedIn", "linkedin"));
    links.appendChild(linkBtn(PROFILE.github, "GitHub", "github"));

    $("#footerLeft").textContent =
      "© " + new Date().getFullYear() + " " + PROFILE.name;
  }

  /* -------------------------------------------------------------- go --- */

  renderHero();
  renderProjects();
  renderContact();
})();
