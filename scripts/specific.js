function createCarousel({ track, prevBtn, nextBtn, pageInfo, getCardsPerPage }) {
    let currentSlide = 0;
    let cardsPerPage = 1;
    let totalSlides = 1;

    function updateCardsPerPageValue() {
        cardsPerPage = getCardsPerPage();
        totalSlides = Math.ceil(track.children.length / cardsPerPage);

        if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
        updateCarousel();
    }

    function updateCarousel() {
        const cards = track.children;
        if (!cards.length) return;

        const card = cards[0];
        const style = getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap || 24);
        const cardWidth = card.offsetWidth;
        const moveX = (cardWidth + gap) * currentSlide;

        track.style.transform = `translateX(-${moveX}px)`;
        pageInfo.textContent = `${currentSlide + 1} / ${totalSlides}`;

        prevBtn.classList.toggle("invisible", currentSlide === 0);
        nextBtn.classList.toggle("invisible", currentSlide >= totalSlides - 1);
    }

    prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    });

    window.addEventListener("resize", debounce(updateCardsPerPageValue));

    return {
        rerender: updateCardsPerPageValue,
        reset() {
            currentSlide = 0;
            updateCarousel();
        }
    };
}

function debounce(fn, delay = 200) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

const successCarousel = createCarousel({
    track: document.getElementById("carouselTrackSuccess"),
    prevBtn: document.getElementById("prevBtnSuccess"),
    nextBtn: document.getElementById("nextBtnSuccess"),
    pageInfo: document.getElementById("pageInfoSuccess"),
    getCardsPerPage: () => {
        const width = window.innerWidth;
        return width < 630 ? 1 : width < 1024 ? 2 : 3;
    }
});

window.addEventListener("load", () => {
    successCarousel.rerender();
});