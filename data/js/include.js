/*========================================== 
            TÁC GIẢ: VÕ NGUYỄN KHÁNH ĐĂNG 
            MSSV:B2408783 
=============================================*/

// =========================================================
// 1. XỬ LÝ MENU MOBILE (HAMBURGER)
// =========================================================
document.addEventListener("click", function (event) {
  const isClickToggleBtn = event.target.closest(".header__toggle");
  if (isClickToggleBtn) {
    const navMenu = document.querySelector(".header__nav");
    if (navMenu) {
      // Bật/tắt hiển thị menu ẩn
      navMenu.classList.toggle("show-menu");
      // Tìm thẻ icon <i> bên trong nút toggle để đổi hình dáng (3 gạch sang X)
      const toggleIcon = isClickToggleBtn.querySelector("i");
      if (toggleIcon) {
        toggleIcon.classList.toggle("fa-bars");
        toggleIcon.classList.toggle("fa-times");
      }
    }
  }
});

// =========================================================
// 2. CẬP NHẬT TRẠNG THÁI ĐĂNG NHẬP (ĐỔI NÚT USER)
// =========================================================
function capNhatHeaderKhiDangNhap() {
  const loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) return;

  const userHienTaiStr = localStorage.getItem("userHienTai");
  if (userHienTaiStr) {
    try {
      const user = JSON.parse(userHienTaiStr);

      // Xóa sạch các thẻ con bên trong nút cũ
      while (loginBtn.firstChild) {
        loginBtn.removeChild(loginBtn.firstChild);
      }

      // Tạo icon Đăng xuất
      const newIcon = document.createElement("i");
      newIcon.className = "fas fa-sign-out-alt";

      // Tạo thẻ span chứa Tên tài khoản
      const newText = document.createElement("span");
      newText.className = "btn-text";
      newText.textContent = user.name;

      // Gắn icon và text mới vào nút bấm
      loginBtn.appendChild(newIcon);
      loginBtn.appendChild(newText);

      // Xử lý sự kiện đăng xuất khi click
      loginBtn.href = "#"; // Ngăn chuyển trang
      loginBtn.onclick = function (e) {
        e.preventDefault();
        if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
          localStorage.removeItem("userHienTai");
          window.location.reload();
        }
      };
    } catch (error) {
      console.error("Lỗi xử lý dữ liệu đăng nhập:", error);
    }
  }
}

// =========================================================
// 3. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG (BADGE ĐỎ)
// =========================================================
function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;

  // Sử dụng logic tách giỏ hàng (key động) mà chúng ta đã làm ở bước trước
  const userStr = localStorage.getItem("userHienTai");
  let cartKey = "cart_guest";
  if (userStr) {
    const user = JSON.parse(userStr);
    cartKey =
      "cart_" +
      (user.name || user.username || user.email || "default").replace(
        /\s/g,
        "",
      );
  }

  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const total = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );
  badge.textContent = total;
}
// Xuất hàm này ra toàn cục để các file khác (như trang chi tiết) có thể gọi được
window.updateCartBadge = updateCartBadge;

// =========================================================
// 4. XỬ LÝ THANH TÌM KIẾM
// =========================================================
function initHeaderSearch() {
  const input = document.querySelector(".header__search-input");
  if (!input) return;

  // Nếu đang ở trang kết quả, giữ lại từ khóa trên ô input
  const params = new URLSearchParams(window.location.search);
  const currentQuery = params.get("q");
  if (currentQuery) {
    input.value = currentQuery;
  }

  const doSearch = () => {
    const keyword = input.value.trim();
    // ĐỊNH VỊ ĐƯỜNG DẪN TƯƠNG ĐỐI
    let targetPath = "";
    const currentPath = window.location.pathname;

    if (currentPath.includes("/page/")) {
      // Nếu đang đứng ở các trang trong thư mục page (như Cart.html, login.html...)
      targetPath = "main.html";
    } else if (currentPath.includes("/gioithieu/")) {
      // Nếu đang đứng ở thư mục gioithieu
      targetPath = "../page/main.html";
    } else {
      // Nếu đang đứng ở ngoài cùng (index.html)
      targetPath = "./page/main.html";
    }

    // Chuyển hướng kèm từ khóa
    window.location.href = keyword
      ? `${targetPath}?q=${encodeURIComponent(keyword)}`
      : targetPath;
  };

  // Tìm kiếm khi bấm Enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doSearch();
    }
  });

  // Tìm kiếm khi bấm kính lúp
  const icon = document.querySelector(".header__search-icon");
  if (icon) {
    icon.addEventListener("click", doSearch);
  }
}

// =========================================================
// 5. KHỞI CHẠY TẤT CẢ KHI TRANG WEB TẢI XONG
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
  capNhatHeaderKhiDangNhap();
  updateCartBadge();
  initHeaderSearch();
});
