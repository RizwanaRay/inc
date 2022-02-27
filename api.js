const searchBtn = document.getElementById("btn-search");
const inputText = document.getElementById("address");
const ipAddress = document.querySelector(".results-one");
const locationEL = document.querySelector(".results-two");
const timezone = document.querySelector(".results-three");
const isp = document.querySelector(".results-four");

// const url =
//   "https://geo.ipify.org/api/v1?apiKey=at_Hqft6rsFX1tPRMTVo3Gq9zaGTbGcj&ipAddress=8.8.8.8";

// fetch api  geolocation}
async function geolocation(address) {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=at_Hqft6rsFX1tPRMTVo3Gq9zaGTbGcj&domain=${address}`
    );
    const data = await res.json();
    addDataToDom(data);
    getMapLocation(data.location.lat, data.location.lng);
  } catch (err) {
    alert("ip address not found");
  }
}

// initial geolocation address
geolocation("192.212.174.101");
// Initial map location
getMapLocation(34.0614, -118.08162);

// Get map location
function getMapLocation(lat, lng) {
  document.getElementById("weathermap").innerHTML =
    "<div id='mapid' class='map' ></div>";

  const iconMarker = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [38, 45],
    iconAnchor: [22, 94],
  });

  var mymap = L.map("mapid").setView([lat, lng], 15);
  var marker = L.marker([lat, lng], {
    icon: iconMarker,
  }).addTo(mymap);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    }
  ).addTo(mymap);
}

// add data results to dom
function addDataToDom(data) {
  ipAddress.innerText = `${data.ip}`;

  locationEL.innerText = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`;

  timezone.innerText = `UTC${data.location.timezone}`;

  isp.innerText = `${data.isp}`;
}

searchBtn.addEventListener("click", () => {
  const address = inputText.value.trim();

  if (address === "" || address === null) {
    alert("Fill the fields");
  } else {
    geolocation(address);
    inputText.value = "";
  }
});

