import { Form, FormInstance, Input, InputNumber, Select } from "antd"
import { useState } from "react"
import { lodgingPrices, lodgingTypes, itemTypes, lodgingAmenities, lodgingRoomFeatures } from "../../../constants"
import { onSubmit } from ".."

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 30 }
}

interface LodgingProps {
  overviewForm: FormInstance
  onBack: (step: number) => void
}

export default function Lodging(props: LodgingProps) {
  const [form] = Form.useForm()
  const [priceRange, setPriceRange] = useState<number[]>([0, 0])

  const handleGoBack = () => {
    props.onBack(1)
  }

  const onFinish = (values: any) => {
    const { 
      amenities, features, priceLevel, 
      phoneNumber, email, website, ...rest
    } = values
    rest.amenities = [...amenities, ...features]
    rest.price = {
      level: priceLevel,
      range: priceRange
    }
    rest.contacts = {
      phoneNumber, email, website
    }
    rest.type = itemTypes.LODGING
    onSubmit(props.overviewForm.getFieldsValue(), rest)
  }

  return (
    <div className="flex">
      <Form {...formItemLayout} form={form} 
        variant="filled" className="w-[36rem] mr-14 poppins-font"
        onFinish={onFinish}
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
            placeholder="Select"
            options={Object.entries(lodgingTypes).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="amenities"
          label="Property Amenities"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select"
            options={Object.entries(lodgingAmenities).map(([key, value]) => {
              return {
                value: key, 
                label: <div className="flex">
                  <i className={`bi bi-${value.icon} mr-2`}/>
                  <div>{value.label}</div>
                </div>
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="features"
          label="Room Features"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select"
            options={Object.entries(lodgingRoomFeatures).map(([key, value]) => {
              return {
                value: key, 
                label: <div className="flex">
                  <i className={`bi bi-${value.icon} mr-2`}/>
                  <div>{value.label}</div>
                </div>
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="priceLevel"
          label="Hotel Class"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
        >
          <Select
            placeholder="Select"
            style={{ width: "10rem" }}
            options={Object.entries(lodgingPrices).map(([key, value]) => {
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
          name="isReservable"
          label="Is Reservable?"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
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
    </div>
  )
}