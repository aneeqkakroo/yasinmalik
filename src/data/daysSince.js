export function daysSince(dateString) {
  const startDate = new Date(dateString);
  const today = new Date();

  // strip time to avoid timezone drift
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today - startDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}