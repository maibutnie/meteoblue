// Данные таймлайна
const timelineData = [
  {
    year: "2004",
    title: "First proprietary simulation model (NMM2, Switzerland)",
    description:
      "Was published on the website of the University of Basel, with 2 km spatial resolution, hourly intervals and daily updates.",
  },
  {
    year: "2005",
    title: "Wind flow movie",
    description:
      "Meteoblue revolutionised weather data visualisation by adding particle animation overlay to the wind forecast map layer.",
  },
  {
    year: "2006",
    title: "myMap Server",
    description:
      "A unique tool to make your own meteorology maps – for everyone.",
  },
  {
    year: "2007",
    title: "Astronomy Seeing",
    description:
      "Meteoblue designed this comprehensive feature for astronomy enthusiasts, enabling them to view all necessary information in one simple chart.",
  },
  {
    year: "2008",
    title: "Climate forecast",
    description: "Released visual climate predictions for the next 30 years based on global greenhouse gas emissions.",
  }
];

let currentIndex = 0;
const ITEMS_PER_LOAD = 2;
const timelineContainer = document.getElementById("timeline");
const showMoreBtn = document.getElementById("showMoreBtn");

function generateTimelineItem(item) {


  return `
    <div class="mb-10 relative">
      <div class="absolute w-4 h-4 rounded-full bg-blue-300 -left-2.5 top-1.5 border-4 border-white"></div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="quote dark-blue">${item.year}</h3>
        <p class="dark-blue switch">${item.title}</p>
        <p class="secondary-website mt-2 main">${item.description}</p>
      </div>
    </div>
  `;
}

function renderTimeline() {
  const slice = timelineData.slice(currentIndex, currentIndex + ITEMS_PER_LOAD);
  slice.forEach(item => {
    timelineContainer.innerHTML += generateTimelineItem(item);
  });

  currentIndex += ITEMS_PER_LOAD;
  if (currentIndex >= timelineData.length) {
    showMoreBtn.classList.add("hidden");
  } else {
    showMoreBtn.classList.remove("hidden");
  }
}

function showMore() {
  renderTimeline();
}

document.addEventListener("DOMContentLoaded", renderTimeline);