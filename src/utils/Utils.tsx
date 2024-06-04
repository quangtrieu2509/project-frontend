import { LabeledValue } from "antd/es/select"
import { iconTypes, itemTypes } from "../constants"
import { days } from "../constants/days"

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

export const generateTimeList2 = () => {
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const minutes = ["00", "15", "30", "45"]
  return Array.from({ length: 96 }).map((_, i) => {
    let hour = hours[Math.trunc(i/4 < 12 ? i/4 : (i/4 - 12))]
    let minute = minutes[i%4]
    let period = i/4 < 12 ? "AM" : "PM"
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

export const compareFileChanges = (newList: any[]) => {
  let uploads: any[] = []
  let remains: any[] = []
  newList.forEach(ne => {
    if (ne.uid?.includes("rc-upload")) uploads.push(ne)
    else remains.push(ne)
  })
  return { uploads, remains }
}

export const filterFields = (input: string[], data: Record<string, any>) => {
  return input.map(e => {
    if (data[e]) {
      return e
    } else return data[e]
  }).filter(e => e)
}

export const generateHoursPreview = (hours: any[]) => {
  return days.map((e, i) => (
    <div key={i} className="flex mb-1">
      <div className="w-40">{e.name}</div>
      <div>{hours[i] ? `${hours[i]?.open} - ${hours[i]?.close}` : "Close all day"}</div>
    </div>
  ))
}

export const locationToAncestors = (loc: string) => {
  const { ancestors, ...rest } = JSON.parse(loc)
  delete rest.image
  return [{ ...rest }, ...ancestors]
}