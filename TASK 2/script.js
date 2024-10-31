const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('cityInput');
const suggestionsList = document.getElementById('suggestions');

cityInput.addEventListener('input', () => {
    const query = cityInput.value;
    if (query.length > 2) { // Trigger suggestions only for queries longer than 2 characters
        fetchSuggestions(query);
    } else {
        suggestionsList.innerHTML = ''; // Clear suggestions
    }
});

suggestionsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('suggestion-item')) {
        cityInput.value = event.target.innerText; // Set input to selected suggestion
        suggestionsList.innerHTML = ''; // Clear suggestions
    }
});

async function fetchSuggestions(query) {
    const response = await fetch(`https://api.teleport.org/api/cities/?search=${query}`);
    const data = await response.json();
    displaySuggestions(data._embedded['city:search-results']);
}

function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    suggestions.forEach(suggestion => {
        const item = document.createElement('li');
        item.className = 'suggestion-item';
        item.innerText = `${suggestion.matching_full_name} (PIN: ${suggestion._embedded['city:urban_area']._embedded['ua:scores'].summary})`; // Adjust as needed for actual pin code data
        suggestionsList.appendChild(item);
    });
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = cityInput.value;
    getWeather(city);
});

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherDisplay = document.getElementById('weatherDisplay');
        weatherDisplay.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherDisplay.style.display = 'block';
    } else {
        alert('City not found');
    }
}
