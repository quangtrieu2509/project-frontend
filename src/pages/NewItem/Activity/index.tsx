import { Form, FormInstance, Input, InputNumber, Select } from "antd"
import { Duration, activityTypes, defaultDuration, durationUnits, itemTypes } from "../../../constants"
import { useState } from "react"
import TextArea from "antd/es/input/TextArea"
import { onSubmit } from ".."

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 30 }
}

const textAreaSz = { minRows: 2, maxRows: 6 }

interface ActivityProps {
  overviewForm: FormInstance
  onBack: (step: number) => void
}

export default function Activity(props: ActivityProps) {
  const [form] = Form.useForm()
  const [duration, setDuration] = useState<Duration>(defaultDuration)
  const [priceRange, setPriceRange] = useState<number[]>([0, 0])
  const [ages, setAges] = useState<number[]>([0, 0])

  const handleGoBack = () => {
    props.onBack(1)
  }

  const onFinish = (values: any) => {
    const { 
      phoneNumber, email, website, ...rest
    } = values
    rest.ticketPrice = priceRange
    duration.value && (rest.duration = duration)
    rest.ages = ages
    rest.contacts = {
      phoneNumber, email, website
    }
    rest.type = itemTypes.ACTIVITY
    // console.log(rest)
    onSubmit(props.overviewForm.getFieldsValue(), rest)
  }

  return (
    <div className="grid grid-cols-2 gap-x-12">
      <Form  className="w-full poppins-font" {...formItemLayout}
        variant="filled" form={form} onFinish={onFinish}
      >
        <div className=" text-color-text-primary font-semibold text-lg mb-2">
          Basic Info
        </div>
        <Form.Item
          name="categories"
          label="Type"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select no more than 5"
            maxCount={5}
            options={Object.entries(activityTypes).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          label="Price Range"
        >
          <InputNumber
            min={0} max={priceRange[1]} placeholder="Min" addonBefore="$" className="w-28"
            onChange={
              (e) => setPriceRange([e ?? 0, priceRange[1]])
            } value={priceRange[0]} 
          />
          <span className="mx-1.5 text-lg">-</span>
          <InputNumber 
            min={priceRange[0]} placeholder="Max" addonBefore="$" className="w-28"
            onChange={
              (e) => setPriceRange([priceRange[0], e ?? priceRange[0]])
            } value={priceRange[1]}
          />
          <span className=" text-color-text-tertiary ml-3">(optional)</span>
        </Form.Item>
        <Form.Item
          label="Duration"
        >
          <InputNumber
            min={1} max={100} placeholder="0" className="w-20"
            onChange={
              (e) => setDuration({ ...duration, value: e ?? undefined })
            } value={duration.value} 
          />
          <span className="mx-1"/>
          <Select
            placeholder="Select"
            style={{ width: "7rem" }}
            value={duration.unit}
            onChange={e => setDuration({ ...duration, unit: e })}
            options={Object.entries(durationUnits).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
          <span className=" text-color-text-tertiary ml-3">(optional)</span>
        </Form.Item>
        <Form.Item
          label="Ages"
        >
          <InputNumber
            min={0} max={100} placeholder="Min" addonAfter="y/o" className="w-[6.5rem]"
            onChange={
              (e) => setAges([e ?? 0, ages[1]])
            } value={ages[0]} 
          />
          <span className="mx-1.5 text-lg">-</span>
          <InputNumber 
            min={0} max={100} placeholder="Max" addonAfter="y/o" className="w-[6.5rem]"
            onChange={
              (e) => setAges([ages[0], e ?? ages[0]])
            } value={ages[1]}
          />
          <span className=" text-color-text-tertiary ml-3">(optional)</span>
        </Form.Item>
        <div className=" text-color-text-primary font-semibold text-lg mb-2">
          Contacts
        </div>
        <Form.Item 
          label="Phone Number" name="phoneNumber"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
        >
          <Input placeholder="Enter a phone number"/>
        </Form.Item>
        <Form.Item 
          label="Email" name="email"
          rules={[
            {
              type: "email",
              message: "Email is not valid",
            }
          ]}
        >
          <Input placeholder="Enter a email (optional)"/>
        </Form.Item>
        <Form.Item 
          label="Website" name="website"
          rules={[
            {
              type: "url",
              message: "Website is not valid",
            }
          ]}
        >
          <Input placeholder="Enter a website (optional) https://example.com"/>
        </Form.Item>
        <Form.Item
          label=" "
        >
          <div className="flex">
            <div 
              className="secondary-button mr-5"
              onClick={handleGoBack}
            >
              Back
            </div>  
            <div className="primary-button" 
              onClick={() => form.submit()}
            >
              Submit
            </div>
          </div>
        </Form.Item>
      </Form>
      <Form className="w-full poppins-font" {...formItemLayout}
        variant="filled" form={form} onFinish={onFinish}
      >
        <div className=" text-color-text-primary font-semibold text-lg mb-2">
          More Info
        </div>
        <Form.Item 
          label="Included" name="included"
        >
          <TextArea placeholder="Enter things included (optional)"
            autoSize={textAreaSz}
          />
        </Form.Item>
        <Form.Item 
          label="Excluded" name="excluded"
        >
          <TextArea placeholder="Enter things excluded (optional)"
            autoSize={textAreaSz}
          />
        </Form.Item>
        <Form.Item 
          label="REQs" name="requirements"
        >
          <TextArea placeholder="Enter requirements (optional)"
            autoSize={textAreaSz}
          />
        </Form.Item>
      </Form>
    </div>
  )
}