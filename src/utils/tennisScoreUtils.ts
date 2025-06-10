export const pointsToDisplay = (points: number, advantage: boolean) => {
  if (advantage) return "Adv";
  switch (points) {
    case 0:
      return "0";
    case 1:
      return "15";
    case 2:
      return "30";
    case 3:
      return "40";
    default:
      return "";
  }
};
