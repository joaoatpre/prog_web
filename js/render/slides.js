const Slides = [
  {
    url: "https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/5077/1722426218.png&w=1920&h=400&q=100",
  },
  {
    url: "https://http2.mlstatic.com/D_NQ_694339-MLA76911199950_062024-OO.webp",
  },
  {
    url: "https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/5063/1722080888.png&w=1920&h=400&q=100",
  },
];

let slideWidth = 0;
let currentIndex = 0;

export async function addHeroSlides() {
  return new Promise((resolve, reject) => {
    const slidesContent = document.querySelector(".slider-content");
    if (!slidesContent) {
      reject("Slides content not found");
      return;
    }

    let imagesLoaded = 0;

    Slides.forEach((hero, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = hero.url;
      imgElement.alt = `Imagem do slider ${index + 1}`;

      imgElement.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === Slides.length) {
          resolve();
        }
      };

      imgElement.onerror = () => {
        reject("Failed to load images");
      };

      slidesContent.appendChild(imgElement);
    });

    window.addEventListener("resize", () => {
      slideWidth = slidesContent.offsetWidth;
      slideTo(currentIndex);
    });

    slideWidth = slidesContent.offsetWidth;
  });
}

export function slideTo(index) {
  const sliderContent = document.querySelector(".slider-content");

  if (!sliderContent) {
    console.error("Slider content not found");
    return;
  }

  slideWidth = sliderContent.offsetWidth;

  currentIndex = index;
  sliderContent.style.transition = "transform 0.5s ease";
  sliderContent.style.transform = `translateX(-${index * slideWidth}px)`;
}

export function getCurrentIndex() {
  return currentIndex;
}
