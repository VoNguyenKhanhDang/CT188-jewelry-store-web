function loadComponent(elementId, filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Lỗi nạp file:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header-placeholder", "/header.html");
  loadComponent("footer-placeholder", "/footer.html");
});

//xử lý sự kiện cho nút hamburger menu
document.addEventListener("click", function (event) {
  const isClickToggleBtn = event.target.closest(".header__toggle");
  if (isClickToggleBtn) {
    const navMenu = document.querySelector(".header__nav");
    if (navMenu) {
      navMenu.classList.toggle("show-menu");
    }
  }
});
