export const rideLink = _id => `/rides/${_id}`;
export const userLink = _id => `/users/${_id}`;
export const vehicleLink = _id => `/vehicles/${_id}`;
export const vehicleEditLink = _id => `/vehicles/${_id}/edit`;
export const paymentLink = _id => `/payments/${_id}`;
export const issueLink = _id => `/issues/${_id}`;
export const coordinatesMapLink = coordinates => `https://maps.google.com/maps?q=loc:${coordinates[1]},${coordinates[0]}`;
export const stripePaymentLink = id => `https://dashboard.stripe.com/test/payments/${id}`;
