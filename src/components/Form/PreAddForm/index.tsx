import { Form, Input, InputNumber, Rate, Select } from "antd"
import { SavedItemProps } from "../../Item/SavedItem"
import { generateTimeList } from "../../../utils/Utils"
import { apiCaller, tripApi } from "../../../api"
import { useDispatch } from "react-redux"
import { setItineraryList, setPreAddState } from "../../../redux/Trip"

interface PreAddFormProps {
  form: any
  savedItem: SavedItemProps
  day: number
}

export default function PreAddForm(props: PreAddFormProps) {
  const dispatch = useDispatch()

  const handleOnFinish = (value: any) => {
    value.savedItemId = props.savedItem.id
    value.day = props.day
    value.numOfGuests = value.numOfGuests ?? undefined
    
    apiCaller(
      tripApi.addItineraryItem(props.savedItem.tripId, value)
    ).then(res => {
      if (res !== undefined) {
        alert("Add successfully")
        dispatch(
          setItineraryList(
            { 
              itineraryItem: { ...res.data, item: props.savedItem.item }, 
              day: props.day 
            }
          )
        )
      }
      
    }).catch(_err => alert("Something went wrong. Try again."))

    dispatch(setPreAddState(false))
  }
  return (
    <div>
      <div className="flex mb-6 p-3 border border-solid border-color-border-primary rounded-lg">
        <div className="relative flex w-[7.5rem] min-w-[7.5rem] h-[7.5rem]">
          <img alt="#" src={props.savedItem.item.image.url} className="image w-full h-full rounded-[7px] object-cover object-center" />
        </div>
        <div className="ml-4 w-full flex flex-col justify-between overflow-hidden">
          <div className="mb-2">
            <div className="mb-2">
              <div className="text-lg w-full font-semibold ellipsis">
                {props.savedItem.item.name}
              </div>
              <div className="flex items-center mb-2">
                <Rate 
                  allowHalf 
                  disabled 
                  defaultValue={props.savedItem.item.review.rate} 
                  className="text-color-primary text-base mr-4"
                />
                <span className="text-sm text-color-text-secondary">{props.savedItem.item.review.total}</span>
              </div>
            </div>
            <div className="text-sm text-color-text-secondary">
              {props.savedItem.item.categories.join("-")}
            </div>
          </div>
          {props.savedItem.note && <div className="text-sm pt-1 flex justify-between border-0 border-t border-solid border-color-border-secondary">
            <div>
              <span className="font-medium text-color-extra-text-primary mr-1.5">Note:</span>
              <span className="text-color-text-secondary">
                {props.savedItem.note}
              </span>
            </div>
          </div>}
        </div>
      </div>
      <div>
        <Form layout="vertical" form={props.form} onFinish={handleOnFinish} preserve={false}>
          <Form.Item
            name="hasBooked"
            label="Has Booked?"
            initialValue={false}
          >
            <Select
              style={{ width: "6rem" }}
              placeholder="Select"
              options={[
                { value: false, label: 
                  <span className="text-color-text-primary">
                    <i className="bi bi-x-lg mr-1"/> No
                  </span> 
                },
                { value: true, label: 
                  <span className="text-color-text-primary">
                    <i className="bi bi-check-lg mr-1"/> Yes
                  </span> 
                }
              ]}
            />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
          >
            <Select
              style={{ width: "7rem" }}
              placeholder={"10:00 AM"}
              options={
                generateTimeList().map(e => ({ value: e, label: e }))
              }
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="numOfGuests"
            label="Number of Guests"
          >
            <InputNumber 
              min={1} max={200} 
              placeholder="0"
            />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
          >
            <Input.TextArea rows={3} placeholder="Enter a note" />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}