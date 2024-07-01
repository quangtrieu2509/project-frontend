import { useEffect, useState } from "react"
import "./index.style.scss"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { apiCaller, tripApi } from "../../../api"
import { coorsToViewState, formatDate, formatDateTime } from "../../../utils/Utils"
import { Drawer, Form, Modal, Tabs } from "antd"
import SavesTab from "../../../components/Trip/SavesTab"
import ItineraryTab, { ItineraryItem } from "../../../components/Trip/ItineraryTab"
import { tabItems } from "../itemLists"
import { useDispatch, useSelector } from "react-redux"
import { getState as tripState, setSavesList, setEditTripState } from "../../../redux/Trip"
import { Map, Marker, NavigationControl, Popup } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../configs"
import { Pin } from "../../../utils/Map"
import { getState as mapState, setPopupContent, setViewState } from "../../../redux/Map"
import MapPopupItem from "../../../components/Item/MapPopupItem"
import { SavedItemProps as SavedItem } from "../../../components/Item/SavedItem"
import { ExclamationCircleFilled } from "@ant-design/icons"
import EditTripForm from "../../../components/Form/EditTripForm"
import { privacies } from "../../../constants/privacies"
import { ROUTES } from "../../../constants"
import { getLocalStorage } from "../../../utils/Auth"
import { messages } from "../../../constants/message"
import NotFound from "../../Static/NotFound"
import Forbidden from "../../Static/Forbidden"

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
    coordinates: number[]
    slug: string
    ancestors: any[]
    level: number
  }
  privacy: string
  tripLength: number
  startDate?: Date
  saves?: object[]
  itinerary?: object[]
  image: {
    name: string
    url: string
  }
}


export default function TripDetail() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [trip, setTrip] = useState<ITripDetail>()
  const [activeTab, setActiveTab] = useState<string>("1")
  const params = useParams()
  const [queries] = useSearchParams()
  const savesList = useSelector(tripState).savesList as SavedItem[]
  const itineraryList = useSelector(tripState)
                          .itineraryList as ItineraryItem[][]
  const { editTripState } = useSelector(tripState)
  const { viewState, popupContent } = useSelector(mapState)
  const [editTripForm] = Form.useForm()
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const [has403Error, setHas403Error] = useState<boolean>(false)

  useEffect(() => {
    const getTrip = async () => {
      const res = await apiCaller(
        tripApi.getTripDetail(params.id ?? ""),
        (error) => {
          if (error.ec === messages.UNALLOWED_RESOURCE.ec) {
            setHas403Error(true)
          }
          else if (error.ec === messages.NOT_FOUND.ec) {
            setHas404Error(true)
          }
        }
      )

      if (res !== undefined) {
        // console.log(res)
        setTrip(res.data)
        const { coordinates, level } = res.data.destination
        dispatch(
          setViewState(coorsToViewState(coordinates, level))
        )
      }
    }

    getTrip()
  }, [params.id])

  
  useEffect(() => {
    const getItems = async () => {
      const res = await apiCaller(tripApi.getSavedItems(params.id ?? ""))

      if (res !== undefined) {
        console.log(res.data)
        dispatch(setSavesList(res.data))
      }
    }

    getItems()
  }, [params.id])

  useEffect(() => {
    setActiveTab(queries.get("tab") ?? tabItems[0].key)
  }, [queries])

  const isOwner = () => {
    return getLocalStorage("id") === trip?.owner.id
  }

  const handleOnChange = (activeKey: string) => {
    if (activeKey === tabItems[0].key) navigate("")
    else navigate(`?tab=${activeKey}`, { replace: true })
  }

  
  const handleOnEditTripClose = () => {
    Modal.confirm({
      title: 'Are you sure to cancel?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () { dispatch(setEditTripState(false)) }
    })
  }

  const handleSubmitEditTrip = () => {
    Modal.confirm({
      title: 'Are you sure to update?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () { editTripForm.submit() }
    })
  }

  const handleUpdateTrip = (e: ITripDetail) => {
    setTrip(e)
    const { coordinates, level } = e.destination
    dispatch(
      setViewState(coorsToViewState(coordinates, level))
    )
  }

  const onNavigateToProfile = () => {
    trip && navigate(ROUTES.PROFILE_BASE + trip.owner.id)
  }

  const pins = () => {
    if (activeTab === tabItems[0].key) 
      return savesList.map(e => (
        !e.item.coordinates.length
        ? <></>
        : <Marker key={e.id} offset={[0, -15]}
          longitude={e.item.coordinates[1]} latitude={e.item.coordinates[0]}
          onClick={ev => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            ev.originalEvent.stopPropagation()
            dispatch(setPopupContent(e.item))
          }}
        >
          <Pin type={e.item.type}/>
        </Marker>
      ))
    else if (activeTab === tabItems[1].key)
      return itineraryList.map(
        (day , index) => {
          return day.map(e => (
            !e.item.coordinates.length
            ? <></>
            : <Marker key={e.id} offset={[0, -15]}
              longitude={e.item.coordinates[1]} latitude={e.item.coordinates[0]}
              onClick={ev => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                ev.originalEvent.stopPropagation()
                dispatch(setPopupContent(e.item))
              }}
            >
              <Pin type={e.item.type} badge={index + 1}/>
            </Marker>
          ))
        }
      )
    
  }

  return (
    <div className="tp-page trips-page bg-white">
      {
        has404Error 
        ? <NotFound/> : has403Error ? <Forbidden/>
        : (trip && <div className="tp-wrapper">
          <div className="relative flex flex-col w-full h-80 text-white mb-6">
            <div className="absolute w-full h-full trip-detail-image">
              <img alt={trip.image.name} src={trip.image.url} 
                className="image w-full h-full object-cover object-center rounded-lg" 
              />
            </div>
            <div className="relative h-full py-6 px-12 flex flex-col justify-center items-center">
              <div className="font-bold text-5xl mb-4">
                {trip.title}
              </div>
            </div>
            {isOwner() && <div 
              className="absolute top-6 right-6 bg-white px-4 py-0.5 rounded-full shadow-lg cursor-pointer hover-button"
              onClick={() => dispatch(setEditTripState(true))}
            >
              <i className="bi bi-pencil-square text-color-text-primary text-lg"/>
            </div>}
            <div className="absolute top-6 left-6">
              <div className="flex">
                <div className="h-11 max-w-[2.75rem] mr-3">
                  <img alt="#" src={trip.owner.profileImage} 
                    className="image h-full rounded-full cursor-pointer" 
                    onClick={onNavigateToProfile}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="name text-base font-semibold cursor-pointer"
                    onClick={onNavigateToProfile}
                  >
                    {`${trip.owner.familyName} ${trip.owner.givenName}`}
                  </div>
                  <div className="flex items-center text-sm">
                    <div>
                        {formatDateTime(trip.createdAt)}
                        <i className="bi bi-dot mx-1"/>
                    </div>
                    <div>
                      <i 
                        className={`bi bi-${trip.privacy === privacies.PUBLIC ? "globe-americas" : "lock-fill"}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 flex w-full justify-center">
              <div className="mr-8">
                <i className="bi bi-geo-alt-fill mr-2"/>
                {trip.destination.name}
              </div>
              <div className="mr-8">
                <i className="bi bi-calendar-event-fill mr-2"/>
                {
                  !trip.startDate
                  ? <span>{`${trip.tripLength} days`}</span>
                  : <span>
                    {formatDate(trip.startDate)} 
                    <i className="bi bi-dot mx-0.5"/>
                    {`${trip.tripLength} days`}
                  </span>
                }
              </div>
              <div>
                <i className="bi bi-heart-fill mr-2 text-color-object-primary"/>
                {trip.interact?.likes}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="h-fit w-[65%] mr-6">
            {
              trip.description && <div className=" font-medium break-words shadow-lg p-2 pt-1 rounded-lg mb-3">
                <i className="bi bi-quote mr-1 text-xl"/>{trip.description}
              </div>
            }
            <Tabs
              className="trip-detail-tab"
              items={
                [
                  {
                    ...tabItems[0],
                    children: <SavesTab isOwner={isOwner()}/>
                  },
                  {
                    ...tabItems[1],
                    children: <ItineraryTab isOwner={isOwner()}
                      tripLength={trip.tripLength} 
                    />
                  }
                ]
              }
              activeKey={activeTab}
              onChange={handleOnChange}
            />

            </div>
            <div className="h-[85vh] w-[35%] bg-color-background-primary sticky top-20 bottom-12 rounded-lg mb-6">
              <Map
                mapboxAccessToken={MAPBOX_API_KEY}
                {...viewState}
                onMove={e => dispatch(setViewState(e.viewState))}
                style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                attributionControl={false} 
              > 
                <NavigationControl position="bottom-right"/>
                {pins()}
                {popupContent && <Popup
                  className="poppins-font"
                  anchor="top"
                  longitude={popupContent.coordinates[1]}
                  latitude={popupContent.coordinates[0]}
                  onClose={() => dispatch(setPopupContent(undefined))}
                >
                  <MapPopupItem {...popupContent}/>
                </Popup>}
              </Map>
            </div>
          </div>
        </div>)
      }
      <Drawer
        title={"Edit trip"}
        onClose={handleOnEditTripClose} maskClosable={false}
        open={editTripState} width={500} destroyOnClose
        footer={
          <div className="flex justify-between p-3">
            <div className="secondary-button" 
              onClick={handleOnEditTripClose}
            >
              Cancel
            </div>
            <div className="primary-button"
              onClick={handleSubmitEditTrip}
            >
              Update trip
            </div>
          </div>
        }
      >
        {trip && <EditTripForm form={editTripForm} 
          trip={trip} event={handleUpdateTrip}/>
        }
      </Drawer>
    </div>
  )
}