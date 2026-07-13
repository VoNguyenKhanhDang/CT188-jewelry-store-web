
class DropList{
  constructor(tag,tag2) {
    this.tag = tag;
    this.tag2 = tag2;
    //gắn sự kiện click vào thẻ cha chứa những thẻ li ( hiện tượng bubble)
    const parent = document.querySelector(tag);
    parent.addEventListener('click', (e) => {
       const li = e.target;
       this.swapText(li);
       this.sortItems(li);
    })
  }
  //đổi text của thẻ span
  swapText(li) {
    const b = li.parentElement.previousElementSibling;    //đi từ thẻ li lên thẻ cha -> thẻ anh em cùng cấp
    b.querySelector('span').textContent = li.textContent;
  };
  sortItems(li) {
    document.querySelectorAll(this.tag2).forEach(e => {
    e.classList.remove('hidden'); // bắt đầu với xoá các class hidden những thẻ div dã được gắn 
  });
    const b = li.parentElement.previousElementSibling;
    //dùng switch chia các trường hợp cho hàm sort
    switch (b.querySelector('span').textContent) {
      case "Nhẫn": {
       document.querySelectorAll(this.tag2).forEach((e) => {
          if(!e.classList.contains('nhan')) {
            e.classList.add('hidden');
          }
        })
        break;
      };
       case "Lắc tay/Chân": {
       document.querySelectorAll(this.tag2).forEach((e) => {
          if(!e.classList.contains('lac')) {
            e.classList.add('hidden');
          }
        })
           
        break;
      };
          case "Bông tay": {
       document.querySelectorAll(this.tag2).forEach((e) => {
          if(!e.classList.contains('bong')) {
            e.classList.add('hidden');
          }
        })
           
        break;
      };
             case "Dây chuyền": {
       document.querySelectorAll(this.tag2).forEach((e) => {
          if(!e.classList.contains('daych')) {
            e.classList.add('hidden');
            
          }
        })
           
        break;
      };
      default:
        break;
    }
  }
};

class inputQuality {
  constructor(input,inNumber,deNumBer,price) {
    this.input = input;
    this.inNumber = inNumber;
    this.deNumBer = deNumBer;
    this.price = price;
    this.temp = document.querySelector(price).textContent;
    this.number = document.querySelector(input);
    
    //đợi sự kiện click vào nút +
    document.querySelector(inNumber).addEventListener('click',() => {
        this.increass();
        this.priceTextInD();
    });
    //đợi sự kiện click vào nút -
    document.querySelector(deNumBer).addEventListener('click',() => {
        this.decreass();
        this.priceTextDeD();
    })
  };
  
  increass() {
      this.number.value = Number(this.number.value ) + 1;
  };
  decreass() {
      this.number.value = Number(this.number.value)  - 1;
      //điều kiện để số lượng vật phẩm không âm
      if(this.number.value <= 0) {
        this.number.value = 1;
      }
  };
  getValue() {
  return Number(this.number.value);
}
  priceTextInD() {
   const p =  document.querySelector(this.price);
   //mỗi lần click nút + thì trừ giá lên 1 lần
   p.textContent = String(Number(p.textContent) + Number(this.temp));
  };
  priceTextDeD() {
     const temp =  document.querySelector(this.price);
     const p =  document.querySelector(this.price);
     //mỗi lần click nút - thì trừ giá đi 1 lần
   p.textContent = String(Number(p.textContent) - Number(this.temp));
   if(Number(p.textContent) < 0) {
    p.textContent = '0';
   };
   if(this.number.value = 1) {
    p.textContent = this.temp;
   };

  }
}
//đưa id của thẻ a lên localStorage nếu a được click
class localId {
  constructor(a) {
    this.a = a;
     document.querySelectorAll(a).forEach((e) => {
       e.addEventListener('click',(e1) => {
        const temp = e1.target.closest('a'); //tránh target vào thẻ img
        const id = temp.id;
        window.localStorage.setItem('itemID',id);
       })
     })
}
};
class SwapPages {
  constructor(list) {
    this.list = list;
    const id = this.getID();
    this.swapItems(id);
  }
  getID() {
    return window.localStorage.getItem('itemID');
  }

  swapItems(id) {
    //tìm kiếm sản phẩm tương ứng theo id(được lưu trên localStorage) của list
  if (!id || !this.list[id]) return;
   document.querySelector('.h2-name').textContent = this.list[id].name;
   document.querySelector('.price').textContent = this.list[id].price;
   document.querySelector('.img-1').src = this.list[id].img1;
   document.querySelector('.img-2').src = this.list[id].img2;
   document.querySelector('.des-img.img1').src = this.list[id].img1;
   document.querySelector('.des-img.img2').src = this.list[id].img2;
   document.querySelector('.items-name').textContent = this.list[id].gt;
  }
}
class loadCart{
  constructor(tag,list){
    this.list= list;
    this.tag= tag;
    //chọn một móc là thẻ cha để bắt đầu sinh con từ đó
    this.parent = document.querySelector(tag);
    const id = this.getID();
    this.load();
  };

  getID() {
    return window.localStorage.getItem('itemID');
  }
  load() {
    //lấy dữ liệu của cart từ localStorae xuống và đưa từ String -> opject
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let sum  = 0;
    // lặp qua các phần tử của cart đảm bảo load đầy đủ các sản phẩm 
    cart.forEach((item) => {
      const id = item.id;
      const quantity = item.quantity;
     //bắt đầu sinh con
    const contain = document.createElement('div');
    contain.classList.add('Cart__details');
    const div1 = document.createElement('div');
    div1.classList.add('div__img');
    const div2 = document.createElement('div');
    div2.classList.add('Cart__details__text');
    const img = document.createElement('img');
    img.classList.add('Cart__details__img');
    img.src = this.list[id].img1;
    div1.appendChild(img);
    const h2 = document.createElement('H2');
    h2.textContent = this.list[id].name;
    div2.appendChild(h2);
    const p1 = document.createElement('p');
    p1.classList.add('price');
    p1.textContent = this.list[id].price + "đ";
    div2.appendChild(p1);
    const div3 = document.createElement('div');
    div3.classList.add('price-div');
    div2.appendChild(div3);
    const p3 = document.createElement('p');
    p3.classList.add('Quality__items');
    p3.textContent = "SL: " + quantity;
    div3.appendChild(p3);
    const p5 = document.createElement('p');
    p5.classList.add('delete');
    p5.textContent = "XOÁ";
    // chờ sự kiện click của nút xoá nếu xảy ra thì chạy hàm removeItem
    p5.addEventListener('click',() => { 
      this.removeItem(id);
    });
    div3.appendChild(p5);
    const p4 = document.createElement('p');
    p4.classList.add('sum__price');
    p4.textContent = "Tổng: " + (Number(this.list[id].price) * quantity);
    sum = sum + (Number(this.list[id].price) * quantity);
    document.querySelector(".sPrice .price").textContent = String(sum) + "đ";
    div3.appendChild(p4);
    contain.appendChild(div1);
    contain.appendChild(div2);
    //đưa nguyên khối contain vào thẻ cha 
  const form = this.parent.querySelector('.form-details');
  this.parent.insertBefore(contain, form); //đảm bảo thẻ con cuối cùng của parent luôn là form 
    });
  };
  removeItem(id) {
  let cart = JSON.parse(window.localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id); //chừa lại những phần tử có id khác phần tử được xoá
  window.localStorage.setItem('cart', JSON.stringify(cart)); // đảm bảo nén dạng opject thành string để lưu vài localStorage
}

}
//thêm vẫn phẩm vào biến cart được lưu trên localStorage 
class addToCart {
constructor(button,sl) {
  this.button = button;
  this.sl = sl;
  this.createItem();
};

createItem() {
const id = window.localStorage.getItem('itemID');
  let cart = JSON.parse(window.localStorage.getItem('cart')) || [];
  const quantity = this.sl.getValue();
  // kiểm tra vật phẩm đã tồn tại trong giỏ hay chưa?
  const check = cart.find(item => item.id === id);
  if (check) {
    check.quantity += quantity;
  } else {
    cart.push({
      id: id,
      quantity: quantity
    });
  }
  //lưu cart sau khi được cặp nhật thêm dữ liệu
  window.localStorage.setItem('cart', JSON.stringify(cart));
};
}



document.addEventListener('DOMContentLoaded', () => {
  //chạy khởi tạo khi ở trang tất cả sản phẩm
   if(document.querySelector('.items a')) {
     new localId('.items a');
   };
  //chạy khởi tạo khi ở trang chi tiết sản phẩm
  if(document.querySelector('.pages-container')) {
    new SwapPages(list);
  };
    //chạy khởi tạo khi 
  if(document.querySelector('.h2-name')) {
   const but = document.querySelector('.input_number');
   but.value = 1;
   const quality = new inputQuality('.input_number','.increase','.decreass','.price');
    document.querySelector('.buy').addEventListener('click', () => {
      new addToCart('.buy',quality);
     } )
  
    };

  if(document.querySelector('.more-options')) {
      new DropList('.options__list', '.items')
    };
   if(document.querySelector('.Cart-container')) {
    new loadCart('.Cart__article',list)
   }
})
