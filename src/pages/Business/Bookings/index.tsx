import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { bookingStateLabels as states } from "../../../constants/booking-states"
import { apiCaller, bookingApi } from "../../../api"
import BookingCard from "../../../components/Business/BookingCard"
import { useDispatch, useSelector } from "react-redux"
import { getState, setBookingList } from "../../../redux/Business"
import NoResult from "../../../components/Profile/NoResult"

export interface Booking {
  id: string
  user: {
    id: string
    familyName: string
    givenName: string
    profileImage: string
  }
  itemId: string
  date: Date
  startTime: string
  state: string
  note: string
  numOfGuests?: string
  numOfRooms?: string
  phoneNumber: string
  email: string
  createdAt: Date
  updateAt: Date
}

export default function Bookings() {
  const dispatch = useDispatch()
  const [queries] = useSearchParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>("1")
  const items = useSelector(getState).bookingList as Booking[]
  const params = useParams()

  useEffect(() => {
    setActiveTab(queries.get("state") ?? states[0].key)
  }, [queries])

  useEffect(() => {
    const getItems = async () => {
      if (params.id) {
        const res = await apiCaller(
          bookingApi.getBusinessBookings(params.id, activeTab)
        )
  
        if (res !== undefined) {
          console.log(res.data)
          dispatch(setBookingList(res.data))
        }
      }
    }
    
    getItems()
  }, [activeTab, params.id])

  const handleOnChange = (activeKey: string) => {
    queries.set("state", activeKey)
    navigate(`?${queries.toString()}`)
  }

  const generateTabButton = (key: string, label: string) => {
    return (
      <div 
        key={key}
        className={`h-fit py-1.5 px-3 rounded-md border border-solid bg-white hover:bg-color-hover-primary cursor-pointer 
          ${key === activeTab ? "border-color-secondary font-medium" : "border-color-border-primary"}`}
        onClick={() => handleOnChange(key)}  
      >
        {label}
      </div>
    )
  }
  return (
    <div>
      <h2 className="mt-0">Bookings</h2>
      <div className="flex gap-4 mb-6">
      {
        states.map(e => generateTabButton(e.key, e.label))
      }
      </div>
      <div>
        {
          items.length 
          ? items.map((e, i) => <BookingCard key={i} booking={e}/>) 
          : <NoResult/>
        }
      </div>
    </div>
  )
}