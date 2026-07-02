function frmValidate5(frm) {   
    return frm.checkValidity(); 
}
//ẩn/hiện mật khẩu
function togglePassword() {
  const clickedIcon = event.currentTarget;
  const inputGroup = clickedIcon.closest('.form__group');
  const passwordInput = inputGroup.querySelector('input');

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    clickedIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`; 
  } else {
    passwordInput.type = "password";
    clickedIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;
  }
}
  $(document).ready(function () {
    // 1. Lấy các phần tử Input
    const nameInp = document.getElementById('name');
    const phoneInp = document.getElementById('phone');
    const emailInp = document.getElementById('email');
    const passInp = document.getElementById('password');
    const confirmInp = document.getElementById('confirm-password');

    // Lấy các phần tử hiển thị lỗi
    const nameErr = document.getElementById('name-error');
    const phoneErr = document.getElementById('phone-error');
    const emailErr = document.getElementById('email-error');
    const passErr = document.getElementById('password-error');
    const confirmErr = document.getElementById('confirm-password-error');

    // Biểu thức chính quy (Regex) theo định dạng HTML5 pattern của bạn
    const nameReg = /^[a-zA-ZÀ-ỹ\s]+$/;
    const phoneReg = /^[0-9]{10}$/;
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // ==========================================
    // LOGIC KIỂM TRA LỖI KHI RỜI CHUỘT (BLUR)
    // ==========================================

    //Họ và tên
    nameInp.addEventListener('blur', function() {
      if (nameInp.value.trim() === "") {
        nameErr.textContent = "Họ và tên không được để trống.";
      } else if (!nameReg.test(nameInp.value)) {
        nameErr.textContent = "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
      }
    });
    nameInp.addEventListener('focus', function() { nameErr.textContent = ""; });

    //Số điện thoại
    phoneInp.addEventListener('blur', function() {
      if (phoneInp.value.trim() === "") {
        phoneErr.textContent = "Số điện thoại không được để trống.";
      } else if (!phoneReg.test(phoneInp.value)) {
        phoneErr.textContent = "Số điện thoại phải gồm 10 chữ số.";
      }
    });
    phoneInp.addEventListener('focus', function() { phoneErr.textContent = ""; });

    //Email
    emailInp.addEventListener('blur', function() {
      if (emailInp.value.trim() === "") {
        emailErr.textContent = "Email không được để trống.";
      } else if (!emailReg.test(emailInp.value)) {
        emailErr.textContent = "Email sai định dạng (Ví dụ: abc@gmail.com).";
      }
    });
    emailInp.addEventListener('focus', function() { emailErr.textContent = ""; });

    //Mật khẩu chính
    passInp.addEventListener('blur', function() {
      if (passInp.value.trim() === "") {
        passErr.textContent = "Mật khẩu không được để trống.";
      } else if (passInp.value.length < 8) {
        passErr.textContent = "Mật khẩu phải chứa ít nhất 8 ký tự.";
      }
    });
    passInp.addEventListener('focus', function() { passErr.textContent = ""; });

    //ác nhận mật khẩu (Trùng khớp)
    confirmInp.addEventListener('blur', function() {
      if (confirmInp.value.trim() === "") {
        confirmErr.textContent = "Vui lòng nhập lại mật khẩu xác nhận.";
      } else if (confirmInp.value !== passInp.value) {
        confirmErr.textContent = "Mật khẩu nhập lại không trùng khớp!";
      }
    });
    confirmInp.addEventListener('focus', function() { confirmErr.textContent = ""; });


    // ==========================================
    // LOGIC CHẶN GỬI FORM KHI BẤM NÚT ĐĂNG KÝ
    // ==========================================
    window.frmValidate5 = function(frm) {
      let isValid = true;

      // Chạy loạt lệnh test cuối cùng để đảm bảo không bỏ sót ô nào trống
      if (!nameReg.test(nameInp.value)) { nameErr.textContent = "Họ tên không hợp lệ!"; isValid = false; }
      if (!phoneReg.test(phoneInp.value)) { phoneErr.textContent = "Số điện thoại không hợp lệ!"; isValid = false; }
      if (!emailReg.test(emailInp.value)) { emailErr.textContent = "Email không hợp lệ!"; isValid = false; }
      if (passInp.value.length < 8) { passErr.textContent = "Mật khẩu quá ngắn!"; isValid = false; }
      if (confirmInp.value !== passInp.value) { confirmErr.textContent = "Mật khẩu không trùng khớp!"; isValid = false; }

      if (!isValid) {
        alert("Vui lòng kiểm tra lại và sửa các thông tin bị lỗi màu đỏ!");
        return false; 
      }

      alert("Đăng ký tài khoản thành công!");
      return true;
    };
  });
