const tabs = [...document.querySelectorAll(".language-tab")];
const panes = [...document.querySelectorAll(".language-pane")];
const sourcePaths = {
  laravel: "./examples/ProjectController.php",
  json: "./examples/projects.json",
  css: "./examples/theme.css",
  java: "./examples/ProjectCatalog.java",
  javascript: "./examples/filter.js"
};
const loadedSources = new Set();

async function loadSource(language) {
  if (loadedSources.has(language)) return;
  const target = document.querySelector("[data-code='" + language + "']");
  if (!target) return;
  try {
    const response = await fetch(sourcePaths[language]);
    if (!response.ok) throw new Error("HTTP " + response.status);
    target.textContent = await response.text();
    loadedSources.add(language);
  } catch {
    target.textContent = "Berkas sumber belum dapat dibaca dari file://. Buka situs melalui server lokal atau Cloudflare Pages.";
  }
}

function openLanguage(language) {
  tabs.forEach((tab) => {
    const active = tab.dataset.language === language;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panes.forEach((pane) => {
    const active = pane.dataset.pane === language;
    pane.hidden = !active;
    pane.classList.toggle("active", active);
  });
  loadSource(language);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => openLanguage(tab.dataset.language));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    tabs[next].click();
  });
});

document.querySelectorAll("[data-open-tab]").forEach((link) => {
  link.addEventListener("click", () => openLanguage(link.dataset.openTab));
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      const active = chip === button;
      chip.classList.toggle("active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    document.querySelectorAll(".record-card").forEach((card) => {
      const visible = category === "Semua" || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) count++;
    });
    document.querySelector("#record-count").textContent = String(count);
  });
});

const searchInput = document.querySelector("#demo-search");
const searchButton = document.querySelector("#demo-search-button");
function runSearch() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  const matches = [...document.querySelectorAll(".record-card h3")]
    .map((heading) => heading.textContent)
    .filter((title) => title.toLocaleLowerCase("id").includes(query));
  const result = document.querySelector("#demo-result");
  if (!query) {
    result.textContent = "Masukkan kata kunci untuk mencari judul proyek.";
  } else if (!matches.length) {
    result.textContent = "Tidak ada judul yang cocok. Coba kata kunci lain.";
  } else {
    result.textContent = matches.length + " rekam ditemukan: " + matches.join(" · ");
  }
}
searchButton.addEventListener("click", runSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runSearch();
});

document.querySelectorAll(".copy-code").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.querySelector("[data-code='" + button.dataset.copy + "']");
    try {
      await navigator.clipboard.writeText(source.textContent);
      button.textContent = "Tersalin";
      setTimeout(() => { button.textContent = "Salin"; }, 1400);
    } catch {
      button.textContent = "Pilih teks";
    }
  });
});

async function loadJsonPreview() {
  try {
    const response = await fetch("./examples/projects.json");
    if (!response.ok) throw new Error("HTTP " + response.status);
    const records = await response.json();
    const preview = document.querySelector("#json-preview");
    preview.replaceChildren();
    records.slice(0, 6).forEach((record) => {
      const row = document.createElement("div");
      row.className = "json-row";
      const title = document.createElement("b");
      title.textContent = record.id + " · " + record.title;
      const category = document.createElement("span");
      category.textContent = record.category;
      row.append(title, category);
      preview.append(row);
    });
    document.querySelector("#json-count").textContent = records.length + " REKAM";
  } catch {
    document.querySelector("#json-preview").textContent = "Pratinjau JSON dimuat saat situs dibuka melalui server web.";
  }
}

loadSource("laravel");
loadJsonPreview();