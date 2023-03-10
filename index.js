import { getAngle, calculateDistance, getCurrentPosition } from "./utils.js";

window.onload = async () => {
  function permission() {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      // (optional) Do something before API request prompt.
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          // (optional) Do something after API prompt dismissed.
          if (response == "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      alert("DeviceMotionEvent is not defined");
    }
  }

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

  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    const grantAccess = document.getElementById("grant-access");
    grantAccess.addEventListener("click", permission);
  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }

  // Function to handle device orientation events
  function handleOrientation(event) {
    // Get the alpha, beta, and gamma values from the event
    const alpha = event.alpha;

    const angle = getAngle(alpha, pizzaLat, pizzaLong, lat, long);
    // Rotate the needle based on the alpha value
    needle.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  }
};
