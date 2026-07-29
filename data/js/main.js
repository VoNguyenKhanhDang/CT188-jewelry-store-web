/* ========================================== 
            TÁC GIẢ: Nguyễn Anh Quốc 
            MSSV: B2405520
=============================================*/

/**
 *
 * BẢNG LIỆT KÊ CÁC CHỨC NĂNG TRONG FILE MAIN.JS:
 *
 * 1. QUẢN LÝ DỮ LIỆU TĨNH (Mock Data):
 *    - Lưu trữ danh sách 12 sản phẩm trang sức (Nhẫn, Lắc, Bông tai, Dây chuyền)
 *      với đầy đủ ID, tên, hình ảnh, giá bán và nhãn hiệu.
 *
 * 2. CHỨC NĂNG TRANG DANH SÁCH SẢN PHẨM (main.html):
 *    - Lọc danh mục: Hỗ trợ Dropdown lọc sản phẩm theo nhóm (Class DropList).
 *    - Tìm kiếm thông minh: Lọc sản phẩm theo từ khóa từ URL, có khả năng
 *      chuẩn hóa chuỗi tiếng Việt (xóa dấu, in thường) để tìm kiếm chính xác (Class SearchProduct).
 *    - Chuyển hướng: Tự động bắt ID sản phẩm khi người dùng click và chuyển sang trang chi tiết.
 *
 * 3. CHỨC NĂNG TRANG CHI TIẾT SẢN PHẨM (items-pages.html):
 *    - Tải dữ liệu động: Đọc ID từ URL để render đúng ảnh, tên, giá (Class SwapPages).
 *    - Tùy chỉnh mua hàng: Nút tăng/giảm số lượng tự động tính lại tổng tiền tạm tính.
 *      Giới hạn không cho phép nhập số âm hoặc chữ (Class inputQuality).
 *    - Lựa chọn phân loại: Quản lý hiệu ứng click chọn Size và Hộp (Class activeButton).
 *    - Thêm vào giỏ (Thêm/Mua ngay): Bắt buộc khách phải chọn đủ Size và Hộp.
 *      Tự động nhận diện và cộng dồn số lượng nếu mua trùng sản phẩm đã có trong giỏ (Class addToCart).
 *
 * 4. CHỨC NĂNG TRANG GIỎ HÀNG & THANH TOÁN (Cart.html):
 *    - Phân tách người dùng: Tự động sinh Key giỏ hàng riêng biệt (Ví dụ: cart_guest, cart_UserA)
 *      dựa trên trạng thái đăng nhập, tránh xung đột dữ liệu (Hàm getCartKey).
 *    - Render giỏ hàng: Vẽ giao diện chi tiết từng sản phẩm kèm theo phân loại Size, Box (Class loadCart).
 *    - Chỉnh sửa trực tiếp: Cập nhật số lượng (+/-) và tự động tính lại tổng tiền toàn giỏ.
 *      Hiển thị cảnh báo xác nhận xóa nếu giảm số lượng về 0.
 *    - Xóa sản phẩm: Xóa chính xác sản phẩm dựa trên ID, Size và Hộp.
 *    - Xác nhận đơn hàng: Ràng buộc phải đăng nhập mới được thanh toán. Tự động xóa sạch
 *      giỏ hàng và điều hướng về trang chủ sau khi mua thành công.
 * ==========================================================================
 */

// ==========================================================================
// PHẦN 1: DỮ LIỆU SẢN PHẨM
// ==========================================================================
const list = [
  {
    id: "1",
    name: 'Bông Tai Bạc Nữ S925 JENSY Trái Tim Đá Hồng "Roselle" BTARM03639. Khuyên Tai Bạc Nữ Dễ Thương',
    img1: "../data/images/cart/bo6ngtai...png",
    img2: "../data/images/cart/bongtai1.png",
    price: "636000",
    gt: "ROSELLE BTARMO",
  },
  {
    id: "2",
    name: 'Bông Tai Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Juliette" BTYA1. Khuyên Tai Bạc Nữ Sang Trọng',
    img1: "../data/images/cart/bông tai.png",
    img2: "../data/images/cart/bongtai2.png",
    price: "367000",
    gt: "JULIETTE KIM CUONG MOISSANITE",
  },
  {
    id: "3",
    name: 'Bông Tai Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Radiant Halo" BTRU2. Khuyên Tai Bạc Nữ Sang Trọng',
    img1: "../data/images/cart/bôngtai.png",
    img2: "../data/images/cart/bongtai3.png",
    price: "911000",
    gt: "RADIANT HALO BTRU",
  },
  {
    id: "4",
    name: 'Dây Chuyền Kim Cương Moissanite 7 Ly JENSY Xi Bạch Kim, Kiểm Định GRA "Celestial Spark" VCJ6, Vòng Cổ Bạc Nữ',
    img1: "../data/images/cart/daychuyen.jpg",
    img2: "../data/images/cart/daychuyen1.png",
    price: "863000",
    gt: "CELESTIAL SPARK",
  },
  {
    id: "5",
    name: 'Dây Chuyền Kim Cương Moissanite 5 Ly JENSY Xi Bạch Kim, Kiểm Định GRA "Enamor" VCJ8, Vòng Cổ Bạc Nữ',
    img1: "../data/images/cart/dây chuyen...png",
    img2: "../data/images/cart/daychuyen2.png",
    price: "945000",
    gt: "ENAMOR VCJ",
  },
  {
    id: "6",
    name: 'Dây Chuyền Bạc S925 JENSY Mặt Đá Vuông Sang Chảnh "Lucent" VCVAVN1. Vòng Cổ Bạc Nữ',
    img1: "../data/images/cart/dây chuyền.png",
    img2: "../data/images/cart/daychuyen3.png",
    price: "677000",
    gt: "LUCENT VCVAVN",
  },
  {
    id: "7",
    name: 'Lắc Tay Bạc Nữ S925 JENSY Cỏ 4 Lá Mix Đá Hot Trend "Celeste Peta" LTTL12. Vòng Tay Bạc Nữ Xinh Xắn',
    img1: "../data/images/cart/lactay.png",
    img2: "../data/images/cart/lacchan1.png",
    price: "778000",
    gt: "CELESTA PETA",
  },
  {
    id: "8",
    name: 'Lắc Tay Bạc Gắn Kim Cương Moissanite 7 Ly Xi Bạch Kim, Kiểm Định GRA. "Halo Light" LTIN1. Vòng Tay Bạc Nữ Sang Trọng',
    img1: "../data/images/cart/lắc tay.png",
    img2: "../data/images/cart/lactai1.png",
    price: "776000",
    gt: "HALO LIGHT LTIN",
  },
  {
    id: "9",
    name: 'Lắc Tay Bạc Nữ S925 JENSY Hình Nơ Đơn Giản "Meliora" LTARS6944. Vòng Tay Bạc Nữ Xinh Xắn',
    img1: "../data/images/cart/lắcchan.png",
    img2: "../data/images/cart/lactai2.png",
    price: "1945000",
    gt: "VELINA BOW LCARS",
  },
  {
    id: "10",
    name: 'Nhẫn Đôi Bạc JENSY Gắn Kim Cương Moissanite Xi Bạch Kim Kiểm Định GRA "Velaris" NDIN2, Nhẫn Cặp Đôi Bạc Đính Kim Cương Sang Trọng Ý Nghĩa',
    img1: "../data/images/cart/nhẫn đôi.png",
    img2: "../data/images/cart/nhan1.png",
    price: "3636000",
    gt: "VELARIS NDIN",
  },
  {
    id: "11",
    name: 'Nhẫn Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Forever Yours" NLRU1. Nhẫn Nữ Cao Cấp',
    img1: "../data/images/cart/nhẫn....png",
    img2: "../data/images/cart/nhan2.png",
    price: "565000",
    gt: "FOREVER YOURS NLRU",
  },
  {
    id: "12",
    name: 'Nhẫn Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA "Balmy" NLJC5. Nhẫn Bạc Nữ Đính Kim Cương Sang Trọng.',
    img1: "../data/images/cart/nhẫn.png",
    img2: "../data/images/cart/nhan3.png",
    price: "819450",
    gt: "RADIANT PROMISE NLJ",
  },
];

// ==========================================================================
// PHẦN 2: CÁC HÀM PHỤ TRỢ
// ==========================================================================

/**
 * Hàm tạo Key giỏ hàng động tùy theo tài khoản đang đăng nhập.
 * Mỗi user sẽ có một giỏ hàng của riêng mình
 */
function getCartKey() {
  const userStr = window.localStorage.getItem("userHienTai");
  if (userStr) {
    const user = JSON.parse(userStr);
    return (
      "cart_" + (user.name || user.username || "default").replace(/\s/g, "")
    );
  }
  return "cart_guest";
}

// ==========================================================================
// PHẦN 3: CÁC CLASS XỬ LÝ GIAO DIỆN CHUNG & DANH SÁCH SẢN PHẨM
// ==========================================================================

/**
 * Class DropList: Quản lý bộ lọc danh mục (Dropdown) ở trang danh sách sản phẩm.
 * Hiển thị/ẩn các sản phẩm dựa vào class (nhan, lac, bong, daych).
 */
class DropList {
  constructor(tag, tag2) {
    this.tag = tag;
    this.tag2 = tag2;
    const parent = document.querySelector(tag);
    parent.addEventListener("click", (e) => {
      const li = e.target;
      this.swapText(li);
      this.sortItems(li);
    });
  }

  swapText(li) {
    const b = li.parentElement.previousElementSibling;
    b.querySelector("span").textContent = li.textContent;
  }

  sortItems(li) {
    document.querySelectorAll(this.tag2).forEach((e) => {
      e.classList.remove("hidden");
    });
    const b = li.parentElement.previousElementSibling;
    switch (b.querySelector("span").textContent) {
      case "Nhẫn":
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("nhan")) e.classList.add("hidden");
        });
        break;
      case "Lắc tay/Chân":
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("lac")) e.classList.add("hidden");
        });
        break;
      case "Bông tai":
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("bong")) e.classList.add("hidden");
        });
        break;
      case "Dây chuyền":
        document.querySelectorAll(this.tag2).forEach((e) => {
          if (!e.classList.contains("daych")) e.classList.add("hidden");
        });
        break;
      default:
        break;
    }
  }
}

/**
 * Class SearchProduct: Lọc sản phẩm dựa trên từ khóa tìm kiếm và danh mục từ URL.
 * Được gọi khi trang danh sách sản phẩm tải lên.
 */
class SearchProduct {
  constructor(tag, list) {
    this.tag = tag;
    this.list = list;
    this.applyFilter();
  }

  normalize(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");
  }

  applyFilter() {
    const params = new URLSearchParams(window.location.search);
    const rawKeyword = (params.get("q") || "").trim();
    const category = params.get("category");

    if (!rawKeyword && !category) return;

    const keyword = rawKeyword ? this.normalize(rawKeyword) : null;

    document.querySelectorAll(this.tag).forEach((item) => {
      let visible = true;
      if (category && !item.classList.contains(category)) visible = false;

      if (visible && keyword) {
        const link = item.querySelector("a");
        const id = link ? link.id : null;
        const product = this.list.find((p) => p.id === id);
        const searchableText = product
          ? this.normalize(product.name + " " + (product.gt || ""))
          : "";
        if (!searchableText.includes(keyword)) {
          visible = false;
        }
      }
      item.classList.toggle("hidden", !visible);
    });
  }
}

/**
 * Class localId: Gắn sự kiện click vào từng thẻ sản phẩm ở trang danh sách.
 * Bắt ID của sản phẩm, lưu vào localStorage và chuyển hướng URL.
 */
class localId {
  constructor(a) {
    this.a = a;
    document.querySelectorAll(a).forEach((e) => {
      e.addEventListener("click", (e1) => {
        e1.preventDefault();
        const temp = e1.target.closest("a");
        const id = temp.id;
        window.localStorage.setItem("itemID", id);
        window.location.href = `items-pages.html?id=${id}`;
      });
    });
  }
}

// ==========================================================================
// PHẦN 4: CÁC CLASS XỬ LÝ TRANG CHI TIẾT SẢN PHẨM
// ==========================================================================

/**
 * Class SwapPages: Đọc ID từ URL hoặc LocalStorage, tìm dữ liệu trong mảng 'list',
 * sau đó render (hiển thị) thông tin chi tiết (tên, giá, ảnh) lên trang.
 */
class SwapPages {
  constructor(list) {
    this.list = list;
    const id = this.getID();
    this.swapItems(id);
  }

  getID() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || window.localStorage.getItem("itemID");
  }

  swapItems(id) {
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

/**
 * Class inputQuality: Xử lý khối điều chỉnh số lượng (nút +, -, ô input).
 * Lắng nghe lựa chọn của người dùng (Size, Box) và tính toán lại giá tiền tạm tính.
 */
class inputQuality {
  constructor(input, inNumber, deNumBer, price) {
    this.input = input;
    this.inNumber = inNumber;
    this.deNumBer = deNumBer;
    this.price = price;
    this.unitPrice = Number(
      document.querySelector(price).textContent.replace(/[^0-9]/g, ""),
    );
    this.number = document.querySelector(input);
    this.boxS = null;
    this.size = null;

    document.querySelector(inNumber).addEventListener("click", () => {
      this.increass();
      this.updatePrice();
    });

    document.querySelector(deNumBer).addEventListener("click", () => {
      this.decreass();
      this.updatePrice();
    });

    this.number.addEventListener("input", () => {
      this.number.value = this.number.value.replace(/[^0-9]/g, "");
      this.updatePrice();
    });

    this.number.addEventListener("blur", () => {
      if (!this.number.value || Number(this.number.value) < 1) {
        this.number.value = 1;
        this.updatePrice();
      }
    });

    document.querySelectorAll(".box button").forEach((b) => {
      b.addEventListener("click", (e) => {
        this.boxS = e.target.textContent;
      });
    });
    document.querySelectorAll(".size button").forEach((b) => {
      b.addEventListener("click", (e) => {
        this.size = e.target.textContent;
      });
    });
  }

  increass() {
    this.number.value = Number(this.number.value) + 1;
  }

  decreass() {
    this.number.value = Number(this.number.value) - 1;
    if (this.number.value <= 0) {
      this.number.value = 1;
    }
  }

  getBoxSizing() {
    return this.boxS;
  }

  getSizing() {
    return this.size;
  }

  getValue() {
    return Number(this.number.value) || 1;
  }

  updatePrice() {
    const qty = Number(this.number.value);
    const p = document.querySelector(this.price);
    p.textContent = (this.unitPrice * qty).toLocaleString("vi-VN") + "đ";
  }
}

/**
 * Class activeButton: Quản lý hiệu ứng giao diện (đổi màu) cho các cụm nút chọn
 * (như chọn Size, chọn loại Hộp) đảm bảo tại một thời điểm chỉ có 1 nút được Active.
 */
class activeButton {
  constructor(tag) {
    this.tag = tag;
    document.querySelectorAll(tag).forEach((ls) => {
      ls.addEventListener("click", (evt) => {
        const temp = evt.target;
        const parent = temp.parentElement;
        const isActive = temp.classList.contains("active");
        for (let i = 0; i < parent.children.length; i++) {
          parent.children[i].classList.remove("active");
        }
        if (!isActive) {
          temp.classList.add("active");
        }
      });
    });
  }
}

// ==========================================================================
// PHẦN 5: CÁC CLASS XỬ LÝ LOGIC GIỎ HÀNG (LƯU & XÓA)
// ==========================================================================

/**
 * Class addToCart: Thu thập thông tin sản phẩm đang xem (ID, số lượng, size, hộp),
 * kiểm tra tính hợp lệ và thêm vào mảng giỏ hàng của đúng tài khoản đang thao tác.
 */
class addToCart {
  constructor(button, sl) {
    this.button = button;
    this.sl = sl;
    this.createItem();
  }

  createItem() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || window.localStorage.getItem("itemID");
    const cartKey = getCartKey();
    let cart = JSON.parse(window.localStorage.getItem(cartKey)) || [];
    const quantity = this.sl.getValue();
    const boxS = this.sl.getBoxSizing();
    const size = this.sl.getSizing();
    if (!boxS || !size) {
      alert("Vui lòng chọn size và loại túi trước khi thêm vào giỏ hàng!");
      return;
    } else {
      alert("Bạn đã thêm vào giỏ hàng thành công!");
    }
    const check = cart.find(
      (item) => item.id === id && item.size === size && item.box === boxS,
    );
    if (check) {
      check.quantity += quantity;
    } else {
      cart.push({
        id: id,
        quantity: quantity,
        box: boxS,
        size: size,
      });
    }
    window.localStorage.setItem(cartKey, JSON.stringify(cart));
    if (typeof updateCartBadge === "function") {
      updateCartBadge();
    }
  }
}

/**
 * Class loadCart: Chịu trách nhiệm render toàn bộ giao diện giỏ hàng.
 * Đọc dữ liệu, sinh ra các thẻ HTML tương ứng, tính tổng tiền và gắn sự kiện cho các nút Xóa, Tăng, Giảm.
 */
class loadCart {
  constructor(tag, list) {
    this.list = list;
    this.tag = tag;
    this.parent = document.querySelector(tag);
    const id = this.getID();
    this.load();
  }

  getID() {
    return window.localStorage.getItem("itemID");
  }

  load() {
    const cartKey = getCartKey();
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    let sum = 0;
    cart.forEach((item) => {
      const id = item.id;
      const quantity = item.quantity;
      const temp = this.list.find((t) => t.id == id);
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
      const sizeText = document.createElement("p");
      sizeText.classList.add("spSize");
      sizeText.textContent = item.size;
      div2.appendChild(sizeText);
      const boxText = document.createElement("p");
      boxText.classList.add("spBox");
      boxText.textContent = item.box;
      div2.appendChild(boxText);

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
        this.changeQuantity(id, item.size, item.box, -1);
      });

      const qtyValue = document.createElement("span");
      qtyValue.classList.add("qty-value");
      qtyValue.textContent = quantity;

      const btnPlus = document.createElement("button");
      btnPlus.type = "button";
      btnPlus.classList.add("qty-btn", "qty-plus");
      btnPlus.textContent = "+";
      btnPlus.addEventListener("click", () => {
        this.changeQuantity(id, item.size, item.box, 1);
      });

      p3.appendChild(btnMinus);
      p3.appendChild(qtyValue);
      p3.appendChild(btnPlus);
      div3.appendChild(p3);

      const p5 = document.createElement("p");
      p5.classList.add("delete");
      p5.textContent = "XOÁ";
      p5.addEventListener("click", () => {
        this.removeItem(id, item.size, item.box);
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
      const form = this.parent.querySelector(".form-details");
      this.parent.insertBefore(contain, form);
    });
  }

  removeItem(id, size, box) {
    const cartKey = getCartKey();
    let cart = JSON.parse(window.localStorage.getItem(cartKey)) || [];
    cart = cart.filter(
      (item) => !(item.id === id && item.size === size && item.box === box),
    );
    window.localStorage.setItem(cartKey, JSON.stringify(cart));
    if (typeof updateCartBadge === "function") {
      updateCartBadge();
    }
    location.reload();
  }
  changeQuantity(id, size, box, delta) {
    const cartKey = getCartKey();
    let cart = JSON.parse(window.localStorage.getItem(cartKey)) || [];

    const item = cart.find(
      (i) => i.id === id && i.size === size && i.box === box,
    );

    if (delta < 0 && item.quantity <= 1) {
      if (confirm("Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không?")) {
        this.removeItem(id, size, box);
      }
      return;
    }

    item.quantity += delta;
    window.localStorage.setItem(cartKey, JSON.stringify(cart));

    if (typeof updateCartBadge === "function") {
      updateCartBadge();
    }
    location.reload();
  }
}

// ==========================================================================
// PHẦN 6: KHỞI TẠO HỆ THỐNG KHI TẢI TRANG (MAIN ENTRY)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 6.1. KHỞI TẠO CHO TRANG DANH SÁCH SẢN PHẨM (main.html)
  if (document.querySelector(".items a")) {
    new localId(".items a");
    new SearchProduct(".items", list);
  }

  if (document.querySelector(".more-options")) {
    new DropList(".options__list", ".items");
  }

  // 6.2. KHỞI TẠO CHO TRANG CHI TIẾT SẢN PHẨM (items-pages.html)
  if (document.querySelector(".pages-container")) {
    new SwapPages(list);
  }

  if (document.querySelector(".h2-name")) {
    const but = document.querySelector(".input_number");
    but.value = 1;

    // Gắn sự kiện tăng giảm số lượng & lấy thông tin Size/Hộp
    const quality = new inputQuality(
      ".input_number",
      ".increase",
      ".decreass",
      ".price",
    );

    // Tạo hiệu ứng click cho các nút
    new activeButton(".box button");
    new activeButton(".size button");

    // Xử lý nút THÊM VÀO GIỎ HÀNG
    document.querySelector(".buy").addEventListener("click", () => {
      new addToCart(".buy", quality);
    });

    // Xử lý nút MUA NGAY (Thêm vào giỏ và chuyển trang)
    document.querySelector(".cart").addEventListener("click", (e) => {
      new addToCart(".cart", quality);
      if (quality.getSizing() !== null && quality.getBoxSizing() !== null) {
        window.location.href = "Cart.html";
      }
    });
  }

  // 6.3. KHỞI TẠO CHO TRANG GIỎ HÀNG (Cart.html)
  if (document.querySelector(".Cart-container")) {
    new loadCart(".Cart__article", list);

    document.querySelector(".buying__button").addEventListener("click", () => {
      const cartKey = getCartKey();
      const cart = JSON.parse(window.localStorage.getItem(cartKey)) || [];

      if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
      }

      const userHienTaiStr = window.localStorage.getItem("userHienTai");
      if (!userHienTaiStr) {
        alert("Vui lòng đăng nhập trước khi đặt hàng!");
        window.location.href = "../page/login.html";
        return;
      }

      alert("Bạn đã mua hàng thành công!");
      window.localStorage.removeItem(cartKey);

      if (typeof updateCartBadge === "function") {
        updateCartBadge();
      }

      // Về trang chủ
      window.location.href = "../../index.html";
    });
  }
});
