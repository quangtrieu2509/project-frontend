import { Breadcrumb, Carousel, Progress, Rate, Typography } from "antd"
import { ROUTES, activityTypes, durationUnits, pluralItemLabels, rateLevelArrRev } from "../../../../constants"
import ReviewList from "../../../../components/Review/ReviewList"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiCaller, itemApi } from "../../../../api"
import { messages } from "../../../../constants/message"
import NotFound from "../../../Static/NotFound"
import { filterFields, generateAddress, isEqual, roundRate } from "../../../../utils/Utils"
import { useDispatch } from "react-redux"
import TripListDrawer from "../../../../components/Drawer/TripListDrawer"
import { Map, Marker, NavigationControl } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../../configs"
import { Pin } from "../../../../utils/Map"
import { setSelectedId } from "../../../../redux/Item"

interface ActivityDetail {
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
  ticketPrice?: number[]
  duration?: {
    value: number
    unit: string
  }
  ages?: number[]
  included?: string
  excluded?: string
  requirements?: string
  review: {
    rate: number
    total: number
  }
  reviewCounts: Record<number, number>
}

export default function Detail() {
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const { id } = useParams()
  const [item, setItem] = useState<ActivityDetail>()
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
      title: `${ancestors[0].name} ${pluralItemLabels.ACTIVITY}`,
      href: ROUTES.TOURISM_BASE + `${ancestors[0].slug}/activities`
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

  const onTripListOpen = () => {
    dispatch(setSelectedId(id))
  }
  return (
    has404Error 
    ? <NotFound/> 
    : !item
    ? <></>
    : <div className="tp-page activity-detail-page bg-color-background-primary">
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
                  {filterFields(item.categories, activityTypes, true).join(", ")}
                </div>
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
                item.contacts?.website && <>
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
                item.contacts?.email && <>
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

          <div className="flex gap-4 box-border px-6 pb-4">
            <div className="flex-grow">
              <div className="text-lg font-semibold mb-3">
                About
              </div>
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
              {item.ticketPrice && !isEqual(item.ticketPrice, [0, 0]) && <>
              <div className="font-medium mb-1">Price</div>
              <div className="text-sm flex mb-2">
                <i className="bi bi-ticket-perforated mr-2"/>
                <div>
                  {`$${item.ticketPrice[0]} - $${item.ticketPrice[1]}`}
                </div>
              </div>
              </>}
              {item.duration && <>
              <div className="font-medium mb-1">Duration</div>
              <div className="text-sm flex mb-2">
                <i className="bi bi-clock mr-2"/>
                <div>
                  {`${item.duration.value} ${durationUnits[item.duration.unit]}`}
                </div>
              </div>
              </>}
              {item.ages && <>
              <div className="font-medium mb-1">Ages</div>
              <div className="text-sm flex mb-2">
                <i className="bi bi-person mr-2"/>
                <div>
                  {`from ${item.ages[0]} ${item.ages[1] > item.ages[0] ? `to ${item.ages[1]}` : ""}`}
                </div>
              </div>
              </>}
            </div>
            
            <div className="w-[65%] min-w-[65%]">
              <Carousel autoplay fade>
                {
                  item.images.map((e, i) => (
                    <div key={i} className="h-96">
                      <img alt={e.name} src={e.url} 
                        className="image w-full h-full object-cover object-center rounded-[7px]" 
                      />
                    </div>
                  ))
                }
              </Carousel>
            </div>
          </div>


        </div>

        <div className="flex gap-x-7 mb-5">
          <div className="w-[23rem] bg-white rounded-lg border border-solid border-color-border-secondary">
            <div className="px-6 py-4">
              <div className="text-lg font-semibold mb-2">
                Ratings & Reviews
              </div>
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
                  rateLevelArrRev.map((e, i) =>
                    generateRatingDetail(
                      e, 
                      rateLevelArrRev.length - i, 
                      item.reviewCounts[rateLevelArrRev.length - i]
                    )
                  )
                }
              </div>
              <div className="h-px my-4 bg-color-border-primary"/>
              <div className="flex justify-center">
                <div className="primary-button w-fit"
                  style={{ borderRadius: 9999, fontWeight: 500 }}
                  onClick={onNavigateToReview}
                >
                  Write a review
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow bg-white rounded-lg border border-solid border-color-border-secondary">
            <div className="px-6 py-4 text-sm">
              <div className="text-lg font-semibold mb-3">
                Location & Contacts
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="flex mb-2">
                    <i className="bi bi-geo-alt mr-2"/>
                    <div>
                      {generateAddress(item.ancestors, item.address)}
                    </div>
                  </div>
                  {
                    item.contacts?.phoneNumber && <div className="flex mb-2">
                      <i className="bi bi-telephone mr-2"/>
                      <div>
                        {item.contacts?.phoneNumber}
                      </div>
                    </div>
                  }
                  {
                    item.contacts?.website && <div className="flex mb-2">
                      <i className="bi bi-globe mr-2"/>
                      <div>
                        {item.contacts.website}
                      </div>
                    </div>
                  }
                  {
                    item.contacts?.email && <div className="flex mb-2">
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
                    <Marker offset={[0, -15]}
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
        </div>

        <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
          <div className="px-6 py-4">
            <div className="text-lg font-semibold mb-3">
              More Info
            </div>
            <div className="grid grid-cols-3 gap-x-7">
              <div>
                <div className="font-medium mb-1">Included</div>
                <div className="text-sm break-words whitespace-pre-wrap">
                  {item.included ?? "No content."}
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Excluded</div>
                <div className="text-sm break-words whitespace-pre-wrap">
                  {item.excluded ?? "No content."}
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Requirements</div>
                <div className="text-sm break-words whitespace-pre-wrap">
                  {item.requirements ?? "No content."}
                </div>
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
      <TripListDrawer/>
    </div>
  )
}