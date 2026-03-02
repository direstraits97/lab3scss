"use strict";

let map = L.map("map").setView([62.39129, 17.3063], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy;OpenStreetMap",
}).addTo(map);
const markersLayer = L.layerGroup().addTo(map);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#searchbutton")
    .addEventListener("click", collectData);
});

async function collectData() {
  const searchValue = document.querySelector("#search").value;

  const url =
    "https://geocoding-api.open-meteo.com/v1/search?count=10&language=en&format=json&name=" +
    searchValue;

  try {
    const response = await fetch(url);
    const mapData = await response.json();

    locationWithMarker(mapData);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

function locationWithMarker(data) {
  markersLayer.clearLayers();
  let firstResult = data.results[0];

  L.marker([firstResult.latitude, firstResult.longitude]).addTo(markersLayer);
  map.panTo([firstResult.latitude, firstResult.longitude]);
}
