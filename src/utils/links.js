export const rideLink = _id => `/rides/${_id}`;
export const userLink = _id => `/users/${_id}`;
export const vehicleLink = _id => `/vehicle/${_id}`;
export const paymentLink = _id => `/payments/${_id}`;
export const coordinatesMapLink = coordinates => `https://maps.google.com/maps?q=loc:${coordinates[1]},${coordinates[0]}`;
