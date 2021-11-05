/**
 * Program that takes a user input of multiple images and loads them as previews into a
 * a scrollable carousel.
 */

const track = document.querySelector('.carousel__track');
const thumbnailNav = document.querySelector('.thumbnail__nav');
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
nextButton.classList.add('is-hidden');
const slides = [];
const thumbs = [];

// calculate slide position and width
const setSlidePosition = (itemIndex, newItem) => {
    // const currentSlide = slides[itemIndex];
    const slideInfo = newItem.getBoundingClientRect();
    // const slideWidth = slideInfo.left;
    if (newItem.previousElementSibling === null) {
        newItem.style.left = 0;
    } else {
        newItem.style.left = 450 * itemIndex + 'px';
    }
}

// assign slide classes
const setSlideClass = (image, newItem) => {
    let itemIndex = slides.findIndex(slide => slide === newItem);
    if (newItem.previousElementSibling === null) {
        newItem.classList.add('carousel__slide', 'current-slide');
    } else {
        newItem.classList.add('carousel__slide');
    }
    setSlidePosition(itemIndex, newItem);
} 

const setThumbClass = (newThumb) => {
    if (newThumb.previousElementSibling === null) {
        newThumb.classList.add('thumbnail__indicator', 'current-thumb');
    } else {
        newThumb.classList.add('thumbnail__indicator');
    }
}

// resize image
const resizeImage = (image, newItem) => {
    if (image.naturalWidth > 450) {
        image.style.width = 450;
        image.style.height = '100%';
        newItem.style.width = 450;
        newItem.style.height = 'auto'
    } else {
        newItem.style.width = '100%';
        image.style.width = '100%';
        newItem.style.height = 'auto';
        image.style.height = 'auto';
    }
}

// populate slides with images (from inputFiles array)!
const viewFiles = () => {
    
    // const files = '';
    const files = document.querySelector('input[type=file]').files;

    const readAndLoadImages = (file) => {
        if ( /\.(png|jpe?g)$/i.test(file.name)) {

            // create reader for files
            const reader = new FileReader();

            // create li element to add to 'carousel__slide' ul
            let newItem = document.createElement('li');
            let newThumb = document.createElement('div');
            
            // listen for loaded images
            reader.addEventListener('load', () => {
                nextButton.classList.remove('is-hidden');
                let image = new Image();
                let thumbImage = new Image();
                image.classList.add('carousel__image');
                newThumb.classList.add('thumbnail__indicator');

                image.src = reader.result;
                thumbImage.src = reader.result;
                image.title = file.name;
                thumbImage.title = file.name;
                image.setAttribute('alt', 'a')
                thumbImage.setAttribute('alt', 'b');

                // resize image appropriately
                resizeImage(image, newItem);
                // append image of appropriate class to preview ('carousel__slide')
                track.appendChild(newItem);
                // add the image to the li as a child and add class 'carousel__image'
                newItem.appendChild(image);

                thumbnailNav.appendChild(newThumb);
                newThumb.appendChild(thumbImage);

                slides.push(newItem); 
                thumbs.push(newThumb);
                // add appropriate classes to new image slide
                setSlideClass(image, newItem);
                setThumbClass(newThumb);

            }, false);
            reader.readAsDataURL(file);

        
        }
        // getTrackWidth(slides);
    }
    // if (files) {
    [].forEach.call(files, readAndLoadImages);
    // }   
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

// update thumbnail 
const moveToThumb = (currentThumb, targetThumb) => {
    currentThumb.classList.remove('current-thumb');
    targetThumb.classList.add('current-thumb');
}

// when left button is clicked, move slides to left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide);
    // get current and target thumbs
    const currentThumb = thumbnailNav.querySelector('.current-thumb');
    const targetThumb = thumbs[targetIndex];

    // move to previous slide
    moveToSlide(track, currentSlide, prevSlide);
    moveToThumb(currentThumb, targetThumb);
    arrowVisibility(slides, targetIndex);
})

// when right button is clicked, move slides to right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide);
    // get current and target thumbs
    const currentThumb = thumbnailNav.querySelector('.current-thumb');
    const targetThumb = thumbs[targetIndex];

    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);
    moveToThumb(currentThumb, targetThumb);
    arrowVisibility(slides, targetIndex);
})

// when thumbnail is clicked, move to that slide
thumbnailNav.addEventListener('click', e => {
    const targetThumb = e.target.closest('div');
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