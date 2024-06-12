import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { apiCaller } from "../../api";
import { tripApi } from "../../api/trip";
import NoResult from "../../components/Profile/NoResult";
import { privacies } from "../../constants/privacies";
import { Drawer, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getState, setTripCreationState } from "../../redux/Trip";
import NewTripForm from "../../components/Form/NewTripForm";
import { formatDate } from "../../utils/Utils";
import { ROUTES } from "../../constants";

export interface ITripHome {
  id: string
  ownerId: string
  locationId: string
  interact?: {
    likes: number
    saves: number
  }
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  destination: {
    id: string
    name: string
    ancestors: any[]
    level: number
    slug: string
  }
  privacy: string
  tripLength: number
  startDate?: Date
  image: {
    name: string
    url: string
  }
}

export default function Trips() {
  const [trips, setTrips] = useState<ITripHome[]>([])
  const { tripCreationState } = useSelector(getState)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    const getTrips = async () => {
      const res = await apiCaller(tripApi.getHomeTrips())
      
      if (res !== undefined) {
        console.log(res)
        setTrips(res.data)
      }
    }

    getTrips()
  }, [])

  const handleOnClose = () => {
    dispatch(setTripCreationState(false))
  }

  const handleOnOpen = () => {
    dispatch(setTripCreationState(true))
  }

  const handleUpdateTrips = (trip: any) => {
    const newList = [trip, ...trips]
    setTrips(newList)
  }

  return (
    <div className="tp-page trips-page bg-white">
      <div className="tp-wrapper">
        <h1>My Trips</h1>
        <div 
          className="w-full border border-solid border-color-border-primary rounded-md text-center font-semibold py-4 mb-8 cursor-pointer hover:border-color-secondary smooth-trans"
          onClick={handleOnOpen}
        >
          <PlusOutlined className="mr-1"/> Create a new trip
        </div>
        <div
          className=" text-end mb-2"
        >
          Sort by: Created date
        </div>
        <div>
          {
            trips.length === 0
            ? <NoResult/>
            : trips.map(value => {
              return (
                <div key={value.id} 
                  className="flex w-full mb-6 border border-solid border-color-border-primary rounded-md"
                >
                  <div className="flex w-full">
                    <div 
                      className="trip-image flex w-80 min-w-[20rem] h-48 cursor-pointer"
                      onClick={
                        () => window.open(
                          ROUTES.TOURISM_BASE + value.destination.slug
                        )
                      }  
                    >
                      <img alt={value.image.name} src={value.image.url} 
                        className="image w-full h-full rounded-s-[5px] object-cover object-center"
                      />
                    </div>
                    <div className="w-full flex flex-col m-5 ml-8">
                      <div className="flex w-full">
                        <div className="w-full">
                          <div 
                            className="text-2xl font-semibold mb-2 cursor-pointer hover:underline"
                            onClick={
                              () => window.open(ROUTES.TRIP_BASE + value.id)
                            }
                          >
                            {value.title}
                          </div>
                          <div className="text-color-text-secondary mb-1">
                            <i className="bi bi-geo-alt mr-2"/>
                            {value.destination.name}
                          </div>
                          <div className="text-color-text-secondary mb-1">
                            <i className="bi bi-calendar-event mr-2"/>
                            {
                              !value.startDate
                              ? <span>{`${value.tripLength} days`}</span>
                              : <span>
                                {formatDate(value.startDate)} 
                                <i className="bi bi-dot mx-0.5"/>
                                {`${value.tripLength} days`}
                              </span>
                            }
                          </div>
                        </div>
                        <div>
                          <i className="bi bi-three-dots text-xl px-2 rounded-md cursor-pointer hover:bg-color-hover-primary"/>
                        </div>
                      </div>
                      <div className="h-full flex items-end text-sm">
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
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <Drawer
        title="Create a new trip"
        onClose={handleOnClose}
        open={tripCreationState}
        width={500}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        footer={
          <div className="flex justify-between p-3">
            <div className="secondary-button" onClick={handleOnClose}>
              Cancel
            </div>
            <div className="primary-button"
            onClick={() => {
              form.submit()
            }}
            >
              Create trip
            </div>
          </div>
        }
      >
        <NewTripForm form={form} event={handleUpdateTrips}/>
      </Drawer>
      
    </div>
  )
}