# Cities & Weather App
- This is a React-based web application that displays a list of cities and their details like population, country, and timezone, using data from a public API. It also allows users to search for cities and view their current weather by clicking on the city name, using data from the OpenWeatherMap API.

# Features
- Cities Table: Displays a paginated table of cities with country, population, and timezone information.
- City Search: Includes an autocomplete search feature to filter cities.
- Sorting: Allows sorting the cities by name, country, timezone, and population.
- Infinite Scroll: Loads more cities as the user scrolls down the page.
- Weather Information: Clicking on a city takes the user to a weather page displaying real-time weather data of that city.

# Technology Stack

- Frontend: React, React Router, Bootstrap, React Select for UI components
-API Calls: Axios
- Weather Data: OpenWeatherMap API
- City Data: Opendatasoft API

# Getting Started

1. Clone the repository
bash
- git clone https://github.com/dhruvjaiswal2981/Weather-Forecast.git
cd app-weather

2. Install dependencies
Ensure you are in the project directory and install all required dependencies using npm:

bash
- npm install

3. Run the application
After setting up the environment, you can start the application by running:

bash
- npm start

# Usage
- City Table: The main page displays a list of cities. You can search for a city in the search bar, which will filter the list.
- Weather Information: Clicking on a city name will redirect you to a new page displaying the city's weather data like temperature, humidity, wind speed, and more.
- Infinite Scroll: As you scroll down the cities page, more cities will load automatically.
- Sorting: Click on any column header (city name, country, timezone, or population) to sort the data.

# API Details
1. Cities Data API:
The city data is fetched from Opendatasoft's Geonames dataset. Each city includes the following information:

- City Name
- Country
- Population
- Timezone

# Custom Styles
- City Table: The city table includes custom sorting and infinite scroll with Bootstrap styles.
- Weather Page: The weather page has a dynamic background based on the current weather (e.g., sunny, rainy, cloudy).
- Search Dropdown: A custom-styled city search dropdown, which highlights the selected city.

# Future Improvements
- Pagination for better data handling
- Improved error handling and user feedback
- Additional weather details such as forecasts or maps

# Deployment link 

- URL Link :- 