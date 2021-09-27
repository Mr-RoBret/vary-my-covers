const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const carouselNav = document.querySelector('.carousel__nav');
//console.log(carouselNav.classList);
const dots = Array.from(carouselNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);
// arrange slides next to each other from left to right
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

// change color of dot that has been clicked
const moveToDot = (slides, currentDot, targetDot) => {
    console.log(currentDot);
    currentDot.classList.remove('current-indicator');
    targetDot.classList.add('current-indicator');
    //slides[targetSlide].classList.add('current__indicator');

}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    console.log(currentSlide);
    const prevSlide = currentSlide.previousElementSibling;
    // move to previous slide
    moveToSlide(track, currentSlide, prevSlide);
    //moveToDot()
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);
})

// when I click the nav indicators, move to that slide
carouselNav.addEventListener('click', e => {
    // what indicator was clicked?
    const targetDot = e.target.closest('button');
    
    // if no button is clicked, return nothing
    if (!targetDot) return;
    
    // else, store current slide and current dot in variables
    const currentSlide = track.querySelector('.current-slide');
    console.log(currentSlide);
    const currentDot = carouselNav.querySelector('.current-indicator');
    console.log(currentDot);
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    // move to slide based on which dot is clicked
    moveToSlide(track, currentSlide, targetSlide);
    moveToDot(slides, currentDot, targetDot);
    // change color of current corresponding dot to indicate which slide we are on

})
