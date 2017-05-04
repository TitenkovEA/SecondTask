var Carousel = require('./page/Carousel.po.js');

describe('Carousel', function () {
    var carousel = new Carousel();

    beforeEach(function () {
        carousel.get();
        carousel.setInterval(0);
    });

    var slides = [{
        slideName: 'Slide 0',
        imageName: 'Nice image'
    }, {
        slideName: 'Slide 1',
        imageName: 'Awesome photograph'
    }, {
        slideName: 'Slide 2',
        imageName: 'That is so cool'
    }, {
        slideName: 'Slide 3',
        imageName: 'I love that'
    }];

    var checkSlide = function (slideIndex, slide) {
        expect(carousel.getImageName()).toEqual(slides[slideIndex].imageName);
        expect(carousel.getSlideName()).toEqual(slides[slideIndex].slideName);
    };

    var checkNewSlide = function (slide) {
        expect(carousel.getImageName()).toEqual(slide.imageName);
        expect(carousel.getSlideName()).toEqual(slide.slideName);

    };

    it('should display a carousel with slide and image names', function () {
        checkSlide(0);
    });

    it('should go to next slide when clicking right arrow', function () {
        for (var i = 0; i < slides.length - 1; i++) {
            carousel.clickRight();
            checkSlide(i + 1);
        }
    });

    it('should go to previous slide when clicking right arrow', function () {
        for (var i = 0; i < slides.length - 1; i++) {
            carousel.clickLeft();
            checkSlide(3 - i);
        }
    });

    it('should change slide when clicking dot', function () {
        var dots = carousel.getDots();
        for (var i = 0; i < slides.length; i++) {
            dots.get(i).click();
            expect(dots.get(i).getAttribute('class')).toContain('active');
            checkSlide(i);
        }
    });

    it('should change slide by timeout', function () {
        carousel.setInterval(500);

        browser.sleep(500).then(function () {
            expect(carousel.getSlideName()).not.toEqual(slides[0].slideName);
            expect(carousel.getImageName()).not.toEqual(slides[0].imageName);
        });
    });

    it('should disable slide looping', function () {
        carousel.disableLopping();
        carousel.clickLeft();
        checkSlide(0);
        carousel.getDots().last().click();
        carousel.clickRight();
        checkSlide(3);
    });

    it('should add new slide', function () {
        var newSlide = {
            slideName: 'Slide 4',
            imageName: 'Nice image'
        };
        carousel.addSlide();
        carousel.getDots().last().click();
        checkNewSlide(newSlide);
        carousel.clickLeft();
        carousel.clickRight();
        checkNewSlide(newSlide);
        carousel.clickRight();
        carousel.clickLeft();
        checkNewSlide(newSlide);
    });

    it('should randomize slides', function () {
        carousel.randomizeSlides();
        var flag = false;
        for (var i = 0; i < slides.length - 1; i++) {
            carousel.clickRight();
            if (carousel.getSlideName() != slides[i + 1]) {
                flag = true;
                break;
            }
        }
        expect(flag).toEqual(true);
    });
});