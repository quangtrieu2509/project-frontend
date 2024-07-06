import { Drawer, message, Modal, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiCaller, bookingApi } from "../../api";
import { capitalize, formatDate, generateAddress, loadingMessage, successMessage } from "../../utils/Utils";
import "./index.style.scss"
import BookingDetail from "../../components/Drawer/BookingDetail";
import { bookingStates, getStateLabel } from "../../constants/booking-states";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderState } from "../../redux/Loader";
import { bookingStateLabels as states } from "../../constants/booking-states";
import NoResult from "../../components/Profile/NoResult";
import { getState, removeBooking, setBookingList } from "../../redux/Booking";

export interface Booking {
  id: string
  item: {
    id: string
    name: string
    image: {
      name: string
      url: string
    }
    ancestors: any[]
    address: string[]
    type: string
    categories: string[]
  }
  date: Date
  startTime: string
  state: string
  note: string
  numOfGuests?: string
  numOfRooms?: string
  phoneNumber: string
  email: string

}
export default function Bookings() {
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [queries] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("1")
  const { bookingList } = useSelector(getState)
  const [selected, setSelected] = useState<any>()

  useEffect(() => {
    const type = queries.get("tab") ?? tabs[0].key

    const getItems = async () => {
      dispatch(setBookingList(undefined))
      const res = await apiCaller(bookingApi.getBookings(type))

      if (res !== undefined) {
        dispatch(setBookingList(res.data))
      }
    }
    
    getItems()
    setActiveTab(type)
  }, [queries])

  const handleOnChange = (activeKey: string) => {
    navigate(`?tab=${activeKey}`, { replace: true })
  }

  const onDetailOpen = (e: Booking) => {
    setSelected(e)
  }
  const onDetailClose = () => {
    setSelected(undefined)
  }

  const handleCancelBooking = () => {
    if (selected) {
      Modal.confirm({
        title: 'Are you sure to cancel this booking?',
        icon: <ExclamationCircleFilled />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          const handleUpdate = async () => {
            dispatch(setLoaderState(true))
            loadingMessage(messageApi, 'cancel')
            const res = await apiCaller(
              bookingApi.updateBooking(
                selected.id, { state: bookingStates.CANCELLED }
              )
            )          
            dispatch(setLoaderState(false))
  
            if (res !== undefined) {
              successMessage(messageApi, 'cancel', 'Cancelled.')
              dispatch(removeBooking(selected.id))
              onDetailClose()
            }
          }
          
          handleUpdate()
        }
      })
    }
  }

  const generateItem = (booking: Booking) => {
    const { item } = booking
    return (
      <div key={booking.id} 
        className="flex w-full mb-6 border border-solid border-color-border-primary rounded-md"
      >
        <div className="flex w-full">
          <div className="trip-image flex w-80 min-w-[20rem] h-48">
            <img alt={item.image.name} src={item.image.url} 
              className="image w-full h-full rounded-s-[5px] object-cover object-center"
            />
          </div>
          <div className="flex-grow flex flex-col m-4 ml-8 overflow-hidden">
            <span className="flex items-center mb-1.5">
              <div className="mr-1.5 font-semibold">Booking ID:</div>
              <div className="font-medium">{booking.id}</div>
            </span>
            <div className="text-sm w-fit font-medium px-2 py-0.5 border border-solid border-color-secondary rounded-md mb-1.5">
              {capitalize(item.type)}
            </div>
              
            <div className="flex w-full">
              <div className="w-full">
                <div 
                  className="text-xl font-semibold mb-2 cursor-pointer hover:underline ellipsis"
                  onClick={() => onDetailOpen(booking)}
                >
                  {item.name}
                </div>
                <div className="text-color-text-secondary mb-1 ellipsis">
                  <i className="bi bi-geo-alt mr-2"/>
                  {generateAddress(item.ancestors, item.address)}
                </div>
                <div className="text-color-text-secondary mb-1">
                  <i className="bi bi-calendar-event mr-2"/>
                  {formatDate(booking.date)}
                  <i className="bi bi-dot mx-2"/>
                  <i className="bi bi-clock mr-2"/>
                  {booking.startTime}
                </div>
              </div>
            </div>
            {/* <div className="h-full flex items-end text-sm">
              <div className="flex text-color-text-secondary">
                <i className="bi bi-heart-fill mr-2 text-color-object-primary"/>
                {value.interact?.likes ?? 0}
              </div>
              <div className="w-full flex justify-end text-color-text-primary">
                Privacy:
                <i 
                  className={`ml-2 bi bi-${value.privacy === privacies.PUBLIC ? "globe-americas" : "lock"}`}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }

  const tabs = states.map(state => ({
    ...state,
    children: bookingList === undefined ? <Spin className="flex justify-center py-1"/> :
      bookingList.length ? bookingList.map((e: Booking) => generateItem(e)) : 
      <NoResult/>
  }))
  
  return (
    <div className="tp-page bookings-page">
      <div className="tp-wrapper"> 
        <h1>My Bookings</h1>
        <Tabs
          className="text-base"
          items={tabs}
          tabPosition="top"
          activeKey={activeTab}
          onChange={handleOnChange}
        />
      </div>
      <Drawer
        title={selected && <div className="flex justify-between">
          <span className="flex items-center">
            <div className="mr-1.5">Booking ID:</div>
            <div className="font-medium">{selected.id}</div>
          </span>
          {getStateLabel[selected.state]}
        </div>}
        destroyOnClose onClose={onDetailClose}
        open={selected} width={550} closeIcon={false}
        styles={{
          body: {
            paddingBottom: 36,
          },
        }}
        footer={
          selected?.state === "pending" && <div className="flex justify-end p-3">
            <div className="primary-button"
              style={{ backgroundColor: "var(--color-object-primary)" }}
              onClick={handleCancelBooking}
            >
              Cancel Booking
            </div>
          </div>
        }
      >
        {selected && <BookingDetail booking={selected}/>}
      </Drawer>
      {contextHolder}
    </div>
  )
}