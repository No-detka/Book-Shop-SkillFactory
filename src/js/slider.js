import bannerImg1 from '../assets/slider/banner-1.png';
import bannerImg2 from '../assets/slider/banner-2.png';
import bannerImg3 from '../assets/slider/banner-3.png';


let images = [{
  url: bannerImg1
}, {
  url: bannerImg2
}, {
  url: bannerImg3
}];

function initSlid(options) {
  if (!images || !images.length) return;

  options = options || {
    titles: true,
    dots: true,
    autoplay: false
  };

  let slidImages = document.querySelector('.slider__images');
  let slidDots = document.querySelector('.slider__dots');

  initImages();

  if (options.dots) {
    initDots();
  }

  if (options.titles) {
    initTitles();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : "" }" style="background-image:url(${images[index].url})" data-index="${index}"></div>`;

      slidImages.innerHTML += imageDiv;
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dotItem = `<div class="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;

      slidDots.innerHTML += dotItem;
    });

    slidDots.querySelectorAll('.slider__dots-item').forEach(dot => {
        dot.addEventListener('click', event => {
          let currentDot = event.target.dataset.index;

          moveSlider(currentDot);
        });
    });
  }

  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;

    slidImages.innerHTML += titleDiv;
  }

  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = slidImages.querySelector('.slider__images-title');

    sliderTitle.innerText = images[num].title;
  }

  function initAutoplay() {
    setInterval(() => {
      let currentNum = +slidImages.querySelector('.active').dataset.index;
      let nextNum = currentNum === images.length - 1 ? 0 : currentNum + 1;

      moveSlider(nextNum);
    }, options.autoplayInterval);
  }

  function moveSlider(num) {
    slidImages.querySelector('.active').classList.remove('active');
    slidImages.querySelector('.n' + num).classList.add('active');

    if (options.dots) {
      slidDots.querySelector('.active').classList.remove('active');
      slidDots.querySelector('.n' + num).classList.add('active');
    }

    if (options.titles) changeTitle(num);
  }
}

let sliderOption = {
  titles: false,
  dots: true,
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener('DOMContentLoaded', function() {
  initSlid(sliderOption);
});
