import { Col, Modal, Row } from "antd"
import { Booking } from "../../../pages/Business/Bookings"
import { formatDate } from "../../../utils/Utils"
import { useState } from "react"
import { bookingStates } from "../../../constants/booking-states"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { setLoaderState } from "../../../redux/Loader"
import { apiCaller, bookingApi } from "../../../api"
import { removeBooking } from "../../../redux/Business"

interface BookingCardProps {
  booking: Booking
}

export default function BookingCard(props: BookingCardProps) {
  const dispatch = useDispatch()
  const [detailState, setDetailState] = useState<boolean>(false)

  const handleUpdateBooking = (action: string, state: string) => {
    Modal.confirm({
      title: `Are you sure to ${action} this booking?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        const handleUpdate = async () => {
          dispatch(setLoaderState(true))
          const res = await apiCaller(
            bookingApi.updateBusinessBooking(
              props.booking.itemId, props.booking.id, { state }
            )
          )          
          dispatch(setLoaderState(false))

          if (res !== undefined) {
            alert("Update successfully")
            // setItems(items.filter(e => e !== selected))
            // onDetailClose()
            dispatch(removeBooking(props.booking.id))
          }
        }
        
        handleUpdate()
      }
    })
  }


  const cancelButton = () => {
    return (
      <div className="primary-button ml-4"
        style={{ background: "var(--red-500)" }}
        onClick={() => handleUpdateBooking("cancel", bookingStates.CANCELLED)}
      >
        Cancel
      </div>
    )
  }

  const confirmButton = () => {
    return (
      <div className="primary-button ml-4"
        style={{ background: "var(--yellow-500)" }}
        onClick={() => handleUpdateBooking("confirm", bookingStates.CONFIRMED)}
      >
        Confirm
      </div>
    )
  }

  const completeButton = () => {
    return (
      <div className="primary-button ml-4"
        onClick={() => handleUpdateBooking("complete", bookingStates.COMPLETED)}
      >
        Complete
      </div>
    )
  }

  const generateButton = (state: string) => {
    switch (state) {
      case bookingStates.PENDING: {
        return (
          <div className="flex">
            {confirmButton()}
            {cancelButton()}
          </div>  
        )
      }
      case bookingStates.CONFIRMED: {
        return completeButton()
      }
      default: {
        return
      }
    }
  }
  return (
    <div className="p-4 mb-6 border border-solid border-color-border-secondary">
      <div className="header flex justify-between mb-4">
        <div className="user-info flex items-center">
          <div 
              className="flex h-10 max-w-[2.5rem] mr-3 cursor-pointer"
              // onClick={handleNavigate}
            >
              <img alt={"#"} src={props.booking.user.profileImage} 
              className="image w-full h-full rounded-full object-cover object-center" />
            </div>
          <div>
            <span className="font-semibold cursor-pointer mr-1.5"
              // onClick={goToProfile}
            >
              {`${props.booking.user.familyName} ${props.booking.user.givenName}`}
            </span>
            <span className="text-sm text-color-text-secondary">
              {"booked on " + formatDate(props.booking.createdAt)}
            </span>
          </div>

        </div>
        <div className="flex">
          {generateButton(props.booking.state)}
        </div>
      </div>
      <div>
        <div className="cursor-pointer"
          onClick={() => setDetailState(!detailState)}
        >
          <div className="mb-1.5 flex">
            <div className="text-base font-semibold text-color-text-primary">Booking ID</div>
            <div className="text-color-text-primary ml-4 font-medium">
              <i>{props.booking.id}</i>
            </div>
          </div>
          <Row className="ml-4 mb-2">
            <Col className="poppins-font" span={6}>
              <div className="font-medium text-color-extra-text-primary mb-1.5">Date</div>
              <div className="text-color-text-primary">
                <i className="bi bi-calendar-event mr-6"/>{formatDate(props.booking.date)}
              </div>
            </Col>
            <Col className="poppins-font" span={6}>
              <div className="font-medium text-color-extra-text-primary mb-1.5">Start Time</div>
              <div className="text-color-text-primary">
                <i className="bi bi-clock mr-6"/>{props.booking.startTime}
              </div>
            </Col>
            <Col className="poppins-font" span={6}>
              <div className="font-medium text-color-extra-text-primary mb-1.5">Number of Guests</div>
              <div className="text-color-text-primary">
                <i className="bi bi-people mr-6"/>{props.booking.numOfGuests}
              </div>
            </Col>
            <Col className="poppins-font" span={6}>
              {props.booking.numOfRooms && <>
                <div className="font-medium text-color-extra-text-primary mb-1.5">Number of Rooms</div>
                <div className="text-color-text-primary">
                  <i className="bi bi-door-closed mr-6"/>{props.booking.numOfRooms}
                </div>
              </>}
            </Col>
          </Row>
          <div className="mb-2">
            <div className="text-base font-semibold text-color-text-primary mb-1.5">Note</div>
            <div className="text-color-text-primary ml-4">
              <i>{props.booking.note}</i>
            </div>
          </div>
        </div>
        <div className={detailState ? "" : "hidden"}>
          <div className="text-color-text-primary font-semibold text-base mb-1.5">Contact</div>
          <Row className="ml-4">
            <Col className="poppins-font" span={12}>
              <div className="font-medium text-color-extra-text-primary mb-1.5">Phone Number</div>
              <div className="text-color-text-primary">
                <i className="bi bi-telephone mr-6"/>{props.booking.phoneNumber}
              </div>
            </Col>
            <Col className="poppins-font" span={12}>
              <div className="font-medium text-color-extra-text-primary mb-1.5">Email</div>
              <div className="text-color-text-primary">
                <i className="bi bi-envelope mr-6"/>{props.booking.email}
              </div>
            </Col>
          </Row>
        </div>
      </div>

    </div>
  )
}