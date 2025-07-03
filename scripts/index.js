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

const sectorCarousel = createCarousel({
    track: document.getElementById("carouselTrack"),
    prevBtn: document.getElementById("prevBtnSector"),
    nextBtn: document.getElementById("nextBtnSector"),
    pageInfo: document.getElementById("pageInfo"),
    getCardsPerPage: () => {
        const width = window.innerWidth;
        return width < 630 ? 1 : width < 1024 ? 2 : 3;
    }
});

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

const trackAPI = document.getElementById("carouselTrackAPI");
const switchButtons = document.querySelectorAll('[data-type]');
const activeClass = 'bg-blue-transparent';

const apiCarousel = createCarousel({
    track: trackAPI,
    prevBtn: document.getElementById("prevBtnAPI"),
    nextBtn: document.getElementById("nextBtnAPI"),
    pageInfo: document.getElementById("pageInfoAPI"),
    getCardsPerPage: () => {
        const width = window.innerWidth;
        return width < 640 ? 1 : width < 1024 ? 2 : 3;
    }
});

const dataSets = {
    weather: [
        { title: "Weather API", text: "Real-time weather data with forecasts.", icon: "weather_snowy" },
        { title: "Advanced Weather", text: "Historical meteorological records.", icon: "storm" },
        { title: "Global Patterns", text: "Temperature and wind anomaly maps.", icon: "public" }
    ],
    visuals: [
        { title: "Plug & Play Visuals", text: "Drop-in components with easy styling.", icon: "view_in_ar" },
        { title: "Custom Pagination", text: "Control your data view effectively.", icon: "segments" },
        { title: "Map Visualizer", text: "Satellite + terrain topography layers.", icon: "map" }
    ],
    assessment: [
        { title: "Climate Assessment", text: "Evaluate climate risks effortlessly.", icon: "science" },
        { title: "Carbon Emissions", text: "Scope 1-3 greenhouse gases analysis.", icon: "co2" },
        { title: "Environmental Trends", text: "Long-term impact estimations.", icon: "trending_up" },
        { title: "Environmental Trends", text: "Long-term impact estimations.", icon: "trending_up" }
    ]
};

function renderCardsAPI(type = 'weather') {
    trackAPI.innerHTML = '';

    dataSets[type].forEach(item => {
        const card = document.createElement('div');
        card.className = `
            flex-shrink-0 
            w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]
            p-6 bg-blue-transparent rounded-2xl 
            flex flex-col justify-between
        `.trim();

        card.innerHTML = `
            <div class="flex flex-col gap-10 pb-8 lg:gap-16">
                <div class="border w-fit">
                    <span class="p-4 header-2 material-symbols-outlined light-blue">${item.icon}</span>
                </div>
                <div class="flex flex-col gap-6">
                    <h3 class="subheader white">${item.title}</h3>
                    <p class="main secondary-white">${item.text}</p>
                </div>
            </div>
            <a class="flex main secondary-white items-center">Learn more
                <span class="material-symbols-outlined">chevron_right</span>
            </a>
        `;

        trackAPI.appendChild(card);
    });

    apiCarousel.reset();
    apiCarousel.rerender();
}

switchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;

        switchButtons.forEach(b => b.classList.remove(activeClass));
        btn.classList.add(activeClass);

        renderCardsAPI(type);
    });
});

window.addEventListener("load", () => {
    sectorCarousel.rerender();
    successCarousel.rerender();
    renderCardsAPI('weather');
});