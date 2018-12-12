export const rideLink = _id => `/rides/${_id}`;
export const userLink = _id => `/users/${_id}`;
export const vehicleLink = _id => `/vehicle/${_id}`;
export const paymentLink = _id => `/payments/${_id}`;
export const coordinatesMapLink = coordinates => `https://maps.google.com/maps?q=loc:${coordinates[1]},${coordinates[0]}`;
export const stripePaymentLink = id => `https://dashboard.stripe.com/test/payments/${id}`;
