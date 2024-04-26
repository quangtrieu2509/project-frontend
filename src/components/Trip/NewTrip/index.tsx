import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd"
import LocationSearch from "../LocationSearch"
import { apiCaller, tripApi } from "../../../api"
import { useDispatch } from "react-redux"
import { setTripCreationState } from "../../../redux/Trip"

interface NewTripProps {
  form: any
  event: (trip: any) => void
}

export default function NewTrip(props: NewTripProps) {
  const dispatch = useDispatch()

  const handleOnFinish = async (value: any) => {
    value.destination = JSON.parse(value.destination)
    
    const res = await apiCaller(tripApi.createTrip(value))

    if (res !== null) {
      dispatch(setTripCreationState(false))
      alert("Create successfully!")
      props.event(res.data)
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
          rules={[{ required: true, message: 'Select privacy' }]}
        >
          <Select
            style={{ width: "7rem" }}
            placeholder="Select"
            options={[
              { value: 'public', label: 
                <span className="text-color-text-primary">
                  <i className="bi bi-globe-americas mr-1"/> Public
                </span> 
              },
              { value: 'private', label: 
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