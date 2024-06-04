import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd"
import LocationSearch from "../../Trip/LocationSearch"
import { apiCaller, tripApi } from "../../../api"
import { useDispatch } from "react-redux"
import { setTripCreationState } from "../../../redux/Trip"

interface NewTripFormProps {
  form: any
  event: (trip: any) => void
}

export default function NewTripForm(props: NewTripFormProps) {
  const dispatch = useDispatch()

  const handleOnFinish = async (value: any) => {
    value.destination = JSON.parse(value.destination)
    value.image = value.destination.image
    value.locationId = value.destination.id
    
    const res = await apiCaller(tripApi.createTrip(value))

    if (res !== undefined) {
      dispatch(setTripCreationState(false))
      alert("Create successfully!")
      value.id = res.data.id
      props.event(value)
      props.form.resetFields()
    }
  }
  return (
    <div>
      <Form layout="vertical" form={props.form} onFinish={handleOnFinish}>
        <Form.Item
          name="title"
          label="Trip title"
          rules={[{ required: true, message: 'Enter a trip title' }]}
        >
          <Input placeholder="Enter a trip title" />
        </Form.Item>
        <Form.Item
          name="privacy"
          label="Privacy"
          // rules={[{ required: true, message: 'Select privacy' }]}
          initialValue={"private"}
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
        >
          <Input.TextArea rows={3} placeholder="Enter a description" />
        </Form.Item>
        <Form.Item
          name="destination"
          label="Destination"
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
              initialValue={1}
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
            >
              <DatePicker/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}