// Requete pour récupérer la météo suivant les coordonnées
function getWeather(coords){
    var requestWeather = new XMLHttpRequest();
    requestWeather.open(
        'GET',
        `https://www.prevision-meteo.ch/services/json/lat=${coords.latitude}lng=${coords.longitude}`
    )
    requestWeather.send();

    requestWeather.addEventListener('readystatechange', function(){
        if (this.readyState === 4 && this.status === 200){
            const weatherResponse = JSON.parse(this.responseText);
            if(weatherResponse){
                insertValuesInDom(weatherResponse, coords);
            }
        }
    });
}

async function insertValuesInDom(weather, coords){

    console.log(weather);
    console.log(coords);

    // Récupération des éléments du DOM
    const todayWeather = document.getElementById('todayWeather');
    const fourDaysWeather = document.getElementById('fourDaysWeather');

    // // Remise à zéro des éléments du DOM
    todayWeather.innerHTML = "";
    // fourDaysWeather.innerHTML = "";

    //////////////////////////

    // Création de la div contenant le nom de la ville et la date
    let cityAndDateDiv = document.createElement('div');
    cityAndDateDiv.setAttribute('id', 'cityAndDate');
    cityAndDateDiv.setAttribute('class', 'col-9');

    // Ajout de la div dans le DOM
    todayWeather.appendChild(cityAndDateDiv);

    //  Création du titre avec le nom de la ville avec un message d'attente
    let cityName= document.createElement('h2');
    cityName.textContent = "En attente du nom de la ville";
    getCityName(coords);

    //  Création du sous-titre avec la date
    let date = document.createElement('h3');
    date.innerHTML = weather.fcst_day_0.day_long + " " + weather.fcst_day_0.date;

    // Ajout du titre et du sous-titre dans la div
    cityAndDateDiv.append(cityName, date);

    //////////////////////////

    // Création de la div contenant la températures ainsi que le min et le max
    let todayTemperaturesDiv = document.createElement('div');
    todayTemperaturesDiv.setAttribute('id', 'todayTemperatures');
    todayTemperaturesDiv.setAttribute('class', 'col-3');

    // Ajout de la div dans le DOM
    todayWeather.appendChild(todayTemperaturesDiv);

    // Création du titre avec la température
    let todayTemperature = document.createElement('h2');
    todayTemperature.innerHTML = weather.current_condition.tmp + "°C"; 

    // Création du sous-titre avec le min et le max
    let todayMin = document.createElement('h3');
    let todayMax = document.createElement('h3');
    todayMin.innerHTML = "Min: " + weather.fcst_day_0.tmin + "°C";
    todayMax.innerHTML = "Max: " + weather.fcst_day_0.tmax + "°C";

    // Ajout du titre et du sous-titre dans la div
    todayTemperaturesDiv.append(todayTemperature, todayMin, todayMax);
    




}

// SetUp de la map
function initializeMap(){
    var map = L.map('map').setView([45.63711991370948, 4.389900223173396], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibmJhZG9pdCIsImEiOiJjbDJvc2d6M2MwMzc5M2RvMnhzandzeDJzIn0.XMhD9Mc17VJtUxraV4vlmg'
    }).addTo(map);

    // Ajout d'un marker
    map.on('click', function(e){
        var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        // console.log(e.latlng.lat, e.latlng.lng);

        var coords = {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
        }

        // Récupération de la météo
        getWeather(coords);

        // Suppression de l'ancien marker
        map.addEventListener('click', function(){
            map.removeLayer(newMarker);
        });

    });


    
}
// Initialisation de la map
initializeMap();


// Récupération du nom de la ville suivant les coordonnées
function getCityName(coords){
    var requestCityName = new XMLHttpRequest();

    requestCityName.open(
        'GET',
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=6d950262a17320046dbcb832cf9085a9`
    )

    requestCityName.send();

    requestCityName.addEventListener('readystatechange', function(){
        if (this.readyState === 4 && this.status === 200){
            const cityResponse = JSON.parse(this.responseText)[0];
            // console.log(cityResponse);
            if(cityResponse){              
                document.querySelector(`h2`).innerHTML = cityResponse.name;
            }
        }
    });
}