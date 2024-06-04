import { Breadcrumb, Carousel, Col, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import "./index.style.scss"
import { useNavigate, useParams } from "react-router-dom"
import Slider from "react-slick"
import ItemInTourism from "../../components/Item/ItemInTourism"
import { apiCaller, locationApi } from "../../api"
import { messages } from "../../constants/message"
import NotFound from "../Static/NotFound"
import { ROUTES } from "../../constants"

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  className: "react-slick-item"
}

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

export default function Tourism() {
  const navigate = useNavigate()
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const [location, setLocation] = useState<Location>()
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
    const items: any = ancestors.reverse().map((e) => {
      return {
        title: e.name,
        href: ROUTES.TOURISM_BASE + e.slug
      }
    })

    items.push({
      title: location?.name ?? ""
    })
  
    return items
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
            <Col span={12}>
              {CategoryButton("Attractions", "camera", "attractions")}
            </Col>
            <Col span={12}>
              {CategoryButton("Accommodations", "building", "accommodations")}
            </Col>
            <Col span={12}>
              {CategoryButton("Dinings", "shop-window", "dinings")}
            </Col>
            <Col span={12}>
              {CategoryButton("Activities", "ticket-perforated", "activities")}
            </Col>
          </Row>
        </div>

        <div className="mb-10">
          <h2 className="mb-4">Check-in</h2>
          <Slider {...settings}>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
          </Slider>
        </div>

        <div className="mb-10">
          <h2 className="mb-4">Stay</h2>
          <Slider {...settings}>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
          </Slider>
        </div>

        <div className="mb-10">
          <h2 className="mb-4">Eat & Drink</h2>
          <Slider {...settings}>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
          </Slider>
        </div>

        <div className="mb-10">
          <h2 className="mb-4">Do</h2>
          <Slider {...settings}>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
            <ItemInTourism/>
          </Slider>
        </div>
      </div>
    </div>
  )
}