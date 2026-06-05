export default function formatDateWithTime(
  startDate: Date,
  endDate?: Date,
): string {
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleDateString("en-US", { month: "long" });
  const startYear = startDate.getFullYear();
  const startTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (!endDate) {
    return `${startDay} ${startMonth} ${startYear}, ${startTime}`;
  }

  const endTime = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${startDay} ${startMonth} ${startYear}, ${startTime} - ${endTime}`;
}
