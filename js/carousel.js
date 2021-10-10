const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const thumbnailNav = document.querySelector('.thumbnail__nav');
const thumbs = Array.from(thumbnailNav.children);
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

// arrange slides next to each other from left to right
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

// add slide images to thumbnails
const addThumbnailImages = () => {
    
}

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

const moveToThumb = (currentThumb, targetThumb) => {
    currentThumb.classList.remove('current-thumb');
    targetThumb.classList.add('current-thumb');
}

// when left button is clicked, move slides to left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentThumb = thumbnailNav.querySelector('.current-thumb');
    const prevSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide);
    console.log(`target index is currently ${targetIndex}`);
    const targetThumb = thumbs[targetIndex];
    // move to previous slide
    moveToSlide(track, currentSlide, prevSlide);
    moveToThumb(currentThumb, targetThumb);
    arrowVisibility(slides, targetIndex);
})

// when right button is clicked, move slides to right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentThumb = thumbnailNav.querySelector('.current-thumb');
    const nextSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide);
    console.log(`target index is currently ${targetIndex}`);
    const targetThumb = thumbs[targetIndex];
    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);
    // update dot in nav
    // update thumbnail in nav
    moveToThumb(currentThumb, targetThumb);
    // update arrow visibility depending on targetIndex
    arrowVisibility(slides, targetIndex);
})

// when thumbnail is clicked, move to that slide
thumbnailNav.addEventListener('click', e => {
    const targetThumb = e.target.closest('button');
    // if target is not on button, do nothing
    if (!e.target) {
        return;
    // if a button is clicked
    }
    const currentSlide = track.querySelector('.current-slide');
    const currentThumb = thumbnailNav.querySelector('.current-thumb');
    const targetIndex = thumbs.findIndex(thumb => thumb === targetThumb);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    moveToThumb(currentThumb, targetThumb);
    arrowVisibility(slides, targetIndex);
})