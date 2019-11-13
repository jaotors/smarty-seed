export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function formatDays(date) {
  const dateDeadline = new Date(date);
  const dateToday = new Date();
  const day = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs((dateToday - dateDeadline) / day));
}

export const computePercent = (current, goal) =>
  current >= goal ? 100 : ((current / goal) * 100).toFixed(2);
