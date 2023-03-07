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
            // console.log(weatherResponse);
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
    const cityName = document.getElementById('cityName');

    cityName.classList.add('placeholder')

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
        // Récupération du nom de la ville
        getCityName(coords);

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
                document.getElementById('cityName').innerHTML = cityResponse.name;
            }
        }
    });
}