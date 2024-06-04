import { Skeleton } from "antd"

import "../index.style.scss"
import { useEffect, useState } from "react"
import TripHeader from "./TripHeader"
import { apiCaller } from "../../../api"
import { tripApi } from "../../../api/trip"
import { ROUTES, interactTypes } from "../../../constants"
import { formatDate } from "../../../utils/Utils"

// interface ITripOverview {
//   id: string
//   owner: {
//     id: string
//     givenName: string
//     familyName: string
//     username: string
//     profileImage: string
//   }
//   interact: {
//     liked: boolean
//     likes: number
//   }
//   createdAt: Date
//   title: string
//   privacy: string
//   isOwner: boolean
//   tripLength: number
//   startDate?: Date
// }

export interface IInteract {
  liked: boolean
  likes: number
}
export const initInteract = {
  liked: false,
  likes: 0
}

export default function TripOverview(
  props: {
    trip: any | null
  } = { trip: null }
) {
  const [interact, setInteract] = useState<IInteract>(initInteract)

  
  const handleLike = async () => {
    const { liked, likes } = interact
    await apiCaller(
      tripApi.interactTrip(
        props.trip?.id as string,
        interactTypes.LIKE,
        !liked,
      )
    )

    liked
    ? setInteract({ ...interact, liked: !liked, likes: likes - 1 })
    : setInteract({ ...interact, liked: !liked, likes: likes + 1 })
  }

  useEffect(() => {
    if (props.trip) {
      setInteract(props.trip.interact)
      console.log(props.trip)
    }
  }, [props.trip])

  return (
    <div className="rounded-md pt-3.5 bg-white mb-4">
      {
        !props.trip
        ? <>
          <TripHeader 
            owner={null} 
            privacy=""
            createdAt={new Date()}
            isOwner={false}
          />
          <div className="trip-content">
            <Skeleton active paragraph={{ rows: 2 }}/>
          </div>
        </>
        : <>
          <TripHeader 
            owner={props.trip.owner} 
            privacy={props.trip.privacy}
            isOwner={props.trip.isOwner}
            createdAt={props.trip.createdAt}
          />
          <div className="trip-content px-6 mb-3">
              <div 
                className="text-base font-semibold cursor-pointer hover:underline mb-0.5"
                onClick={() => window.open(ROUTES.TRIP_BASE + props.trip.id)}
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
        </>
      }
      {
        props.trip && 
        <div className="mb-3 h-80">
          <img alt={props.trip.image.name} src={props.trip.image.url} 
            className="image w-full h-full object-cover object-center" 
          />
        </div>
      }
      <div className="trip-footer">
        {
          props.trip
          && <div className="px-6 py-1 text-xs text-extraText">
            <span className={interact.likes === 0 ? "hidden" : ""}>
              <i className="bi bi-heart-fill text-color-object-primary mr-1.5"/>
              {interact.likes}
            </span>
          </div>
        }
        <div className="h-[1px] bg-color-border-secondary"/>
        <div className={`flex py-1 justify-between ${!props.trip ? "pointer-events-none" : ""}`}>
          <div
            className={interact.liked ? "active-interact-btn" : "interact-btn"}
            onClick={handleLike}
          >
            <i className={`bi bi-heart${interact.liked ? "-fill" : ""}`}/>
            <span className="ml-2">
              Like
            </span>
          </div>
          <div 
            className="interact-btn mx-1"
          >
            <i className="bi bi-bookmark"/>
            <span className="ml-2">
              Take all items
            </span>
          </div>
          <div 
            className={"interact-btn"}
          >
            <i className={`bi bi-copy`}/>
            <span className="ml-2">
              Clone
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}