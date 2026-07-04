// ========================================================
// CẤU HÌNH LOCALSTORAGE (LƯU TRỮ DỮ LIỆU DƯỚI MÁY)
// ========================================================
// Khai báo các tên khóa (Key) để định danh vùng lưu trữ trên trình duyệt
const KEY_DANH_SACH_USER = "danhSachUser";
const KEY_USER_HIEN_TAI   = "userHienTai";

/**
 * Hàm lấy danh sách toàn bộ người dùng đã đăng ký thành công
 * Nếu chưa có dữ liệu dưới máy, hàm tự động trả về một mảng rỗng []
 */
function layDanhSachNguoiDung() {
  const du_lieu = localStorage.getItem(KEY_DANH_SACH_USER);
  return du_lieu ? JSON.parse(du_lieu) : [];
}

/**
 * Hàm ghi đè danh sách người dùng mới/cập nhật xuống LocalStorage
 */
function luuDanhSachNguoiDung(danhSach) {
  localStorage.setItem(KEY_DANH_SACH_USER, JSON.stringify(danhSach));
}

// ========================================================
// 1. CHỨC NĂNG ẨN / HIỆN MẬT KHẨU
// ========================================================
function togglePassword() {
  const clickedIcon = event.currentTarget; // Lấy thẻ chứa icon mắt vừa được click
  const inputGroup = clickedIcon.closest('.form__group'); // Tìm thẻ bọc ngoài cùng của ô nhập liệu đó
  const passwordInput = inputGroup.querySelector('input'); // Tìm thẻ input nằm bên trong nhóm

  // Nếu tài khoản đã đăng nhập thành công (form đã khóa), chặn không cho bấm ẩn/hiện nữa
  if (passwordInput.disabled) return; 

  // Thực hiện hoán đổi kiểu dữ liệu (type) của input và thay đổi icon SVG tương ứng
  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // Hiện mật khẩu
    clickedIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`; 
  } else {
    passwordInput.type = "password"; // Ẩn mật khẩu
    clickedIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;
  }
}

// ========================================================
// 2. KHAI BÁO BIẾN TOÀN CỤC & BIỂU THỨC CHÍNH QUY (REGEX)
// ========================================================
// Truy vấn các thẻ dữ liệu đầu vào (Input) từ file HTML Đăng nhập bằng ID
const loginForm = document.getElementById('form');
const emailInp  = document.getElementById('email');
const passInp   = document.getElementById('password');

// Truy vấn các thẻ hiển thị dòng chữ báo lỗi bên dưới mỗi ô input
const emailErr  = document.getElementById('email-error');
const passErr   = document.getElementById('password-error');

// Định nghĩa biểu thức chính quy (Regex) để kiểm tra định dạng email mẫu abc@gmail.com
const emailReg  = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Gom toàn bộ ô input của form đăng nhập vào mảng để duyệt vòng lặp focus
const allLoginInputs = [emailInp, passInp];

// ========================================================
// 3. XỬ LÝ SỰ KIỆN RỜI Ô NHẬP LIỆU (BLUR) & CON TRỎ CHUỘT (FOCUS)
// ========================================================

// Bắt lỗi ô Email khi người dùng click chuột ra ngoài (Blur)
if (emailInp) {
  emailInp.addEventListener('blur', () => {
    if (emailInp.disabled) return; // Nếu form đã bị khóa thì ngưng xử lý
    
    if (emailInp.value.trim() === "") {
      emailInp.parentElement.classList.add("error"); // Kích hoạt viền đỏ và label đỏ
      emailErr.textContent = "Email không được để trống.";
    } else if (!emailReg.test(emailInp.value.trim())) {
      emailInp.parentElement.classList.add("error");
      emailErr.textContent = "Email sai định dạng (Ví dụ: abc@gmail.com).";
    } else {
      emailInp.parentElement.classList.remove("error"); // Xóa màu đỏ nếu dữ liệu hợp lệ
      emailErr.textContent = "";
    }
  });
}

// Bắt lỗi ô Mật khẩu khi người dùng rời chuột (Blur)
if (passInp) {
  passInp.addEventListener('blur', () => {
    if (passInp.disabled) return;
    
    if (passInp.value.trim() === "") {
      passInp.parentElement.classList.add("error");
      passErr.textContent = "Mật khẩu không được để trống.";
    } else if (passInp.value.trim().length < 8) {
      passInp.parentElement.classList.add("error");
      passErr.textContent = "Mật khẩu phải chứa ít nhất 8 ký tự.";
    } else {
      passInp.parentElement.classList.remove("error");
      passErr.textContent = "";
    }
  });
}

// Xử lý sự kiện khi người dùng click chuột trở lại ô input để sửa dữ liệu (Focus)
allLoginInputs.forEach(input => {
  if (input) {
    input.addEventListener('focus', () => {
      if (input.disabled) return; // Nếu form đã bị khóa/đóng băng thì cấm sửa
      
      // Tự động gỡ màu đỏ và xóa dòng chữ lỗi ngay khi vừa bấm vào ô
      input.parentElement.classList.remove("error");
      const errorSpan = input.parentElement.querySelector('.form__error');
      if (errorSpan) errorSpan.textContent = "";
    });
  }
});

// ========================================================
// 4. LOGIC XỬ LÝ KIỂM TRA TỔNG THỂ VÀ ĐĂNG NHẬP (SUBMIT)
// ========================================================
window.frmValidate5 = function(frm) {
  event.preventDefault(); // Ngăn trình duyệt reload lại trang web khi bấm nút gửi form
  
  // Kiểm tra: Nếu nút bấm đã biến thành loại "button" thường (đã xử lý xong) thì dừng hoàn toàn hàm
  const submitBtn = frm.querySelector('.form__btn--submit');
  if (submitBtn && submitBtn.type === "button") return false;

  let isValid = true; // Cờ theo dõi trạng thái lỗi, mặc định ban đầu coi như đúng hoàn toàn

  // 1. Quét kiểm tra lỗi Email tổng thể khi bấm Submit
  if (emailInp.value.trim() === "" || !emailReg.test(emailInp.value.trim())) {
    emailInp.parentElement.classList.add("error");
    emailErr.textContent = emailInp.value.trim() === "" ? "Email không được để trống." : "Email không hợp lệ!";
    isValid = false; // Gắn cờ false thông báo form đang có lỗi dữ liệu
  } else { emailErr.textContent = ""; }

  // 2. Quét kiểm tra lỗi Mật khẩu tổng thể khi bấm Submit
  if (passInp.value.trim() === "" || passInp.value.trim().length < 8) {
    passInp.parentElement.classList.add("error");
    passErr.textContent = passInp.value.trim() === "" ? "Mật khẩu không được để trống." : "Mật khẩu quá ngắn!";
    isValid = false;
  } else { passErr.textContent = ""; }

  // TÌNH HUỐNG 1: QUÉT ĐỊNH DẠNG FORM THẤT BẠI (CÓ LỖI)
  if (!isValid) {
    alert("Vui lòng kiểm tra lại và sửa các thông tin bị lỗi!");
    return false; // Dừng hàm, giữ nguyên trạng thái lỗi cho người dùng sửa
  }

  // ========================================================
  // 5. TIẾN HÀNH ĐỐI CHIẾU DỮ LIỆU ĐĂNG NHẬP VỚI LOCALSTORAGE
  // ========================================================
  const danhSachHienTai = layDanhSachNguoiDung(); // Đọc danh sách tài khoản dưới máy lên
  const emailDangNhap = emailInp.value.trim().toLowerCase(); // Chuẩn hóa email đăng nhập về chữ thường
  const matKhauDangNhap = passInp.value.trim();

  // Bước A: Tìm tài khoản trong danh sách có Email trùng khớp
  const taiKhoanHopLe = danhSachHienTai.find(user => user.email.toLowerCase() === emailDangNhap);

  // TÌNH HUỐNG 2: KHÔNG TÌM THẤY TÀI KHOẢN (SAI EMAIL)
  if (!taiKhoanHopLe) {
    emailInp.parentElement.classList.add("error");
    emailErr.textContent = "Tài khoản Email này chưa được đăng ký trên hệ thống.";
    alert("Đăng nhập thất bại: Tài khoản không tồn tại!");
    return false;
  }

  // TÌNH HUỐNG 3: TÌM THẤY EMAIL NHƯNG SAI MẬT KHẨU
  if (taiKhoanHopLe.password !== matKhauDangNhap) {
    passInp.parentElement.classList.add("error");
    passErr.textContent = "Mật khẩu nhập vào không chính xác.";
    alert("Đăng nhập thất bại: Mật khẩu chưa chính xác!");
    return false;
  }

  // TÌNH HUỐNG 4: ĐĂNG NHẬP THÀNH CÔNG HOÀN TOÀN
  
  // Bước B: Khóa toàn bộ form nhập liệu để trải nghiệm mượt mà
  allLoginInputs.forEach(input => {
    if (input) {
      input.parentElement.classList.remove("error");
      // input.parentElement.classList.add("success"); // Thêm class thành công nếu muốn đổi viền xanh lá
      input.disabled = true; // Khóa ô input
    }
  });

  // Bước C: Lưu thông tin người dùng vừa đăng nhập thành công làm "vé thông hành"
  localStorage.setItem(KEY_USER_HIEN_TAI, JSON.stringify(taiKhoanHopLe));

  // Bước D: Đổi giao diện nút bấm thành trạng thái đang điều hướng
  if (submitBtn) {
    submitBtn.type = "button";
    submitBtn.textContent = "Về trang chủ...";
    submitBtn.style.backgroundColor = "#2ecc71"; // Đổi màu xanh lá
  }

  // Hiển thị thông báo và điều hướng trang
  alert(`Đăng nhập thành công! Chào mừng ${taiKhoanHopLe.name} đến với JENSY.`);
  
  // Thực hiện điều hướng người dùng sang trang chủ
  setTimeout(() => {
    window.location.href = "trangchu.html"; 
  }, 1000); // Trì hoãn 1 giây tạo cảm giác hệ thống đang load mượt mà

  return false; // Đảm bảo trang web không bị reload đột ngột
};