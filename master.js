// Initialize Locomotive Scroll
var scroll;

document.addEventListener("DOMContentLoaded", function () {
  scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });

  scroll.on("scroll", (instance) => {
    const navbar = document.querySelector(".navbar-content");
    if (instance.scroll.y > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const navButton = document.querySelector(".navbar-burger");
  const navigationList = document.querySelector(".navbar_nav");

  // Add the "open" class to the navbar when the burger is clicked
  navButton.addEventListener("click", () => {
    navButton.classList.toggle("open"); // Add or remove the "open" class
    navigationList.classList.toggle("open");
  });
});

// Scroll to #home when logo is clicked
document.querySelector(".logo").addEventListener("click", function (e) {
  e.preventDefault();
  scroll.scrollTo("#home");
});

// Scroll to section when navbar link is clicked
var links = document.querySelectorAll(".navbar-link");
links.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute("href"));
    var navbarHeight = document.querySelector(".navbar").offsetHeight;
    scroll.scrollTo(target.offsetTop - navbarHeight);
  });
});

let initialPos = 0;
let currentIndex = 0;
const images = document.querySelectorAll(".product-image .img-wrap");
const productImage = document.querySelector(".product-image");

productImage.addEventListener("touchstart", (e) => {
  initialPos = e.touches[0].clientX;
});

productImage.addEventListener("touchend", (e) => {
  let finalPos = e.changedTouches[0].clientX;
  let diff = initialPos - finalPos;

  // If the swipe distance is greater than a threshold (100 in this case)
  if (Math.abs(diff) > 100) {
    // Update the current index
    if (diff > 0) {
      currentIndex++;
    } else {
      currentIndex--;
    }

    // If we're at the end, wrap around to the first image
    if (currentIndex === images.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }

    // Scroll to the next image
    productImage.scrollLeft = images[currentIndex].offsetLeft;
  }
});

// Select the .product-image-container element
const productImageContainer = document.querySelector(
  ".product-image-container"
);

// Select all .img-wrap elements
const imagesWrap = document.querySelectorAll(".img-wrap");

// Define the callback
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    // If the element is in the viewport
    if (entry.isIntersecting) {
      // Add the .animate class to each .img-wrap element to start the animation
      imagesWrap.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.5}s`; // Delay each animation by 0.5 seconds
        img.style.animationPlayState = "running"; // Start the animation
      });
    }
  });
};

// Create the observer
const observer = new IntersectionObserver(callback);

// Start observing the .product-image-container element
observer.observe(productImageContainer);

/////////////////////////PAGINATION FOR NEWS

const articles = document.querySelectorAll(".news-article");

// Show the first 3 articles
for (let i = 0; i < 3; i++) {
  if (articles[i]) {
    articles[i].classList.add("active");
  }
}

document
  .querySelector(".swiper-nav-button.right")
  .addEventListener("click", () => {
    // Hide all articles
    articles.forEach((article) => article.classList.remove("active"));

    // Update the current index
    currentIndex += 3;

    // If currentIndex is more than the number of articles, set it to the last possible index
    if (currentIndex >= articles.length) {
      currentIndex = articles.length - 3;
    }

    // Show the next 3 articles
    for (let i = currentIndex; i < currentIndex + 3; i++) {
      if (articles[i]) {
        articles[i].classList.add("active");
      }
    }
  });

document
  .querySelector(".swiper-nav-button.left")
  .addEventListener("click", () => {
    // Hide all articles
    articles.forEach((article) => article.classList.remove("active"));

    // Update the current index
    currentIndex -= 3;

    // If currentIndex is less than 0, set it to 0
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    // Show the previous 3 articles
    for (let i = currentIndex; i < currentIndex + 3; i++) {
      if (articles[i]) {
        articles[i].classList.add("active");
      }
    }
  });
