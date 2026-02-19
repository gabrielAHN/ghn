export const getSortedMonths = (chartData: { month: string }[]): string[] => {
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (!chartData || chartData.length === 0) return [];
  const uniqueMonths = Array.from(new Set(chartData.map(item => item.month)));
  return uniqueMonths.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
};

export const secondsToTimeOfDay = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
