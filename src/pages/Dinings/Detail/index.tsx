import { Breadcrumb, Carousel, Drawer, Form, Progress, Rate, Typography } from "antd"
import { ROUTES, rateLevelArr } from "../../../constants"
import "./index.style.scss"
import ReviewList from "../../../components/Review/ReviewList"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiCaller, itemApi } from "../../../api"
import { messages } from "../../../constants/message"
import NotFound from "../../NotFound"
import { generateAddress, roundRate } from "../../../utils/Utils"
import { useDispatch, useSelector } from "react-redux"
import { getState, setDrawerTripsList, setTripCreationState, setTripListState } from "../../../redux/Trip"
import { PlusOutlined } from "@ant-design/icons"
import NewTripForm from "../../../components/Form/NewTripForm"
import TripList from "../../../components/Drawer/TripList"

interface DiningDetail {
  id: string
  ancestors: any[]
  name: string
  coordinates: number[]
  address: string[]
  description: string
  images: string[]
  contacts: {
    phoneNumber: string
    website?: string
    email?: string
  }
  type: string
  categories: string[]
  price: {
    level: string
    range?: number[]
  }
  hours: Array<{
    open: string
    close: string
  } | null>
  features?: string[]
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
  const [item, setItem] = useState<DiningDetail>()
  const { tripListState, tripCreationState } = useSelector(getState)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

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

      if (res !== null) {
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
      title: ancestors[0].name + " Dinings",
      href: ROUTES.TOURISM_BASE + ancestors[0].slug + "/dinings"
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

  const onTripListClose = () => {
    dispatch(setTripListState(false))
  }
  const onTripCreationClose = () => {
    dispatch(setTripCreationState(false))
  }

  const onTripListOpen = () => {
    dispatch(setTripListState(true))
  }
  const onTripCreationOpen = () => {
    dispatch(setTripCreationState(true))
  }

  const handleUpdateTrips = (trip: any) => {
    dispatch(setDrawerTripsList(trip))
  }
  return (
    has404Error 
    ? <NotFound/> 
    : <div className="tp-page dining-detail-page bg-color-background-primary">
      {
        item && <div className="tp-wrapper">
          <Breadcrumb
            separator=">"
            items={generateBCItems(item.ancestors)}
            className="mb-5"
          />

          <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
            <div className="px-6 py-2">
              <div className="flex justify-between items-center mb-1">
                <h1 className="m-0">{item.name}</h1>
                <div className="flex">
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
                  <div className="max-w-[22rem] ellipsis">
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
                      <div className="max-w-[12.5rem] ellipsis">
                        {item.contacts.email}
                      </div>
                    </div>
                  </>
                }
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
                  {item.description}
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
                {
                  item.images.map((e, i) => (
                    <div key={i}>
                      <img alt="#" src={e} 
                        className="image w-full h-full max-h-96 object-cover object-center rounded-b-[7px]" 
                      />
                    </div>
                  ))
                }
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
                    rateLevelArr.reverse().map((e, i) =>
                      generateRatingDetail(
                        e, 
                        rateLevelArr.length - i, 
                        item.reviewCounts[rateLevelArr.length - i]
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
            <div className="w-full bg-white rounded-lg border border-solid border-color-border-secondary">
              <div className="px-6 py-4">
                <div className="text-lg font-semibold mb-2">
                  Details
                </div>
                <div className="font-medium mb-1">
                  Types
                </div>
                <div className="text-sm mb-2">
                  {item.categories.join(", ")}
                </div>
                <div className="font-medium mb-1">
                  Meals
                </div>
                <div className="text-sm mb-2">
                  {item.features?.join(", ")}
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
                  {item.features?.join(", ")}
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
                  <i className="bi bi-geo-alt mr-2"/>
                  <div>
                    {generateAddress(item.ancestors, item.address)}
                  </div>
                </div>
                <div className="flex mb-3">
                  <i className="bi bi-telephone mr-2"/>
                  <div>
                    {item.contacts.phoneNumber}
                  </div>
                </div>
                {
                  item.contacts.website && <div className="flex mb-3">
                    <i className="bi bi-globe mr-2"/>
                    <div>
                      {item.contacts.website}
                    </div>
                  </div>
                }
                {
                  item.contacts.email && <div className="flex mb-3">
                    <i className="bi bi-envelope mr-2"/>
                    <div>
                      {item.contacts.email}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-solid border-color-border-secondary mb-5">
            <div className="px-6 py-4">
              <ReviewList id={item.id}/>
            </div>
          </div>
        </div>
      }
      {
        item && <Drawer
          title="My Trips"
          onClose={onTripListClose}
          open={tripListState}
          width={500}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          footer={
            <div className="p-3">
              <div className="flex items-center w-fit cursor-pointer" 
                onClick={onTripCreationOpen}>
                <div className="secondary-button mr-2">
                  <PlusOutlined className="text-lg align-middle"/>
                </div>
                <div className="text-lg font-medium">Create a trip</div>
              </div>
              
            </div>
          }
        >
          <TripList itemId={item.id}/>
          <Drawer
            title="Create a new trip"
            onClose={onTripCreationClose}
            open={tripCreationState}
            width={500}
            styles={{
              body: {
                paddingBottom: 80,
              },
            }}
            footer={
              <div className="flex justify-between p-3">
                <div className="secondary-button" onClick={onTripCreationClose}>
                  Cancel
                </div>
                <div className="primary-button"
                onClick={() => {
                  form.submit()
                }}
                >
                  Create trip
                </div>
              </div>
            }
          >
            <NewTripForm form={form} event={handleUpdateTrips}/>
          </Drawer>
        </Drawer>
      }

    </div>
  )
}