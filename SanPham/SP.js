const list = {
  "1": {
    id: "1",
    name: "Bông Tai Bạc Nữ S925 JENSY Trái Tim Đá Hồng \"Roselle\" BTARM03639 . Khuyên Tai Bạc Nữ Dễ Thương",
    img1: "./imgs/bo6ngtai...png",
    img2: "./imgs/bongtai1.png",
    price: "636000",
    gt: "Bông Tai Bạc Nữ S925 JENSY Trái Tim Đá Hồng \"Roselle\""
  },
  "2": {
    id: "2",
    name: "Bông Tai Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA \"Juliette\" BTYA1. Khuyên Tai Bạc Nữ Sang Trọng",
    img1: "./imgs/bông tai.png",
    img2: "./imgs/bongtai2.png",
    price: "367000",
    gt: "Bông Tai Kim Cương Moissanite Juliette"
  },
  "3": {
    id: "3",
    name: "Bông Tai Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA \"Radiant Halo\" BTRU2. Khuyên Tai Bạc Nữ Sang Trọng",
    img1: "./imgs/bôngtai.png",
    img2: "./imgs/bongtai3.png",
    price: "911000",
    gt: "Bông Tai Kim Cương Moissanite Radiant Halo"
  },
  "4": {
    id: "4",
    name: "Dây Chuyền Kim Cương Moissanite 7 Ly JENSY Xi Bạch Kim, Kiểm Định GRA \"Celestial Spark\" VCJ6, Vòng Cổ Bạc Nữ",
    img1: "./imgs/daychuyen.jpg",
    img2: "./imgs/daychuyen1.png",
    price: "863000",
    gt: "Dây chuyền Celestial Spark"
  },
  "5": {
    id: "5",
    name: "Dây Chuyền Kim Cương Moissanite 5 Ly JENSY Xi Bạch Kim, Kiểm Định GRA \"Enamor\" VCJ8, Vòng Cổ Bạc Nữ",
    img1: "./imgs/dây chuyen...png",
    img2: "./imgs/daychuyen2.png",
    price: "367000",
    gt: "Bông Tai Kim Cương Moissanite Juliette"
  },
  "6": {
    id: "6",
    name: "Dây Chuyền Bạc S925 JENSY Mặt Đá Vuông Sang Chảnh \"Lucent\" VCVAVN1. Vòng Cổ Bạc Nữ",
    img1: "./imgs/dây chuyền.png",
    img2: "./imgs/daychuyen3.png",
    price: "677000",
    gt: "Bông Tai Bạc Nữ S925 JENSY Trái Tim Đá Hồng \"Roselle\""
  },
  "7": {
    id: "7",
    name: "Lắc Tay Bạc Nữ S925 JENSY Cỏ 4 Lá Mix Đá Hot Trend \"Celeste Peta\" LTTL12. Vòng Tay Bạc Nữ Xinh Xắn",
    img1: "./imgs/lactay.png",
    img2: "./imgs/lacchan1.png",
    price: "778000",
    gt: "Lắc Tay Bạc Celeste Peta"
  },
  "8": {
    id: "8",
    name: "Lắc Tay Bạc Gắn Kim Cương Moissanite 7 Ly Xi Bạch Kim, Kiểm Định GRA. \"Halo Light\" LTIN1. Vòng Tay Bạc Nữ Sang Trọng",
    img1: "./imgs/lắc tay.png",
    img2: "./imgs/lactai1.png",
    price: "776000",
    gt: "Lắc Tay Bạc Gắn Kim Cương Moissanite Halo Light"
  },
  "9": {
    id: "9",
    name: "Lắc Tay Bạc Nữ S925 JENSY Hình Nơ Đơn Giản \"Meliora\" LTARS6944. Vòng Tay Bạc Nữ Xinh Xắn",
    img1: "./imgs/lắcchan.png",
    img2: "./imgs/lactai2.png",
    price: "1945000",
    gt: "Lắc Tay Meliora"
  },
  "10": {
    id: "10",
    name: "Nhẫn Đôi Bạc JENSY Gắn Kim Cương Moissanite Xi Bạch Kim Kiểm Định GRA \"Velaris\" NDIN2, Nhẫn Cặp Đôi Bạc Đính Kim Cương Sang Trọng Ý Nghĩa",
    img1: "./imgs/nhẫn đôi.png",
    img2: "./imgs/nhan1.png",
    price: "3636000",
    gt: "NHẪN ĐÔI KIM CƯƠNG MOISSANITE Velaris"
  },
  "11": {
    id: "11",
    name: "Nhẫn Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA \"Forever Yours\" NLRU1. Nhẫn Nữ Cao Cấp",
    img1: "./imgs/nhẫn....png",
    img2: "./imgs/nhan2.png",
    price: "565000",
    gt: "Nhẫn Bạc Gắn Kim Cương Moissanite Forever Yours"
  },
  "12": {
    id: "12",
    name: "Nhẫn Bạc Gắn Kim Cương Moissanite Xi Bạch Kim, Kiểm Định GRA \"Balmy\" NLJC5. Nhẫn Bạc Nữ Đính Kim Cương Sang Trọng.",
    img1: "./imgs/nhẫn.png",
    img2: "./imgs/nhan3.png",
    price: "819450",
    gt: "NHẪN BẠC NỮ BALMY RING"
  }
};


class loadItems {
  constructor(tag, list) {
    this.tag = tag;
    this.list = list;
    this.parent = document.querySelector(tag);
    this.load();
  }
  load() {
    // đảm bảo section trống 
    this.parent.innerHTML = "";
 
    Object.values(this.list).forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("items", item.type);
 
      const a = document.createElement("a");
      a.id = item.id;
      a.href = "./items-pages.html";
      a.addEventListener("click", () => {
        window.localStorage.setItem("itemID", item.id);
      });
 
      // div.swap-img
      const swapImg = document.createElement("div");
      swapImg.classList.add("swap-img");
 
      const img1 = document.createElement("img");
      img1.classList.add("img-1");
      img1.src = item.img1;
      img1.alt = item.gt;
 
      const img2 = document.createElement("img");
      img2.classList.add("img-2");
      img2.src = item.img2;
 
      swapImg.appendChild(img1);
      swapImg.appendChild(img2);
      a.appendChild(swapImg);
      container.appendChild(a);
 
      const pName = document.createElement("p");
      pName.textContent = item.gt;
      container.appendChild(pName);
 
      // p giá
      const pPrice = document.createElement("p");
      pPrice.textContent = Number(item.price).toLocaleString("vi-VN") + "đ";
      container.appendChild(pPrice);
 
      this.parent.appendChild(container);
    });
  }
}
 
if (document.querySelector(".main__section")) {
  new loadItems(".main__section", list);
}