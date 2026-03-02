"use strict";

/**
 * @file Detta program skapar en karta med hjälp av Leaflet och en marker placeras ut
 * med hjälp av kordinater från Geocoding API.
 * @author Josefine Backlund <josefine.backlund@hotmail.com>
 */

/* Här skapas en karta tack vare länkar i html-dokumentet från leaflet. Sundsvall är standardpositionen kartan startas ifrån. */
let map = L.map("map").setView([62.39129, 17.3063], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy;OpenStreetMap",
}).addTo(map);
//En lagergrupp skapas här som senare kommer rensas för att bara ge plats åt en markör i taget.
const markersLayer = L.layerGroup().addTo(map);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#searchbutton").addEventListener("click", getData);
});

/**
 * Lokaliseringsinformation för platssökning
 *
 * @typedef {object} mapData
 * @property {number} latitude - Linje parallell med ekvatorn
 * @property {number} longitude - Linje från pol till pol
 */

/**
 * Hämtar lokaliseringsinformation i json-format som skickas in i locationWithMarker-funktionen.
 *
 * @async
 * @returns {Promise<void>}
 */
async function getData() {
  const searchValue = document.querySelector("#search").value;

  //OBS! Ibland kan det bli lite tokiga resultat p.g.a. language=en. Fanns ej på svenska.
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?count=10&language=en&format=json&name=" +
    searchValue;
  //Sökvärdet adderas här efter "name=" innan det konverteras till json längre ner i funktionen.

  try {
    const response = await fetch(url);
    const mapData = await response.json();

    locationWithMarker(mapData);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

/**
 * Panorerar kartan till det inmatade värdet i textrutan tillsammans med en markör för platsen.
 *
 * @param {mapData[]} data - Array med positionsvärden
 * @returns {void}
 */
function locationWithMarker(data) {
  //Med clearLayers kan markören rensas bort varje gång funktionen körs.
  markersLayer.clearLayers();
  //Jag väljer index 0 under results så bara det första platsförslaget markeras.
  let firstResult = data.results[0];

  //Här skapas en marker som placeras ut tillsammans med att kartan flyttas till samma plats.
  L.marker([firstResult.latitude, firstResult.longitude]).addTo(markersLayer);
  map.panTo([firstResult.latitude, firstResult.longitude]);
}
