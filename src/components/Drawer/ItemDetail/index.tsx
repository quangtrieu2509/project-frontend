import { Carousel, Typography } from "antd"
import { useState } from "react"
import { Map, Marker, NavigationControl } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../configs"
import { Pin } from "../../../utils/Map"
import { Item } from "../../../pages/Admin/Items"
import { filterFields, formatDateTime, generateAddress, generateCategories, generateIconType, isEqual } from "../../../utils/Utils"
import { IMAGE_PATH, ROUTES, diningFeatures, diningMeals, diningPrices, durationUnits, itemTypes, lodgingAmenities, lodgingRoomFeatures } from "../../../constants"
import { generatePriceRange } from "../../../pages/Items/Dinings/Detail"
import { generateAttribute, generateHotelClass } from "../../../pages/Items/Lodgings/Detail"
import HoursPreview from "../../Item/HoursPreview"

interface ItemDetailProps extends Item {}

export default function ItemDetail(props: ItemDetailProps) {
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)

  const generateCarouselImg = (images: any[]) => {
    return images.map((image, index) => {
      return (
        <div key={index}>
          <img alt={image.name} src={image.url} 
            className="image w-full h-52 object-cover object-center" 
          />
        </div>
      )
    })
  }

  const generateFeatures = () => (
    props.features && props.price &&
    <>
      <div className="font-medium mb-1">Meals</div>
      <div className="text-sm mb-2">
        {filterFields(props.features, diningMeals, true).join(", ")}
      </div>
      <div className="font-medium mb-1">Price</div>
      <div className="text-sm mb-2">
        {diningPrices[props.price.level] + " - " + (generatePriceRange(props.price.range) ?? props.price.level)}
      </div>
      <div className="font-medium mb-1">Features</div>
      <div className="text-sm mb-2">
        {filterFields(props.features, diningFeatures, true).join(", ")}
      </div>
      {props.hours && <><div className="font-medium mb-1">Hours</div>
      <HoursPreview hours={props.hours}/><div className="mb-2"/></>}
    </>
  )

  const generateAmenities = () => (
    props.amenities && props.price &&
    <>
      <div className="mb-3">
        <div className="font-medium mb-1">Price</div>
        <div className="grid grid-cols-2 gap-x-6 text-sm">
          <div>
            <div>HOTEL CLASS</div>
            {generateHotelClass(props.price.level)}
          </div>
          {props.price.range && !isEqual(props.price.range, [0, 0]) 
            && <div>
            <div>PRICE RANGE</div>
            <div className="font-medium">
              {`$${props.price.range[0]} - $${props.price.range[1]}`}
            </div>
          </div>}
        </div>
      </div>
      {generateAttribute("Property Amenities", lodgingAmenities, props.amenities ?? [])}
      {generateAttribute("Room Features", lodgingRoomFeatures, props.amenities ?? [])}
    </>
  )

  const handleNavToProfile = () => {
    window.open(ROUTES.PROFILE_BASE + props.owner.id)
  }

  const generate4Activity = () => (
    <>
      {props.ticketPrice && !isEqual(props.ticketPrice, [0, 0]) && <>
      <div className="font-medium mb-1">Price</div>
      <div className="text-sm flex mb-2">
        <i className="bi bi-ticket-perforated mr-2"/>
        <div>
          {`$${props.ticketPrice[0]} - $${props.ticketPrice[1]}`}
        </div>
      </div>
      </>}
      {props.duration && <>
      <div className="font-medium mb-1">Duration</div>
      <div className="text-sm flex mb-2">
        <i className="bi bi-clock mr-2"/>
        <div>
          {`${props.duration.value} ${durationUnits[props.duration.unit]}`}
        </div>
      </div>
      </>}
      {props.ages && <>
      <div className="font-medium mb-1">Ages</div>
      <div className="text-sm flex mb-2">
        <i className="bi bi-person mr-2"/>
        <div>
          {`from ${props.ages[0]} ${props.ages[1] > props.ages[0] ? `to ${props.ages[1]}` : ""}`}
        </div>
      </div>
      </>}
    </>
  )

  const generate4Attraction = () => (
    <>
      {props.ticketPrice && !isEqual(props.ticketPrice, [0, 0]) && <>
      <div className="font-medium mb-1">Price</div>
      <div className="text-sm flex mb-2">
        <i className="bi bi-ticket-perforated mr-2"/>
        <div>
          {`$${props.ticketPrice[0]} - $${props.ticketPrice[1]}`}
        </div>
      </div>
      </>}
      {props.hours && <><div className="font-medium mb-1">Hours</div>
      <HoursPreview hours={props.hours}/><div className="mb-2"/></>}
    </>
  )
  return (
    <div className="text-color-text-primary">
      <div className="relative">
        <div className="absolute z-[99] top-0 left-0 h-11 w-11 m-2 bg-white rounded-full shadow-lg flex items-center justify-center">
          <i className={"text-2xl text-color-primary bi bi-" + generateIconType(props.type)}/>
        </div>
        <Carousel autoplay fade>
          {generateCarouselImg(props.images)}
        </Carousel>
      </div>
      <div className="my-4">
        <div className="text-2xl font-bold mb-2">
          {props.name}
        </div>
        <div className="text-sm font-semibold text-color-extra-primary bg-color-extra-secondary w-fit px-2 py-0.5 rounded-md mb-2">
          {generateCategories(props.categories, props.type).join(" - ")}
        </div>
      </div>
      <div className="text-sm mb-5">
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
            expanded: paraExpanded
          }}
          className="text-color-text-secondary poppins-font"
        >
          {props.description}
        </Typography.Paragraph>
        <span 
          className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
          onClick={() => setParaExpanded((e) => !e)}
        >
          {paraExpanded ? "Read less" : "Read more"}
        </span>
      </div>
      <div className="h-px w-full bg-color-border-secondary"/>
      <div>
        <div className="text-color-text-primary font-semibold text-base my-2">
          Location & Contacts
        </div>
        <div className="flex mb-1.5">
          <i className="bi bi-geo-alt mr-2"/>
          <div>
            {generateAddress(props.ancestors, props.address ?? [])}
          </div>
        </div>
        {
          props.contacts?.phoneNumber && <div className="flex mb-1.5">
            <i className="bi bi-telephone mr-2"/>
            <div>
              {props.contacts.phoneNumber}
            </div>
          </div>
        }
        {
          props.contacts?.website && <div className="flex mb-1.5">
            <i className="bi bi-globe mr-2"/>
            <div>
              {props.contacts.website}
            </div>
          </div>
        }
        {
          props.contacts?.email && <div className="flex mb-1.5">
            <i className="bi bi-envelope mr-2"/>
            <div>
              {props.contacts.email}
            </div>
          </div>
        }
        <div className="h-60 bg-color-primary mb-4">
          <Map
            mapboxAccessToken={MAPBOX_API_KEY}
            initialViewState={{
              longitude: props.coordinates[1],
              latitude: props.coordinates[0],
              zoom: 12
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            attributionControl={false} 
            scrollZoom={false}
          > 
            <NavigationControl position="bottom-right"/>
            <Marker offset={[0, -15]}
              longitude={props.coordinates[1]} 
              latitude={props.coordinates[0]}
            >
              <Pin type={props.type}/>
            </Marker>
          </Map>
        </div>
      </div>
      <div className="h-px w-full bg-color-border-secondary"/>
      <div>
        <div className="text-color-text-primary font-semibold text-base my-2">
          Details
        </div>
        {props.type === itemTypes.DINING && generateFeatures()}
        {props.type === itemTypes.LODGING && generateAmenities()}
        {props.type === itemTypes.ACTIVITY && generate4Activity()}
        {props.type === itemTypes.ATTRACTION && generate4Attraction()}
      </div>
      <div className="h-px w-full bg-color-border-secondary"/>
      <div>
        <div className="text-color-text-primary font-semibold text-base my-2">
          Owner
        </div>
        <div className="flex items-center mb-1">
          <div className="h-10 w-10 mr-3">
            <img alt="#" src={props.owner.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
              className="image h-full rounded-full object-cover object-center cursor-pointer"
              onClick={handleNavToProfile} 
            />
          </div>
          <div className="flex flex-col justify-between max-w-[14.5rem]">
            <div className="font-semibold text-base ellipsis cursor-pointer hover:underline"
              onClick={handleNavToProfile}
            >
              {`${props.owner.familyName} ${props.owner.givenName}`}
            </div>
            <div className="flex items-center text-xs text-color-text-secondary h-4">
              <span>{"created at " + formatDateTime(props.createdAt, true, true)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}