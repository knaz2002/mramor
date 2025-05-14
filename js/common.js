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
  loop: true,
  effect: "cube",
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      autoplay: true,
      speed: 800
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

const maxLeft = rangeSlider.offsetWidth - thumb.offsetWidth;
const newLeft = (100 / 500) * maxLeft;
thumb.style.left = `${newLeft}px`;
const fillWidth = (newLeft / maxLeft) * 100;
const gradient = `linear-gradient(to right, rgba(var(--primary), 1) ${fillWidth}%, rgba(var(--dark), 0.24) ${fillWidth}%)`;
document.querySelector('.range-slider__way').style.backgroundImage = gradient;
amount.value = 100;

//--- захват на десктопе
document.querySelector('.range-slider__way').addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.clientX;
  scrollLeft = thumb.offsetLeft;
});

//--- захват на мобильном
document.querySelector('.range-slider__way').addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].clientX;
  scrollLeft = thumb.offsetLeft;
});

document.addEventListener('touchend', () => {
  isDown = false;
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
  thumb.style.left = `${newLeft}px`;
  const fillWidth = (newLeft / maxLeft) * 100;
  const gradient = `linear-gradient(to right, rgba(var(--primary), 1) ${fillWidth}%, rgba(var(--dark), 0.24) ${fillWidth}%)`;
  document.querySelector('.range-slider__way').style.backgroundImage = gradient;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.clientX;
  const walk = x - startX;
  const maxLeft = rangeSlider.offsetWidth - thumb.offsetWidth;
  const newLeft = Math.min(Math.max(scrollLeft + walk, 0), maxLeft);
  thumb.style.left = `${newLeft}px`;
  amount.value = Math.round((newLeft / maxLeft) * 500);
  const fillWidth = (newLeft / maxLeft) * 100;
  const gradient = `linear-gradient(to right, rgba(var(--primary), 1) ${fillWidth}%, rgba(var(--dark), 0.24) ${fillWidth}%)`;
  document.querySelector('.range-slider__way').style.backgroundImage = gradient;
});

//--- обработчик для мобильных
document.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].clientX;
  const walk = x - startX;
  const maxLeft = rangeSlider.offsetWidth - thumb.offsetWidth;
  const newLeft = Math.min(Math.max(scrollLeft + walk, 0), maxLeft);
  thumb.style.left = `${newLeft}px`;
  amount.value = Math.round((newLeft / maxLeft) * 500);
  const fillWidth = (newLeft / maxLeft) * 100;
  const gradient = `linear-gradient(to right, rgba(var(--primary), 1) ${fillWidth}%, rgba(var(--dark), 0.24) ${fillWidth}%)`;
  document.querySelector('.range-slider__way').style.backgroundImage = gradient;
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



// const checkbox = document.querySelector('.form-checkbox__input');
// const submitButton = document.querySelector('.js-send');

// // добавляем атрибут disabled к кнопке отправки формы
// submitButton.disabled = true;

// checkbox.addEventListener('change', () => {
//   if (checkbox.checked) {
//     submitButton.disabled = false;
//   } else {
//     submitButton.disabled = true;
//   }
// });

/****modal */
const btnCalls = document.querySelectorAll('.js-btn-call');
const btnCallModal = document.querySelector('.js-modal-call');
const modal = document.querySelectorAll('.modal')
const modalClose = document.querySelectorAll('.modal__close');
const modalOverlay = document.querySelectorAll('.modal__overlay')
const modalSuccess = document.querySelector('.modal-success')
const btnModalSuccess = document.querySelector('.modal-success__btn')
const bodyLockModal = document.querySelector("body");
const formCallback = document.querySelectorAll('.form-callback')


// const chekedModal = document.querySelectorAll('.js-send')
// const checkbox = document.querySelectorAll('.form-checkbox__input');

//----открытие мадалки обратной связи
btnCalls.forEach(btnCall => {
  btnCall.addEventListener('click', () => {
    btnCall.classList.toggle("active");
    btnCallModal.classList.toggle("active");
    console.log(bodyLockModal)
  })
})
//----закрытие мадалок по overlay
modalOverlay.forEach(overlay => {
  overlay.addEventListener('click', () => {
    modal.forEach(modal => {
      modal.classList.remove("active");
    })
  })
})
//----закрытие мадалок по modal__close
modalClose.forEach(close => {
  close.addEventListener('click', () => {
    modal.forEach(modal => {
      modal.classList.remove("active");
    })
  })
})
btnModalSuccess.addEventListener('click', () => {
  modalSuccess.classList.remove("active");
  btnCallModal.classList.remove("active");
})

//----валидация checkbox
formCallback.forEach((form) => {

  const modalCheckbox = form.querySelector('.form-checkbox__input');
  const modalSend = form.querySelector('.js-send');

  modalSend.disabled = true;

  modalCheckbox.addEventListener('change', () => {
    if (modalCheckbox.checked) {
      modalSend.disabled = false;
    } else {
      modalSend.disabled = true;
    }
  });
});

// const formName = document.querySelector('.js-name-input');


// btnModalSuccess.addEventListener('click', () => {
//   btnCallOverlay.classList.toggle("active");
//   modalSuccess.classList.toggle("active");
// })


//---Форма обратной связи
const formsFeedback = document.querySelectorAll(".js-callback-form");

formsFeedback.forEach(form => {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    sendForm(this);
  })
})

function sendForm(form) {
  console.log('тест формы', 3)
  const formData = new FormData(form);

  formData.append("name", form.querySelector('input[type="text"]').value);
  formData.append("phone", form.querySelector('input[type="tel"]').value);
  // formData.append("message", form.querySelector("textarea").value);

  fetch("../mailer.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // modalTitle.innerHTML = 'Спасибо!';
        // modalInfo.innerHTML = 'Мы получили Ваши данные и свяжемся с Вами в ближайшее время.';
        modalSuccess.classList.add("active");
        bodyLock.classList.add("lock");
        btnCallModal.classList.remove("active");
        form.reset();
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log(error
        // "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.2"
      );
    });
}

const form = document.querySelector('.js-quiz-form');
// const rangeSlider = document.querySelector('.range-slider');
const checkboxes = document.querySelectorAll('.form-checkbox__input');
const telInput = document.querySelector('.phone-input');
const textInput = document.querySelector('.js-name-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const rangeValue = rangeSlider.querySelector('#amount').value;
  const checkboxValues = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkboxValues.push(checkbox.name);
    }
  });
  const telValue = telInput.value;
  const textValue = textInput.value;

  const formData = {
    rangeValue,
    checkboxValues,
    telValue,
    textValue,
  };

  fetch('/отправить-форму', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});

// const quizData = {
//   area: 0, //--площадь объекта
//   thickness: 50, //---толщина стен
//   // consultation: false, //---консультация
//   picture: '', //---изображение
// }

// quizData.ploshad = 120
// console.log(quizData)
