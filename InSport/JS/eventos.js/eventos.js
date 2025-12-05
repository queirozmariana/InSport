// Cards deslizando automaticamente
const containers = document.querySelectorAll('.cards-container');

containers.forEach(container => {
    let scrollAmount = 0;
    const speed = 2; // pixels por frame
    const maxScroll = container.scrollWidth - container.clientWidth;

    function autoScroll(){
        scrollAmount += speed;
        if(scrollAmount > maxScroll) scrollAmount = 0;
        container.scrollLeft = scrollAmount;
        requestAnimationFrame(autoScroll);
    }
    autoScroll();
});
