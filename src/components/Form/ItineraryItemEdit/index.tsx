import { Form, Input, InputNumber, Rate, Select } from "antd"
import { generateTimeList } from "../../../utils/Utils"
import { apiCaller, tripApi } from "../../../api"
import { useDispatch } from "react-redux"
import { setEditState, updateItineraryList } from "../../../redux/Trip"
import { ItineraryItem } from "../../Trip/ItineraryTab"

interface ItineraryItemEditProps {
  form: any
  itineraryItem: ItineraryItem
}

export default function ItineraryItemEdit(props: ItineraryItemEditProps) {
  const dispatch = useDispatch()

  const handleOnFinish = (value: any) => {
    value.numOfGuests = value.numOfGuests ?? undefined
    // console.log({ 
    //             itineraryItem: { ...props.itineraryItem, ...value }, 
    //             day: props.itineraryItem.day 
    //           })
    
    apiCaller(
      tripApi.editItineraryItem(props.itineraryItem.id, value)
    ).then(res => {
      if (res !== null) {
        alert("Update successfully")
        dispatch(
          updateItineraryList(
            { 
              itineraryItem: { ...props.itineraryItem, ...value }, 
              day: props.itineraryItem.day 
            }
          )
        )
      }
    }).catch(_err => alert("Something went wrong. Try again."))

    dispatch(setEditState(false))
  }
  return (
    <div>
      <div className="flex mb-6 p-3 border border-solid border-color-border-primary rounded-lg">
        <div className="relative flex w-[7.5rem] min-w-[7.5rem] h-[7.5rem]">
          <img alt="#" src={props.itineraryItem.item.image} className="image w-full h-full rounded-[7px] object-cover object-center" />
        </div>
        <div className="ml-4 w-full flex flex-col justify-between overflow-hidden">
          <div className="mb-2">
            <div className="mb-2">
              <div className="text-lg w-full font-semibold ellipsis">
                {props.itineraryItem.item.name}
              </div>
              <div className="flex items-center mb-2">
                <Rate 
                  allowHalf 
                  disabled 
                  defaultValue={props.itineraryItem.item.review.rate} 
                  className="text-color-primary text-base mr-4"
                />
                <span className="text-sm text-color-text-secondary">{props.itineraryItem.item.review.total}</span>
              </div>
            </div>
            <div className="text-sm text-color-text-secondary">
              {props.itineraryItem.item.categories.join("-")}
            </div>
          </div>
          {/* {props.itineraryItem.note && <div className="text-sm pt-1 flex justify-between border-0 border-t border-solid border-color-border-secondary">
            <div>
              <span className="font-medium text-color-extra-text-primary mr-1.5">Note:</span>
              <span className="text-color-text-secondary">
                {props.itineraryItem.note}
              </span>
            </div>
          </div>} */}
        </div>
      </div>
      <div>
        <Form layout="vertical" form={props.form} onFinish={handleOnFinish} preserve={false}>
          <Form.Item
            name="hasBooked"
            label="Has Booked?"
            initialValue={props.itineraryItem.hasBooked}
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
            initialValue={props.itineraryItem.startTime}
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
            initialValue={props.itineraryItem.numOfGuests}
          >
            <InputNumber 
              min={1} max={200} 
              placeholder="0"
            />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
            initialValue={props.itineraryItem.note}
          >
            <Input.TextArea rows={3} placeholder="Enter a note" />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}