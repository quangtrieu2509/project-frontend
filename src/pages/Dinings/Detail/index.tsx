import { Breadcrumb, Carousel, Rate, Typography } from "antd"
import { ROUTES } from "../../../constants"
import "./index.style.scss"
import ReviewList from "../../../components/Review/ReviewList"
import { useState } from "react"

const location = [
  {
    id: "12345",
    name: "Hanoi",
    slug: "hanoi",
    type: "level-3"   
  },
  {
    id: "1234",
    name: "Vietnam",
    slug: "vietnam",
    type: "level-2"
  },
  {
    id: "1234",
    name: "Asia",
    slug: "asia",
    type: "level-1"
  }
]

export default function Detail() {
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)

  
  const item = {
    id: "abcxyz",
    name: "Monica's Mercato & Salumeria",
    review: {
      rate: 4.5,
      total: 200
    },
    types: ["Restaurants", "Coffee & Tea", "Diners"],
    mealTypes: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    price: "$$",
    image: "https://media-cdn.tripadvisor.com/media/photo-o/09/15/ea/97/the-capital-grille.jpg",
    address: "Cau Giay, Hanoi, Vietnam",
    phoneNumber: "0961836998",
    features: ["Free Wifi", "Parking", "Takeout", "Music"]
  }

  const locationToBCItems = (loc: any[]) => {
    const tmpLoc = [...loc]
  
    const items: any = tmpLoc.reverse().map((e) => {
      return {
        title: e.name,
        href: ROUTES.TOURISM_BASE + e.slug
      }
    })
  
    items.push({
      title: loc[0].name + " Dinings",
      href: ROUTES.TOURISM_BASE + loc[0].slug + "/dinings"
    })
  
    items.push({
      title: item.name
    })
  
    return items
  }

  const generateRatingDetail = (name: string, value: number, quant: number) => {
    return (
      <div className="flex items-center text-sm mb-1.5">
        <span className="w-16">{name}</span>
        <Rate disabled value={value} 
          className="text-color-primary text-base mx-4"
        />
        <span className="text-color-text-secondary font-medium">
          {quant} reviews
        </span>
      </div>
    )
  }

  

  return (
    <div className="tp-page dining-detail-page bg-color-background-primary">
      <div className="tp-wrapper">
        <Breadcrumb
          separator=">"
          items={locationToBCItems(location)}
          className="mb-5"
        />

        <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
          <div className="px-6 py-2">
            <div className="flex justify-between items-center mb-1">
              <h1 className="m-0">{item.name}</h1>
              <div className="flex">
                <div className="cursor-pointer hover:underline hover-button">
                  <i className="bi bi-pencil mr-1.5"/>
                  <span>Review</span>
                </div>
                <div className="w-px h-6 mx-2.5 bg-color-border-primary"/>
                <div className=" cursor-pointer hover:underline hover-button">
                  <i className="bi bi-bookmarks mr-1.5"/>
                  <span>Save</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-color-text-secondary mb-1">
              <div className="flex items-center">
                <Rate allowHalf disabled value={item.review.rate} 
                  className="text-color-primary text-lg mr-4"
                />
                <span className="font-semibold">
                  {item.review.total} reviews
                </span>
              </div>
              <div className="w-px h-6 mx-2.5 bg-color-border-primary"/>
              <div className="flex">
                <div>
                  {item.types.join(", ")}
                </div>
                <i className="bi bi-dot"/>
                <div>{item.price}</div>
              </div>
            </div> 

            <div className="flex items-center text-sm text-color-extra-text-primary mb-5">
              <div className="flex">
                <i className="bi bi-geo-alt mr-1.5"/>
                <div>
                  {item.address}
                </div>
              </div>
              <div className="w-px h-5 mx-2.5 bg-color-border-primary"/>
              <div className="flex">
                <i className="bi bi-telephone mr-1.5"/>
                <div>
                  {item.phoneNumber}
                </div>
              </div>
              <div className="w-px h-5 mx-2.5 bg-color-border-primary"/>
              <div className="flex">
                <i className="bi bi-globe mr-1.5"/>
                <div>
                  {"Website"}
                </div>
              </div>
              <div className="w-px h-5 mx-2.5 bg-color-border-primary"/>
              <div className="flex">
                <i className="bi bi-envelope mr-1.5"/>
                <div>
                  {"Email"}
                </div>
              </div>
              <div className="w-px h-5 mx-2.5 bg-color-border-primary"/>
              <div className="flex font-medium items-center">
                <i className="bi bi-clock mr-1.5"/>
                <div className="mr-1.5">
                  {"Open now"}
                </div>
                <div className="font-normal text-xs underline cursor-pointer hover-button">
                  {"See all hours"}
                </div>
              </div>
            </div>

            <div className="break-words w-3/5 mb-5">
              <i className="bi bi-quote mr-1 text-2xl"/>
              <Typography.Paragraph
                ellipsis={{
                  rows: 3,
                  expanded: paraExpanded
                }}
                className="text-base text-color-extra-text-primary poppins-font"
                onClick={() => setParaExpanded((e) => !e)}
              >
                {"This is descriptionDespite centuries of French and Chinese influence, Hanoi is a city that’s wholly (and proudly) Vietnamese. But its layered history is everywhere you look—from the Old Quarter with its French colonial buildings to the more than 600 temples and pagodas around the city. You can get right to the history of the city at sites like Hoa Lo Prison or the Ho Chi Minh Mausoleum. Take it all in by foot (or scooter), making time for detours at some of the city’s newer additions: independent art galleries, boutique shops, and trendy cafes. If you’re coming just"}
              </Typography.Paragraph>
              <span 
                className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
                onClick={() => setParaExpanded((e) => !e)}
              >
                {paraExpanded ? "Read less" : "Read more"}
              </span>
            </div>
          </div>

          <div>
            <Carousel autoplay fade>
              <div>
                <img alt="#" src={"https://media-cdn.tripadvisor.com/media/photo-m/1280/13/fd/ba/eb/photo2jpg.jpg"} 
                  className="image w-full h-full max-h-96 object-cover object-center rounded-b-[7px]" 
                />
              </div>
              <div>
                <img alt="#" src={"https://media-cdn.tripadvisor.com/media/photo-o/06/27/49/19/monica-s-mercato.jpg"} 
                  className="image w-full h-full max-h-96 object-cover object-center rounded-b-[7px]" 
                />
              </div>
              <div>
                <img alt="#" src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/fd/ba/e9/photo0jpg.jpg?w=1200&h=-1&s=1"} 
                  className="image w-full h-full max-h-96 object-cover object-center rounded-b-[7px]" 
                />
              </div>
            </Carousel>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-7 mb-5">
          <div className="w-full bg-white rounded-lg border border-solid border-color-border-secondary">
            <div className="px-6 py-4">
              <div className="text-lg font-semibold mb-2">
                Ratings & Reviews
              </div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-semibold">
                  {item.review.rate}
                </span>
                <Rate 
                  allowHalf 
                  disabled 
                  value={item.review.rate} 
                  className="text-color-primary text-lg mx-4"
                />
                <span className="text-sm text-color-text-secondary font-semibold">
                  {item.review.total} reviews
                </span>
              </div>
              <div className="font-medium mb-1">
                Details
              </div>
              <div className="mb-4">
                {generateRatingDetail("Excellent", 5, 100)}
                {generateRatingDetail("Good", 4, 50)}
                {generateRatingDetail("Average", 3, 30)}
                {generateRatingDetail("Poor", 2, 0)}
                {generateRatingDetail("Terrible", 1, 2)}
              </div>
              <div className="h-px my-4 bg-color-border-primary"/>
              <div className="flex justify-center">
                <div className="primary-button w-fit"
                  style={{ borderRadius: 9999, fontWeight: 500 }}
                >
                  Write a review
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg border border-solid border-color-border-secondary">
            <div className="px-6 py-4">
              <div className="text-lg font-semibold mb-2">
                Details
              </div>
              <div className="font-medium mb-1">
                Types
              </div>
              <div className="text-sm mb-2">
                {item.types.join(", ")}
              </div>
              <div className="font-medium mb-1">
                Meals
              </div>
              <div className="text-sm mb-2">
                {item.mealTypes.join(", ")}
              </div>
              <div className="font-medium mb-1">
                Price
              </div>
              <div className="text-sm mb-2">
                Mid-range - $$
              </div>
              <div className="font-medium mb-1">
                Features
              </div>
              <div className="text-sm mb-2">
                {item.features.join(", ")}
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg border border-solid border-color-border-secondary">
            <div className="px-6 py-4 text-sm">
              <div className="text-lg font-semibold mb-3">
                Location & Contacts
              </div>
              <div className=" h-32 bg-color-primary mb-4">
                This is map here
              </div>
              <div className="flex mb-3">
                <i className="bi bi-geo-alt mr-1.5"/>
                <div>
                  {item.address}
                </div>
              </div>
              <div className="flex mb-3">
                <i className="bi bi-telephone mr-1.5"/>
                <div>
                  {item.phoneNumber}
                </div>
              </div>
              <div className="flex mb-3">
                <i className="bi bi-globe mr-1.5"/>
                <div>
                  {"Website"}
                </div>
              </div>
              <div className="flex mb-3">
                <i className="bi bi-envelope mr-1.5"/>
                <div>
                  {"Email"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
          <div className="px-6 py-4">
            <ReviewList/>
          </div>
        </div>
      </div>

    </div>
  )
}