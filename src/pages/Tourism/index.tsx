import { Breadcrumb, Carousel, Col, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import "./index.style.scss"
import { useNavigate, useParams } from "react-router-dom"
import Slider from "react-slick"
import TourismItem from "../../components/Item/TourismItem"
import { apiCaller, itemApi, locationApi } from "../../api"
import { messages } from "../../constants/message"
import NotFound from "../Static/NotFound"
import { ROUTES, categoryItems, itemTypes } from "../../constants"
import TripListDrawer from "../../components/Drawer/TripListDrawer"
import { generateSlickClass } from "../../utils/Utils"

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  swipe: false
}

const slickLimit = 4

interface Location {
  id: string
  ancestors: Array<{
    id: string
    name: string
    level: string
    slug: string
  }>
  coordinates: number[]
  name: string
  description: string
  images: Array<{
    name: string
    url: string
  }>
  level: number
  slug: string
}

type Item = Record<string, any[]>

export default function Tourism() {
  const navigate = useNavigate()
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const [location, setLocation] = useState<Location>()
  const [items, setItems] = useState<Item>()
  const { slug } = useParams()

  useEffect(() => {
    const getLocation = async () => {
        const res = await apiCaller(
          locationApi.getLocation(slug ?? ""),
          (error) => {
            if (error.ec === messages.NOT_FOUND.ec) {
              setHas404Error(true)
            }
          }
        )
        
        if (res !== undefined) {
          setLocation(res.data)
        }
    }

    getLocation()
  }, [slug])

  useEffect(() => {
    const getItemsOfLocation = async (locId: string) => {
      const res = await apiCaller(itemApi.getItemsOfLocation(locId))

      if (res !== undefined) {
        console.log(res.data)
        setItems(res.data)
      }
    }

    if (location) {
      getItemsOfLocation(location.id)
    }
  }, [location])

  const CategoryButton = (name: string, icon: string, link: string) => (
    <div 
      className="flex items-center justify-center p-4 border border-solid border-color-secondary rounded-md font-medium cursor-pointer hover:bg-color-hover-primary"
      onClick={() => navigate(link)}
    >
      <i className={`bi bi-${icon} mr-2`}/>
      <span>{name}</span>
    </div>
  )

  const generateBCItems = (ancestors: any[]) => {
    const tmp = [...ancestors]
    const breadcrumbs: any = tmp.reverse().map((e) => {
      return {
        title: e.name,
        href: ROUTES.TOURISM_BASE + e.slug
      }
    })

    breadcrumbs.push({
      title: location?.name ?? ""
    })
  
    return breadcrumbs
  }

  const generateCarouselImg = (images: any[]) => {
    return images.map((image, index) => {
      return (
        <div key={index}>
          <img alt={image.name} src={image.url} 
            className="image w-full h-full max-h-96 object-cover object-center rounded-lg" 
          />
        </div>
      )
    })
  }

  return (
    has404Error 
    ? <NotFound/> 
    : <div className="tp-page tourism-page bg-white">
      <div className="tp-wrapper">
        <Breadcrumb
          separator=">"
          items={generateBCItems(location?.ancestors ?? [])}
        />
        <h1 className="mb-3">
          Explore <span className="text-color-extra-tertiary">{location?.name ?? ""}</span>
        </h1>

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
            {location?.description ?? ""}
          </Typography.Paragraph>
          <span 
            className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
            onClick={() => setParaExpanded((e) => !e)}
          >
            {paraExpanded ? "Read less" : "Read more"}
          </span>
        </div>

        <div className="mb-10">
          <Carousel autoplay fade>
            {generateCarouselImg(location?.images ?? [])}
          </Carousel>
        </div>

        <div className="mb-12">
          <h2 className="mb-4">Looking for</h2>
          <Row gutter={[16, 16]}>
            {
              categoryItems.map(e => (
                <Col span={12} key={e.key}>
                  {CategoryButton(e.label, e.icon, e.key)}
                </Col>
              ))
            }
          </Row>
        </div>

        {items?.[itemTypes.ATTRACTION].length ? <div className="mb-10">
          <h2 className="mb-4">Check-in</h2>
          <Slider {...settings} 
            className={
              generateSlickClass(items[itemTypes.ATTRACTION].length, slickLimit)
            }
          >
            {
              items[itemTypes.ATTRACTION].map(e => (
                <TourismItem key={e.id} {...e}/>
              ))
            }
          </Slider>
        </div> : <></>}

        {items?.[itemTypes.LODGING].length ? <div className="mb-10">
          <h2 className="mb-4">Stay</h2>
          <Slider {...settings} 
            className={
              generateSlickClass(items[itemTypes.LODGING].length, slickLimit)
            }
          >
            {
              items[itemTypes.LODGING].map(e => (
                <TourismItem key={e.id} {...e}/>
              ))
            }
          </Slider>
        </div> : <></>}

        {items?.[itemTypes.DINING].length ? <div className="mb-10">
          <h2 className="mb-4">Eat & Drink</h2>
          <Slider {...settings} 
            className={
              generateSlickClass(items[itemTypes.DINING].length, slickLimit)
            }
          >
            {
              items[itemTypes.DINING].map(e => (
                <TourismItem key={e.id} {...e}/>
              ))
            }
          </Slider>
        </div> : <></>}

        {items?.[itemTypes.ACTIVITY].length ? <div className="mb-10">
          <h2 className="mb-4">Do</h2>
          <Slider {...settings} 
            className={
              generateSlickClass(items[itemTypes.ACTIVITY].length, slickLimit)
            }
          >
            {
              items[itemTypes.ACTIVITY].map(e => (
                <TourismItem key={e.id} {...e}/>
              ))
            }
          </Slider>
        </div> : <></>}
      </div>
      <TripListDrawer/>
    </div>
  )
}