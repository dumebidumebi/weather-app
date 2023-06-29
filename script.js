const apiKey = '4024a44129744b885c3feb366041015f';
const container = document.querySelector('.container');
const searchText = document.querySelector(".searchtext");
const button = document.querySelector(".button");
const searchBox = document.querySelector(".searchbox");
const weatherBox = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const CityName = document.querySelector(".cityName");
const weatherResults = document.querySelector(".weatherResults");
const myImage = document.getElementsByClassName('img')[0];
const description = document.querySelector('.description');
const newApi = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41'
const image = document.querySelector('.image');



const city = document.querySelector('.searchtext').value;
const lower = city.toLowerCase();

async function fetchWeatherData(lower) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${lower}&units=metric&appid=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        console.log(weatherData.weather)
        
        CityName.innerHTML = data.name;
        CityName.classList.add('fadeIn');
        weatherBox.classList.add('fadeIn');
        temp.classList.add('fadeIn');

        container.style.height = '500px';
  // searchBox.style.opacity = 0;
  
  searchBox.style.display = "none";
  weatherBox.style.display = "flex"
  weatherBox.style.opacity = 0;
  weatherBox.style.height = '200px';
  
  weatherResults.style.display = "flex"

setTimeout(function() {
  weatherBox.style.opacity = 100;
  description.innerHTML = weatherData.weather[0].description;
  switch (weatherData.weather[0].main) {
          case 'Clear':
            image.src = 'images/clear.png';
            break;

          case 'Rain':
            image.src = 'images/rain.png';
            break;

          case 'Snow':
            image.src = 'images/snow.png';
            break;

          case 'Clouds':
            image.src = 'images/cloud.png';
            break;

          case 'Haze':
            image.src = 'images/mist.png';
            break;

          default:
            image.src = 'images/mist.png';
            image.style.opacity = 0;
        }
  image.style.opacity = 100;
}, 500);
        

      } else {
        throw new Error(weatherResponse.statusText);
      }
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}




button.addEventListener('mouseout', () => {
  myImage.style.mixBlendMode = 'normal';
  myImage.style.filter = "none"
});


searchText.addEventListener("keydown", function(event) {
  // check if the key pressed is the Enter key (key code 13)
  if (event.keyCode === 13) {
    const city = document.querySelector('.searchtext').value;
    const lower = city.toLowerCase();
    // do something, such as submitting a form or performing a search
    fetchWeatherData(lower)
  }
});

button.addEventListener('mouseover', () => {
  myImage.style.mixBlendMode = 'screen';
  myImage.style.filter = "invert(100%)"
});



button.addEventListener('click', () => {
  button.style.backgroundColor = 'blue';

  const city = document.querySelector('.searchtext').value;
  const lower = city.toLowerCase();



  fetchWeatherData(lower)
});
