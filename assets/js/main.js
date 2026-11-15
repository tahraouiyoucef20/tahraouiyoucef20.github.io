/* ============================================================================
   SITE LOGIC
   ----------------------------------------------------------------------------
   You shouldn't need to edit this file. All content lives in content.js.
   ========================================================================== */

(function () {
  "use strict";

  var data = window.PORTFOLIO;
  if (!data) return;

  /* ---------- Small helpers ---------- */
  var ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return ESCAPES[c];
    });
  }

  function safeHref(url) {
    var raw = String(url || "").trim();
    if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
    if (/^#/.test(raw)) return raw;
    if (/^[\w./-]+$/.test(raw)) return raw; // relative link, e.g. cv.html
    return "#";
  }

  function isExternal(href) {
    return /^https?:/i.test(href);
  }

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function set(selector, html) {
    var el = $(selector);
    if (el) el.innerHTML = html;
  }

  /* ---------- Inline icons ---------- */
  var ICON = {
    pin: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.65 7-11a7 7 0 1 0-14 0c0 5.35 7 11 7 11Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.6"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 1.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="m4.5 8 6.4 4.7a2 2 0 0 0 2.2 0L19.5 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    arrow:
      '<svg class="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13m-5.5-5.5L18 12l-5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    diagArrow:
      '<svg class="link-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 16.5 16.5 7.5M9.5 7.5h7v7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M15 6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  };

  /* ---------- Meta ---------- */
  function renderMeta() {
    var p = data.profile;
    if (data.meta && data.meta.siteTitle) document.title = data.meta.siteTitle;
    setMeta('meta[name="description"]', data.meta && data.meta.description);
    setMeta('meta[property="og:title"]', data.meta && data.meta.siteTitle);
    setMeta('meta[property="og:description"]', data.meta && data.meta.description);
    setMeta('meta[name="author"]', p.name);

    function setMeta(selector, value) {
      if (!value) return;
      var el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (selector.indexOf("property=") > -1) {
          el.setAttribute("property", selector.split("property=")[1].replace(/["\]]/g, ""));
        } else {
          el.setAttribute("name", selector.split("name=")[1].replace(/["\]]/g, ""));
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    }
  }

  /* ---------- Header ---------- */
  function renderHeader() {
    var p = data.profile;
    var brand = $("#brand");
    if (brand) {
      brand.innerHTML =
        '<span class="brand-mark">' +
        esc(p.initials || p.name.slice(0, 2)) +
        '</span><span class="brand-text">' +
        esc(p.name) +
        "</span>";
    }

    var nav = $("#nav");
    if (nav && data.nav) {
      nav.innerHTML = data.nav
        .map(function (item) {
          return (
            '<a class="nav-link" href="' +
            esc(item.href) +
            '" data-section="' +
            esc(item.href.replace("#", "")) +
            '">' +
            esc(item.label) +
            "</a>"
          );
        })
        .join("");
    }
  }

  function setupMenu() {
    var btn = $("#menuBtn");
    var nav = $("#nav");
    if (!btn || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    }

    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || btn.contains(event.target)) return;
      close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) close();
    });
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var p = data.profile;
    var available = !p.availability || p.availability.state !== "busy";
    var langs = (p.languages || []).join(", ");
    var hero = $("#hero");
    if (!hero) return;

    hero.innerHTML =
      '<div class="hero-grid">' +
      '  <div class="hero-copy">' +
      '    <p class="eyebrow"><span class="pulse' +
      (available ? "" : " is-busy") +
      '" aria-hidden="true"></span>' +
      esc(p.availability ? p.availability.label : "Available for work") +
      "</p>" +
      "    <h1>" +
      esc(p.name) +
      "</h1>" +
      '    <p class="hero-role">' +
      esc(p.role) +
      "</p>" +
      '    <p class="hero-lede">' +
      esc(p.lede) +
      "</p>" +
      '    <div class="hero-actions">' +
      '      <a class="btn btn-primary" href="#links">Browse my links' +
      ICON.arrow +
      "</a>" +
      '      <a class="btn btn-ghost" href="cv.html">View CV</a>' +
      "    </div>" +
      '    <ul class="hero-meta">' +
      "      <li>" +
      ICON.pin +
      esc(p.location) +
      "</li>" +
      "      <li>" +
      ICON.clock +
      '<span id="localTime">local time</span>' +
      "</li>" +
      "      <li>" +
      ICON.mail +
      '<a href="mailto:' +
      esc(p.email) +
      '">' +
      esc(p.email) +
      "</a></li>" +
      "    </ul>" +
      "  </div>" +

      '  <aside class="profile-card" aria-label="Quick facts">' +
      '    <div class="profile-top">' +
      '      <div class="avatar' +
      (available ? "" : " is-busy") +
      '">' +
      (p.photo
        ? '<img src="' + esc(p.photo) + '" alt="Portrait of ' + esc(p.name) + '" />'
        : esc(p.initials || "")) +
      "</div>" +
      "      <div>" +
      '        <p class="profile-name">' +
      esc(p.name) +
      "</p>" +
      '        <p class="profile-role">' +
      esc(p.role) +
      "</p>" +
      "      </div>" +
      "    </div>" +
      '    <dl class="facts">' +
      "      <div><dt>Based in</dt><dd>" +
      esc(p.location) +
      "</dd></div>" +
      '      <div><dt>Status</dt><dd class="status"><span class="status-dot' +
      (available ? "" : " is-busy") +
      '"></span>' +
      esc(p.availability ? p.availability.label : "Available") +
      "</dd></div>" +
      (langs ? "      <div><dt>Languages</dt><dd>" + esc(langs) + "</dd></div>" : "") +
      "    </dl>" +
      '    <div class="profile-actions">' +
      '      <a class="btn btn-primary" href="mailto:' +
      esc(p.email) +
      '">Say hello</a>' +
      '      <button class="icon-btn copy-btn" type="button" data-copy="' +
      esc(p.email) +
      '" aria-label="Copy email address" title="Copy email address">' +
      ICON.copy +
      "</button>" +
      "    </div>" +
      "  </aside>" +
      "</div>";

    startClock(p.timezone);
  }

  function startClock(timezone) {
    var el = $("#localTime");
    if (!el) return;

    function update() {
      var time;
      try {
        time = new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: timezone || undefined,
        }).format(new Date());
      } catch (error) {
        time = new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date());
      }
      el.textContent = time + " local time";
    }

    update();
    window.setInterval(update, 20000);
  }

  /* ---------- Stats ---------- */
  function renderStats() {
    if (!data.stats) return;
    set(
      "#stats",
      '<div class="stats" data-reveal>' +
        data.stats
          .map(function (stat) {
            return (
              '<div class="stat"><p class="stat-value">' +
              esc(stat.value) +
              '</p><p class="stat-label">' +
              esc(stat.label) +
              "</p></div>"
            );
          })
          .join("") +
        "</div>",
    );
  }

  /* ---------- Link directory ---------- */
  function renderLinks() {
    var grid = $("#linksGrid");
    var filters = $("#linkFilters");
    if (!grid || !filters || !data.links) return;

    var tags = data.linkTags || {};
    var order = Object.keys(tags);
    var counts = {};

    data.links.forEach(function (link) {
      counts[link.group] = (counts[link.group] || 0) + 1;
    });

    grid.innerHTML = data.links
      .map(function (link, index) {
        var href = safeHref(link.url);
        var external = isExternal(href);
        return (
          '<a class="link-card" href="' +
          esc(href) +
          '" data-group="' +
          esc(link.group) +
          '" data-reveal style="--delay:' +
          Math.min(index * 40, 280) +
          'ms"' +
          (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
          (link.download ? " download" : "") +
          ">" +
          '<span class="link-top"><span class="mono">' +
          esc(link.mono || link.label.slice(0, 2)) +
          "</span>" +
          ICON.diagArrow +
          "</span>" +
          '<span class="link-body"><span class="link-label">' +
          esc(link.label) +
          "</span>" +
          (link.handle ? '<span class="link-handle">' + esc(link.handle) + "</span>" : "") +
          "</span>" +
          (link.note ? '<span class="link-note">' + esc(link.note) + "</span>" : "") +
          "</a>"
        );
      })
      .join("");

    var chipGroups = order.filter(function (group) {
      return counts[group];
    });

    filters.innerHTML =
      '<button class="chip" type="button" data-filter="all" aria-pressed="true">All <span class="chip-count">' +
      data.links.length +
      "</span></button>" +
      chipGroups
        .map(function (group) {
          return (
            '<button class="chip" type="button" data-filter="' +
            esc(group) +
            '" aria-pressed="false">' +
            esc(tags[group]) +
            ' <span class="chip-count">' +
            counts[group] +
            "</span></button>"
          );
        })
        .join("");

    filters.addEventListener("click", function (event) {
      var chip = event.target.closest("[data-filter]");
      if (!chip) return;
      var filter = chip.getAttribute("data-filter");
      var shown = 0;

      Array.prototype.forEach.call(filters.querySelectorAll(".chip"), function (el) {
        el.setAttribute("aria-pressed", el === chip ? "true" : "false");
      });

      Array.prototype.forEach.call(grid.querySelectorAll(".link-card"), function (card) {
        var match = filter === "all" || card.getAttribute("data-group") === filter;
        card.hidden = !match;
        if (match) shown += 1;
      });

      var empty = $("#linksEmpty");
      if (empty) empty.hidden = shown !== 0;
    });
  }

  /* ---------- Experience ---------- */
  function renderExperience() {
    if (!data.experience) return;
    set(
      "#timeline",
      data.experience
        .map(function (job) {
          var dates = [job.start, job.end].filter(Boolean).join(" — ");
          return (
            '<article class="job" data-reveal>' +
            '<div class="job-head"><h3 class="job-role">' +
            esc(job.role) +
            '</h3><span class="job-dates">' +
            esc(dates) +
            "</span></div>" +
            '<p class="job-company"><strong>' +
            esc(job.company) +
            "</strong>" +
            (job.location ? " · " + esc(job.location) : "") +
            "</p>" +
            (job.points && job.points.length
              ? '<ul class="job-points">' +
                job.points
                  .map(function (point) {
                    return "<li>" + esc(point) + "</li>";
                  })
                  .join("") +
                "</ul>"
              : "") +
            (job.tags && job.tags.length
              ? '<div class="job-tags">' +
                job.tags
                  .map(function (tag) {
                    return '<span class="tag">' + esc(tag) + "</span>";
                  })
                  .join("") +
                "</div>"
              : "") +
            "</article>"
          );
        })
        .join(""),
    );
  }

  /* ---------- Projects ---------- */
  function renderProjects() {
    if (!data.projects) return;
    set(
      "#projectsGrid",
      data.projects
        .map(function (project, index) {
          return (
            '<article class="project-card" data-reveal style="--delay:' +
            index * 60 +
            'ms">' +
            '<div class="project-head"><h3 class="project-title">' +
            esc(project.title) +
            '</h3><span class="project-meta">' +
            esc(project.meta) +
            "</span></div>" +
            (project.summary
              ? '<p class="project-summary">' + esc(project.summary) + "</p>"
              : "") +
            (project.points && project.points.length
              ? '<ul class="project-points">' +
                project.points
                  .map(function (point) {
                    return "<li>" + esc(point) + "</li>";
                  })
                  .join("") +
                "</ul>"
              : "") +
            (project.tags && project.tags.length
              ? '<div class="job-tags">' +
                project.tags
                  .map(function (tag) {
                    return '<span class="tag">' + esc(tag) + "</span>";
                  })
                  .join("") +
                "</div>"
              : "") +
            "</article>"
          );
        })
        .join(""),
    );
  }

  /* ---------- Skills & education ---------- */
  function renderSkills() {
    if (data.skills) {
      set(
        "#skillsGrid",
        data.skills
          .map(function (group, index) {
            return (
              '<div class="skill-group" data-reveal style="--delay:' +
              index * 60 +
              'ms"><h3>' +
              esc(group.title) +
              '</h3><div class="pills">' +
              group.items
                .map(function (item) {
                  return '<span class="pill">' + esc(item) + "</span>";
                })
                .join("") +
              "</div></div>"
            );
          })
          .join(""),
      );
    }

    if (data.education) {
      set(
        "#eduGrid",
        data.education
          .map(function (item) {
            return (
              '<div class="edu-card" data-reveal>' +
              '<div class="edu-head"><span class="edu-title">' +
              esc(item.title) +
              '</span><span class="edu-period">' +
              esc(item.period) +
              "</span></div>" +
              '<span class="edu-org">' +
              esc(item.org) +
              "</span>" +
              (item.note ? '<p class="edu-note">' + esc(item.note) + "</p>" : "") +
              "</div>"
            );
          })
          .join(""),
      );
    }
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    var c = data.contact;
    var p = data.profile;
    if (!c) return;

    var socials = (data.links || []).filter(function (link) {
      return link.group === "social" || link.group === "work" || link.group === "writing";
    });

    set(
      "#contactPanel",
      '<p class="eyebrow">Get in touch</p>' +
        '<h2 class="contact-heading">' +
        esc(c.heading) +
        "</h2>" +
        '<p class="contact-text">' +
        esc(c.text) +
        "</p>" +
        '<div class="contact-actions">' +
        '<a class="btn btn-primary" href="mailto:' +
        esc(p.email) +
        '">' +
        ICON.mail +
        esc(c.emailLabel || p.email) +
        "</a>" +
        '<button class="btn btn-ghost" type="button" data-copy="' +
        esc(p.email) +
        '">' +
        ICON.copy +
        "Copy address</button>" +
        "</div>" +
        '<p class="contact-note">Based in ' +
        esc(p.location) +
        " · usually replies within a day</p>" +
        (socials.length
          ? '<div class="socials">' +
            socials
              .map(function (link) {
                var href = safeHref(link.url);
                return (
                  '<a class="social-link" href="' +
                  esc(href) +
                  '"' +
                  (isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "") +
                  '><span class="mono">' +
                  esc(link.mono || link.label.slice(0, 2)) +
                  "</span>" +
                  esc(link.label) +
                  "</a>"
                );
              })
              .join("") +
            "</div>"
          : ""),
    );
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var p = data.profile;
    var f = data.footer || {};
    var year = new Date().getFullYear();
    set(
      "#footer",
      "<p><span>© " +
        year +
        " " +
        esc(p.name) +
        '</span><span class="footer-dot" aria-hidden="true">·</span><span>' +
        esc(f.note || "") +
        "</span></p>" +
        '<p><span>' +
        esc(f.builtWith || "") +
        '</span><span class="footer-dot" aria-hidden="true">·</span><a href="#top">Back to top ↑</a></p>',
    );
  }

  /* ---------- Theme ---------- */
  function setupTheme() {
    var root = document.documentElement;
    var btn = $("#themeToggle");
    var meta = document.head.querySelector('meta[name="theme-color"]');
    if (!btn) return;

    function apply(theme, persist) {
      root.dataset.theme = theme;
      if (persist) {
        try {
          localStorage.setItem("theme", theme);
        } catch (error) {
          /* private mode */
        }
      }
      if (meta) meta.setAttribute("content", theme === "light" ? "#f7f7fb" : "#08080c");
      btn.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme",
      );
      btn.setAttribute("title", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    }

    apply(root.dataset.theme === "light" ? "light" : "dark", false);

    btn.addEventListener("click", function () {
      apply(root.dataset.theme === "light" ? "dark" : "light", true);
    });
  }

  /* ---------- Copy to clipboard ---------- */
  function setupCopy() {
    var toast = $("#toast");
    var timer;

    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add("is-visible");
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        toast.classList.remove("is-visible");
      }, 2200);
    }

    function fallbackCopy(text) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        /* ignore */
      }
      document.body.removeChild(area);
    }

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-copy]");
      if (!trigger) return;
      var text = trigger.getAttribute("data-copy");

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () {
            showToast("Copied: " + text);
          },
          function () {
            fallbackCopy(text);
            showToast("Copied: " + text);
          },
        );
      } else {
        fallbackCopy(text);
        showToast("Copied: " + text);
      }
    });
  }

  /* ---------- Header shrink on scroll ---------- */
  function setupHeader() {
    var header = $(".site-header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Active nav link ---------- */
  function setupScrollSpy() {
    var links = document.querySelectorAll(".nav-link[data-section]");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    Array.prototype.forEach.call(links, function (link) {
      map[link.getAttribute("data-section")] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          Array.prototype.forEach.call(links, function (link) {
            link.classList.remove("is-active");
          });
          var active = map[entry.target.id];
          if (active) active.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || reduced) {
      Array.prototype.forEach.call(items, function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var seen = 0;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          seen += 1;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    Array.prototype.forEach.call(items, function (item) {
      observer.observe(item);
    });

    // Safety net: if the observer never fires (rare browser/embedding cases),
    // show everything rather than leaving the page blank.
    window.setTimeout(function () {
      if (seen > 0) return;
      Array.prototype.forEach.call(items, function (item) {
        item.classList.add("is-visible");
      });
    }, 2500);
  }

  /* ---------- Structured data for search engines ---------- */
  function injectSchema() {
    var p = data.profile;
    var schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      email: p.email ? "mailto:" + p.email : undefined,
      address: p.location ? { "@type": "PostalAddress", addressLocality: p.location } : undefined,
      sameAs: (data.links || [])
        .filter(function (link) {
          return /^https?:/i.test(link.url);
        })
        .map(function (link) {
          return link.url;
        }),
    };

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /* ---------- Boot ---------- */
  function init() {
    renderMeta();
    renderHeader();
    renderHero();
    renderStats();
    renderLinks();
    renderExperience();
    renderProjects();
    renderSkills();
    renderContact();
    renderFooter();

    setupTheme();
    setupMenu();
    setupCopy();
    setupHeader();
    setupScrollSpy();
    setupReveal();
    injectSchema();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
