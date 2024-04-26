import { useEffect, useState } from "react"
import "./index.style.scss"
import { useParams } from "react-router-dom"
import { apiCaller, tripApi } from "../../../api"
import { formatDate } from "../../../utils/Utils"
import { Tabs } from "antd"
import { tripDetailTabItems } from "../itemLists"

export interface ITripDetail {
  id: string
  owner: {
    id: string
    familyName: string
    givenName: string
    profileImage: string
  }
  interact?: {
    likes: number
  }
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  destination: {
    id: string
    name: string
    detail?: string
    type: string
    image: string
  }
  privacy: string
  tripLength: number
  startDate?: Date
  saves?: object[]
  itinerary?: object[]
}


export default function TripDetail() {
  const [trip, setTrip] = useState<ITripDetail>()
  const params = useParams()

  useEffect(() => {
    const getTrip = async () => {
      const res = await apiCaller(tripApi.getTripDetail(params.id ?? ""))

      if (res !== null) {
        console.log(res.data)
        setTrip(res.data)
      }
    }

    getTrip()
  }, [params])

  return (
    <div className="tp-page trips-page bg-white">
      <div className="tp-wrapper">
        <div className="trip-detail-header relative flex flex-col w-full h-80 text-white mb-6">
          <div className="trip-detail-image absolute w-full h-full">
            <img alt="#" src={trip?.destination.image} 
              className="image w-full h-full object-cover object-center rounded-lg" 
            />
          </div>
          <div className="relative h-full py-6 px-12 flex flex-col justify-center items-center">
            <div className="font-bold text-5xl mb-4">
              {trip?.title}
            </div>
          </div>
          <div 
            className="absolute top-6 right-6 bg-white px-4 py-0.5 rounded-full shadow-lg cursor-pointer hover-button"
            onClick={() => alert("handle edit trip")}
          >
            <i className="bi bi-pencil-square text-color-text-primary text-lg"/>
          </div>
          <div className="absolute bottom-3 flex w-full justify-center">
            <div className="mr-8">
              <i className="bi bi-geo-alt-fill mr-2"/>
              {trip?.destination.name}
            </div>
            <div className="mr-8">
              <i className="bi bi-calendar-event-fill mr-2"/>
              {
                !trip?.startDate
                ? <span>{`${trip?.tripLength} days`}</span>
                : <span>
                  {formatDate(trip?.startDate)} 
                  <i className="bi bi-dot mx-0.5"/>
                  {`${trip.tripLength} days`}
                </span>
              }
            </div>
            <div>
              <i className="bi bi-heart-fill mr-2 text-color-object-primary"/>
              {trip?.interact?.likes}
            </div>
          </div>
        </div>
        <div className="trip-detail-content flex">
          <div className="trip-detail-info h-fit w-3/5 mr-6">
          {
            !trip?.description
            ? <></>
            : <div className=" font-medium break-words shadow-lg p-2 pt-1 rounded-lg mb-3">
              <i className="bi bi-quote mr-1 text-xl"/>{trip.description}
            </div>
          }
          <Tabs
            className="trip-detail-tab"
            items={tripDetailTabItems}
            // activeKey={activeTab}
            // onChange={handleOnChange}
          />

          </div>
          <div className="trip-detail-map h-[600px] max-h-[80vh] w-2/5 bg-color-primary sticky top-20 bottom-12 rounded-lg">
              This is map here
          </div>
        </div>
      </div>
      
    </div>
  )
}