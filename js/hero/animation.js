import { slideTo, getCurrentIndex } from "../render/slides.js";
import { updateDots } from "./dots.js";

export function heroAnimation() {
  const prevBtn = document.querySelector(".hero-btn-prev");
  const nextBtn = document.querySelector(".hero-btn-next");
  const slides = document.querySelectorAll(".slider-content img");

  if (!slides || slides.length === 0) {
    console.error("Slider content or slides not found");
    return;
  }
  let intervalID;

  function startSlider() {
    intervalID = setInterval(() => {
      let currentIndex = getCurrentIndex();
      if (currentIndex < slides.length - 1) {
        slideTo(currentIndex + 1);
        updateDots();
      } else {
        slideTo(0);
        updateDots();
      }
    }, 3000);
  }

  function stopSlider() {
    clearInterval(intervalID);
  }

  nextBtn.addEventListener("click", () => {
    stopSlider();
    let currentIndex = getCurrentIndex();
    if (currentIndex < slides.length - 1) {
      slideTo(currentIndex + 1);
      updateDots();
    } else {
      slideTo(0);
      updateDots();
    }
    startSlider();
  });

  prevBtn.addEventListener("click", () => {
    stopSlider();
    let currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
      updateDots();
    } else {
      slideTo(slides.length - 1);
      updateDots();
    }
    startSlider();
  });

  startSlider();
}
