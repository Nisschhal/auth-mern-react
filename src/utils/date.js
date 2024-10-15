const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "Invalid Date!";

  // Format the date
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default formatDate;
