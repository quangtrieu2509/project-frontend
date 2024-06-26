import { Form, FormInstance, Input, InputNumber, Select } from "antd"
import { diningFeatures, diningMeals, diningPrices, diningTypes, itemTypes } from "../../../constants"
import { useState } from "react"
import HoursConfig, { Hour } from "../../../components/Item/HoursConfig"
import { onSubmit } from ".."

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 30 }
}

interface DiningProps {
  overviewForm: FormInstance
  onBack: (step: number) => void
}

export default function Dining(props: DiningProps) {
  const [form] = Form.useForm()
  const [hours, setHours] = useState<Hour[]>(Array(7).fill(null))
  const [priceRange, setPriceRange] = useState<number[]>([0, 0])

  const handleGoBack = () => {
    props.onBack(1)
  }

  const onFinish = (values: any) => {
    const { 
      features, meals, priceLevel, 
      phoneNumber, email, website, ...rest
    } = values
    rest.features = [...features, ...meals]
    rest.price = {
      level: priceLevel,
      range: priceRange
    }
    rest.contacts = {
      phoneNumber, email, website
    }
    rest.hours = hours
    rest.type = itemTypes.DINING
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
            options={Object.entries(diningTypes).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="meals"
          label="Meals"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select"
            options={Object.entries(diningMeals).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="features"
          label="Features"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select"
            options={Object.entries(diningFeatures).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="priceLevel"
          label="Price Level"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
        >
          <Select
            placeholder="Select"
            style={{ width: "10rem" }}
            options={Object.entries(diningPrices).map(([key, value]) => {
              return {
                value: key, label: `${key} ${value}`
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
          label="Reservable?"
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
      <div className="w-full max-w-[24rem]">
        <HoursConfig hours={hours} onChange={(e) => setHours(e)}/>
      </div>
    </div>
  )
}