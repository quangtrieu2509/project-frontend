import { Col, DatePicker, Form, FormInstance, Input, InputNumber, Row, Select } from "antd"
import LocationSearch from "../../Trip/LocationSearch"
import { apiCaller, tripApi } from "../../../api"
import { useDispatch } from "react-redux"
import { setEditTripState } from "../../../redux/Trip"
import { ITripDetail as TripDetail } from "../../../pages/Trips/TripDetail"
import dayjs from "dayjs"

interface EditTripFormProps {
  form: FormInstance
  event?: (trip: any) => void
  trip: TripDetail
}

export default function EditTripForm(props: EditTripFormProps) {
  const dispatch = useDispatch()

  const handleOnFinish = async (value: any) => {
    console.log(value)
    value.destination = JSON.parse(value.destination)
    value.image = value.destination.image ?? props.trip.image
    value.locationId = value.destination.id
    
    // relate to itinerary items
    value.tripLength === props.trip.tripLength && (delete value.tripLength)
    
    dispatch(setEditTripState(false))

    const res = await apiCaller(tripApi.updateTrip(props.trip.id, value))
    
    if (res !== undefined) {
      
      alert("Update successfully!")
      props.event?.(res.data)
    }
  }
  return (
    <div>
      <Form layout="vertical" form={props.form} onFinish={handleOnFinish} preserve={false}>
        <Form.Item
          name="title"
          label="Trip title"
          initialValue={props.trip.title}
          rules={[{ required: true, message: 'Enter a trip title' }]}
        >
          <Input placeholder="Enter a trip title" />
        </Form.Item>
        <Form.Item
          name="privacy"
          label="Privacy"
          // rules={[{ required: true, message: 'Select privacy' }]}
          initialValue={props.trip.privacy}
        >
          <Select
            style={{ width: "7rem" }}
            placeholder="Select"
            options={[
              { value: "public", label: 
                <span className="text-color-text-primary">
                  <i className="bi bi-globe-americas mr-1"/> Public
                </span> 
              },
              { value: "private", label: 
                <span className="text-color-text-primary">
                  <i className="bi bi-lock mr-1"/> Private
                </span> 
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          initialValue={props.trip.description}
        >
          <Input.TextArea rows={3} placeholder="Enter a description" />
        </Form.Item>
        <Form.Item
          name="destination"
          label="Destination"
          initialValue={JSON.stringify(props.trip.destination)}
          rules={[{ required: true, message: 'Enter a destination' }]}
        >
          <LocationSearch/>
        </Form.Item>
        <Row>
          <Col flex={1}>
            <Form.Item
              name="tripLength"
              label="Trip length (day)"
              rules={[
                {
                  required: true,
                  message: 'Enter a trip length',
                },
              ]}
              initialValue={props.trip.tripLength}
            >
              <InputNumber 
                min={1} max={30} 
                placeholder="Enter"
              />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="startDate"
              label="Start date"
              initialValue={dayjs(props.trip.startDate)}
            >
              <DatePicker/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}