export function isSameDay(
  date1: Date,
  date2: Date
) {

  return (
    date1.getFullYear() ===
      date2.getFullYear() &&

    date1.getMonth() ===
      date2.getMonth() &&

    date1.getDate() ===
      date2.getDate()
  );
}

export function isYesterday(
  date: Date
) {

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  return isSameDay(
    date,
    yesterday
  );
}