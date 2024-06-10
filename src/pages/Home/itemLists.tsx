import "bootstrap-icons/font/bootstrap-icons.css"
import { iconTypes, itemTypes, pluralItemLabels } from "../../constants";
export const categoryItems = [
  {
    key: 'all',
    label: `All`,
    icon: <i className={`bi bi-${iconTypes.ALL} text-lg`}/>
  },
  {
    key: itemTypes.ATTRACTION,
    label: pluralItemLabels.ATTRACTION,
    icon: <i className={`bi bi-${iconTypes.ATTRACTION} text-lg`}/>,
  },
  {
    key: itemTypes.LODGING,
    label: pluralItemLabels.LODGING,
    icon: <i className={`bi bi-${iconTypes.LODGING} text-lg`}/>,
  },
  {
    key: itemTypes.DINING,
    label: pluralItemLabels.DINING,
    icon: <i className={`bi bi-${iconTypes.DINING} text-lg`}/>,
  },
  {
    key: itemTypes.ACTIVITY,
    label: pluralItemLabels.ACTIVITY,
    icon: <i className={`bi bi-${iconTypes.ACTIVITY} text-lg`}/>,
  },
];

export const categoryPhrases: {title: string, placeHolder: string}[] = [
  {
    title: 'Where to?',
    placeHolder: 'Places to go, stay, things to do,...'
  },
  {
    title: 'Somewhere to check-in ',
    placeHolder: 'Beaches, Islands, Museums,...'
  },
  {
    title: 'Find places to stay',
    placeHolder: 'Hotels, Resorts, Dorm,...'
  },
  {
    title: 'Eat something delicious',
    placeHolder: 'Restaurants, Coffee shops,...'
  },
  {
    title: 'Do something fun',
    placeHolder: 'Tours, Hiking, Surfing...'
  }
]

export const getCatPhrases = (key: string) => {
  switch (key) {
    case categoryItems[4].key: return categoryPhrases[4]
    case categoryItems[3].key: return categoryPhrases[3]
    case categoryItems[2].key: return categoryPhrases[2]
    case categoryItems[1].key: return categoryPhrases[1]
    default: return categoryPhrases[0]
  }
}