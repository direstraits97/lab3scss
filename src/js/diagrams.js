"use strict";

/**
 * @file Detta program skapar ett stapel- och cirkeldiagram som representerar de
 *  sex mest sökta kurserna samt fem mest sökta programmen på Mittuniversitetet.
 * Data hämtas från en extern json-fil och diagrammen skapas med hjälp av Chart.js.
 * @author Josefine Backlund <josefine.backlund@hotmail.com>
 */

document.addEventListener("DOMContentLoaded", collectData);

/**
 * Information för varje kurs och program
 *
 * @typedef {object} coursesAndPrograms
 * @property {string} type - Om det är en kurs eller ett program.
 * @property {string} name - Namnet på kursen eller programmet.
 * @property {string} applicantsTotal - Totala antalet med sökande.
 *
 */

/**
 * Hämtar json-objekt med kurser och program som skjutsas vidare till createBarChart och createPieChart.
 *
 * @async
 * @returns {Promise<void>}
 */

async function collectData() {
  const url =
    "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

  try {
    const response = await fetch(url);
    const coursesAndPrograms = await response.json();

    createBarChart(coursesAndPrograms);
    createPieChart(coursesAndPrograms);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

/**
 * Skapar ett stapeldiagram med de sex mest sökta kurserna på Mittuniversitetet HT25
 *
 * Datat filtreras ut om objektet är av typen "Kurs", därefter sorteras innehållet i stigande ordning
 * baserat på totala antalet sökningar för att sedan vända ordning med hjälp av reverse(). Med hjälp av slice()
 * får man ut de sex första objekten. Name och applicantsTotal pushas in i nya variabler för att sedan användas
 * i "labels" och "data" där diagrammet skapas.
 *
 * @param {coursesAndPrograms[]} data - Array med kurser och program
 * @returns {void}
 */

function createBarChart(data) {
  const barChart = document.querySelector("#barchart");
  let content = data.filter((courseType) => courseType.type === "Kurs");
  content.sort((a, b) => a.applicantsTotal - b.applicantsTotal).reverse();
  let sortedCourses = content.slice(0, 6);

  let courseNames = [];

  let courseApplicants = [];

  sortedCourses.forEach((sortedCourse) => {
    courseNames.push(sortedCourse.name);

    courseApplicants.push(sortedCourse.applicantsTotal);
  });

  new Chart(barChart, {
    type: "bar",
    data: {
      labels: courseNames,
      datasets: [
        {
          label: "Antal sökningar av kurs",
          data: courseApplicants,
          borderWidth: 1,
        },
      ],
    },
  });
}

/**
 * Skapar ett cirkeldiagram med de fem mest sökta programmen på Mittuniversitetet HT25.
 *
 * Datat filtreras ut om objektet är av typen "Program", därefter sorteras innehållet i stigande ordning
 * baserat på totala antalet sökningar för att sedan vända ordning med hjälp av reverse(). Med hjälp av slice()
 * får man ut de fem första objekten. Name och applicantsTotal pushas in i nya variabler för att sedan användas
 * i "labels" och "data" där diagrammet skapas.
 *
 * @param {coursesAndPrograms[]} data - Array med kurser och program
 * @returns {void}
 */

function createPieChart(data) {
  const pieChart = document.querySelector("#piechart");
  let content = data.filter((programType) => programType.type === "Program");
  content.sort((a, b) => a.applicantsTotal - b.applicantsTotal).reverse();
  let sortedPrograms = content.slice(0, 5);

  let programNames = [];

  let programApplicants = [];

  sortedPrograms.forEach((sortedProgram) => {
    programNames.push(sortedProgram.name);

    programApplicants.push(sortedProgram.applicantsTotal);
  });

  new Chart(pieChart, {
    type: "pie",
    data: {
      labels: programNames,
      datasets: [
        {
          label: "Antal sökningar av program",
          data: programApplicants,
          borderWidth: 1,
        },
      ],
    },
  });
}
