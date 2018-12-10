const distanceString = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${Number(meters / 1000).toFixed(2)} km`;
};
export default distanceString;
