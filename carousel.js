document.addEventListener('DOMContentLoaded', function() {
    // carousel

    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselImages = document.querySelectorAll('.about-img');

    const prevButton = document.querySelector('.about-button.left');
    const nextButton = document.querySelector('.about-button.right'); 

    let maxTranslationValue;

    function calculateMaxTranslationValue() {
        if (window.innerWidth < 1440 && window.innerWidth > 1024) {
            maxTranslationValue = (carouselItems.length - 2) * -475;
        } else {
            maxTranslationValue = (carouselItems.length - 1) * -475;
        }
    }
    calculateMaxTranslationValue();

    window.addEventListener('resize', () => {
        calculateMaxTranslationValue();
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[0].classList.add('active');
        let translationValue = 0;
        carouselImages.forEach(image => {
            image.style.transform = `translateX(${translationValue}px)`;
        });
        prevButton.classList.add('disabled');
        nextButton.classList.remove('disabled');  
    });

    carouselItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            carouselItems.forEach(item => item.classList.remove('active'));
            item.classList.add('active');
            
            calculateMaxTranslationValue();
    
            let translationValue = index * -475;
    
            translationValue = Math.min(0, Math.max(maxTranslationValue, translationValue));
    
            carouselImages.forEach(image => {
                image.style.transform = `translateX(${translationValue}px)`;
            });

            if (translationValue === 0) {
                prevButton.classList.add('disabled');
            } else {
                prevButton.classList.remove('disabled');
            }

            if (translationValue === maxTranslationValue) {
                nextButton.classList.add('disabled');
            } else {
                nextButton.classList.remove('disabled');
            }
        });
    });
    



    prevButton.addEventListener('click', () => {
        const activeItem = document.querySelector('.carousel-item.active');
        const activeIndex = Array.from(carouselItems).indexOf(activeItem);
        if (activeIndex > 0) {
            carouselItems.forEach(item => item.classList.remove('active'));
            carouselItems[activeIndex - 1].classList.add('active');
            let translationValue = (activeIndex - 1) * -475;
            translationValue = Math.min(0, Math.max(maxTranslationValue, translationValue));
            carouselImages.forEach(image => {
                image.style.transform = `translateX(${translationValue}px)`;
            });
            if (activeIndex - 1 === 0) {
                prevButton.classList.add('disabled');
            }
            if (nextButton.classList.contains('disabled')) {
                nextButton.classList.remove('disabled');
            }
        }
    });

    nextButton.addEventListener('click', () => {
        const activeItem = document.querySelector('.carousel-item.active');
        const activeIndex = Array.from(carouselItems).indexOf(activeItem);
        if (prevButton.classList.contains('disabled')) {
            prevButton.classList.remove('disabled');
        }
        if (window.innerWidth < 1440 && window.innerWidth > 1024) {
            if (activeIndex < carouselItems.length - 2) {
                carouselItems.forEach(item => item.classList.remove('active'));
                carouselItems[activeIndex + 1].classList.add('active');
                let translationValue = (activeIndex + 1) * -475;
                translationValue = Math.min(0, Math.max(maxTranslationValue, translationValue));
                carouselImages.forEach(image => {
                    image.style.transform = `translateX(${translationValue}px)`;
                });
                if (activeIndex + 1 === carouselItems.length - 2) {
                    nextButton.classList.add('disabled');
                }
            }
        } else {
            if (activeIndex < carouselItems.length - 1) {
                carouselItems.forEach(item => item.classList.remove('active'));
                carouselItems[activeIndex + 1].classList.add('active');
                let translationValue = (activeIndex + 1) * -475;
                translationValue = Math.min(0, Math.max(maxTranslationValue, translationValue));
                carouselImages.forEach(image => {
                    image.style.transform = `translateX(${translationValue}px)`;
                });
                if (activeIndex + 1 === carouselItems.length - 1) {
                    nextButton.classList.add('disabled');
                }
            }
        }
    });
});
