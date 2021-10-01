const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const carouselButtons = document.querySelectorAll('.carousel__button');
const carouselNav = document.querySelector('.carousel__nav');
const dots = Array.from(carouselNav.children);
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
let translateX = 0;

// function to change visibility of arrow if at either end of slides
const arrowVisibility = (slides, targetIndex) => {
    console.log(`targetIndex is current ${targetIndex}`);
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

// change color of dot that has been clicked

const moveToDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-indicator');
    targetDot.classList.add('current-indicator');
}

const moveToSlide = (track, currentSlide, currentDot, slideClasses) => {
    const prevSlide = currentSlide.previousElementSibling;
    const nextSlide = currentSlide.nextElementSibling;    
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    const nextIndex = slides.findIndex(slide => slide === nextSlide); 

    if (slideClasses.contains('carousel__button--right')) {
        console.log('move me left!');
        translateX -= 200;
        track.style.transform = `translateX(${translateX}px)`;
        currentSlide.classList.remove('current-slide');
        nextSlide.classList.add('current-slide');
        nextSlide.classList.remove('carousel__slide--upcoming')
        currentSlide.classList.add('carousel__slide--outgoing');
        const targetIndex = prevIndex;
        console.log(targetIndex)
        const targetDot = dots[targetIndex];
        
    } else {
        console.log('move me right!');
        translateX += 200;
        track.style.transform = `translateX(${translateX}px)`;
        currentSlide.classList.remove('current-slide');
        prevSlide.classList.add('current-slide');
        prevSlide.classList.remove('carousel__slide--upcoming')
        currentSlide.classList.add('carousel__slide--outgoing');
        const targetIndex = nextIndex;
        const targetDot = dots[targetIndex];
    }
    moveToDot(currentDot, targetDot);
    arrowVisibility(slides, targetIndex);
}

// for each carousel button (left and right), add event listener
carouselButtons.forEach(button => {
    button.addEventListener('click', e => {
        // get current slide
        const currentSlide = track.querySelector('.current-slide');
        // get clicked button
        const clickedButton = e.target.closest('button');
        // get classes of clicked button to determine later which button was clicked
        const slideClasses = clickedButton.classList;
        
        // get current Dot
        const currentDot = carouselNav.querySelector('.current-indicator');
        // find slide we need to move to next
        /*const targetIndex = slides.findIndex(slide => slide === targetSlide);
        const targetSlide = slides[targetIndex];*/
        
        // call function to move to that slide, and pass current dot to update dot from within 
        // slide function
        moveToSlide(track, currentSlide, currentDot, slideClasses);
    })
});

// when indicator is clicked, move to that slide
carouselNav.addEventListener('click', e => {
    // what indicator was clicked?
    const targetDot = e.target.closest('button');
    
    // if no button is clicked, return nothing
    if (!targetDot) return;

    // change color of current corresponding dot to indicate which slide we are on
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-indicator');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    const clickedButton = e.target.closest('button');
    // get classes of clicked button to determine later which button was clicked
    const slideClasses = clickedButton.classList;
    
    moveToSlide(track, currentSlide, currentDot, slideClasses);
})
