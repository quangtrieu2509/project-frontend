import { PlusOutlined } from "@ant-design/icons"
import { Drawer, Form } from "antd"
import TripList from "../TripList"
import NewTripForm from "../../Form/NewTripForm"
import { useDispatch, useSelector } from "react-redux"
import { getState, setDrawerTripsList, setTripCreationState, setTripListState } from "../../../redux/Trip"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants"

interface TripListDrawerProps {
  itemId: string
}

export default function TripListDrawer(props: TripListDrawerProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tripListState, tripCreationState } = useSelector(getState)
  const [form] = Form.useForm()

  const onTripListClose = () => {
    dispatch(setTripListState(false))
  }
  const onTripCreationClose = () => {
    dispatch(setTripCreationState(false))
  }

  const onTripCreationOpen = () => {
    dispatch(setTripCreationState(true))
  }

  const handleUpdateTrips = (trip: any) => {
    dispatch(setDrawerTripsList(trip))
  }

  const handleNavigateToTrips = () => {
    navigate(ROUTES.TRIPS_HOME)
  }
  return (
    <Drawer
      title={<div className="flex justify-between items-center">
      <div>My trips</div>
      <div 
        className=" text-sm font-normal underline cursor-pointer hover:text-color-extra-text-primary"
        onClick={handleNavigateToTrips}
      >
        View all trips
      </div>
    </div>}
      onClose={onTripListClose}
      open={tripListState}
      width={500}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      footer={
        <div className="p-3">
          <div className="flex items-center w-fit cursor-pointer" 
            onClick={onTripCreationOpen}>
            <div className="secondary-button mr-2">
              <PlusOutlined className="text-lg align-middle"/>
            </div>
            <div className="text-lg font-medium">Create a trip</div>
          </div>
          
        </div>
      }
    >
      <TripList itemId={props.itemId}/>
      <Drawer
        title="Create a new trip"
        onClose={onTripCreationClose}
        open={tripCreationState}
        width={500}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        footer={
          <div className="flex justify-between p-3">
            <div className="secondary-button" onClick={onTripCreationClose}>
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
    </Drawer>
  )
}