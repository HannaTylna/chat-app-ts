export const dateTimeFormat = (number: number): string => {
  const datetime = new Date(number)
  const hour = datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours()
  const minute = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes()
  const date = datetime.toDateString()
  const formatedDatetime = `${hour}:${minute}, ${date}`
  return formatedDatetime
}
