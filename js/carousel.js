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

// change color of dot that has been clicked
const moveToDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-indicator');
    targetDot.classList.add('current-indicator');
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    
}

const arrowVisibility = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
    } else if (targetIndex === slides.length -1) {
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-indicator');
    const prevSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide);
    const targetDot = dots[targetIndex];
    // move to previous slide
    moveToSlide(track, currentSlide, prevSlide);
    moveToDot(currentDot, targetDot);
    arrowVisibility(slides, prevButton, nextButton, targetIndex);
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-indicator');
    const nextSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide);
    const targetDot = dots[targetIndex]
    
    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);

    // update dot in nav
    moveToDot(currentDot, targetDot);

    arrowVisibility(slides, prevButton, nextButton, targetIndex);

})

// when I click the nav indicators, move to that slide
carouselNav.addEventListener('click', e => {
    // what indicator was clicked?
    const targetDot = e.target.closest('button');
    
    // if no button is clicked, return nothing
    if (!targetDot) return;

    // change color of current corresponding dot to indicate which slide we are on
    const currentDot = carouselNav.querySelector('.current-indicator');
    const currentSlide = track.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide)
    moveToDot(currentDot, targetDot);
})
