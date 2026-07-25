// hàm này rendrer header với footer chỉ tạm thời khi nào hoàn thành thi về hardcode
function loadComponent(elementId, filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (elementId === "header-placeholder") {
        capNhatHeaderKhiDangNhap();
        updateCartBadge();
      }
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
      //1. bắt/ tắt hiển thị menu ẩn
      navMenu.classList.toggle("show-menu");
      // 2. Tìm thẻ icon <i> bên trong nút toggle để đổi hình dáng
      const toggleIcon = isClickToggleBtn.querySelector("i");
      if (toggleIcon) {
        // Toggle qua lại giữa class ba gạch và dấu X
        toggleIcon.classList.toggle("fa-bars");
        toggleIcon.classList.toggle("fa-times");
      }
    }
  }
});

// cap nhap trang thai khi dang nhap
function capNhatHeaderKhiDangNhap() {
  const loginBtn = document.getElementById("loginBtn");

  // Nếu không tìm thấy nút bấm trên giao diện thì dừng
  if (!loginBtn) return;

  // Đọc thông tin user từ localStorage (file login.js lưu qua)
  const userHienTaiStr = localStorage.getItem("userHienTai");

  // Nếu có user đang đăng nhập thì tiến hành đổi giao diện
  if (userHienTaiStr) {
    try {
      const user = JSON.parse(userHienTaiStr);

      // xóa sạch các thẻ con bên trong nút cũ
      while (loginBtn.firstChild) {
        loginBtn.removeChild(loginBtn.firstChild);
      }

      //Tạo icon Đăng xuất
      const newIcon = document.createElement("i");
      newIcon.className = "fas fa-sign-out-alt";

      //Tạo thẻ span chứa Tên tài khoản
      const newText = document.createElement("span");
      newText.className = "btn-text";
      newText.textContent = user.name;

      //Gắn icon và text mới vào nút bấm bằng appendChild
      loginBtn.appendChild(newIcon);
      loginBtn.appendChild(newText);

      // Đăng xuất khi click
      loginBtn.href = "/dangnhap/login.html";
      loginBtn.onclick = function () {
        if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
          localStorage.removeItem("userHienTai"); // Xóa phiên đăng nhập
          window.location.reload(); //header quay về chữ "Đăng nhập"
        }
      };
    } catch (error) {
      console.error("Lỗi xử lý dữ liệu đăng nhập:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", capNhatHeaderKhiDangNhap);

// cập nhật nút số lượng sản phẩm trên giỏ hàng khi người dùng thay đổi
function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );
  badge.textContent = total;
}
