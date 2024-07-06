import { ExclamationCircleFilled } from "@ant-design/icons";
import { Col, Form, Input, Modal, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getState, setEditUserState, setIntroInfo, setUser } from "../../../redux/Profile";
import { MessageInstance } from "antd/es/message/interface";
import { apiCaller, userApi } from "../../../api";
import { errorMessage, loadingMessage, successMessage } from "../../../utils/Utils";

interface EditProfileModalProps {
  messageApi: MessageInstance
}

const { confirm } = Modal

export default function EditProfileModal(props: EditProfileModalProps) {
  const dispatch = useDispatch()
  const { editUserState, user, introInfo } = useSelector(getState)
  const [ form ] = Form.useForm()
  const handleCancelUpdate = () => {
    confirm({
      title: `Are you sure to cancel?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      maskClosable: true,
      onOk () {
        dispatch(setEditUserState(false))
      }
    })
  }

  const handleOnFinish = () => {
    const values = form.getFieldsValue()
    const trimmedValues = Object.keys(values).reduce((acc: any, key) => {
        acc[key] = typeof values[key] === 'string' ? values[key].trim() : values[key]
        return acc;
      }, {})

    const { facebook, instagram, youtube, twitter, ...rest } = trimmedValues
    rest.links = { facebook, instagram, youtube, twitter }

    confirm({
      title: `Are you sure to update profile?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        const update = async () => {
          loadingMessage(props.messageApi, 'update')
          const res = await apiCaller(userApi.updateProfile(rest),
            (_) => errorMessage(props.messageApi, 'update', 'Something went wrong. Try again.')
          )

          if (res !== undefined) {
            dispatch(setUser({ ...user, ...rest }))
            dispatch(setIntroInfo({ ...introInfo, ...rest }))
            successMessage(props.messageApi, 'update', 'Update successfully.')
          }
        }

        update()
        dispatch(setEditUserState(false))
      }
    })
  }


  return (
    <Modal
      open={editUserState} 
      onCancel={handleCancelUpdate}
      title={<div className="w-full flex justify-center text-lg">Edit Profile</div>}
      centered destroyOnClose
      maskClosable={false}
      footer={
        <div className="flex justify-center relative">
          <div className="secondary-button absolute left-0" 
            onClick={handleCancelUpdate}
          >
            Cancel
          </div>
          <div className="primary-button"
          onClick={() => form.submit()}
          >
            Update
          </div>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleOnFinish} preserve={false}>
        <Row gutter={16}>
          <Col flex={1}>
            <Form.Item
              name="familyName"
              label="Family Name"
              rules={[{ required: true, message: 'This field cannot be empty' }]}
              initialValue={user?.familyName}
            >
              <Input placeholder="Enter a name" />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="givenName"
              label="Given Name"
              rules={[{ required: true, message: 'This field cannot be empty' }]}
              initialValue={user?.givenName}
            >
              <Input placeholder="Enter a name" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="address"
          label="Address"
          initialValue={introInfo?.address}
        >
          <Input placeholder="Enter an address" />
        </Form.Item>
        <Form.Item
          name="bio"
          label="Bio"
          initialValue={introInfo?.bio}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder="Enter a bio" 
            showCount maxLength={100}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col flex={1}>
            <Form.Item
              name="facebook"
              label="Facebook"
              initialValue={introInfo?.links?.facebook}
            >
              <Input placeholder="Enter an username" />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="instagram"
              label="Instagram"
              initialValue={introInfo?.links?.instagram}
            >
              <Input placeholder="Enter an username" />
            </Form.Item>
          </Col>
        </Row>        
        <Row gutter={16}>
          <Col flex={1}>
            <Form.Item
              name="twitter"
              label="Twitter"
              initialValue={introInfo?.links?.twitter}
            >
              <Input placeholder="Enter an username" />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="youtube"
              label="Youtube"
              initialValue={introInfo?.links?.youtube}
            >
              <Input placeholder="Enter an username" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}