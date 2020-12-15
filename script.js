window.addEventListener("load", function() {
   const form = document.querySelector("form");
   let randomPlanet = Math.floor(Math.random()*6);
   console.log(randomPlanet);
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         console.log(json);
         document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[randomPlanet].name}</li>
                  <li>Diameter: ${json[randomPlanet].diameter}</li>
                  <li>Star: ${json[randomPlanet].star}</li>
                  <li>Distance from Earth: ${json[randomPlanet].distance}</li>
                  <li>Number of Moons: ${json[randomPlanet].moons}</li>
               </ol>
               <img src="${json[randomPlanet].image}">
               `
      });
   });

   form.addEventListener("submit", function(event) {
      document.getElementById("faultyItems").style.visibility = "visible";
      event.preventDefault();
      let pilotNameInput = document.getElementById("pilotName");
      let copilotNameInput = document.getElementById("copilotName");
      let fuelLevelInput = document.getElementById("fuelLevel");
      let cargoMassInput = document.getElementById("cargoMass");
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
      } else if (isNaN(Number(pilotNameInput.value)) === false || isNaN(Number(copilotNameInput.value)) === false) {
         alert("The Pilot Name and Copilot Name cannot be numbers")
      } else if (isNaN(Number(fuelLevelInput.value)) === true || isNaN(Number(cargoMassInput.value)) === true) {
         alert("The Fuel Level and Cargo Mass must only be numbers!")
      };
      
      //update pilot names
      document.getElementById("pilotStatus").innerText = `Pilot Ready: ${pilotNameInput.value}`;
      document.getElementById("copilotStatus").innerText = `Copilot Ready: ${copilotNameInput.value}`;
      
      // check fuel level and total mass
      if (fuelLevelInput.value < 10000) {
         document.getElementById("fuelStatus").innerText = "Fuel level is too low for launch!";
         document.getElementById("launchStatus").innerText = "Shuttle not ready for launch.";
         document.getElementById("launchStatus").style.color = "red";
      } else if (cargoMassInput.value > 10000) {
         document.getElementById("cargoStatus").innerText = "Cargo mass is too high for launch!";
         document.getElementById("launchStatus").innerText = "Shuttle not ready for launch.";
         document.getElementById("launchStatus").style.color = "red";
      } else {
         document.getElementById("fuelStatus").innerText = "Fuel level high enough for launch";
         document.getElementById("cargoStatus").innerText = "Cargo mass low enough for launch"
         document.getElementById("launchStatus").innerText = "Shuttle is ready for launch!";
         document.getElementById("launchStatus").style.color = "green";
      };
   });
});



