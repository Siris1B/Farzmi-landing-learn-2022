document.addEventListener('DOMContentLoaded', () => {

    function deleteNoDigits(str) {
        return +str.replace(/\D/img, '');
    }

    function dotsReOpacity(arr, index) {
        arr.forEach(arrI => arrI.style.opacity = '.5');
        arr[index - 1].style.opacity = 1;

        return arr;
    }


    const slides = document.querySelectorAll('.slider__item'),
          slider = document.querySelector('.slider__slider'),
          prev = document.querySelector('.slider__btn-prev'),
          next = document.querySelector('.slider__btn-next'),
          slidesWrapper = document.querySelector('.slider__wrap'),
          slidesField = document.querySelector('.slider__inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
         offset = 0;

    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';

    slidesWrapper.style.overflow = 'hidden';
    
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative'; // Script for dots from ....

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    } // ... to

    next.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        dotsReOpacity(dots, slideIndex); // Script for dots
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        dotsReOpacity(dots, slideIndex); // Script for dots
    });


    dots.forEach(dot => { // Script for dots from...
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
    
            slideIndex = slideTo;
            offset = deleteNoDigits(width) * (slideTo - 1);
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            dotsReOpacity(dots, slideIndex);
        });
    }); // ... to
});