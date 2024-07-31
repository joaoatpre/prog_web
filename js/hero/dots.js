import { slideTo, getCurrentIndex } from "../render/slides.js";

let dots = [];

export function createDots() {
  const sliderContainer = document.querySelector(".slider-dots");
  const slides = document.querySelectorAll(".slider-content img");

  slides.forEach((slide, index) => {
    let dot = document.createElement("span");
    dot.classList.add("slider-dot");
    dot.addEventListener("click", () => {
      slideTo(index);
      updateDots();
    });
    dots.push(dot);
    sliderContainer.appendChild(dot);
  });

  updateDots();
}

export function updateDots() {
  let currentIndex = getCurrentIndex();
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}
