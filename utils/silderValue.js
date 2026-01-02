export function setSliderValue(page, sliderNumber){
    const slider = page.locator(`#slider${sliderNumber}`);
    return slider;
}