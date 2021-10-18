/**
 * slides still not populating correctly... causing issues at lines 92 and 125 (carousel.js:92 Uncaught TypeError: Cannot read properties of null (reading 'style'))
 */

const track = document.querySelector('.carousel__track');
// const thumbnailNav = document.querySelector('.thumbnail__nav');
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
const slides = [];

// arrange slides next to each other from left to right
const setSlidePosition = (slide, index) => {
    console.log(slideWidth, index);
    slide.style.left = slideWidth * index + 'px';
};

const setSlideClass = (newItem) => {
    console.log(`Item's previous Element sibling is ${newItem.previousElementSibling}`);
    // if newItem has previousSibling
    if (newItem.previousElementSibling === null) {
        newItem.classList.add('carousel__slide', 'current-slide');
    } else {
        newItem.classList.add('carousel__slide');
    }
    console.log(newItem);
} 

// populate slides with images (from inputFiles array)!
const viewFiles = () => {
    const preview = document.querySelector('.carousel__track');
    console.log(preview); // print carousel__track
    const files = document.querySelector('input[type=file]').files;

    const readAndLoadImages = (file) => {
        if ( /\.(png|jpe?g)$/i.test(file.name)) {
            const reader = new FileReader();

            // create an li element to add to ul (preview, aka 'carousel__slide')
            let newItem = document.createElement('li');

            // listen for loaded images
            reader.addEventListener('load', () => {
                let image = new Image();
                image.classList.add('carousel__image')
                image.src = reader.result;
                image.style.left = 0;
                image.height = 600;
                image.title = file.name;
                
                // add appropriate classes to new image slide
                setSlideClass(newItem);
                // add the image to the li as a child and add class 'carousel__image'
                newItem.appendChild(image);
                // append image of appropriate class to preview ('carousel__slide')
                preview.appendChild(newItem);
            }, false);

            reader.readAsDataURL(file);
            slides.push(file);
        }
    }
    
    if (files) {
        [].forEach.call(files, readAndLoadImages);
    }

    // const thumbs = Array.from(thumbnailNav.children);

    // const inputElement = document.getElementById('imgInput');
    const slideWidth = slides[0].getBoundingClientRect().width;
    console.log(slideWidth);

    // for each slide, set slide position using function
    slides.forEach(setSlidePosition);
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
    const prevSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide);
    console.log(`target index is currently ${targetIndex}`);
    // const currentThumb = thumbnailNav.querySelector('.current-thumb');
    // const targetThumb = thumbs[targetIndex];

    // move to previous slide
    moveToSlide(track, currentSlide, prevSlide);
    // moveToThumb(currentThumb, targetThumb);
    arrowVisibility(slides, targetIndex);
})

// when right button is clicked, move slides to right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide);
    console.log(`target index is currently ${targetIndex}`);
    // const currentThumb = thumbnailNav.querySelector('.current-thumb');
    // const targetThumb = thumbs[targetIndex];

    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);
    // moveToThumb(currentThumb, targetThumb);
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
    // const currentThumb = thumbnailNav.querySelector('.current-thumb');
    // const targetIndex = thumbs.findIndex(thumb => thumb === targetThumb);
    // const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    // moveToThumb(currentThumb, targetThumb);
    arrowVisibility(slides, targetIndex);
})