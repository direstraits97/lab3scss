"use strict";

//Utvalda queryselectors som ska användas.
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#navbar");
  const openMenu = document.querySelector("#openmenu");
  const closeMenu = document.querySelector("#closemenu");
  const startMoving = document.querySelector("#flyingobjectstart");
  const movingObject = document.querySelector("#movingobject");

  if (startMoving) {
    startMoving.addEventListener("click", runAnimation);
  }

  //Funktion som skiftar mellan pågående animering samt pausad.
  function runAnimation() {
    if (movingObject.style.animationPlayState == "running") {
      movingObject.style.animationPlayState = "paused";
    } else {
      movingObject.style.animationPlayState = "running";
    }
  }

  //Oöppnad navigering kommer ej störa skärmläsare.
  if (window.innerWidth < 1024) {
    nav.setAttribute("inert", "");
  } else {
    nav.removeAttribute("inert");
  }

  //Eventlyssnare som tar fram och skjuter undan navigering samt lägger till och tar bort aria-labels med värden som underlättar för skärmläsare.
  openMenu.addEventListener("click", () => {
    nav.classList.add("show");
    openMenu.setAttribute("aria-expanded", "true");
    nav.removeAttribute("inert");
  });
  closeMenu.addEventListener("click", () => {
    nav.classList.remove("show");
    openMenu.setAttribute("aria-expanded", "false");
    nav.setAttribute("inert", "");
  });
});
