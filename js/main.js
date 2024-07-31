import { checkConnection } from "./server/connection.js";
import { addHeroSlides } from "./render/slides.js";
import { createDots } from "./hero/dots.js";
import { heroAnimation } from "./hero/animation.js";
import { checkCartButton } from "./cart/button.js";
import { renderCategories } from "./render/categories.js";
import { renderProducts } from "./render/products.js";

window.onload = async () => {
  try {
    await checkConnection();
    await addHeroSlides();
    createDots();
    heroAnimation();
    checkCartButton();
    await renderCategories();
    await renderProducts();
  } catch (error) {
    console.error("Error initializing the page:", error);
  }
};
