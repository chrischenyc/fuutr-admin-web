// speed mode (0: can't read; 1: low speed; 2: medium speed; 3: high speed;)

const speedModeString = (speedMode) => {
  switch (speedMode) {
    case 0:
      return 'n/a';

    case 1:
      return 'low speed';

    case 2:
      return 'medium speed';

    case 3:
      return 'high speed';

    default:
      return 'unknown';
  }
};
export default speedModeString;
