import "bootstrap-icons/font/bootstrap-icons.css"
export const categoryItems = [
  {
    key: 'all',
    label: `All`,
    icon: <i className="bi bi-house text-lg"></i>
  },
  {
    key: 'attractions',
    label: 'Attractions',
    icon: <i className="bi bi-camera text-lg"></i>,
  },
  {
    key: 'accommodations',
    label: 'Accommodations',
    icon: <i className="bi bi-building text-lg"></i>,
  },
  {
    key: 'dinings',
    label: 'Dinings',
    icon: <i className="bi bi-shop-window text-lg"></i>,
  },
  {
    key: 'activities',
    label: 'Activities',
    icon: <i className="bi bi-ticket-perforated text-lg"></i>,
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
    case '5': return categoryPhrases[4]
    case '4': return categoryPhrases[3]
    case '3': return categoryPhrases[2]
    case '2': return categoryPhrases[1]
    default: return categoryPhrases[0]
  }
}