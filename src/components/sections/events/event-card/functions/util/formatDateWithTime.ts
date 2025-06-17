export default function formatDateWithTime(dateStart: Date, dateEnd?: Date) {
  const dateStr = formatDate(dateStart);
  const startTimeStr = formatTime(dateStart);

  // If we have an end date, show time range
  if (dateEnd) {
    const endTimeStr = formatTime(dateEnd);

    // Check if start and end are on the same day
    const sameDay = dateStart.toDateString() === dateEnd.toDateString();
    if (sameDay) {
      // Same day: "21 June 2025 10:00 AM - 4:30 PM"
      return `${dateStr}, ${startTimeStr} - ${endTimeStr}`;
    } else {
      // Different days: "21 June 2025 10:00 AM - 22 June 2025 4:30 PM"
      const endDateStr = formatDate(dateEnd);
      return `${dateStr}, ${startTimeStr} - ${endDateStr} ${endTimeStr}`;
    }
  }

  // Only show time if it's not midnight (00:00)
  if (dateStart.getHours() === 0 && dateStart.getMinutes() === 0) {
    return dateStr;
  }

  return `${dateStr} ${startTimeStr}`;
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
