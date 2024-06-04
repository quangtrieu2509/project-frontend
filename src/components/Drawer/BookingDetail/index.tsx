import { Col, Row } from "antd"
import { Booking } from "../../../pages/Bookings"
import { formatDate } from "../../../utils/Utils"

interface BookingDetailProps {
  booking: Booking
}

export default function BookingDetail(props: BookingDetailProps) {

  return (
    <>
    <div className="booking-detail">
      <div className="relative flex w-full h-48 cursor-pointer"
        onClick={() => {}}
      >
        <img alt="#" src={props.booking.item.image.url} className="image w-full h-full object-cover object-center" />
      </div>
      <div className="my-4">
        <div className="text-2xl font-bold cursor-pointer hover:underline mb-1"
          onClick={() => window.open(`/${props.booking.item.type}/${props.booking.item.id}`)}
        >
          {props.booking.item.name}
        </div>
        {/* <div className="flex items-center mb-2">
          <Rate 
            allowHalf 
            disabled 
            defaultValue={props.itineraryItem.item.review.rate} 
            className="text-color-primary text-lg mr-4"
          />
          <span className="text-sm text-color-text-secondary font-semibold">
            {props.itineraryItem.item.review.total} reviews
          </span>
        </div> */}
        <div className="text-sm font-semibold text-color-extra-primary bg-color-extra-secondary w-fit px-2 py-0.5 rounded-md mb-2">
          {props.booking.item.ancestors.map(e => e.name).slice(0, 2).join(", ")}
        </div>
        <div className="text-sm text-color-text-secondary">
          {props.booking.item.categories.join("-")}
        </div>
      </div>
      {/* <div className="text-sm mb-5">
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
            expanded: paraExpanded
          }}
          className="text-color-text-secondary poppins-font"
        >
          {props.itineraryItem.item.description}
        </Typography.Paragraph>
        <span 
          className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
          onClick={() => setParaExpanded((e) => !e)}
        >
          {paraExpanded ? "Read less" : "Read more"}
        </span>
      </div> */}
      <div className="h-px w-full bg-color-border-secondary"/>
      <div>
        <div className="text-color-text-primary font-semibold text-base my-2">Detail</div>

        <Row>
          <Col className="poppins-font" span={12}>
            <div className="mb-2">
              <div className="font-medium text-color-extra-text-primary mb-1.5">Date</div>
              <div className="text-color-text-primary">
                <i className="bi bi-calendar-event mr-6"/>{formatDate(props.booking.date)}
              </div>
            </div>
          </Col>
          <Col className="poppins-font" span={12}>
            <div className="mb-2">
              <div className="font-medium text-color-extra-text-primary mb-1.5">Start Time</div>
              <div className="text-color-text-primary">
                <i className="bi bi-clock mr-6"/>{props.booking.startTime}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="poppins-font" span={12}>
            <div className="mb-2">
              <div className="font-medium text-color-extra-text-primary mb-1.5">Number of Guests</div>
              <div className="text-color-text-primary">
                <i className="bi bi-people mr-6"/>{props.booking.numOfGuests}
              </div>
            </div>
          </Col>
          <Col className="poppins-font" span={12}>
            {props.booking.numOfRooms && <div className="mb-2">
              <div className="font-medium text-color-extra-text-primary mb-1.5">Number of Rooms</div>
              <div className="text-color-text-primary">
                <i className="bi bi-door-closed mr-6"/>{props.booking.numOfRooms}
              </div>
            </div>}
          </Col>
        </Row>
        {props.booking.note && <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Note</div>
          <div className="text-color-text-primary">
            {props.booking.note}
          </div>
        </div>}
        <div className="text-color-text-primary font-semibold text-base mt-4 mb-2">Contact</div>
        <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Phone Number</div>
          <div className="text-color-text-primary">
            <i className="bi bi-telephone mr-6"/>{props.booking.phoneNumber}
          </div>
        </div>
        <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Email</div>
          <div className="text-color-text-primary">
            <i className="bi bi-envelope mr-6"/>{props.booking.email}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}