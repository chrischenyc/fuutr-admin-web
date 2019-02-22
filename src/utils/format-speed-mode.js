// speed mode (0: can't read; 1: low speed; 2: medium speed; 3: high speed;)

const speedModeString = (speedMode) => {
  switch (speedMode) {
    case 0:
      return 'no speed limit';

    case 1:
      return 'low: 6 km/h';

    case 2:
      return 'medium: 15 km/h';

    case 3:
      return 'high: 25 km/h';

    default:
      return 'unknown';
  }
};
export default speedModeString;
