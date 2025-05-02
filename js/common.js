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
  loop: true,
  spaceBetween: 20,
  // mousewheel: {
  //   enabled: true,
  //   sensitivity: 4,
  // },
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
  autoplay: {
    delay: 3000,
    speed: 1000,
  },
  // effect: 'cards',
  // coverflowEffect: {
  //   rotate: 50,
  //   stretch: 0,
  //   depth: 100,
  //   modifier: 1,
  //   slideShadows: true,
  // },
});



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


/****burger */
const burger = document.querySelector(".js-burger");
const menu = document.querySelector(".header-mobile");
const bodyLock = document.querySelector("body");

burger.addEventListener("click", () => {
  console.log('click')
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  bodyLock.classList.toggle("lock");
})
//---click outside
document.addEventListener("click", function (event) {
  const clickInside = event.composedPath().includes(burger);
  if (!clickInside && !burger.contains(event.target)) {
    burger.classList.remove("active");
    menu.classList.remove("active");
    bodyLock.classList.remove("lock");
  }
});


/****quiz */
const quizQuestions = document.querySelectorAll('.quiz-step');
const nextButtons = document.querySelectorAll('.quiz-step__next');
const backButtons = document.querySelectorAll('.quiz-step__back');

let currentQuestion = 0;

nextButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentQuestion < quizQuestions.length - 1) {
      currentQuestion++;
    }
    showQuestion(currentQuestion);
  });
});

backButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentQuestion > 0) {
      currentQuestion--;
    }
    showQuestion(currentQuestion);
  });
});

function showQuestion(questionIndex) {
  quizQuestions.forEach((question, index) => {
    if (index === questionIndex) {
      question.style.display = 'block';
    } else {
      question.style.display = 'none';
    }
  });
}

showQuestion(0);


/****rangeSlider */

const rangeSlider = document.querySelector('.range-slider');
const thumb = document.querySelector('.range-slider__thumb');
const amount = document.querySelector('#amount');

let isDown = false;
let startX;
let scrollLeft;

document.querySelector('.range-slider__way').addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.clientX;
  scrollLeft = thumb.offsetLeft;
});

document.addEventListener('mouseup', () => {
  isDown = false;
});

document.addEventListener('input', (e) => {
  if (e.target === amount) {
    amount.value = amount.value.replace(/[^0-9]/g, '');
  }
});


amount.addEventListener('input', (e) => {
  const value = parseInt(amount.value);
  if (value > 500) {
    amount.value = 500;
  }
  const maxLeft = rangeSlider.offsetWidth - thumb.offsetWidth;
  const newLeft = (value / 500) * maxLeft;
  thumb.style.left = `${newLeft}px`;;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.clientX;
  const walk = x - startX;
  const maxLeft = rangeSlider.offsetWidth - thumb.offsetWidth;
  const newLeft = Math.min(Math.max(scrollLeft + walk, 0), maxLeft);
  thumb.style.left = `${newLeft}px`;
  amount.value = `${Math.round((newLeft / maxLeft) * 500)}м²`;
  const fillWidth = (newLeft / maxLeft) * 100;
  document.querySelector('.range-slider__way::before').style.width = `${fillWidth}%`;
  const color = `hsl(${fillWidth}, 100%, 50%)`;
  document.querySelector('.range-slider__way').style.background = color;
});


/****accordions */
const accordions = document.querySelectorAll(".accordion__item");
accordions.forEach((accordion) => {
  const accordionHead = accordion.querySelector(".accordion__name");
  const accordionBody = accordion.querySelector(".accordion__content");
  accordionHead.addEventListener("click", () => {
    // accordions.forEach((otherAccordion) => {
    //   if (otherAccordion !== accordion) {
    //     otherAccordion.querySelector(".accordion__content").classList.remove("active");
    //   }
    // });
    accordionHead.classList.toggle("active");
    accordionBody.classList.toggle("active");
  });
});

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


//---Форма обратной связи
// document.querySelector(".js-callback-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const form = this.closest("form");
//   const formData = new FormData(form);

//   // Get form values
//   formData.append("name", form.querySelector('input[type="text"]').value);
//   formData.append("phone", form.querySelector('input[type="tel"]').value);
//   // formData.append("message", form.querySelector("textarea").value);

//   fetch("../mailer.php", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         modalTitle.innerHTML = 'Данные отправлены!';
//         modalInfo.innerHTML = 'Мы свяжемся с Вами в ближайшее время.';
//         modalForm.classList.add("modal-open");
//         bodyLock.classList.add("lock");
//         form.reset();
//       } else {
//         console.log(data.message);
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       console.log(
//         "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.2"
//       );
//     });
// });

document.querySelector(".js-callback-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this.closest("form");
  const nameInput = form.querySelector('.js-name-input');
  const phoneInput = form.querySelector('.js-phone-input');

  if (!nameInput.value || !phoneInput.value) {
    // Display an error message to the user
    modalTitle.innerHTML = 'Ошибка!';
    modalInfo.innerHTML = 'Пожалуйста, заполните все поля.';
    modalForm.classList.add("modal-open");
    bodyLock.classList.add("lock");
    return;
  }

  const formData = new FormData(form);
  formData.append("name", nameInput.value);
  formData.append("phone", phoneInput.value);

  fetch("../mailer.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        modalTitle.innerHTML = 'Данные отправлены!';
        modalInfo.innerHTML = 'Мы свяжемся с Вами в ближайшее время.';
        modalForm.classList.add("modal-open");
        bodyLock.classList.add("lock");
        form.reset();
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      modalTitle.innerHTML = 'Ошибка!';
      modalInfo.innerHTML = 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.';
    });
});