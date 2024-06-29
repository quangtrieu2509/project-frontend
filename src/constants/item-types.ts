import { capitalize } from "../utils/Utils"

export const itemTypes = {
  ATTRACTION: 'attraction',
  LODGING: 'lodging',
  DINING: 'dining',
  ACTIVITY: 'activity',
  LOCATION: 'location'
}

export const pluralItemLabels = {
  ATTRACTION: 'Attractions',
  LODGING: 'Lodgings',
  DINING: 'Dinings',
  ACTIVITY: 'Activities',
  LOCATION: 'Locations'
}

export const keyTypes = {
  ATTRACTION: 'attractions',
  LODGING: 'lodgings',
  DINING: 'dinings',
  ACTIVITY: 'activities',
  LOCATION: 'locations'
}

export const iconTypes = {
  ALL: "house",
  ATTRACTION: "camera",
  LODGING: "building",
  DINING: "shop-window",
  ACTIVITY: "ticket-perforated",
  LOCATION: 'geo-alt'
}

export const categoryItems = [
  {
    type: itemTypes.ATTRACTION,
    key: "attractions",
    label: pluralItemLabels.ATTRACTION,
    singularLabel: capitalize(itemTypes.ATTRACTION),
    icon: iconTypes.ATTRACTION
  },
  {
    type: itemTypes.LODGING,
    key: "lodgings",
    label: pluralItemLabels.LODGING,
    singularLabel: capitalize(itemTypes.LODGING),
    icon: iconTypes.LODGING
  },
  {
    type: itemTypes.DINING,
    key: "dinings",
    label: pluralItemLabels.DINING,
    singularLabel: capitalize(itemTypes.DINING),
    icon: iconTypes.DINING
  },
  {
    type: itemTypes.ACTIVITY,
    key: "activities",
    label: pluralItemLabels.ACTIVITY,
    singularLabel: capitalize(itemTypes.ACTIVITY),
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
    type: itemTypes.LODGING,
    key: keyTypes.LODGING,
    label: pluralItemLabels.LODGING
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
