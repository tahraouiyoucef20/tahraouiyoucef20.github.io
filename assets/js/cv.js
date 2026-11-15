/* ============================================================================
   CV PAGE LOGIC — reads from content.js, no editing needed here.
   ========================================================================== */

(function () {
  "use strict";

  var data = window.PORTFOLIO;
  if (!data) return;

  var ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return ESCAPES[c];
    });
  }

  function $(selector) {
    return document.querySelector(selector);
  }

  function set(selector, html) {
    var el = $(selector);
    if (el) el.innerHTML = html;
  }

  function render() {
    var p = data.profile;
    var c = data.contact || {};

    document.title = p.name + " — CV";

    var contact = [];
    if (p.email) {
      contact.push('<span><a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a></span>");
    }
    if (p.phone) {
      contact.push(
        '<span><a href="tel:' +
          esc(p.phone.replace(/\s+/g, "")) +
          '">' +
          esc(p.phone) +
          "</a></span>",
      );
    }
    if (p.location) contact.push("<span>" + esc(p.location) + "</span>");
    if (p.languages && p.languages.length) {
      contact.push(
        "<span>" +
          esc((p.languagesLong && p.languagesLong.length ? p.languagesLong : p.languages).join(" · ")) +
          "</span>",
      );
    }

    set("#cvName", esc(p.name));
    set("#cvRole", esc(p.role));
    set("#cvContact", contact.join(""));
    set("#cvMono", esc(p.initials || ""));
    set("#cvSummary", esc(p.summary || p.lede || ""));

    if (data.experience) {
      set(
        "#cvExperience",
        data.experience
          .map(function (job) {
            var dates = [job.start, job.end].filter(Boolean).join(" — ");
            return (
              '<article class="job">' +
              '<div class="job-head"><h3 class="job-role">' +
              esc(job.role) +
              '</h3><span class="job-dates">' +
              esc(dates) +
              "</span></div>" +
              '<p class="job-meta">' +
              esc(job.company) +
              (job.location ? " <span>· " + esc(job.location) + "</span>" : "") +
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
              "</article>"
            );
          })
          .join(""),
      );
    }

    if (data.projects) {
      set(
        "#cvProjects",
        data.projects
          .map(function (project) {
            return (
              '<article class="project">' +
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
              "</article>"
            );
          })
          .join(""),
      );
    }

    if (data.skills) {
      set(
        "#cvSkills",
        '<dl class="skill-list">' +
          data.skills
            .map(function (group) {
              return (
                '<div class="skill-row"><dt>' +
                esc(group.title) +
                "</dt><dd>" +
                esc(group.items.join(" · ")) +
                "</dd></div>"
              );
            })
            .join("") +
          "</dl>",
      );
    }

    if (data.education) {
      set(
        "#cvEdu",
        data.education
          .map(function (item) {
            return (
              '<div class="edu"><p class="edu-title">' +
              esc(item.title) +
              '</p><p class="edu-meta">' +
              esc(item.org) +
              (item.period ? " · " + esc(item.period) : "") +
              "</p></div>"
            );
          })
          .join(""),
      );
    }

    var links = (data.links || []).filter(function (link) {
      return /^https?:/i.test(link.url) && link.group !== "contact";
    });

    if (links.length) {
      set(
        "#cvLinks",
        links
          .map(function (link) {
            return (
              '<a class="cv-link" href="' +
              esc(link.url) +
              '" target="_blank" rel="noopener noreferrer"><span class="cv-link-label">' +
              esc(link.label) +
              '</span><span class="cv-link-value">' +
              esc(link.handle || link.url) +
              "</span></a>"
            );
          })
          .join(""),
      );
    }

    set(
      "#cvFoot",
      esc(p.name) +
        " · " +
        esc(c.emailLabel || p.email || "") +
        " · " +
        esc(p.location || "") +
        " · updated " +
        new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" }),
    );
  }

  function setupPrint() {
    var btn = $("#printBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.print();
    });
  }

  function init() {
    render();
    setupPrint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
