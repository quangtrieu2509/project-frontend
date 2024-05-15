import { useEffect, useState } from "react"
import { apiCaller, tripApi } from "../../../api"
import NoResult from "../../Profile/NoResult"
import { formatDate } from "../../../utils/Utils"
import { useDispatch, useSelector } from "react-redux"
import { getState, setDrawerTripsList } from "../../../redux/Trip"
import { Form, Input, Modal } from "antd"

interface TripListProps {
  itemId: string
}

export interface DrawerTrip {
  id: string
  title: string
  privacy: string
  destination: {
    name: string
  }
  startDate?: Date
  tripLength: number
  isSaved: boolean
  image: string
  saves: Array<{
    id: string
    itemId: string
  }>
}

export default function TripList (props: TripListProps) {
  const list: DrawerTrip[] = useSelector(getState).drawerTripsList
  const [modalState, setModalState] = useState<boolean>(false)
  const [selectedTrip, setSelectedTrip] = useState<string>()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const getList = async () => {
    const res = await apiCaller(tripApi.getDrawerTrips(props.itemId))

    if (res !== null) {
      console.log(res.data)
      const trips: any[] = []
      for (const trip of (res.data as DrawerTrip[])) {
        const isSaved = trip.saves.map(e => e.itemId).includes(props.itemId)
        trips.push({ ...trip, isSaved })
      }
      dispatch(setDrawerTripsList(trips))
    }
  }

  useEffect(() => {
    getList()
  }, [props.itemId])

  const handleSave = async (tripId: string, isSaved: boolean, saves: any[]) => {
    if (isSaved) {
      saves.forEach(async e => {
        if (e.itemId === props.itemId) {
          await apiCaller(
            tripApi.removeItemFromTrip(e.id)
          )
          alert("Removed Item")
          getList()
          return
        }
      })
    } else {
      setModalState(true)
      setSelectedTrip(tripId)
    }
  }

  const handleCancel = () => {
    setModalState(false)
    setSelectedTrip(undefined)
  }

  const handleOnFinish = async (value: any) => {
    await apiCaller(
      tripApi.addItemToTrip(selectedTrip, { itemId: props.itemId, ...value })
    )

    handleCancel()
    getList()
  }

  return (
    <div>
      <h1 className="mt-0">Save to a trip</h1>
      <div>
        {
          list.length === 0
          ? <NoResult/>
          : list.map((value, index) => {
            return (
              <div key={index} 
                className="flex w-full mb-5 border border-solid border-color-border-primary rounded-md cursor-pointer hover:bg-color-hover-primary"
                onClick={() => handleSave(value.id, value.isSaved, value.saves)}
              >
                <div className="relative flex w-32 min-w-[8rem] h-24">
                  {
                    value.isSaved && <div className="absolute top-0 left-0 py-[5px] px-2.5 m-1.5 bg-white rounded-full cursor-pointer shadow-lg">
                      <i className="bi bi-bookmarks-fill text-lg text-color-object-tertirary"/>
                    </div>
                  }
                  <img alt="#" src={value.image} className="image w-full h-full rounded-s-[5px] object-cover object-center" />
                </div>
                <div className="w-full flex flex-col p-1 pl-4">
                  <div className="text-lg font-semibold mb-1 ellipsis">
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
              </div>
            )
          })
        }
      </div>
      <Modal
        open={modalState}
        onCancel={handleCancel}
        title={<div className="w-full flex justify-center text-lg">Add Note</div>}
        centered destroyOnClose
        maskClosable={false}
        footer={
          <div className="flex justify-center relative">
            <div className="secondary-button absolute left-0" 
              onClick={handleCancel}
            >
              Cancel
            </div>
            <div className="primary-button"
            onClick={() => {
              form.submit()
            }}
            >
              Save
            </div>
          </div>
        }
      >
        <div className="mb-2 text-color-extra-text-primary">
          Add some notes to remind you later.
        </div>
        <Form
          layout="vertical"
          form={form} onFinish={handleOnFinish}
        >
          <Form.Item
            name="note" preserve={false}
            label={
              <div className="flex">
                <div className="text-base font-semibold mr-1">Note</div>
                <div className="text-color-text-tertiary">(optional)</div>
              </div>
            }
          >
            <Input.TextArea rows={3} placeholder="Ex: I will come at 11am for lunch,..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}