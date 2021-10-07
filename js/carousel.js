const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const carouselButtons = document.querySelectorAll('.carousel__button');
const carouselNav = document.querySelector('.carousel__nav');
const dots = Array.from(carouselNav.children);
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);
// arrange slides next to each other from left to right
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

// function to change visibility of arrow if at either end of slides
const arrowVisibility = (slides, targetIndex) => {
    console.log(`targetIndex is currently ${targetIndex}`);
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length -1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
 }

//  update slide based on clicked button (left or right)
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');   
}

// update color of clicked dot
const moveToDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-indicator');
    targetDot.classList.add('current-indicator');
}

// when left button is clicked, move slides to left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-indicator');
    const prevSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide);
    console.log(`target index is currently ${targetIndex}`);
    const targetDot = dots[targetIndex];
    // move to previous slide
    moveToSlide(track, currentSlide, prevSlide);
    moveToDot(currentDot, targetDot);
    arrowVisibility(slides, targetIndex);
})

// when right button is clicked, move slides to right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-indicator');
    const nextSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide);
    console.log(`target index is currently ${targetIndex}`);
    const targetDot = dots[targetIndex]
    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);
    // update dot in nav
    moveToDot(currentDot, targetDot);
    // update arrow visibility depending on targetIndex
    arrowVisibility(slides, targetIndex);
})

// when indicator is clicked, move to that slide
carouselNav.addEventListener('click', e => {
    // determine which dot was clicked
    const targetDot = e.target.closest('button');
    
    // if no button is clicked, return nothing
    if (!targetDot) return;

    // change color of current corresponding dot to indicate which slide we are on
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-indicator');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    moveToDot(currentDot, targetDot);
    arrowVisibility(slides, targetIndex);
})
