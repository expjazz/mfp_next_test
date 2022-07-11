export const registerDragScroll = (sliderRef) => {
  const sliderView = sliderRef.view;
  let isDown = false;
  let startX;
  let scrollLeft;

  sliderView.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDown = true;
    startX = e.pageX - sliderView.offsetLeft;
    scrollLeft = sliderRef.getScrollLeft();
    sliderView.style.scrollBehavior = 'auto';
  });
  sliderView.addEventListener('mouseleave', () => {
    isDown = false;
    sliderView.style.scrollBehavior = 'smooth';
  });
  sliderView.addEventListener('mouseup', () => {
    isDown = false;
  });
  sliderView.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderView.offsetLeft;
    const walk = (x - startX) * 3;
    sliderRef.scrollLeft(scrollLeft - walk)
  });
}

