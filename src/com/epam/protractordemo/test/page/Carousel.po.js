var Carousel = function () {
    var arrowLeft = element(by.css('.left.carousel-control'));
    var arrowRight = element(by.css('.right.carousel-control'));

    var dots = element.all(by.xpath("//ol[@class='carousel-indicators']/li"));

    var checkboxDisableLopping = element(by.model('noWrapSlides'));

    var btnAddSlide = element(by.xpath("//button[text()='Add Slide']"));
    var btnRandomizeSlides = element(by.xpath("//button[text()='Randomize slides']"));

    var inputInterval = element(by.model('myInterval'));

    var slideNameField = element(by.xpath("//div[contains(@class,'item active')]/div/div/h4"));
    var slideImageNameField = element(by.xpath("//div[contains(@class,'item active')]/div/div/p"));

    this.clickLeft = function () {
        arrowLeft.click();
    };

    this.clickRight = function () {
        arrowRight.click();
    };

    this.get = function () {
        browser.get('https://angular-ui.github.io/bootstrap/');
    };

    this.getDots = function () {
        return dots;
    };

    this.disableLopping = function () {
        checkboxDisableLopping.click();
    };

    this.addSlide = function () {
        btnAddSlide.click();
    };

    this.randomizeSlides = function () {
        btnRandomizeSlides.click();
    };

    this.setInterval = function (milliseconds) {
        inputInterval.clear();
        inputInterval.sendKeys(milliseconds);
    };

    this.getSlideName = function () {
        return slideNameField.getText().then(function (value) {
            return value;
        });
    };

    this.getImageName = function () {
        return slideImageNameField.getText().then(function (value) {
            return value;
        });
    };
};
module.exports = Carousel;