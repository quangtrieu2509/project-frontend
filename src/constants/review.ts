export const rateLevelArr = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent']

type RateLevel = Record<number, string>
export const rateLevelObj: RateLevel = {
  1: 'Terrible', 
  2: 'Poor', 
  3: 'Average', 
  4: 'Good', 
  5: 'Excellent'
}

export const rateDetail = [
  {
    name: "All",
    key: "all"
  },
  {
    name: "Excellent",
    key: "excellent"
  },
  {
    name: "Good",
    key: "good"
  },
  {
    name: "Average",
    key: "average"
  },
  {
    name: "Poor",
    key: "poor"
  },
  {
    name: "Terrible",
    key: "terrible"
  },
  {
    name: "Image Included",
    key: "image-included"
  }
]