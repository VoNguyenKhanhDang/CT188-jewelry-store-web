class DropList {
  constructor(tag, tag2) {
    this.tag = tag;
    this.tag2 = tag2;
    //gắn sự kiện click vào thẻ cha chứa những thẻ li ( hiện tượng bubble)
    const parent = document.querySelector(tag);
    parent.addEventListener("click", (e) => {
      const li = e.target;
      this.swapText(li);
      this.sortItems(li);
    });
  }
  //đổi text của thẻ span
  swapText(li) {
    const b = li.parentElement.previousElementSibling; //đi từ thẻ li lên thẻ cha -> thẻ anh em cùng cấp
    b.querySelector("span").textContent = li.textContent;
  }
  sortItems(li) {
    document.querySelectorAll(this.tag2).forEach((e) => {
      e.classList.remove("hidden"); // bắt đầu với xoá các class hidden những thẻ div dã được gắn
    });
    const b = li.parentElement.previousElementSibling;
    //dùng switch chia các trường hợp cho hàm sort
    switch (b.querySelector("span").textContent) {
      case "Nhẫn": {
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("nhan")) {
            e.classList.add("hidden");
          }
        });
        break;
      }
      case "Lắc tay/Chân": {
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("lac")) {
            e.classList.add("hidden");
          }
        });

        break;
      }
      case "Bông tay": {
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("bong")) {
            e.classList.add("hidden");
          }
        });

        break;
      }
      case "Dây chuyền": {
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("daych")) {
            e.classList.add("hidden");
          }
        });

        break;
      }
      default:
        break;
    }
  }
}

class inputQuality {
  constructor(input, inNumber, deNumBer, price) {
    this.input = input;
    this.inNumber = inNumber;
    this.deNumBer = deNumBer;
    this.price = price;
    // đơn giá gốc (giá của 1 sản phẩm), giữ cố định để tính lại mỗi khi số lượng đổi
    this.unitPrice = Number(
      document.querySelector(price).textContent.replace(/[^0-9]/g, ""),
    );
    this.number = document.querySelector(input);

    //đợi sự kiện click vào nút +
    document.querySelector(inNumber).addEventListener("click", () => {
      this.increass();
      this.updatePrice();
    });
    //đợi sự kiện click vào nút -
    document.querySelector(deNumBer).addEventListener("click", () => {
      this.decreass();
      this.updatePrice();
    });
    // cho phép gõ tay số lượng trực tiếp vào ô input
    this.number.addEventListener("input", () => {
      // loại bỏ mọi ký tự không phải số (phòng người dùng gõ chữ/dấu)
      this.number.value = this.number.value.replace(/[^0-9]/g, "");
      this.updatePrice();
    });
    // khi rời khỏi ô nhập mà để trống hoặc gõ 0 -> tự đưa về 1
    this.number.addEventListener("blur", () => {
      if (!this.number.value || Number(this.number.value) < 1) {
        this.number.value = 1;
        this.updatePrice();
      }
    });
  }

  increass() {
    this.number.value = Number(this.number.value) + 1;
  }
  decreass() {
    this.number.value = Number(this.number.value) - 1;
    //điều kiện để số lượng vật phẩm không âm
    if (this.number.value <= 0) {
      this.number.value = 1;
    }
  }

  getSize() {
    return;
  }
  getBox() {}
  getValue() {
    return Number(this.number.value) || 1;
  }
  // tính lại giá = đơn giá x số lượng hiện tại (đúng dù bấm +/- hay gõ tay số bất kỳ)
  updatePrice() {
    const qty = Number(this.number.value) || 0;
    const p = document.querySelector(this.price);
    p.textContent = (this.unitPrice * qty).toLocaleString("vi-VN") + "đ";
  }
}
//đưa id của thẻ a lên localStorage nếu a được click
class localId {
  constructor(a) {
    this.a = a;
    document.querySelectorAll(a).forEach((e) => {
      e.addEventListener("click", (e1) => {
        const temp = e1.target.closest("a"); //tránh target vào thẻ img
        const id = temp.id;
        window.localStorage.setItem("itemID", id);
      });
    });
  }
}
class SwapPages {
  constructor(list) {
    this.list = list;
    const id = this.getID();
    this.swapItems(id);
  }
  getID() {
    return window.localStorage.getItem("itemID");
  }

  swapItems(id) {
    //tìm kiếm sản phẩm tương ứng theo id(được lưu trên localStorage) của list
    const item = this.list.find((i) => i.id == id);
    if (!id || !item) return;
    document.querySelector(".h2-name").textContent = item.name;
    document.querySelector(".price").textContent =
      Number(item.price).toLocaleString("vi-VN") + "đ";
    document.querySelector(".img-1").src = item.img1;
    document.querySelector(".img-2").src = item.img2;
    document.querySelector(".des-img.img1").src = item.img1;
    document.querySelector(".des-img.img2").src = item.img2;
    document.querySelector(".items-name").textContent = item.gt;
  }
}
class loadCart {
  constructor(tag, list) {
    this.list = list;
    this.tag = tag;
    //chọn một móc là thẻ cha để bắt đầu sinh con từ đó
    this.parent = document.querySelector(tag);
    const id = this.getID();
    this.load();
  }

  getID() {
    return window.localStorage.getItem("itemID");
  }
  load() {
    //lấy dữ liệu của cart từ localStorae xuống và đưa từ String -> opject
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let sum = 0;
    // lặp qua các phần tử của cart đảm bảo load đầy đủ các sản phẩm
    cart.forEach((item) => {
      const id = item.id;
      const quantity = item.quantity;
      const temp = this.list.find((t) => t.id == id);
      //bắt đầu sinh con
      const contain = document.createElement("div");
      contain.classList.add("Cart__details");
      const div1 = document.createElement("div");
      div1.classList.add("div__img");
      const div2 = document.createElement("div");
      div2.classList.add("Cart__details__text");
      const img = document.createElement("img");
      img.classList.add("Cart__details__img");
      img.src = temp.img1;
      div1.appendChild(img);
      const h2 = document.createElement("H2");
      h2.textContent = temp.name;
      div2.appendChild(h2);
      const p1 = document.createElement("p");
      p1.classList.add("price");
      p1.textContent = Number(temp.price).toLocaleString("vi-VN") + "đ";
      div2.appendChild(p1);

      //Note: thêm các lựa chọn cho cart

      const div3 = document.createElement("div");
      div3.classList.add("price-div");
      div2.appendChild(div3);
      const p3 = document.createElement("div");
      p3.classList.add("Quality__items", "qty-control");

      const btnMinus = document.createElement("button");
      btnMinus.type = "button";
      btnMinus.classList.add("qty-btn", "qty-minus");
      btnMinus.textContent = "-";
      btnMinus.addEventListener("click", () => {
        this.changeQuantity(id, -1);
      });

      const qtyValue = document.createElement("span");
      qtyValue.classList.add("qty-value");
      qtyValue.textContent = quantity;

      const btnPlus = document.createElement("button");
      btnPlus.type = "button";
      btnPlus.classList.add("qty-btn", "qty-plus");
      btnPlus.textContent = "+";
      btnPlus.addEventListener("click", () => {
        this.changeQuantity(id, 1);
      });

      p3.appendChild(btnMinus);
      p3.appendChild(qtyValue);
      p3.appendChild(btnPlus);
      div3.appendChild(p3);
      const p5 = document.createElement("p");
      p5.classList.add("delete");
      p5.textContent = "XOÁ";
      // chờ sự kiện click của nút xoá nếu xảy ra thì chạy hàm removeItem
      p5.addEventListener("click", () => {
        this.removeItem(id);
      });
      div3.appendChild(p5);
      const p4 = document.createElement("p");
      p4.classList.add("sum__price");
      const total = Number(temp.price) * quantity;
      p4.textContent = "Tổng: " + total.toLocaleString("vi-VN") + "đ";
      sum = sum + total;
      document.querySelector(".sPrice .price").textContent =
        sum.toLocaleString("vi-VN") + "đ";
      div3.appendChild(p4);
      contain.appendChild(div1);
      contain.appendChild(div2);
      //đưa nguyên khối contain vào thẻ cha
      const form = this.parent.querySelector(".form-details");
      this.parent.insertBefore(contain, form); //đảm bảo thẻ con cuối cùng của parent luôn là form
    });
  }
  removeItem(id) {
    let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== id); //chừa lại những phần tử có id khác phần tử được xoá
    window.localStorage.setItem("cart", JSON.stringify(cart)); // đảm bảo nén dạng opject thành string để lưu vài localStorage
    if (typeof updateCartBadge === "function") {
      updateCartBadge();
    }
    // tải lại trang giỏ hàng để danh sách và tổng tiền hiển thị đúng sau khi xoá
    location.reload();
  }

  // Tăng/giảm số lượng 1 sản phẩm trong giỏ (delta = 1 hoặc -1)
  changeQuantity(id, delta) {
    let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    // Nếu đang bấm "-" mà số lượng hiện tại đã là 1 -> hỏi có muốn xoá luôn sản phẩm không
    if (delta < 0 && item.quantity <= 1) {
      if (confirm("Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không?")) {
        this.removeItem(id); // đồng ý -> xoá hẳn sản phẩm (hàm này tự lưu + reload)
      }
      return; // dù đồng ý hay không cũng dừng ở đây, không cho số lượng xuống dưới 1
    }

    item.quantity += delta;

    window.localStorage.setItem("cart", JSON.stringify(cart));
    if (typeof updateCartBadge === "function") {
      updateCartBadge();
    }
    // tải lại trang để số lượng, "Tổng" từng sản phẩm và tổng tiền cả giỏ được tính lại đúng
    location.reload();
  }
}
//thêm vẫn phẩm vào biến cart được lưu trên localStorage
class addToCart {
  constructor(button, sl) {
    this.button = button;
    this.sl = sl;
    this.createItem();
  }

  createItem() {
    const id = window.localStorage.getItem("itemID");
    let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    const quantity = this.sl.getValue();
    // kiểm tra vật phẩm đã tồn tại trong giỏ hay chưa?
    const check = cart.find((item) => item.id === id);
    if (check) {
      check.quantity += quantity;
    } else {
      cart.push({
        id: id,
        quantity: quantity,
      });
    }
    //lưu cart sau khi được cặp nhật thêm dữ liệu
    window.localStorage.setItem("cart", JSON.stringify(cart));
    // cập nhật lại số hiển thị trên badge giỏ hàng ở header
    if (typeof updateCartBadge === "function") {
      updateCartBadge();
    }
  }
}
const list = [
  {
    id: "1",
    name: 'Bông Tai Bạc Nữ S925 JENSY Trái Tim Đá Hồng "Roselle" BTARM03639. Khuyên Tai Bạc Nữ Dễ Thương',
    img1: "./imgs/bo6ngtai...png",
    img2: "./imgs/bongtai1.png",
    price: "636000",
    gt: "ROSELLE BTARMO",
  },
  {
    id: "2",
    name: 'Bông Tai Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Juliette" BTYA1. Khuyên Tai Bạc Nữ Sang Trọng',
    img1: "./imgs/bông tai.png",
    img2: "./imgs/bongtai2.png",
    price: "367000",
    gt: "JULIETTE KIM CUONG MOISSANITE",
  },
  {
    id: "3",
    name: 'Bông Tai Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Radiant Halo" BTRU2. Khuyên Tai Bạc Nữ Sang Trọng',
    img1: "./imgs/bôngtai.png",
    img2: "./imgs/bongtai3.png",
    price: "911000",
    gt: "RADIANT HALO BTRU",
  },
  {
    id: "4",
    name: 'Dây Chuyền Kim Cương Moissanite 7 Ly JENSY Xi Bạch Kim, Kiểm Định GRA "Celestial Spark" VCJ6, Vòng Cổ Bạc Nữ',
    img1: "./imgs/daychuyen.jpg",
    img2: "./imgs/daychuyen1.png",
    price: "863000",
    gt: "CELESTIAL SPARK",
  },
  {
    id: "5",
    name: 'Dây Chuyền Kim Cương Moissanite 5 Ly JENSY Xi Bạch Kim, Kiểm Định GRA "Enamor" VCJ8, Vòng Cổ Bạc Nữ',
    img1: "./imgs/dây chuyen...png",
    img2: "./imgs/daychuyen2.png",
    price: "945000",
    gt: "ENAMOR VCJ",
  },
  {
    id: "6",
    name: 'Dây Chuyền Bạc S925 JENSY Mặt Đá Vuông Sang Chảnh "Lucent" VCVAVN1. Vòng Cổ Bạc Nữ',
    img1: "./imgs/dây chuyền.png",
    img2: "./imgs/daychuyen3.png",
    price: "677000",
    gt: "LUCENT VCVAVN",
  },
  {
    id: "7",
    name: 'Lắc Tay Bạc Nữ S925 JENSY Cỏ 4 Lá Mix Đá Hot Trend "Celeste Peta" LTTL12. Vòng Tay Bạc Nữ Xinh Xắn',
    img1: "./imgs/lactay.png",
    img2: "./imgs/lacchan1.png",
    price: "778000",
    gt: "CELESTA PETA",
  },
  {
    id: "8",
    name: 'Lắc Tay Bạc Gắn Kim Cương Moissanite 7 Ly Xi Bạch Kim, Kiểm Định GRA. "Halo Light" LTIN1. Vòng Tay Bạc Nữ Sang Trọng',
    img1: "./imgs/lắc tay.png",
    img2: "./imgs/lactai1.png",
    price: "776000",
    gt: "HALO LIGHT LTIN",
  },
  {
    id: "9",
    name: 'Lắc Tay Bạc Nữ S925 JENSY Hình Nơ Đơn Giản "Meliora" LTARS6944. Vòng Tay Bạc Nữ Xinh Xắn',
    img1: "./imgs/lắcchan.png",
    img2: "./imgs/lactai2.png",
    price: "1945000",
    gt: "VELINA BOW LCARS",
  },
  {
    id: "10",
    name: 'Nhẫn Đôi Bạc JENSY Gắn Kim Cương Moissanite Xi Bạch Kim Kiểm Định GRA "Velaris" NDIN2, Nhẫn Cặp Đôi Bạc Đính Kim Cương Sang Trọng Ý Nghĩa',
    img1: "./imgs/nhẫn đôi.png",
    img2: "./imgs/nhan1.png",
    price: "3636000",
    gt: "VELARIS NDIN",
  },
  {
    id: "11",
    name: 'Nhẫn Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Forever Yours" NLRU1. Nhẫn Nữ Cao Cấp',
    img1: "./imgs/nhẫn....png",
    img2: "./imgs/nhan2.png",
    price: "565000",
    gt: "FOREVER YOURS NLRU",
  },
  {
    id: "12",
    name: 'Nhẫn Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Balmy" NLJC5. Nhẫn Bạc Nữ Đính Kim Cương Sang Trọng.',
    img1: "./imgs/nhẫn.png",
    img2: "./imgs/nhan3.png",
    price: "819450",
    gt: "RADIANT PROMISE NLJ",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  //chạy khởi tạo khi ở trang tất cả sản phẩm
  if (document.querySelector(".items a")) {
    new localId(".items a");
  }
  //chạy khởi tạo khi ở trang chi tiết sản phẩm
  if (document.querySelector(".pages-container")) {
    new SwapPages(list);
  }
  //chạy khởi tạo khi
  if (document.querySelector(".h2-name")) {
    const but = document.querySelector(".input_number");
    but.value = 1;
    const quality = new inputQuality(
      ".input_number",
      ".increase",
      ".decreass",
      ".price",
    );
    document.querySelector(".buy").addEventListener("click", () => {
      new addToCart(".buy", quality);
    });
  }

  if (document.querySelector(".more-options")) {
    new DropList(".options__list", ".items");
  }
  if (document.querySelector(".Cart-container")) {
    new loadCart(".Cart__article", list);

    document.querySelector(".buying__button").addEventListener("click", () => {
      //Kiểm tra giỏ hàng có sản phẩm hay không
      const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
      }

      // Kiểm tra người dùng đã đăng nhập hay chưa (login.js lưu qua key "userHienTai")
      const userHienTaiStr = window.localStorage.getItem("userHienTai");
      if (!userHienTaiStr) {
        alert("Vui lòng đăng nhập trước khi đặt hàng!");
        window.location.href = "/dangnhap/login.html";
        return;
      }

      // Đã đăng nhập và giỏ hàng có hàng -> xác nhận đặt hàng thành công
      alert("Bạn đã mua hàng thành công!");

      // Reset giỏ hàng sau khi đặt hàng thành công
      window.localStorage.removeItem("cart");
      if (typeof updateCartBadge === "function") {
        updateCartBadge();
      }

      // Quay về trang chủ sau khi đặt hàng xong
      window.location.href = "/trangchu.html";
    });
  }
});
