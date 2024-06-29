import { Form, Input, InputNumber, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { apiCaller, itemApi } from "../../../../api"
import { useForm } from "antd/es/form/Form"
import { filterFields } from "../../../../utils/Utils"
import { useDispatch } from "react-redux"
import { setLoaderState } from "../../../../redux/Loader"
import { lodgingAmenities, lodgingPrices, lodgingRoomFeatures, lodgingTypes } from "../../../../constants"

interface LodgingProps {
  id: string
  ownerId: string
  contacts: {
    phoneNumber: string
    website?: string
    email?: string
  }
  type: string
  isReservable: boolean
  categories: string[]
  price: {
    level: string
    range?: number[]
  }
  amenities: string[]
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 30 }
}

export default function Lodging(props: LodgingProps) {
  const [priceRange, setPriceRange] = useState<number[]>([0, 0])
  const dispatch = useDispatch()
  const [form] = useForm()

  useEffect(() => {
    setInitialValues()
  }, [props])

  const setInitialValues = () => {
    setPriceRange(props.price?.range ?? [0, 0])

    form.setFieldsValue({
      categories: props.categories,
      amenities: filterFields(props.amenities ?? [], lodgingAmenities), 
      features: filterFields(props.amenities ?? [], lodgingRoomFeatures), 
      priceLevel: props.price.level,
      isReservable: props.isReservable,
      phoneNumber: props.contacts.phoneNumber,
      email: props.contacts.email,
      website: props.contacts.website
    })
  }

  const onFinish = (value: any) => {
    const { 
      features, amenities, priceLevel, 
      phoneNumber, email, website, ...rest
    } = value
    rest.amenities = [...features, ...amenities]
    rest.price = {
      level: priceLevel,
      range: priceRange
    }
    rest.contacts = {
      phoneNumber, email, website
    }
    console.log(rest)
    Modal.confirm({
      title: 'Are you sure to update this item?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        const handleUpdate = async () => {
          dispatch(setLoaderState(true))
          const res = await apiCaller(
            itemApi.updateItem(props.id ?? "", rest)
          )          
          dispatch(setLoaderState(false))

          if (res !== undefined) {
            alert("Update successfully")
          }
        }
        
        handleUpdate()
      }
    })
  }

  return (
    <div className="flex">
      <Form {...formItemLayout} form={form} 
        variant="filled" className="w-[40rem] mr-14 poppins-font"
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
            options={Object.entries(lodgingRoomFeatures).map(([key, value])=>{
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
          <Input type="tel" placeholder="Enter a phone number"/>
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
            <div className="primary-button mr-5" 
              onClick={() => form.submit()}
            >
              Update
            </div>
            <div 
              className="secondary-button"
              onClick={setInitialValues}
            >
              Cancel
            </div>  
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}