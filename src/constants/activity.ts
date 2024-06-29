type Item = Record<string, any>

export const durationUnits: Item = {
  "m": "minute(s)",
  "h": "hour(s)",
  "d": "day(s)",
  "w": "week(s)"
}

export type Duration = {
  value?: number,
  unit: string
}

export const defaultDuration = { unit: "h" }

export const activityTypes: Item = {
  "air-tour": "Air Tour",
  "bike-tour": "Bike Tour",
  "biking-trail": "Biking Trail",
  "boat-rental": "Boat Rental",
  "boat-tour": "Boat Tour",
  "bus-tour": "Bus Tour",
  "city-tour": "City Tour",
  "climbing-tour": "Climbing Tour",
  "comedy-club": "Comedy Club",
  "concert": "Concert",
  "cultural-event": "Cultural Event",
  "cultural-tour": "Cultural Tour",
  "day-trip": "Day Trip",
  "festival": "Festival",
  "food-tour": "Food Tour",
  "gear-rental": "Gear Rental",
  "hicamp-tour": "Hiking & Camping Tour",
  "hiking-trail": "Hiking Trail",
  "his-tour": "Historical Tour",
  "kayak-canoe": "Kayaking & Canoeing",
  "motor-tour": "Motor Tour",
  "mday-tour": "Multi-day Tour",
  "night-tour": "Night Tour",
  "private-tour": "Private Tour",
  "scube-snorkel": "Scuba & Snorkeling",
  "sightseeing-tour": "Sightseeing Tour",
  "ski-snow-tour": "Ski & Snow Tour",
  "skydiving": "Skydiving",
  "tour": "Tour"
}
