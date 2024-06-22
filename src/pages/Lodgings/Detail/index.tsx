import { Breadcrumb, Carousel, Progress, Rate, Typography } from "antd"
import { ROUTES, lodgingAmenities, lodgingPrices, lodgingRoomFeatures, lodgingTypes, pluralItemLabels, rateLevelArr } from "../../../constants"
import ReviewList from "../../../components/Review/ReviewList"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiCaller, itemApi } from "../../../api"
import { messages } from "../../../constants/message"
import NotFound from "../../Static/NotFound"
import { generateAddress, roundRate } from "../../../utils/Utils"
import { useDispatch } from "react-redux"
import { setTripListState } from "../../../redux/Trip"
import TripListDrawer from "../../../components/Drawer/TripListDrawer"
import { Map, Marker, NavigationControl } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../configs"
import Pin from "../../../utils/Map"

interface LodgingDetail {
  id: string
  ancestors: any[]
  name: string
  coordinates: number[]
  address: string[]
  description: string
  images: Array<{
    name: string
    url: string
  }>
  contacts: {
    phoneNumber: string
    website?: string
    email?: string
  }
  type: string
  isReservable: boolean
  categories: string[]
  price: {
    level: string
    range?: number[]
  }
  amenities?: string[]
  review: {
    rate: number
    total: number
  }
  reviewCounts: Record<number, number>
}

const rateLevels = rateLevelArr.reverse()

export default function Detail() {
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const { id } = useParams()
  const [item, setItem] = useState<LodgingDetail>()
  const dispatch = useDispatch()

  useEffect(() => {
    const getItem = async () => {
      const res = await apiCaller(
        itemApi.getItemDetail(id ?? ""),
        (error) => {
          if (error.ec === messages.NOT_FOUND.ec) {
            setHas404Error(true)
          }
        }
    )

      if (res !== undefined) {
        console.log(res.data)
        setItem(res.data)
      }
    }

    getItem()
  }, [id])

  const generateBCItems = (ancestors: any[]) => {
    const tmp = [...ancestors]
  
    const items: any = tmp.reverse().map((e) => {
      return {
        title: e.name,
        href: ROUTES.TOURISM_BASE + e.slug
      }
    })
  
    items.push({
      title: `${ancestors[0].name} ${pluralItemLabels.LODGING}`,
      href: ROUTES.TOURISM_BASE + `${ancestors[0].slug}/lodgings`
    })
  
    items.push({
      title: item?.name
    })
  
    return items
  }

  const onNavigateToReview = () => window.open(ROUTES.REVIEW_BASE + id)

  const generateRatingDetail = (name: string, value: number, quant: number) => {
    const total = item?.review.total ?? 100
    return (
      <div key={value} className="flex items-end text-sm mb-1.5">
        <span className="w-16">{name}</span>
        <Progress percent={quant * 100 / total} showInfo={false}
          strokeColor={"var(--color-primary)"} size={["100%" , 10]}
          className="w-44 text-color-primary text-base mx-4"
        />
        <span className="text-color-text-secondary font-medium">
          {quant}
        </span>
      </div>
    )
  }

  const generateAttribute =  (
    name: string, labelObj: any, valueList: any[]
  ) => {
    valueList = valueList.filter(e => labelObj[e])
    const leftList = valueList.filter((_, i) => !(i%2))
    const rightList = valueList.filter((_, i) => i%2) 
    const genLabel = (e: any, i: number) => (
      <div key={i} className="flex mb-1">
        <i className={`bi bi-${labelObj[e].icon} mr-2`}/>
        <div>{labelObj[e].label}</div>
      </div>
    )
    return (
      <div key={name} className="mb-3">
        <div className="font-medium mb-1">{name}</div>
        <div className="grid grid-cols-2 gap-x-6 text-sm">
          <div>
            {leftList.map((e, i) => genLabel(e, i))}
          </div>
          <div>
            {rightList.map((e, i) => genLabel(e, i))}
          </div>
        </div>
      </div>
    )
  }

  const generateHotelClass = (value: string) => {
    if (lodgingPrices[value] === lodgingPrices.N) {
      return <div><i>{lodgingPrices.N}</i></div>
    } 
    else {
      return <Rate
        value={+value}
        disabled
        className="text-color-text-secondary"
      />
    }
  }

  const onTripListOpen = () => {
    dispatch(setTripListState(true))
  }
  return (
    has404Error 
    ? <NotFound/> 
    : !item
    ? <></>
    : <div className="tp-page dining-detail-page bg-color-background-primary">
      <div className="tp-wrapper">
        <Breadcrumb
          separator=">"
          items={generateBCItems(item.ancestors)}
          className="mb-5"
        />

        <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
          <div className="px-6 py-2">
            <div className="flex justify-between items-center mb-1">
              <h1 className="m-0">{item.name}</h1>
              <div className="flex items-center">
                {item.isReservable && <div className="secondary-button mr-5"
                  style={{ borderRadius: "999px", background: "var(--color-button-tertiary)" }}
                  onClick={() => window.open(ROUTES.BOOKING_BASE + item.id)}
                >
                  Reserve
                </div>}
                <div className="cursor-pointer hover:underline hover-button">
                  <i className="bi bi-pencil mr-1.5"/>
                  <span onClick={onNavigateToReview}>Review</span>
                </div>
                <div className="w-px h-6 mx-2.5 bg-color-border-primary"/>
                <div className=" cursor-pointer hover:underline hover-button"
                  onClick={onTripListOpen}
                >
                  <i className="bi bi-bookmarks mr-1.5"/>
                  <span>Save</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-color-text-secondary mb-1">
              <div className="flex items-center">
                <Rate allowHalf disabled value={roundRate(item.review.rate)} 
                  className="text-color-primary text-lg mr-4"
                />
                <span className="font-semibold">
                  {item.review.total} reviews
                </span>
              </div>
              <div className="w-px h-6 mx-2.5 bg-color-border-primary"/>
              <div className="flex">
                <div>
                  {item.categories.join(", ")}
                </div>
                <i className="bi bi-dot"/>
                <div>{item.price.level}</div>
              </div>
            </div> 

            <div className="flex items-center text-sm text-color-extra-text-primary mb-5">
              <div className="flex">
                <i className="bi bi-geo-alt mr-1.5"/>
                <div className="max-w-[24rem] ellipsis">
                  {generateAddress(item.ancestors, item.address)}
                </div>
              </div>
              <div className="w-px h-5 mx-2.5 bg-color-border-primary"/>
              <div className="flex">
                <i className="bi bi-telephone mr-1.5"/>
                <div>
                  {item.contacts.phoneNumber}
                </div>
              </div>
              {
                item.contacts.website && <>
                  <div className="w-px h-5 mx-2.5 bg-color-border-primary"/>
                  <div className="flex">
                    <i className="bi bi-globe mr-1.5"/>
                    <a href={item.contacts.website} 
                      className="text-color-extra-text-primary no-underline cursor-pointer hover:underline"
                    >
                      {"Website"}
                    </a>
                  </div>
                </>
              }
              {
                item.contacts.email && <>
                  <div className="w-px h-5 mx-2.5 bg-color-border-primary"/>
                  <div className="flex">
                    <i className="bi bi-envelope mr-1.5"/>
                    <div className="max-w-[14rem] ellipsis">
                      {item.contacts.email}
                    </div>
                  </div>
                </>
              }
            </div>
          </div>

          <div>
            <Carousel autoplay fade>
              {
                item.images.map((e, i) => (
                  <div key={i}>
                    <img alt={e.name} src={e.url} 
                      className="image w-full h-full max-h-96 object-cover object-center rounded-b-[7px]" 
                    />
                  </div>
                ))
              }
            </Carousel>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
          <div className="px-6 py-4">
            <div className="text-lg font-semibold mb-3">
              About
            </div>
            <div className="grid grid-cols-2 gap-x-7">
              <div>
                <div className="break-words w-full mb-5">
                  <i className="bi bi-quote mr-1 text-2xl"/>
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 3,
                      expanded: paraExpanded
                    }}
                    className="text-base text-color-extra-text-primary poppins-font"
                    onClick={() => setParaExpanded((e) => !e)}
                  >
                    {item.description}
                  </Typography.Paragraph>
                  <span 
                    className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
                    onClick={() => setParaExpanded((e) => !e)}
                  >
                    {paraExpanded ? "Read less" : "Read more"}
                  </span>
                </div>
                <div className="h-px my-4 bg-color-border-primary"/>
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-semibold">
                      {roundRate(item.review.rate)}
                    </span>
                    <Rate 
                      allowHalf 
                      disabled 
                      value={roundRate(roundRate(item.review.rate))} 
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
                    {
                      rateLevels.map((e, i) =>
                        generateRatingDetail(
                          e, 
                          rateLevels.length - i, 
                          item.reviewCounts[rateLevels.length - i]
                        )
                      )
                    }
                  </div>
                  <div className=" pl-20">
                    <div className="primary-button w-fit"
                      style={{ borderRadius: 9999, fontWeight: 500 }}
                      onClick={onNavigateToReview}
                    >
                      Write a review
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <div className="font-medium mb-1">Types</div>
                  <div className="text-sm">
                    {item.categories.map(e => lodgingTypes[e]).join(", ")}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="font-medium mb-1">Price</div>
                  <div className="grid grid-cols-2 gap-x-6 text-sm">
                    <div>
                      <div>HOTEL CLASS</div>
                      {generateHotelClass(item.price.level)}
                    </div>
                    {item.price.range && <div>
                      <div>PRICE RANGE</div>
                      <div className="font-medium">
                        {`$${item.price.range[0]} - $${item.price.range[1]}`}
                      </div>
                    </div>}
                  </div>
                </div>
                {generateAttribute("Property Amenities", lodgingAmenities, item.amenities ?? [])}
                {generateAttribute("Room Features", lodgingRoomFeatures, item.amenities ?? [])}

              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
          <div className="px-6 py-4">
            <div className="text-lg font-semibold mb-3">
              Location & Contacts
            </div>
            <div className="grid grid-cols-2 gap-x-7">
              <div>
                <div className="flex mb-2">
                  <i className="bi bi-geo-alt mr-2"/>
                  <div>
                    {generateAddress(item.ancestors, item.address)}
                  </div>
                </div>
                <div className="flex mb-2">
                  <i className="bi bi-telephone mr-2"/>
                  <div>
                    {item.contacts.phoneNumber}
                  </div>
                </div>
                {
                  item.contacts.website && <div className="flex mb-2">
                    <i className="bi bi-globe mr-2"/>
                    <div>
                      {item.contacts.website}
                    </div>
                  </div>
                }
                {
                  item.contacts.email && <div className="flex mb-2">
                    <i className="bi bi-envelope mr-2"/>
                    <div>
                      {item.contacts.email}
                    </div>
                  </div>
                }
              </div>
              
              <div className="h-80 bg-color-primary">
                <Map
                  mapboxAccessToken={MAPBOX_API_KEY}
                  initialViewState={{
                    longitude: item.coordinates[1],
                    latitude: item.coordinates[0],
                    zoom: 12
                  }}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  attributionControl={false} 
                > 
                  <NavigationControl position="bottom-right"/>
                  <Marker draggable offset={[0, -15]}
                    longitude={item.coordinates[1]} 
                    latitude={item.coordinates[0]}
                  >
                    <Pin type={item.type}/>
                  </Marker>
                </Map>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
          <div className="px-6 py-4">
            <ReviewList id={item.id}/>
          </div>
        </div>
      </div>
      <TripListDrawer itemId={item.id}/>
    </div>
  )
}