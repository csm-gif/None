/* Digi World: site behaviour. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var GA4_ID = "__GA4_ID__";
  var FORM_EMAIL = "__FORM_EMAIL__";
  var CONSENT_KEY = "dw-consent-v1";

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------- Analytics: events always reach dataLayer; GA4 loads only after opt-in ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var gaLoaded = false;
  function loadGA4() {
    if (gaLoaded || !/^G-[A-Z0-9]+$/.test(GA4_ID) || GA4_ID === "G-XXXXXXXXXX") return;
    gaLoaded = true;
    window.gtag = gtag;
    gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", GA4_ID, { anonymize_ip: true });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
    document.head.appendChild(s);
  }
  function track(name, params) {
    params = params || {};
    window.dataLayer.push(Object.assign({ event: name }, params));
    if (gaLoaded) gtag("event", name, params);
  }

  /* ---------- Consent bar ---------- */
  var bar = document.querySelector("[data-consent]");
  var choice = store(CONSENT_KEY);
  if (choice === "granted") loadGA4();
  if (bar && !choice) bar.hidden = false;
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-consent-choice], [data-consent-open]");
    if (!btn || !bar) return;
    if (btn.hasAttribute("data-consent-open")) {
      bar.hidden = false;
      bar.querySelector("button").focus();
      return;
    }
    var value = btn.getAttribute("data-consent-choice");
    store(CONSENT_KEY, value);
    bar.hidden = true;
    if (value === "granted") loadGA4();
    else if (gaLoaded) window.location.reload(); // stop GA4 for the rest of the visit
  });

  /* ---------- Tracked clicks: data-event="audit_cta_click" | "consult_click" ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-event]");
    if (el) track(el.getAttribute("data-event"), { location: el.getAttribute("data-location") || undefined, link_url: el.getAttribute("href") || undefined });
  });

  /* ---------- Mobile menu (disclosure) ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", function (mq) { if (mq.matches) setOpen(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Forms (Netlify Forms) ---------- */
  var params = new URLSearchParams(window.location.search);
  var rules = {
    name: function (v) { return v ? "" : "Enter your name."; },
    email: function (v) {
      if (!v) return "Enter your email address.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter an email address like name@example.com.";
    },
    website: function (v, f) {
      if (!v) return f.required ? "Enter your website address, for example www.example.com." : "";
      try {
        var u = new URL(/^https?:\/\//i.test(v) ? v : "https://" + v);
        return u.hostname.indexOf(".") > 0 ? "" : "Enter a full web address, for example www.example.com.";
      } catch (err) { return "Enter a full web address, for example www.example.com."; }
    },
    service: function (v) { return v ? "" : "Choose an option, or pick “Not sure yet”."; },
    message: function (v, f) {
      if (!v) return f.required ? "Tell us briefly what you would like help with." : "";
      return v.length < 15 ? "Add a little more detail (at least 15 characters)." : "";
    },
    consent: function (v, f) { return f.checked ? "" : "Tick the box so we can reply to you."; },
  };

  document.querySelectorAll("[data-form]").forEach(function (form) {
    var kind = form.getAttribute("data-form");
    var base = (form.getAttribute("data-base") || "/").replace(/\/$/, "");
    var summary = form.querySelector("[data-form-summary]");
    var status = form.querySelector("[data-form-status]");
    var button = form.querySelector("[type=submit]");
    var started = false;

    // Pre-select from links: /contact/?type=consultation, ?service=seo
    var select = form.elements.service;
    var pre = params.get("service") || (params.get("type") === "consultation" ? "consultation" : "");
    if (pre && select.querySelector('option[value="' + pre.replace(/[^a-z-]/g, "") + '"]')) select.value = pre;

    form.addEventListener("focusin", function () {
      if (!started) { started = true; track("form_start", { form_name: kind }); }
    });

    function check(field) {
      var rule = rules[field.name];
      if (!rule) return "";
      var msg = rule((field.value || "").trim(), field);
      var out = document.getElementById(field.id + "-error");
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      field.classList.add("is-touched");
      if (out) out.textContent = msg;
      return msg;
    }
    Object.keys(rules).forEach(function (name) {
      var f = form.elements[name];
      if (!f) return;
      f.addEventListener("blur", function () { if (f.value.trim() || f.classList.contains("is-touched")) check(f); });
      f.addEventListener("input", function () { if (f.getAttribute("aria-invalid") === "true") check(f); });
      f.addEventListener("change", function () { if (f.type === "checkbox" || f.tagName === "SELECT") check(f); });
    });

    function showSummary(errors) {
      var ul = summary.querySelector("ul");
      ul.innerHTML = "";
      errors.forEach(function (er) {
        var li = document.createElement("li"), a = document.createElement("a");
        a.href = "#" + er.id; a.textContent = er.msg;
        a.addEventListener("click", function (e) { e.preventDefault(); document.getElementById(er.id).focus(); });
        li.appendChild(a); ul.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
    }

    function fallback(data) {
      // The form backend is unavailable (for example on a preview host without Netlify Forms):
      // offer the same message by email so nothing is lost.
      var body = ["name", "email", "company", "website", "service", "message"].map(function (k) { return k + ": " + (data.get(k) || "-"); }).join("\n");
      var href = "mailto:" + FORM_EMAIL + "?subject=" + encodeURIComponent((kind === "audit" ? "Website audit request" : "Website enquiry") + " - " + (data.get("company") || data.get("name"))) + "&body=" + encodeURIComponent(body);
      status.className = "form-status form-status--error";
      status.innerHTML = "<p><strong>Your message could not be sent from this page.</strong> Nothing was lost: <a href=\"" + href + "\">send it by email instead</a>, which opens your email app with your message filled in.</p>";
      status.hidden = false;
      status.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errors = [];
      Object.keys(rules).forEach(function (name) {
        var f = form.elements[name];
        if (!f) return;
        var msg = check(f);
        if (msg) errors.push({ id: f.id, msg: msg });
      });
      if (errors.length) { showSummary(errors); return; }
      summary.hidden = true;
      status.hidden = true;

      var data = new FormData(form);
      if (data.get("bot-field")) return;
      button.disabled = true;
      button.classList.add("is-loading");
      fetch(base + "/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          track("form_submit", { form_name: kind, service: data.get("service") });
          window.location.href = base + "/thank-you/?form=" + kind;
        })
        .catch(function () {
          button.disabled = false;
          button.classList.remove("is-loading");
          fallback(data);
        });
    });
  });
})();
