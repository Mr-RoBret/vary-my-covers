const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const carouselNav = document.querySelector('.carousel__nav');
const dots = Array.from(carouselNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next to each other from left to right
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

// when I click left, move slides to the left

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    console.log(currentSlide);
    const nextSlide = currentSlide.nextElementSibling;
    const amtToMove = nextSlide.style.left;
})
// when I click right, move slides to the right
// when I click the nav indicators, move to that slide