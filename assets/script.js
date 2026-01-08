// UniSOM Products main script (static)
function showToast(message) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("show");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => t.classList.remove("show"), 1500);
}

function copyEmail(e) {
  if (e) e.preventDefault();
  const el = document.getElementById("contactEmail");
  const email = el ? (el.textContent || "").trim() : "";
  if (!email) return;

  const lang = localStorage.getItem("lang") || "en";
  const dict = (window.I18N && window.I18N[lang]) ? window.I18N[lang] : (window.I18N ? window.I18N.en : null);
  const msg = dict && dict.toast_copied ? dict.toast_copied : "Copied to clipboard";

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => showToast(msg)).catch(() => showToast(msg));
  } else {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (_) {}
    document.body.removeChild(ta);
    showToast(msg);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Init i18n (from i18n.js)
  if (typeof initI18n === "function") initI18n();

  // Expose for inline onclick
  window.copyEmail = copyEmail;
});
