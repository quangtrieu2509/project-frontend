import { LabeledValue } from "antd/es/select"
import { diningTypes, iconTypes, itemTypes, lodgingTypes } from "../constants"
import { days } from "../constants/days"

export const getMonth = (time: any, short: boolean = false): string => {
  const rDate = new Date(time)
  const month = rDate.getMonth()
  switch (month) {
    case 0: return short ? "Jan" : "January"
    case 1: return short ? "Feb": "February"
    case 2: return short ? "Mar": "March"
    case 3: return short ? "Apr": "April"
    case 4: return "May"
    case 5: return short ? "Jun": "June"
    case 6: return short ? "Jul": "July"
    case 7: return short ? "Aug": "August"
    case 8: return short ? "Sep": "September"
    case 9: return short ? "Oct": "October"
    case 10: return short ? "Nov": "November"
    case 11: return short ? "Dec": "December"
    default: return ""
  }
}

export const getYear = (time: any): number => {
  const rDate = new Date(time)
  return rDate.getFullYear()
}

export const formatDate = (date: any, short: boolean = false): string => {
  const rDate = new Date(date)
  return `${getMonth(rDate, short)}  ${rDate.getDate()}, ${getYear(rDate)}`
}

export const formatTime = (date: any): string => {
  const rDate = new Date(date)
  const timeArr = rDate.toLocaleTimeString().split(" ")
  return `${timeArr[0].slice(0, -3)} ${timeArr[1]}`
}

export const formatDateTime = (
  date: any, hasTime: boolean = true, short: boolean = false
): string => {
  const rDate = new Date(date)
  const rTime = hasTime ? formatTime(rDate) : ""
  const now = new Date()
  if (rDate.getDay() === now.getDay() )
    return formatTime(rDate)
  else if (getYear(rDate) === getYear(now))
    return `${getMonth(rDate, short)}  ${rDate.getDate()} ${rTime}`
  else return `${formatDate(rDate, short)} ${rTime}`
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
  const tmp = [...address]
  const detail = tmp.reverse().join(", ")
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
    case itemTypes.LODGING: {
      return iconTypes.LODGING
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

export const filterFields = (
  input: string[], 
  data: Record<string, any>, 
  achieveValue: boolean = false 
) => {
  return input.map(e => {
    if (data[e]) {
      return achieveValue ? data[e] : e
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

export const coorsToViewState = (coors: number[], level: number = 2) => {
  return {
    latitude: coors[0],
    longitude: coors[1],
    zoom: level * 2 + 1
  }
}

export const generateCategories = (list: string[], type: string) => {
  switch(type) {
    case itemTypes.DINING: return filterFields(list, diningTypes, true)
    case itemTypes.LODGING: return filterFields(list, lodgingTypes, true)
    // more config
    default: return []
  }
}