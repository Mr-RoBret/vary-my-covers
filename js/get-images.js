// populate slides with images (from inputFiles array)!
const viewFiles = () => {
    const preview = document.querySelector('.carousel__track');
    console.log(preview);
    const files = document.querySelector('input[type=file]').files;

    const readAndLoadImages = (file) => {

        if ( /\.(png|jpe?g)$/i.test(file.name)) {
            const reader = new FileReader();
            // create an li element to add to ul (preview, aka 'carousel__slide')
            let newItem = document.createElement('li');
            newItem.classList.add('carousel__slide');
            console.log(newItem);

            reader.addEventListener('load', () => {
                let image = new Image();
                image.classList.add('carousel__image')
                image.src = reader.result;
                image.style.left = 0;
                image.height = 600;
                image.title = file.name;
                
                // add the image to the li as a child and add class 'carousel__image'
                newItem.appendChild(image);
                // append image of appropriate class to preview ('carousel__slide')
                preview.appendChild(newItem);
            }, false);

            reader.readAsDataURL(file);
        }
    }

    if (files) {
        [].forEach.call(files, readAndLoadImages);
    }
}
    // inputFiles.forEach(file => {
    //     //create element in DOM
    //     //crop & resize element
    //     //display
    // })


// when submit button is clicked, 
// add files to inputFiles
// call populateSlides with (inputFiles) as arguments

// submitButton.addEventListener('click', e => {
//     // let inputFiles = [];
//     let inputs = inputElement.files;
//     let inputFiles = Array.from(inputs)
//     // console.log(inputFiles);
//     // if (!inputs == '') {
//         // inputFiles.push(inputs);
//         console.log(`inputs list is: ${inputFiles}`);
//         populateSlides(inputFiles);
//         document.getElementById('imgInput').value = '';
//     // }
// })