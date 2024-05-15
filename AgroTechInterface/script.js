const apiKey = 'Your_Key_Here';
const resultText = "";
const weatherText = "";
var selectedCity = '';
var selectedItem = '';

weatherRes = document.getElementById("weatherRes");
resultRes = document.getElementById("resultRes");


function fetchWeatherData(city) {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the weather data here
            const weather = data.weather[0];
            const temperatureFahrenheit = data.main.temp;

            // Convert temperature from Fahrenheit to Celsius
            const temperatureCelsius = (temperatureFahrenheit - 273);

            // Update weatherRes with weather information
            weatherRes.innerHTML = `
                <p>City: ${city}</p>
                <p>Temperature: ${temperatureCelsius.toFixed(2)}°C</p>
                <p>Weather Description: ${weather.description}</p>
            `;

            // Update resultRes based on weather condition
            if (weather.main === "Clouds") {
                resultRes.innerHTML = "The Weather is Cloudy Today. You do not need to water the plants.";
            } else if(weather.main === "Haze"){
                resultRes.innerHTML = "The Weather is Extremely Hot, water level may be critical";
            }
            else if(weather.main === "Broken Clouds")
                resultRes.innerHTML = "You may Water your plant Today.";
            else if(weather.main === "Clear")
                resultRes.innerHTML = "The weather is great today, dont forget to water your plants";
            else
            {
                resultRes.innerHTML = "Invalid City";
                weatherRes.innerHTML = `
                    <p>City: ${city}</p>
                    <p>Temperature: Invalid°C</p>
                    <p>Weather Description: Invalid</p>
                    <p>Weather Description: invalid</p>
                `;
            }            
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            resultRes.innerHTML = "Error fetching weather data. Please try again later.";
            weatherRes.innerHTML = `
                <p>City: ${city}</p>
                <p>Temperature: Invalid°C</p>
                <p>Weather Description: Invalid</p>
            `;
        });
}





document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables to store selected city and item
    

    // Function to remove the 'selected' class from all images
    function clearSelected() {
        var images = document.querySelectorAll('.Urunler');
        images.forEach(function(image) {
            image.classList.remove('selected');
        });
    }

    // Get references to all the image elements
    var biberImage = document.getElementById("biber");
    var feslegenImage = document.getElementById("feslegen");
    var domatesImage = document.getElementById("domates");
    var marulImage = document.getElementById("marul");

    // Add click event listeners to each image
    biberImage.addEventListener("click", function() {
        clearSelected();
        selectedItem = 'biber';
        console.log("Biber clicked!");
        biberImage.classList.add('selected');
    });

    feslegenImage.addEventListener("click", function() {
        clearSelected();
        selectedItem = 'feslegen';
        console.log("Feslegen clicked!");
        feslegenImage.classList.add('selected');
    });

    domatesImage.addEventListener("click", function() {
        clearSelected();
        selectedItem = 'domates';
        console.log("Domates clicked!");
        domatesImage.classList.add('selected');
    });

    marulImage.addEventListener("click", function() {
        clearSelected();
        selectedItem = 'marul';
        console.log("Marul clicked!");
        marulImage.classList.add('selected');
    });

    // Get reference to the city input field
    var cityInput = document.querySelector(".citySelect");

    // Add input event listener to the city input field
    cityInput.addEventListener("input", function() {
        selectedCity = this.value;
        console.log("Selected city:", selectedCity);
    });

    // Add keydown event listener to handle Enter key
    cityInput.addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            console.log("Enter key pressed. Selected city:", selectedCity);
            console.log("Selected item:", selectedItem);
            
            // Call the function to fetch weather data for the selected city
            fetchWeatherData(selectedCity);
        }
    });

    // Get reference to the enter div
    var enterDiv = document.getElementById("enterButton");

    // Add click event listener to the enter div
    enterDiv.addEventListener("click", function() {
        console.log("Enter div clicked. Selected city:", selectedCity);
        console.log("Selected item:", selectedItem);
        
        // Call the function to fetch weather data for the selected city
        fetchWeatherData(selectedCity);
    });
});
