import { Skeleton } from "antd"
import "../index.style.scss"
import TripHeader from "./TripHeader"
import { ROUTES } from "../../../constants"
import { formatDate } from "../../../utils/Utils"

interface ITripOverview {
  id: string
  owner: {
    id: string
    givenName: string
    familyName: string
    profileImage: string
  }
  interact: {
    liked: boolean
    likes: number
  }
  createdAt: Date
  title: string
  privacy: string
  isOwner: boolean
  tripLength: number
  startDate?: Date
  image: {
    name: string
    url: string
  }
  destination: any
}

interface TripOverviewProps {
  trip?: ITripOverview
}

export default function TripOverview(props: TripOverviewProps) {
  return (
    <div className="rounded-md pt-3.5 bg-white mb-4">
      {
        !props.trip
        ? <>
          <TripHeader/>
          <div className="trip-content px-6">
            <Skeleton active paragraph={{ rows: 2 }}/>
          </div>
        </>
        : <>
          <TripHeader header={{ ...props.trip }}/>
          <div className="trip-content px-6 mb-3">
              <div 
                className="text-base font-semibold cursor-pointer hover:underline mb-0.5"
                onClick={() => window.open(ROUTES.TRIP_BASE + props.trip?.id)}
              >
                {props.trip.title}
              </div>
              <div className="text-color-text-primary mb-1">
                <i className="bi bi-geo-alt mr-2"/>
                {props.trip.destination.name}
              </div>
              <div className="text-color-text-primary mb-1">
                <i className="bi bi-calendar-event mr-2"/>
                {
                  !props.trip.startDate
                  ? <span>{`${props.trip.tripLength} days`}</span>
                  : <span>
                    {formatDate(props.trip.startDate)} 
                    <i className="bi bi-dot mx-0.5"/>
                    {`${props.trip.tripLength} days`}
                  </span>
                }
              </div>
          </div>
          <div className="mb-3 h-80 rounded-b-md overflow-hidden">
            <img alt={props.trip.image.name} src={props.trip.image.url} 
              className="image w-full h-full object-cover object-center" 
            />
          </div>
        </>
      }
    </div>
  )
}