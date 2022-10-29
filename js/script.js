// Variaveis
const apiKey = '2f2ab5c9032d0e0032b01fb45eff9ab8'
const apiCountryURL = 'https://countryflagsapi.com/png/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('.carregamento-api')

// Funções
const getWeatherData = async city => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL).then(function (res) {
        return res.json()
    })

    return res
}

const showWeatherData = async city => {
    const data = await getWeatherData(city)
    console.log(data)

    if (data.cod === '404') {
        return (weatherContainer.innerHTML =
            '<div id="error" class="not-found">Cidade não encontrada</div>')
    } else {
        return (weatherContainer.innerHTML = `<div id="weather-data" >
                <h2>
                    <i class="fa-solid fa-location-dot"></i>
                    <span id="city">${data.name}</span>
                    <img src="${
                        apiCountryURL + data.sys.country
                    }" alt="Bandeira do país" id="country" />
                </h2>
                <p id="temperature">
                    <span>${parseInt(data.main.temp)}</span>&deg;C
                </p>
                <div id="description-container">
                    <p id="description">${data.weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${
                        data.weather[0].icon
                    }.png" alt="Condições do tempo" id="weather-icon" />
                </div>
                <div id="details-container">
                    <p id="humidity">
                        <i class="fa-solid fa-droplet"></i>
                        <span>${data.main.humidity}%</span>
                    </p>
                    <p id="wind">
                        <i class="fa-solid fa-wind"></i>
                        <span>${data.wind.speed}km/h</span>
                    </p>
                </div>
            </div>`)
    }
}

// Eventos
searchBtn.addEventListener('click', e => {
    e.preventDefault()

    const city = cityInput.value

    showWeatherData(city)
})

cityInput.addEventListener('keyup', e => {
    if (e.code === 'Enter') {
        const city = e.target.value

        showWeatherData(city)
    }
})
