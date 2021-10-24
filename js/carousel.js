/**
 * slides still not populating correctly... causing issues at lines 92 and 125 (carousel.js:92 Uncaught TypeError: Cannot read properties of null (reading 'style'))
 */

const track = document.querySelector('.carousel__track');
// const thumbnailNav = document.querySelector('.thumbnail__nav');
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
const slides = [];

// assign slide classes and position them side by side
const setSlideClass = (slides, newItem, itemIndex) => {
    const currentSlide = slides[itemIndex];
    console.log(`slides is ${slides} and current slide is ${currentSlide}`);
    const slideInfo = currentSlide.getBoundingClientRect();
    console.log(slideInfo);
    const slideWidth = slideInfo.width;
    console.log(`itemIndex is ${itemIndex} and slides[itemIndex] is ${slides[itemIndex]} and slideWidth is ${slideWidth}`);
    newItem.style.left = slideWidth * itemIndex + 'px';

    if (newItem.previousElementSibling === null) {
        newItem.classList.add('carousel__slide', 'current-slide');
    } else {
        newItem.classList.add('carousel__slide');
    }
} 

// populate slides with images (from inputFiles array)!
const viewFiles = () => {
    
    const files = document.querySelector('input[type=file]').files;

    const readAndLoadImages = (file) => {
        if ( /\.(png|jpe?g)$/i.test(file.name)) {

            // create reader for files
            const reader = new FileReader();

            // create an li element to add to 'carousel__slide' ul)
            let newItem = document.createElement('li');
            
            // listen for loaded images
            reader.addEventListener('load', () => {
                let image = new Image();
                image.classList.add('carousel__image')
                image.src = reader.result;
                // image.height = 600;
                image.title = file.name;
                let imageWidth = image.width;
                console.log(`image width is ${imageWidth}`);
                
                // append image of appropriate class to preview ('carousel__slide')
                document.querySelector('.carousel__track').appendChild(newItem);

                // add the image to the li as a child and add class 'carousel__image'
                newItem.appendChild(image);
            //  const slideWidth = newItem.getBoundingClientRect().width;

                slides.push(newItem); 
                console.log(`slides is currently: ${slides}`);
                
                // add appropriate classes to new image slide
                // setSlideClass(newItem, slideWidth, slides.indexOf(newItem));
                setSlideClass(slides, newItem, slides.indexOf(newItem));
                
            }, false);
            reader.readAsDataURL(file);

        
        }
        console.log(slides);
    }
    // if (files) {
    [].forEach.call(files, readAndLoadImages);
    // }   
    
    // const thumbs = Array.from(thumbnailNav.children);
}

// function to change visibility of arrow if at either end of slides
const arrowVisibility = (slides, targetIndex) => {
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
// thumbnailNav.addEventListener('click', e => {
//     const targetThumb = e.target.closest('button');
//     // if target is not on button, do nothing
//     if (!e.target) {
//         return;
//     // if a button is clicked
//     }
//     const currentSlide = track.querySelector('.current-slide');
//     // const currentThumb = thumbnailNav.querySelector('.current-thumb');
//     // const targetIndex = thumbs.findIndex(thumb => thumb === targetThumb);
//     // const targetSlide = slides[targetIndex];

//     moveToSlide(track, currentSlide, targetSlide);
//     // moveToThumb(currentThumb, targetThumb);
//     arrowVisibility(slides, targetIndex);
// })