/* Digi World: site behaviour. No dependencies. */
(function () {
  "use strict";

  /* ---------- Mobile menu (disclosure pattern) ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });
    window.matchMedia("(min-width: 1120px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Analytics events ----------
     Elements with data-track="<event_name>" send a GA4 event when clicked, with
     cta_name / cta_location parameters from data-cta-name / data-cta-location.
     Nothing is sent unless gtag is loaded (see the commented snippet in <head>). */
  function track(eventName, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-track]") : null;
    if (!el) return;
    track(el.getAttribute("data-track"), {
      cta_name: el.getAttribute("data-cta-name") || undefined,
      cta_location: el.getAttribute("data-cta-location") || undefined,
      link_url: el.getAttribute("href") || undefined,
    });
  });

  /* ---------- Enquiry form ---------- */
  var form = document.querySelector("[data-enquiry-form]");
  if (!form) return;

  var EMAIL = "wealthop202@gmail.com";
  var endpoint = (form.getAttribute("data-endpoint") || "").trim();
  var summary = form.querySelector("[data-form-summary]");
  var status = document.querySelector("[data-form-status]");
  var submitBtn = form.querySelector("[type=submit]");
  var params = new URLSearchParams(window.location.search);

  // Pre-fill from links such as /contact/?enquiry=audit or ?service=seo
  var enquiryCopy = {
    audit: { heading: "Request a Website Audit", button: "Request my audit" },
    consultation: { heading: "Book a Consultation", button: "Request a consultation" },
  };
  var enquiry = params.get("enquiry");
  var typeInput = form.querySelector("[name=enquiry_type]");
  var heading = document.querySelector("[data-form-heading]");
  if (enquiry && enquiryCopy[enquiry]) {
    typeInput.value = enquiry;
    if (heading) heading.textContent = enquiryCopy[enquiry].heading;
    submitBtn.querySelector("[data-submit-label]").textContent = enquiryCopy[enquiry].button;
  }
  var service = params.get("service");
  var serviceSelect = form.querySelector("[name=service]");
  if (service && serviceSelect.querySelector('option[value="' + CSS.escape(service) + '"]')) {
    serviceSelect.value = service;
  } else if (enquiry === "audit") {
    serviceSelect.value = "audit";
  } else if (enquiry === "consultation") {
    serviceSelect.value = "strategy";
  }

  form.setAttribute("novalidate", "");

  var rules = {
    name: function (v) { return v ? "" : "Enter your name."; },
    email: function (v) {
      if (!v) return "Enter your email address.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter an email address in the format name@example.com.";
    },
    website: function (v) {
      if (!v) return "";
      var url = /^https?:\/\//i.test(v) ? v : "https://" + v;
      try {
        var u = new URL(url);
        return u.hostname.indexOf(".") > 0 ? "" : "Enter a full web address, for example www.example.com.";
      } catch (err) {
        return "Enter a full web address, for example www.example.com.";
      }
    },
    service: function (v) { return v ? "" : "Choose the service you are interested in, or select “Not sure yet”."; },
    message: function (v) {
      if (!v) return "Tell us briefly what you would like help with.";
      return v.length < 20 ? "Add a little more detail (at least 20 characters)." : "";
    },
  };

  function validateField(field) {
    var rule = rules[field.name];
    if (!rule) return "";
    var msg = rule(field.value.trim());
    var errorEl = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (errorEl) errorEl.textContent = msg;
    return msg;
  }

  // Validate on blur once a field has been touched, then live while correcting.
  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    if (!field) return;
    field.addEventListener("blur", function () {
      if (field.value.trim() || field.dataset.touched) {
        field.dataset.touched = "1";
        validateField(field);
      }
    });
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", function () {
      if (field.tagName === "SELECT") validateField(field);
    });
  });

  function showSummary(errors) {
    var list = summary.querySelector("ul");
    list.innerHTML = "";
    errors.forEach(function (err) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + err.id;
      a.textContent = err.msg;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById(err.id).focus();
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    summary.hidden = false;
    summary.focus();
  }

  function showStatus(kind) {
    var tpl = document.getElementById("form-status-" + kind);
    status.innerHTML = "";
    status.appendChild(tpl.content.cloneNode(true));
    status.classList.toggle("form-status--error", kind === "error");
    status.hidden = false;
    // Keep the form on screen for mailto, so nothing is lost if no email app opens.
    if (kind === "success") form.hidden = true;
    status.focus();
  }

  function buildMailto(data) {
    var labels = { name: "Name", email: "Email", company: "Company", website: "Website", service: "Service of interest", message: "Message" };
    var serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    var body = Object.keys(labels).map(function (k) {
      var v = k === "service" ? serviceText : (data.get(k) || "").toString().trim();
      return labels[k] + ": " + (v || "-");
    }).join("\n");
    var subjectType = (enquiryCopy[data.get("enquiry_type")] || { heading: "Website enquiry" }).heading;
    return "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(subjectType + " - " + (data.get("company") || data.get("name"))) +
      "&body=" + encodeURIComponent(body);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var errors = [];
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      field.dataset.touched = "1";
      var msg = validateField(field);
      if (msg) errors.push({ id: field.id, msg: msg });
    });
    if (errors.length) {
      showSummary(errors);
      return;
    }
    summary.hidden = true;

    var data = new FormData(form);
    if (data.get("company_fax")) return; // honeypot filled: likely a bot, drop silently

    var trackParams = { form_name: "enquiry", enquiry_type: data.get("enquiry_type"), service: data.get("service") };

    // No endpoint configured: hand the message to the visitor's email app.
    if (!endpoint) {
      track("generate_lead", Object.assign({ method: "mailto" }, trackParams));
      window.location.href = buildMailto(data);
      showStatus("mailto");
      return;
    }

    submitBtn.disabled = true;
    data.delete("company_fax");
    fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        track("generate_lead", Object.assign({ method: "form" }, trackParams));
        showStatus("success");
      })
      .catch(function () {
        showStatus("error");
      })
      .then(function () {
        submitBtn.disabled = false;
      });
  });
})();
