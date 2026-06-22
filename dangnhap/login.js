function frmValidate5(frm) {   
    return frm.checkValidity(); 
}
// Lấy phần tử input mật khẩu và icon mắt
  function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.querySelector(".eye-icon");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`; 
      
      
    } else {
      passwordInput.type = "password";
      eyeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;
    }
  }
//
$(document).ready(function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // ========================================================================
    // 1. Khi di chuyển chuột RỜI KHỎI ô Email (Sự kiện blur)
    // ========================================================================
    emailInput.addEventListener('blur', function() {
      if (emailInput.value.trim() === "") {
        emailError.textContent = "Email không được để trống.";
      } else if (emailReg.test(emailInput.value) == false) {
        emailError.textContent = "Email không đúng định dạng (Ví dụ: abc@gmail.com).";
      } else {
        emailError.textContent = ""; // Nếu đúng thì xóa thông báo lỗi
      }
    });

    // Xóa lỗi ngay khi người dùng bấm lại vào ô email để sửa (Sự kiện focus)
    emailInput.addEventListener('focus', function() {
      emailError.textContent = "";
    });


    // ========================================================================
    // 2. Khi di chuyển chuột RỜI KHỎI ô Mật khẩu (Sự kiện blur)
    // ========================================================================
    passwordInput.addEventListener('blur', function() {
      if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Mật khẩu không được để trống.";
      } else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Mật khẩu phải có tối thiểu 8 ký tự.";
      } else {
        passwordError.textContent = "";
      }
    });

    // Xóa lỗi ngay khi người dùng bấm lại vào ô mật khẩu để sửa (Sự kiện focus)
    passwordInput.addEventListener('focus', function() {
      passwordError.textContent = "";
    });


    // ========================================================================
    // 3. Kiểm tra tổng thể khi bấm nút ĐĂNG NHẬP
    // ========================================================================
    window.frmValidate5 = function(frm) {
      let isValid = true;

      //Email
      if (emailReg.test(emailInput.value) == false) {
        emailError.textContent = "Email không hợp lệ!";
        isValid = false;
      }

      //lại Mật khẩu
      if (passwordInput.value.length < 8) {
        passwordError.textContent = "Mật khẩu phải có tối thiểu 8 ký tự.";
        isValid = false;
      }

      if (!isValid) {
        alert("Vui lòng nhập đúng và đủ thông tin trước khi đăng nhập!");
        return false;
      }

      alert("Đăng nhập thành công!");
      return true;
    };
    });
