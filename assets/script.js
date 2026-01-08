// assets/script.js
document.getElementById("year").textContent = new Date().getFullYear();

// TODO: 換成你的真實窗口信箱
const CONTACT_EMAIL = "sales@your-company.com";
document.getElementById("contactEmail").textContent = CONTACT_EMAIL;

function copyEmail(e){
  e.preventDefault();
  navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
    alert("Copied: " + CONTACT_EMAIL);
  }).catch(() => {
    alert("Copy failed. Please copy manually: " + CONTACT_EMAIL);
  });
}
window.copyEmail = copyEmail;

function getLangFromQuery(){
  const p = new URLSearchParams(window.location.search);
  const lang = p.get("lang");
  return lang && window.I18N[lang] ? lang : null;
}

function setHtmlLang(lang){
  document.documentElement.setAttribute("lang", lang || "en");
}

function applyI18n(lang){
  const dict = window.I18N[lang] || window.I18N.en;

  // text nodes
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // html nodes (allow <br/> etc.)
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key]) el.innerHTML = dict[key];
  });

  // update title/description per language (optional but nice)
  const titleMap = {
    en: "CompalEdgeAI | UniSOM-S01 & UniSOM-P01",
    "zh-Hant": "CompalEdgeAI｜UniSOM-S01 與 UniSOM-P01",
    "zh-Hans": "CompalEdgeAI｜UniSOM-S01 与 UniSOM-P01",
    ja: "CompalEdgeAI｜UniSOM-S01 & UniSOM-P01",
    ko: "CompalEdgeAI | UniSOM-S01 & UniSOM-P01",
    de: "CompalEdgeAI | UniSOM-S01 & UniSOM-P01",
    fr: "CompalEdgeAI | UniSOM-S01 & UniSOM-P01"
  };
  document.title = titleMap[lang] || titleMap.en;

  setHtmlLang(lang);
}

(function init(){
  const select = document.getElementById("langSelect");

  // Priority: URL ?lang= > localStorage > default en
  const queryLang = getLangFromQuery();
  const savedLang = localStorage.getItem("site_lang");
  const initialLang = queryLang || (savedLang && window.I18N[savedLang] ? savedLang : "en");

  select.value = initialLang;
  applyI18n(initialLang);

  // Change handler
  select.addEventListener("change", () => {
    const lang = select.value;
    localStorage.setItem("site_lang", lang);
    applyI18n(lang);

    // update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  });
})();
