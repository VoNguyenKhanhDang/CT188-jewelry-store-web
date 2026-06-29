function loadFragment(selector, url) {
  const target = document.querySelector(selector);
  if (!target) return;

  // Resolve URL relative to this script file so pages in subfolders work
  const scriptEl =
    document.currentScript || document.scripts[document.scripts.length - 1];
  const base = scriptEl
    ? new URL(".", scriptEl.src).href
    : window.location.origin + "/";
  const fetchUrl = new URL(url, base).href;

  fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load " + fetchUrl);
      return response.text();
    })
    .then((html) => {
      target.innerHTML = html;
      // After injecting fragment, resolve any images that use data-src
      try {
        const imgs = target.querySelectorAll("img[data-src]");
        imgs.forEach((img) => {
          img.src = new URL(img.dataset.src, base).href;
        });
      } catch (e) {
        console.warn("Failed to resolve fragment images:", e);
      }
      if (selector === "#header-placeholder") {
        const menuToggle = document.querySelector(".header__toggle");
        const nav = document.querySelector(".header__nav");
        if (menuToggle && nav) {
          menuToggle.addEventListener("click", function () {
            nav.classList.toggle("open");
          });
        }
      }
    })
    .catch((error) => {
      console.error(error);
      target.innerHTML =
        "<p>Không thể tải header/footer. Nếu bạn đang mở file trực tiếp, hãy chạy trên web server (ví dụ: `python -m http.server`).</p>";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadFragment("#header-placeholder", "header.html");
  loadFragment("#footer-placeholder", "footer.html");
});
