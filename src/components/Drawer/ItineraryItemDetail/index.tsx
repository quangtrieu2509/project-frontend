import { Drawer, Form, Rate, Typography } from "antd"
import { ItineraryItem } from "../../Trip/ItineraryTab"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getState, setEditState } from "../../../redux/Trip"
import ItineraryItemEdit from "../../Form/ItineraryItemEdit"
import { generateCategories } from "../../../utils/Utils"

interface ItineraryItemDetailProps extends ItineraryItem {}

export default function ItineraryItemDetail(props: ItineraryItemDetailProps) {
  const dispatch = useDispatch()
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const { editState } = useSelector(getState)
  const [form] = Form.useForm()

  const onEditClose = () => {
    dispatch(setEditState(false))
  }
  return (
    <>
    <div className="itinerary-item-detail">
      <div className="relative flex w-full h-48 cursor-pointer"
        onClick={() => {}}
      >
        <img alt="#" src={props.item.image.url} className="image w-full h-full object-cover object-center" />
      </div>
      <div className="my-4">
        <div className="text-2xl font-bold cursor-pointer hover:underline mb-1"
          onClick={() => window.open(`/${props.item.type}/${props.item.id}`)}
        >
          {props.item.name}
        </div>
        <div className="flex items-center mb-2">
          <Rate 
            allowHalf 
            disabled 
            defaultValue={props.item.review.rate} 
            className="text-color-primary text-lg mr-4"
          />
          <span className="text-sm text-color-text-secondary font-semibold">
            {props.item.review.total} reviews
          </span>
        </div>
        <div className="text-sm font-semibold text-color-extra-primary bg-color-extra-secondary w-fit px-2 py-0.5 rounded-md mb-2">
          {props.item.ancestors.map(e => e.name).slice(0, 2).join(", ")}
        </div>
        <div className="text-sm text-color-text-secondary">
          {generateCategories(props.item.categories, props.item.type).join(" - ")}
        </div>
      </div>
      <div className="text-sm mb-5">
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
            expanded: paraExpanded
          }}
          className="text-color-text-secondary poppins-font"
        >
          {props.item.description}
        </Typography.Paragraph>
        <span 
          className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
          onClick={() => setParaExpanded((e) => !e)}
        >
          {paraExpanded ? "Read less" : "Read more"}
        </span>
      </div>
      <div className="h-px w-full bg-color-border-secondary"/>
      <div>
        <div className="text-color-text-primary font-semibold text-base my-2">Detail</div>
        <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Has Booked?</div>
          <div className="text-color-text-primary">
            {
              props.hasBooked
              ? <><i className="bi bi-check-lg mr-10"/>Yes</>
              : <><i className="bi bi-x-lg mr-10"/>No</>
            }
          </div>
        </div>
        {props.startTime && <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Start Time</div>
          <div className="text-color-text-primary">
            <i className="bi bi-clock mr-10"/>{props.startTime}
          </div>
        </div>}
        {props.numOfGuests && <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Number of Guests</div>
          <div className="text-color-text-primary">
            <i className="bi bi-people mr-10"/>{props.numOfGuests}
          </div>
        </div>}
        {props.reservationNumber && <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Reservation Number</div>
          <div className="text-color-text-primary">
            <i className="bi bi-journal-check mr-10"/>{props.reservationNumber}
          </div>
        </div>}
        {props.note && <div className="mb-2">
          <div className="font-medium text-color-extra-text-primary mb-1.5">Note</div>
          <div className="text-color-text-primary">
            {props.note}
          </div>
        </div>}
      </div>
    </div>
    <Drawer
      title="Edit Itinerary Item"
      onClose={onEditClose}
      open={editState} destroyOnClose
      width={500} maskClosable={false}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      footer={
        <div className="flex justify-between p-3">
          <div className="secondary-button" onClick={onEditClose}>
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
      <ItineraryItemEdit form={form} itineraryItem={props}/>
    </Drawer>
    </>
  )
}