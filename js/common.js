"use strict";

//***** switch slider */
const slider = document.getElementById("switch-slider");
const before = document.getElementById("switch-slider-before");
const beforeImage = before.getElementsByTagName("img")[0];
const resizer = document.getElementById("resizer");

let active = false;

//Sort overflow out for Overlay Image
document.addEventListener("DOMContentLoaded", function () {
  let width = slider.offsetWidth;
  // console.log(width);
  beforeImage.style.width = width + "px";
});

//Adjust width of image on resize
window.addEventListener("resize", function () {
  let width = slider.offsetWidth;
  // console.log(width);
  beforeImage.style.width = width + "px";
});

resizer.addEventListener("mousedown", function () {
  active = true;
  resizer.classList.add("resize");
});

document.body.addEventListener("mouseup", function () {
  active = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("mouseleave", function () {
  active = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("mousemove", function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

resizer.addEventListener("touchstart", function () {
  active = true;
  resizer.classList.add("resize");
});

document.body.addEventListener("touchend", function () {
  active = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("touchcancel", function () {
  active = false;
  resizer.classList.remove("resize");
});

//calculation for dragging on touch devices
document.body.addEventListener("touchmove", function (e) {
  if (!active) return;
  let x;

  let i;
  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

function slideIt(x) {
  let transform = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.width = transform + "px";
  resizer.style.left = transform - 0 + "px";
}

//stop divs being selected.
function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

//**** banner slider */
new Swiper(".banner-slider", {
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//*** gallery slider */
new Swiper(".gallery-slider", {
  loop: false,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },

});

//**** thermal-card-slider slider */
// new Swiper(".thermal-card-slider", {
//   pagination: {
//     el: ".swiper-pagination",
//   },
//   slidesPerView: 1,
//   loop: true,

// });

let cardSlider = new Swiper(".thermal-card-slider", {
  pagination: {
    el: ".swiper-pagination",
  },
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 800,
  },
  on: {
    init() {
      this.el.addEventListener("mouseenter", () => {
        this.autoplay.start();
      });
      this.el.addEventListener("mouseleave", () => {
        this.autoplay.stop();
      });
    },
  },
});
cardSlider.forEach(slider => {
  slider.autoplay.stop();
});




// cardSlider.autoplay.stop();
// console.log(cardSlider)

// const buttonSelect = document.querySelector(".js-menu");
// const menuSelect = document.querySelector(".js-menu-drop");
// const bodyLock = document.querySelector("body");

// //---toggle burger
// buttonSelect.addEventListener("click", function () {
//   buttonSelect.classList.toggle("active");
//   menuSelect.classList.toggle("active");
//   bodyLock.classList.toggle("lock");
// });

// //---click outside
// document.addEventListener("click", function (event) {
//   const clickInside = event.composedPath().includes(buttonSelect);
//   if (!clickInside && !buttonSelect.contains(event.target)) {
//     buttonSelect.classList.remove("active");
//     menuSelect.classList.remove("active");
//     bodyLock.classList.remove("lock");
//   }
// });

//---accordions
// const accordion = document.querySelectorAll(".accordion-modern");
// const accordion2 = document.querySelectorAll(".accordion-work");
// const accordion3 = document.querySelectorAll(".accordion-faq");

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".phone-input"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

document.addEventListener("scroll", handleScroll);
// get a reference to our predefined button
let scrollToTopBtn = document.querySelector(".scrollToTopBtn");

function handleScroll() {
  let scrollableHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let srollRatio = 0.2;

  if (document.documentElement.scrollTop / scrollableHeight > srollRatio) {
    //show button
    scrollToTopBtn.style.display = "flex";
  } else {
    //hide button
    scrollToTopBtn.style.display = "none";
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
