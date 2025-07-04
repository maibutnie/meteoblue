const btnWeatherData = document.getElementById('btn-weather-data');
const btnWeatherDashboard = document.getElementById('btn-weather-dashboard');
const weatherData = document.getElementById('weather-data');

function activateButton(buttonToActivate, buttonToDeactivate, showContent) {
    buttonToActivate.classList.add('border-bottom-blue-300', 'blue-300');
    buttonToActivate.classList.remove('border-bottom', 'secondary-website');

    buttonToDeactivate.classList.remove('border-bottom-blue-300', 'blue-300');
    buttonToDeactivate.classList.add('border-bottom', 'secondary-website');

    if (showContent) {
        weatherData.classList.remove('hidden');
    } else {
        weatherData.classList.add('hidden');
    }
}

activateButton(btnWeatherData, btnWeatherDashboard, true);

btnWeatherData.addEventListener('click', () => {
    activateButton(btnWeatherData, btnWeatherDashboard, true);
});

btnWeatherDashboard.addEventListener('click', () => {
    activateButton(btnWeatherDashboard, btnWeatherData, false);
});