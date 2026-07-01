class dropList {
    constructor(selector) {
        document.querySelectorAll(selector).forEach((li) => {
            li.addEventListener("click",() => {
                this.selecItems(li);
            })
        })
    };
   selecItems(li) {
    const temp = li.parentElement;
    const temp2 = temp.previousElementSibling;
    const content = temp2.querySelector("span");
     content.textContent = li.textContent;
   };
};


class itemDetails {
    constructor(items) {
        this.items = items;
    };
    getID() {
        const temp = new URLSearchParams(window.location.search);
        return temp.get("id");
    };
    swapItem() {
        const id = this.getID();
        const sp = this.items[id];
      
           document.querySelector(".h2-name").textContent = sp.name;
           document.querySelector(".img-1").src = sp.img1;
           document.querySelector(".img-2").src = sp.img2;
           document.querySelector(".des-img.img1").src = sp.img1;
           document.querySelector(".des-img.img2").src = sp.img2;
           document.querySelector(".price").textContent = sp.price;
           document.querySelector(".items-name").textContent = sp.gt;

    };
}



class inputAddQuantity{
  constructor(input, increaseButton, decreaseButton) {
    this.input = document.querySelector(input);
    this.input.value = 0;

    document.querySelector(increaseButton)
      .addEventListener("click", () => this.increase());
    document.querySelector(decreaseButton)
      .addEventListener("click", () => this.decrease());
  };

  increase() {
    this.input.value = Number(this.input.value) + 1;
  };
  decrease() {
    const check = Number(this.input.value) - 1;
    if(check < 0) {
        
        this.input.value = 0;
    }else {
        this.input.value = check;
    }
  };

};

    
document.addEventListener("DOMContentLoaded", () => {
    new dropList(".options__list li, .sort__list li");

  if (document.querySelector(".h2-name")) {
    new itemDetails(list).swapItem();
  };

  if (document.querySelector(".input_number")) {
    new inputAddQuantity(".input_number", ".increase", ".decreass");
  }

})
