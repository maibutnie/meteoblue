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

// Accordion functionality
const dataFAQ = [
  {
    question: "What is meteoblue?",
    answer: "Meteoblue is a weather service that provides accurate and detailed weather forecasts, historical weather data, and various meteorological products for users worldwide."
  },
  {
    question: "What is meteoblue?",
    answer: "Meteoblue is a weather service that provides accurate and detailed weather forecasts, historical weather data, and various meteorological products for users worldwide."
  },
  {
    question: "What is meteoblue?",
    answer: "Meteoblue is a weather service that provides accurate and detailed weather forecasts, historical weather data, and various meteorological products for users worldwide."
  },
  {
    question: "What is meteoblue?",
    answer: "Meteoblue is a weather service that provides accurate and detailed weather forecasts, historical weather data, and various meteorological products for users worldwide."
  },
];

// Meteogram categories data
const data = [
  {
    title: "General Meteograms",
    items: [
      {
        image: "https://www.meteoblue.com/images/some-graph1.png",
        header: "Meteogram 5-day",
        description: "The Meteogram 5-Day shows a forecast for 5 days in 3 diagrams (temperature, precipitation & clouds and wind charts) for the selected location.",
        link: "#"
      },
      {
        image: "https://www.meteoblue.com/images/some-graph2.png",
        header: "Meteogram 7-day",
        description: "The Meteogram 7-Day shows a forecast for 7 days in 4 diagrams for the selected location.",
        link: "#"
      },
      {
        image: "https://www.meteoblue.com/images/some-graph3.png",
        header: "Meteogram All-in-One",
        description: "The Meteogram All-in-One shows the weather forecast for the next 6 days with multiple data types combined.",
        link: "#"
      },
      {
        image: "https://www.meteoblue.com/images/some-graph4.png",
        header: "Meteogram Snow",
        description: "The Meteogram Snow shows temperature, precipitation, and snow height over time for selected locations.",
        link: "#"
      }
    ]
  },
  {
    title: "Agronomical Meteograms",
    items: []
  },
  {
    title: "Aviational Meteograms",
    items: []
  },
  {
    title: "Multimodel & Assemble Meteograms",
    items: []
  },
  {
    title: "Long Term Meteograms",
    items: []
  },
  {
    title: "Other Meteograms",
    items: []
  },
  {
    title: "History & Climate Images Meteograms",
    items: []
  }
];

function toggleAccordionItem(el, allItemsSelector, iconSelector, bodySelector, activeIcon, inactiveIcon) {
  const isOpen = el.classList.contains('open');

  document.querySelectorAll(allItemsSelector).forEach(item => {
    item.classList.remove('open');
    item.querySelector(bodySelector).style.maxHeight = 0;
    const icon = item.querySelector(iconSelector);
    if (icon) icon.textContent = inactiveIcon;
  });

  if (!isOpen) {
    el.classList.add('open');
    const body = el.querySelector(bodySelector);
    body.style.maxHeight = body.scrollHeight + 'px';
    const icon = el.querySelector(iconSelector);
    if (icon) icon.textContent = activeIcon;
  }
}

function renderFAQ() {
  const container = document.getElementById("faq-accordion");

  dataFAQ.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bg-white rounded-xl shadow-sm faq-item overflow-hidden";

    wrapper.innerHTML = `
      <button class="w-full flex justify-between items-center text-left px-5 py-4 lg:py-5 lg:px-6 transition group faq-question" data-index="${index}">
        <span class="subheader dark-blue">${item.question}</span>
        <span class="faq-toggle-icon dark-blue material-symbols-outlined transform transition-transform duration-300">
          keyboard_control_key
        </span>
      </button>
      <div class="faq-answer max-h-0 overflow-hidden transition-all duration-500 ease-in-out px-6 text-gray-600">
        <div class="main secondary-website p-5">${item.answer}</div>
      </div>
    `;

    container.appendChild(wrapper);
  });

  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", (e) => {
      const wrapper = button.closest(".faq-item");
      toggleAccordionItem(wrapper, ".faq-item", ".faq-toggle-icon", ".faq-answer", "keyboard_arrow_down", "keyboard_control_key");
    });
  });
}

function createAccordionSection(section, index) {
  const itemsHTML = section.items.map(item => `
    <div class="p-6 bg-white border-cards rounded-2xl flex flex-col gap-6 sm:gap-8">
      <div class="w-full h-[248px] rounded-2xl bg-gray-100 overflow-hidden">
        
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="subheader dark-blue">${item.header}</h3>
        <p class="main secondary-website">${item.description}</p>
      </div>
      <a href="${item.link}" class="flex main secondary-website items-center">Learn more
        <span class="material-symbols-outlined ml-1">chevron_right</span>
      </a>
    </div>
  `).join('');

  return `
    <div class="overflow-hidden accordion-item">
      <button class="w-full flex justify-between items-center  transition group accordion-header" data-index="${index}">
        <span class="subheader secondary-website text-left">${section.title}</span>
        <span class="toggle-icon secondary-website material-symbols-outlined transform transition-transform duration-300">
          keyboard_control_key
        </span>
      </button>
      <div class="accordion-body max-h-0 overflow-hidden transition-all duration-500 ease-in-out px-4">
        <div class="grid sm:grid-cols-2 gap-4 py-4">
          ${itemsHTML || `<div class="text-gray-500 italic p-4">No data available.</div>`}
        </div>
      </div>
    </div>
  `;
}

function renderAccordion() {
  const container = document.getElementById('accordion-container');
  container.innerHTML = data.map((section, index) => createAccordionSection(section, index)).join('');

  document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", () => {
      const wrapper = button.closest(".accordion-item");
      toggleAccordionItem(wrapper, ".accordion-item", ".toggle-icon", ".accordion-body", "keyboard_arrow_down", "keyboard_control_key");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFAQ();
  renderAccordion();
});