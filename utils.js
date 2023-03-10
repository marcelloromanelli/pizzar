// Helper function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Function to calculate the distance between two points using the Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export function getAngle(
  alpha,
  current_lat,
  current_lon,
  target_lat,
  target_lon
) {
  // Calculate the bearing angle from your current location to the target location
  const delta_lon = target_lon - current_lon;
  const y = Math.sin(delta_lon) * Math.cos(target_lat);
  const x =
    Math.cos(current_lat) * Math.sin(target_lat) -
    Math.sin(current_lat) * Math.cos(target_lat) * Math.cos(delta_lon);
  let bearing = Math.atan2(y, x);
  bearing = bearing * (180 / Math.PI);

  // Adjust the bearing angle to take into account your device's compass heading
  let angle = bearing - alpha;
  if (angle < 0) {
    angle += 360;
  }

  console.log(
    "Angle direction from current location to target location:",
    angle
  );
  return angle;
}

export async function getCurrentPosition() {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    lat: pos.coords.latitude,
    long: pos.coords.longitude,
  };
}
