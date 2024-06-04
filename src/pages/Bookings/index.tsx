import { Drawer, Modal, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiCaller, bookingApi } from "../../api";
import { capitalize, formatDate } from "../../utils/Utils";
import "./index.style.scss"
import BookingDetail from "../../components/Drawer/BookingDetail";
import { bookingStates, getStateLabel } from "../../constants/booking-states";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setLoaderState } from "../../redux/Loader";
import { bookingStateLabels as states } from "../../constants/booking-states";

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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [queries] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("1")
  const [items, setItems] = useState<Booking[]>([])
  const [detailState, setDetailState] = useState<boolean>(false)
  const [selected, setSelected] = useState<Booking>()

  useEffect(() => {
    const type = queries.get("tab") ?? tabs[0].key

    const getItems = async () => {
      const res = await apiCaller(bookingApi.getBookings(type))

      if (res !== undefined) {
        setItems(res.data)
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
    setDetailState(true)
  }
  const onDetailClose = () => {
    setSelected(undefined)
    setDetailState(false)
  }

  const handleCancelBooking = () => {
    if (selected) {
      Modal.confirm({
        title: 'Are you sure cancel this booking?',
        icon: <ExclamationCircleFilled />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          const handleUpdate = async () => {
            dispatch(setLoaderState(true))
            const res = await apiCaller(
              bookingApi.updateBooking(
                selected.id, { state: bookingStates.CANCELLED }
              )
            )          
            dispatch(setLoaderState(false))
  
            if (res !== undefined) {
              alert("Cancelled successfully")
              setItems(items.filter(e => e !== selected))
              onDetailClose()
            }
          }
          
          handleUpdate()
        }
      })
    }
  }

  const generateItem = (booking: Booking) => {
    return (
      <div key={booking.id} 
        className="flex w-full mb-6 border border-solid border-color-border-primary rounded-md"
      >
        <div className="flex w-full">
          <div className="trip-image flex w-80 min-w-[20rem] h-48">
            <img alt={booking.item.image.name} src={booking.item.image.url} 
              className="image w-full h-full rounded-s-[5px] object-cover object-center"
            />
          </div>
          <div className="w-full flex flex-col m-5 ml-8">
            <div className="text-sm w-fit font-medium px-2 py-0.5 mb-1.5 border border-solid border-color-secondary rounded-md">
              {capitalize(booking.item.type)}
            </div>
            <div className="flex w-full">
              <div className="w-full">
                <div 
                  className="text-2xl font-semibold mb-2 cursor-pointer hover:underline"
                  onClick={
                    () => onDetailOpen(booking)
                  }
                >
                  {booking.item.name}
                </div>
                <div className="text-color-text-secondary mb-1">
                  <i className="bi bi-geo-alt mr-2"/>
                  {"Hanoi, vietnam"}
                </div>
                <div className="text-color-text-secondary mb-1">
                  <i className="bi bi-calendar-event mr-2"/>
                  <span>
                    {formatDate(booking.date)} 
                    <i className="bi bi-dot mx-0.5"/>
                    <i className="bi bi-clock mx-0.5"/>
                    {booking.startTime}
                  </span>
                </div>
              </div>
              <div>
                <i className="bi bi-three-dots text-xl px-2 rounded-md cursor-pointer hover:bg-color-hover-primary"/>
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
    children: items.map(e => generateItem(e))
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
        title={<div className="flex">
          <div className="mr-10">Booking Detail</div>
          {selected && getStateLabel[selected.state]}
        </div>}
        destroyOnClose
        onClose={onDetailClose}
        open={detailState}
        width={550}
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

    </div>
  )
}