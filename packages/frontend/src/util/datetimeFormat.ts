export const dateTimeFormat = (date: string): string => {
  const dateTime = new Date(date)
  const hour = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()
  const minute = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()
  const dateformat = dateTime.toDateString()
  const formattedDateTime = `${hour}:${minute}, ${dateformat}`
  return formattedDateTime
}
