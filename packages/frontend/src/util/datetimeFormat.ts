export const dateTimeFormat = (date: string): string => {
  const datetime = new Date(date)
  const hour = datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours()
  const minute = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes()
  const dateformat = datetime.toDateString()
  const formatedDatetime = `${hour}:${minute}, ${dateformat}`
  return formatedDatetime
}
