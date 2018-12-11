export const rideLink = _id => `/rides/${_id}`;
export const userLink = user => `/users/${user}`;
export const vehicleLink = scooter => `/vehicle/${scooter}`;
export const coordinatesMapLink = coordinates => `https://maps.google.com/maps?q=loc:${coordinates[1]},${coordinates[0]}`;
