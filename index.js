import { getAngle, calculateDistance, getCurrentPosition } from "./utils.js";

window.onload = async () => {
  // Closest pizza place
  const pizzaLat = 52.53291;
  const pizzaLong = 13.40868;

  const { lat, long } = await getCurrentPosition();
  const distance = calculateDistance(lat, long, pizzaLat, pizzaLong);
  document.getElementById("distance").innerHTML = `${
    Math.round(distance * 10) / 10
  } KM`;

  // Get the needle element
  const needle = document.getElementById("needle");

  // Listen for device orientation events
  window.addEventListener("deviceorientation", handleOrientation);

  // Function to handle device orientation events
  function handleOrientation(event) {
    // Get the alpha, beta, and gamma values from the event
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    const angle = getAngle(alpha, pizzaLat, pizzaLong, lat, long);
    // Rotate the needle based on the alpha value
    needle.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  }
};
