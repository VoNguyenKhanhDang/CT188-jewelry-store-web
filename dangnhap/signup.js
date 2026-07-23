// ========================================================
// CẤU HÌNH LOCALSTORAGE (LƯU TRỮ DỮ LIỆU DƯỚI MÁY)
// ========================================================
// Khai báo các tên khóa (Key) để định danh vùng lưu trữ trên trình duyệt
const KEY_DANH_SACH_USER = "danhSachUser";
const KEY_USER_HIEN_TAI   = "userHienTai";


//Hàm lấy danh sách toàn bộ người dùng đã đăng ký thành công
//Nếu chưa có dữ liệu dưới máy, hàm tự động trả về một mảng rỗng []

function layDanhSachNguoiDung() {
  const du_lieu = localStorage.getItem(KEY_DANH_SACH_USER);
  return du_lieu ? JSON.parse(du_lieu) : [];
}


// Hàm ghi đè danh sách người dùng mới/cập nhật xuống LocalStorage
//Bắt buộc dùng JSON.stringify để ép mảng (Array) thành chuỗi dữ liệu (String)

function luuDanhSachNguoiDung(danhSach) {
  localStorage.setItem(KEY_DANH_SACH_USER, JSON.stringify(danhSach));
}


//Hàm chuẩn hóa số điện thoại: cắt khoảng trắng 2 đầu và xóa bỏ mọi khoảng trắng ở giữa
//Nhằm giúp việc đối chiếu dữ liệu chính xác tuyệt đối, tránh lỗi gõ nhầm cách dòng
function chuanHoaSdt(sdt) {
  return (sdt || "").trim().replace(/\s+/g, "");
}

// ========================================================
// 1. CHỨC NĂNG ẨN / HIỆN MẬT KHẨU
// ========================================================
const togglePassword = document.querySelectorAll(".eye");
let activeClassName = "is-active";

togglePassword.forEach((item) => {
  item.addEventListener("click", handleTogglePassword);//tự động gắn hàm handleTogglePassword vào tất cả các nút có class .eye
});

function handleTogglePassword() {
  let inputType = "password";
  const input = this.closest('.form__group')?.querySelector('input');
  if (!input || input.disabled) return;

  if (this.matches(".eye-close")) {
    inputType = "text";
    // nếu bấm mắt đóng -> tìm mắt mở (.eye-open) đứng ngay trước nó để thêm class
    const eyeOpen = this.previousElementSibling;
    if (eyeOpen) eyeOpen.classList.add(activeClassName);

  } else {
    inputType = "password";
    // nếu bấm mắt mở -> gỡ class khỏi bản thân nó (.eye-open)
    this.classList.remove(activeClassName);
  }
  // sau đó đổi type cho ô input
  input.setAttribute("type", inputType);
}

// ========================================================
// 2. KHAI BÁO BIẾN TOÀN CỤC & BIỂU THỨC CHÍNH QUY (REGEX)
// ========================================================
// Truy vấn các thẻ dữ liệu đầu vào (Input) từ file HTML bằng ID
const form = document.getElementById('form');
const nameInp = document.getElementById('name');
const phoneInp = document.getElementById('phone');
const emailInp = document.getElementById('email');
const passInp = document.getElementById('password');
const confirmInp = document.getElementById('confirm-password');

// Truy vấn các thẻ hiển thị dòng chữ báo lỗi bên dưới mỗi ô input
const nameErr = document.getElementById('name-error');
const phoneErr = document.getElementById('phone-error');
const emailErr = document.getElementById('email-error');
const passErr = document.getElementById('password-error');
const confirmErr = document.getElementById('confirm-password-error');

// Định nghĩa các biểu thức chính quy (Regex) để kiểm tra định dạng nhập liệu
const nameReg = /^[a-zA-ZÀ-ỹ\s]+$/; // Chỉ chứa chữ cái (bao gồm tiếng Việt có dấu) và khoảng trắng
const phoneReg = /^[0-9]{10}$/;     // Phải là số và có độ dài chính xác 10 ký tự
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Định dạng chuẩn email mẫu abc@gmail.com

// Gom tất cả các ô input vào một mảng chung để tiện duyệt vòng lặp xử lý số đông
const allInputs = [nameInp, phoneInp, emailInp, passInp, confirmInp];

// ========================================================
// 3. XỬ LÝ SỰ KIỆN RỜI Ô NHẬP LIỆU (BLUR) & CON TRỎ CHUỘT (FOCUS)
// ========================================================

// Bắt lỗi ô Họ và tên khi người dùng click chuột ra ngoài
nameInp.addEventListener('blur', () => {
  if (nameInp.disabled) return; // Nếu form đã bị khóa thì ngưng xử lý sự kiện
  if (nameInp.value.trim() === "") {
    nameInp.parentElement.classList.add("error"); // Kích hoạt màu đỏ cho khung viền và label
    nameErr.textContent = "Họ và tên không được để trống.";
  } else if (!nameReg.test(nameInp.value.trim())) {
    nameInp.parentElement.classList.add("error");
    nameErr.textContent = "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
  } else {
    nameInp.parentElement.classList.remove("error"); // Xóa màu đỏ nếu dữ liệu đã gõ hợp lệ
    nameErr.textContent = "";
  }
});

// Bắt lỗi ô Số điện thoại khi rời chuột
phoneInp.addEventListener('blur', () => {
  if (phoneInp.disabled) return;
  if (phoneInp.value.trim() === "") {
    phoneInp.parentElement.classList.add("error");
    phoneErr.textContent = "Số điện thoại không được để trống.";
  } else if (!phoneReg.test(phoneInp.value.trim())) {
    phoneInp.parentElement.classList.add("error");
    phoneErr.textContent = "Số điện thoại phải gồm 10 chữ số.";
  } else {
    phoneInp.parentElement.classList.remove("error");
    phoneErr.textContent = "";
  }
});

// Bắt lỗi ô Email khi rời chuột
emailInp.addEventListener('blur', () => {
  if (emailInp.disabled) return;
  if (emailInp.value.trim() === "") {
    emailInp.parentElement.classList.add("error");
    emailErr.textContent = "Email không được để trống.";
  } else if (!emailReg.test(emailInp.value.trim())) {
    emailInp.parentElement.classList.add("error");
    emailErr.textContent = "Email sai định dạng (Ví dụ: abc@gmail.com).";
  } else {
    emailInp.parentElement.classList.remove("error");
    emailErr.textContent = "";
  }
});

// Bắt lỗi ô Mật khẩu khi rời chuột
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

// Bắt lỗi ô Xác nhận mật khẩu khi rời chuột
confirmInp.addEventListener('blur', () => {
  if (confirmInp.disabled) return;
  if (confirmInp.value.trim() === "") {
    confirmInp.parentElement.classList.add("error");
    confirmErr.textContent = "Vui lòng nhập lại mật khẩu xác nhận.";
  } else if (confirmInp.value.trim() !== passInp.value.trim()) {
    confirmInp.parentElement.classList.add("error");
    confirmErr.textContent = "Mật khẩu nhập lại không trùng khớp!";
  } else {
    confirmInp.parentElement.classList.remove("error");
    confirmErr.textContent = "";
  }
});

// Xử lý sự kiện khi người dùng click chuột trở lại ô input để sửa dữ liệu (Focus)
allInputs.forEach(input => {
  input.addEventListener('focus', () => {
    // Điều kiện chặn: Nếu đã đăng ký thành công rồi thì đóng băng giao diện xanh lá, cấm sửa
    if (input.disabled) return; 
    
    // Nếu chưa đăng ký thành công: Tự động gỡ màu đỏ và xóa dòng chữ lỗi ngay khi vừa bấm vào ô
    input.parentElement.classList.remove("error");
    const errorSpan = input.parentElement.querySelector('.form__error');
    if (errorSpan) errorSpan.textContent = "";
  });
});

// ========================================================
// 4. LOGIC XỬ LÝ KIỂM TRA TỔNG THỂ VÀ ĐĂNG KÝ (SUBMIT)
// ========================================================
window.frmValidate5 = function(frm) {
  // Ngăn trình duyệt reload lại trang web khi bấm nút gửi form
  event.preventDefault(); 
  
  // Kiểm tra: Nếu nút bấm đã biến thành loại "button" thường (nghĩa là đã đăng ký xong) thì dừng hoàn toàn hàm
  const submitBtn = frm.querySelector('.form__btn--submit');
  if (submitBtn && submitBtn.type === "button") return false;

  let isValid = true; // Cờ theo dõi trạng thái lỗi, mặc định ban đầu coi như form đúng hoàn toàn

  // 1. Quét kiểm tra lỗi Họ và tên tổng thể
  if (nameInp.value.trim() === "" || !nameReg.test(nameInp.value.trim())) {
    nameInp.parentElement.classList.add("error");
    nameErr.textContent = nameInp.value.trim() === "" ? "Họ và tên không được để trống." : "Họ tên không hợp lệ!";
    isValid = false; // Gắn cờ false thông báo form đang có lỗi dữ liệu
  } else { nameErr.textContent = ""; }

  // 2. Quét kiểm tra lỗi Số điện thoại tổng thể
  if (phoneInp.value.trim() === "" || !phoneReg.test(phoneInp.value.trim())) {
    phoneInp.parentElement.classList.add("error");
    phoneErr.textContent = phoneInp.value.trim() === "" ? "Số điện thoại không được để trống." : "Số điện thoại không hợp lệ!";
    isValid = false;
  } else { phoneErr.textContent = ""; }

  // 3. Quét kiểm tra lỗi Email tổng thể
  if (emailInp.value.trim() === "" || !emailReg.test(emailInp.value.trim())) {
    emailInp.parentElement.classList.add("error");
    emailErr.textContent = emailInp.value.trim() === "" ? "Email không được để trống." : "Email không hợp lệ!";
    isValid = false;
  } else { emailErr.textContent = ""; }

  // 4. Quét kiểm tra lỗi Mật khẩu tổng thể
  if (passInp.value.trim() === "" || passInp.value.trim().length < 8) {
    passInp.parentElement.classList.add("error");
    passErr.textContent = passInp.value.trim() === "" ? "Mật khẩu không được để trống." : "Mật khẩu quá ngắn!";
    isValid = false;
  } else { passErr.textContent = ""; }

  // 5. Quét kiểm tra lỗi Xác nhận mật khẩu tổng thể
  if (confirmInp.value.trim() === "" || confirmInp.value.trim() !== passInp.value.trim()) {
    confirmInp.parentElement.classList.add("error");
    confirmErr.textContent = confirmInp.value.trim() === "" ? "Vui lòng nhập lại mật khẩu." : "Mật khẩu không trùng khớp!";
    isValid = false;
  } else { confirmErr.textContent = ""; }

  // TÌNH HUỐNG 1: QUÉT FORM THẤT BẠI (CÓ LỖI)
  if (!isValid) {
    alert("Vui lòng kiểm tra lại và sửa các thông tin bị lỗi!");
    return false; // Dừng hàm, giữ nguyên các ô màu đỏ để người dùng nhìn thấy sửa
  }
    
  // TÌNH HUỐNG 2: KIỂM TRA TRÙNG LẶP DỮ LIỆU TRONG LOCALSTORAGE
  const danhSachHienTai = layDanhSachNguoiDung(); // Đọc danh sách cũ dưới máy lên
  const sdtChuanHoa = chuanHoaSdt(phoneInp.value); // Chuẩn hóa SĐT đang điền
  const emailDangKy = emailInp.value.trim().toLowerCase(); // Chuyển email sang viết thường để so khớp chính xác

  // Duyệt qua mảng xem đã có ai đăng ký bằng Email hoặc Số điện thoại này chưa
  const taiKhoanDaTonTai = danhSachHienTai.some(user => 
    user.email.toLowerCase() === emailDangKy || chuanHoaSdt(user.phone) === sdtChuanHoa
  );

  if (taiKhoanDaTonTai) {
    alert("Email hoặc Số điện thoại này đã được đăng ký tài khoản từ trước!");
    return false; // Chặn đứng không cho đăng ký tài khoản trùng
  }

  // TÌNH HUỐNG 3: ĐĂNG KÝ THÀNH CÔNG HOÀN TOÀN
  
  // Bước A: Khóa toàn bộ form nhập liệu và đồng loạt chuyển giao diện sang màu xanh lá cây
  allInputs.forEach(input => {
    input.parentElement.classList.remove("error"); // Xóa class lỗi màu đỏ nếu có trước đó
    input.parentElement.classList.add("success");  // Kích hoạt class thành công làm xanh viền và nhãn
    input.disabled = true;                          // Khóa cứng ô input, không cho người dùng sửa nữa
  });

  // Bước B: Đóng gói thông tin người dùng mới thành một Đối tượng (Object)
  const nguoiDungMoi = {
    name: nameInp.value.trim(),
    phone: phoneInp.value.trim(),
    email: emailDangKy,
    password: passInp.value.trim()
  };

  // Bước C: Đẩy (push) đối tượng mới này vào mảng danh sách hiện tại và lưu xuống máy tính
  danhSachHienTai.push(nguoiDungMoi);
  luuDanhSachNguoiDung(danhSachHienTai);

  // Bước D: Thay đổi cấu trúc và giao diện nút Đăng ký thành nút hướng dẫn Đăng nhập nhanh
  if (submitBtn) {
    submitBtn.type = "button";               // Đổi type sang button để vô hiệu hóa tính năng submit mặc định
    submitBtn.textContent = "Đăng Nhập Ngay"; // Đổi chữ nút sang thông báo hành động mới
    submitBtn.style.backgroundColor = "#2ecc71"; // Đổi màu nền nút sang xanh lá thành công

    // Tìm khối liên kết văn bản nhỏ "Bạn đã có tài khoản? Đăng nhập ngay" ở dưới và ẩn đi cho gọn giao diện
    const formBottom = frm.querySelector('.form__bottom');
    if (formBottom) {
      formBottom.style.display = 'none'; 
    }

    // Gắn sự kiện click vào nút mới để lập tức chuyển hướng người dùng sang trang Đăng nhập
    submitBtn.addEventListener('click', () => {
      window.location.href = "login.html"; // Đường dẫn chuyển file trang đăng nhập của bạn   
    });
  }

  // Hiển thị hộp thoại chúc mừng kết thúc quy trình
  alert("Chúc mừng bạn đã đăng ký tài khoản thành công! Đăng nhập ngay và trải nghiệm!");
  return false; // Trả về false nhằm đảm bảo tuyệt đối trang web không bị reload mất màu sắc thành công
};