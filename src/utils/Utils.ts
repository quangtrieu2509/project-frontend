import { LabeledValue } from "antd/es/select"
import { iconTypes, itemTypes } from "../constants"

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

export const generateLast12Months = (): LabeledValue[] => {
  const now = new Date()
  now.setDate(1)
  const list: LabeledValue[] = []
  for (let i=0; i<=11; i++) {
    list.push({
      value: now.toString(),
      label: `${getMonth(now)} ${getYear(now)}`
    })
    now.setMonth(now.getMonth() - 1)
  }

  return list
}

export const generateAddress = (ancestors: any[], address: string[]) => {
  const detail = address.join(", ")
  return `${detail}, ${ancestors.map(item => item.name).slice(0, 2).join(", ")}`
}

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export const roundRate = (r: number) => Math.round(r * 2) / 2

export const generateTimeList = () => {
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return Array.from({ length: 48 }).map((_, i) => {
    let hour = hours[Math.trunc(i/2 < 12 ? i/2 : (i/2 - 12))]
    let minute = i%2 ? "30" : "00"
    let period = i/2 < 12 ? "AM" : "PM"
    return `${hour}:${minute} ${period}`
  })
}

export const generateIconType = (type: string) => {
  switch (type) {
    case itemTypes.ACCOMM: {
      return iconTypes.ACCOMM
    }
    case itemTypes.ATTRACTION: {
      return iconTypes.ATTRACTION
    }
    case itemTypes.DINING: {
      return iconTypes.DINING
    }
    case itemTypes.ACTIVITY: {
      return iconTypes.ACTIVITY
    }
    default: return ""
  }
}