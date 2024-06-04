export const itemTypes = {
  ATTRACTION: 'attraction',
  ACCOMM: 'accomm',
  DINING: 'dining',
  ACTIVITY: 'activity',
  LOCATION: 'location'
}

const singularItemLabels = {
  ATTRACTION: 'Attraction',
  ACCOMM: 'Accommodation',
  DINING: 'Dining',
  ACTIVITY: 'Activity',
  LOCATION: 'Location'
}

const pluralItemLabels = {
  ATTRACTION: 'Attractions',
  ACCOMM: 'Accommodations',
  DINING: 'Dinings',
  ACTIVITY: 'Activities',
  LOCATION: 'Locations'
}

const keyTypes = {
  ATTRACTION: 'attractions',
  ACCOMM: 'accommodations',
  DINING: 'dinings',
  ACTIVITY: 'activities',
  LOCATION: 'locations'
}

export const iconTypes = {
  ALL: "house",
  ATTRACTION: "camera",
  ACCOMM: "building",
  DINING: "shop-window",
  ACTIVITY: "ticket-perforated",
  LOCATION: 'geo-alt'
}

export const categoryItems = [
  {
    type: itemTypes.ATTRACTION,
    key: "attractions",
    label: pluralItemLabels.ATTRACTION,
    singularLabel: singularItemLabels.ATTRACTION,
    icon: iconTypes.ATTRACTION
  },
  {
    type: itemTypes.ACCOMM,
    key: "accommodations",
    label: pluralItemLabels.ACCOMM,
    singularLabel: singularItemLabels.ACCOMM,
    icon: iconTypes.ACCOMM
  },
  {
    type: itemTypes.DINING,
    key: "dinings",
    label: pluralItemLabels.DINING,
    singularLabel: singularItemLabels.DINING,
    icon: iconTypes.DINING
  },
  {
    type: itemTypes.ACTIVITY,
    key: "activities",
    label: pluralItemLabels.ACTIVITY,
    singularLabel: singularItemLabels.ACTIVITY,
    icon: iconTypes.ACTIVITY
  }
]

export const filterItems = [
  {
    type: "all",
    key: "all",
    label: "All"
  },
  {
    type: itemTypes.ATTRACTION,
    key: keyTypes.ATTRACTION,
    label: pluralItemLabels.ATTRACTION
  },
  {
    type: itemTypes.ACCOMM,
    key: keyTypes.ACCOMM,
    label: "Accomms"
  },
  {
    type: itemTypes.DINING,
    key: keyTypes.DINING,
    label: pluralItemLabels.DINING
  },
  {
    type: itemTypes.ACTIVITY,
    key: keyTypes.ACTIVITY,
    label: pluralItemLabels.ACTIVITY
  }
]
