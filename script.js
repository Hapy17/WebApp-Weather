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
    fourDaysWeather.innerHTML = "";
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

    //////////////////////////

    // Création de la div contenant les détails de la météo
    let todayDetailsDiv = document.createElement('div');
    todayDetailsDiv.setAttribute('id', 'todayDetails');
    todayDetailsDiv.setAttribute('class', 'col-12');

    // Ajout de la div dans le DOM
    todayWeather.appendChild(todayDetailsDiv);

    // Création des cards contenant les détails de la météo
    // Card pour le logo
    let todayLogo = document.createElement('div');
    todayLogo.setAttribute('id', 'todayLogo');
    todayLogo.setAttribute('class', 'col-3 cardDetail');

    // Card pour l'humidité
    let todayHumidity = document.createElement('div');
    todayHumidity.setAttribute('id', 'todayHumidity');
    todayHumidity.setAttribute('class', 'col-3 cardDetail');

    // Card pour la pression atmosphérique
    let todayPressure = document.createElement('div');
    todayPressure.setAttribute('id', 'todayPressure');
    todayPressure.setAttribute('class', 'col-3 cardDetail');

    // Card pour la vitesse du vent
    let todayWindSpeed = document.createElement('div');
    todayWindSpeed.setAttribute('id', 'todayWindSpeed');
    todayWindSpeed.setAttribute('class', 'col-3 cardDetail');

    // Ajout des cards dans la div
    todayDetailsDiv.append(todayLogo, todayHumidity, todayPressure, todayWindSpeed);

    // Ajout d'un contenu dans les cards
    // Card pour le logo
    let todayLogoImg = document.createElement('img');
    let todayLogoDescription = document.createElement('p');
    todayLogoImg.src = weather.current_condition.icon_big;
    todayLogoDescription.innerHTML = weather.current_condition.condition;

    todayLogo.append(todayLogoImg, todayLogoDescription);

    // Card pour l'humidité
    let todayHumidityTitle = document.createElement('p');
    let todayHumidityValue = document.createElement('span');
    let todayHumidityUnit = document.createElement('p');
    todayHumidityTitle.innerHTML = "Humidité";
    todayHumidityValue.innerHTML = weather.current_condition.humidity;
    todayHumidityUnit.innerHTML = "%";

    todayHumidity.append(todayHumidityTitle, todayHumidityValue, todayHumidityUnit);

    // Card pour la pression atmosphérique
    let todayPressureTitle = document.createElement('p');
    let todayPressureValue = document.createElement('span');
    let todayPressureUnit = document.createElement('p');
    todayPressureTitle.innerHTML = "Pression";
    todayPressureValue.innerHTML = weather.current_condition.pressure;
    todayPressureUnit.innerHTML = "hPa";

    todayPressure.append(todayPressureTitle, todayPressureValue, todayPressureUnit);

    // Card pour le vent avec image
    let todayWindTitle = document.createElement('p');
    let todayWindLogo = document.createElement('span');
    let todayWindspeed = document.createElement('p');

    todayWindTitle.innerHTML = "Vent";
    todayWindLogo.innerHTML = weather.current_condition.wnd_dir;
    todayWindspeed.innerHTML = weather.current_condition.wnd_spd + " km/h";

    todayWindSpeed.append(todayWindTitle, todayWindLogo, todayWindspeed);

    //////////////////////////

    // Création de la div contenant les prévisions de la météo des 4 prochains jours
    let forecastDiv = document.querySelector('#fourDaysWeather');
    forecastDiv.setAttribute('class', 'row');


    // Création des cards contenant les prévisions de la météo des 4 prochains jours
    // Card pour le premier jour
    let firstDay = document.createElement('div');
    let firstDayName = document.createElement('h3');
    let firstDayDate = document.createElement('span');
    let firstDayLogo = document.createElement('img');
    let firstDayDescription = document.createElement('p');
    let firstDayTemperature = document.createElement('h4');
    
    firstDayName.innerHTML = weather.fcst_day_1.day_long;
    firstDayDate.innerHTML = weather.fcst_day_1.date;
    firstDayLogo.src = weather.fcst_day_1.icon;
    firstDayDescription.innerHTML = weather.fcst_day_1.condition;
    firstDayTemperature.innerHTML = weather.fcst_day_1.tmin + "°C / " + weather.fcst_day_1.tmax + "°C";

    firstDay.setAttribute('id', 'firstDay');
    firstDay.setAttribute('class', 'col-3 cardForecast');

    firstDay.append(firstDayName, firstDayDate, firstDayLogo, firstDayDescription, firstDayTemperature);

    // Card pour le deuxième jour
    let secondDay = document.createElement('div');
    let secondDayName = document.createElement('h3');
    let secondDayDate = document.createElement('span');
    let secondDayLogo = document.createElement('img');
    let secondDayDescription = document.createElement('p');
    let secondDayTemperature = document.createElement('h4');

    secondDayName.innerHTML = weather.fcst_day_2.day_long;
    secondDayDate.innerHTML = weather.fcst_day_2.date;
    secondDayLogo.src = weather.fcst_day_2.icon;
    secondDayDescription.innerHTML = weather.fcst_day_2.condition;
    secondDayTemperature.innerHTML = weather.fcst_day_2.tmin + "°C / " + weather.fcst_day_2.tmax + "°C";

    secondDay.setAttribute('id', 'secondDay');
    secondDay.setAttribute('class', 'col-3 cardForecast');

    secondDay.append(secondDayName, secondDayDate, secondDayLogo, secondDayDescription, secondDayTemperature);

    // Card pour le troisième jour
    let thirdDay = document.createElement('div');
    let thirdDayName = document.createElement('h3');
    let thirdDayDate = document.createElement('span');
    let thirdDayLogo = document.createElement('img');
    let thirdDayDescription = document.createElement('p');
    let thirdDayTemperature = document.createElement('h4');

    thirdDayName.innerHTML = weather.fcst_day_3.day_long;
    thirdDayDate.innerHTML = weather.fcst_day_3.date;
    thirdDayLogo.src = weather.fcst_day_3.icon;
    thirdDayDescription.innerHTML = weather.fcst_day_3.condition;
    thirdDayTemperature.innerHTML = weather.fcst_day_3.tmin + "°C / " + weather.fcst_day_3.tmax + "°C";

    thirdDay.setAttribute('id', 'thirdDay');
    thirdDay.setAttribute('class', 'col-3 cardForecast');

    thirdDay.append(thirdDayName, thirdDayDate, thirdDayLogo, thirdDayDescription, thirdDayTemperature);

    // Card pour le quatrième jour
    let fourthDay = document.createElement('div');
    let fourthDayName = document.createElement('h3');
    let fourthDayDate = document.createElement('span');
    let fourthDayLogo = document.createElement('img');
    let fourthDayDescription = document.createElement('p');
    let fourthDayTemperature = document.createElement('h4');
    
    fourthDayName.innerHTML = weather.fcst_day_4.day_long;
    fourthDayDate.innerHTML = weather.fcst_day_4.date;
    fourthDayLogo.src = weather.fcst_day_4.icon;
    fourthDayDescription.innerHTML = weather.fcst_day_4.condition;
    fourthDayTemperature.innerHTML = weather.fcst_day_4.tmin + "°C / " + weather.fcst_day_4.tmax + "°C";

    fourthDay.setAttribute('id', 'fourthDay');
    fourthDay.setAttribute('class', 'col-3 cardForecast');
    
    fourthDay.append(fourthDayName, fourthDayDate, fourthDayLogo, fourthDayDescription, fourthDayTemperature);

    // Ajout des cards dans la div
    forecastDiv.append(firstDay, secondDay, thirdDay, fourthDay);

    //////////////////////////






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