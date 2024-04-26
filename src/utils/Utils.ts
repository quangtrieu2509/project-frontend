export const getMonth = (time: any): string => {
  const rDate = new Date(time)
  const month = rDate.getMonth()
  switch (month) {
    case 0: return "January"
    case 1: return "February"
    case 2: return "March"
    case 3: return "April"
    case 4: return "May"
    case 5: return "June"
    case 6: return "July"
    case 7: return "August"
    case 8: return "September"
    case 9: return "October"
    case 10: return "November"
    case 11: return "December"
    default: return ""
  }
}

export const getYear = (time: any): number => {
  const rDate = new Date(time)
  return rDate.getFullYear()
}

export const formatDate = (date: any): string => {
  const rDate = new Date(date)
  return `${getMonth(rDate)}  ${rDate.getDay()}, ${getYear(rDate)}`
}