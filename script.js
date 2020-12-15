// Write your JavaScript code here!

window.addEventListener("load", function() {
   const form = document.querySelector("form");
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         console.log(json);
         document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[0].name}</li>
                  <li>Diameter: ${json[0].diameter}</li>
                  <li>Star: ${json[0].star}</li>
                  <li>Distance from Earth: ${json[0].distance}</li>
                  <li>Number of Moons: ${json[0].moons}</li>
               </ol>
               <img src="${json[0].image}">
               `
      });
   });

   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.getElementById("pilotName");
      let copilotNameInput = document.getElementById("copilotName");
      let fuelLevelInput = document.getElementById("fuelLevel");
      let cargoMassInput = document.getElementById("cargoMass");
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(Number(pilotNameInput.value)) === false || isNaN(Number(copilotNameInput.value)) === false) {
         alert("The Pilot Name and Copilot Name cannot be a numbers")
         event.preventDefault();
      } else if (isNaN(Number(fuelLevelInput.value)) === true || isNaN(Number(cargoMassInput.value)) === true) {
         alert("The Fuel Level and Cargo Mass must only be numbers!")
         event.preventDefault();
      };
      
      //update pilot names
      document.getElementById("pilotStatus").innerText = `Pilot Ready: ${pilotNameInput.value}`;
      document.getElementById("copilotStatus").innerText = `Copilot Ready: ${copilotNameInput.value}`;
      
      // check fuel level and total mass
      if (fuelLevelInput.value < 10000 || cargoMassInput.value > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("faultyItems").innerText = "Fuel Level must be above 10,000 and Cargo Mass must be under 10,000.";
         document.getElementById("launchStatus").innerText = "Shuttle not ready for launch.";
         document.getElementById("launchStatus").style.color = "red";
         event.preventDefault();
      } else {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").innerText = "Shuttle is ready for launch!";
         event.preventDefault();
      };
   });
});



