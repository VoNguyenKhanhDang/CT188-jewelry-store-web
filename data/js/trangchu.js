const carousel = document.getElementById("categoryCarousel");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

// Sự kiện khi nhấn mũi tên Phải
btnRight.addEventListener("click", () => {
  // Tính chiều rộng của 1 card + khoảng cách (gap)
  const cardWidth = carousel.firstElementChild.clientWidth + 30;

  // Kiểm tra xem đã cuộn đến kịch trần bên phải chưa
  // (scrollLeft + clientWidth >= scrollWidth)
  if (
    Math.ceil(carousel.scrollLeft + carousel.clientWidth) >=
    carousel.scrollWidth
  ) {
    // Nếu đã đến cuối -> Trượt mượt mà quay về vị trí đầu tiên
    carousel.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    // Nếu chưa đến cuối -> Cuộn sang phải 1 thẻ
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
  }
});

// Sự kiện khi nhấn mũi tên Trái
btnLeft.addEventListener("click", () => {
  const cardWidth = carousel.firstElementChild.clientWidth + 30;

  // Kiểm tra xem có đang ở vị trí đầu tiên không
  if (carousel.scrollLeft === 0) {
    // Nếu đang ở đầu -> Trượt kịch trần xuống vị trí cuối cùng
    carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
  } else {
    // Nếu chưa -> Cuộn sang trái 1 thẻ
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
  }
});
