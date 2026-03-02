"use strict";

//Utvalda queryselectors som ska användas.
document.addEventListener("DOMContentLoaded", () => {
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
});
