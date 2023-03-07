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
    
}
// Initialisation de la map
initializeMap();