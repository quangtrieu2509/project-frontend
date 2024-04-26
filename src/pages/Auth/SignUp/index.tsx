import { Form, Input, Modal } from "antd"
import {
  LockOutlined,
  MailOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { useDispatch } from "react-redux"

import "../index.style.scss"
import { setState, setView } from "../../../redux/Auth"
import { AuthView } from "../../../redux/Auth/types"
import { apiCaller, authApi } from "../../../api"
import Header from "../../../components/Auth/Header"
import { setLoaderState } from "../../../redux/Loader"

export default function SingUp() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const handleGoBack = () => {
    dispatch(setView(AuthView.SIGNIN))
  }

  const hanldeGoToSigninView = () => {
    dispatch(setView(AuthView.EMAIL_SIGNIN))
  }

  const handleSignUpByEmail = async (values: any) => {
    dispatch(setLoaderState(true))
    const res = await apiCaller(authApi.signUpByEmail(values))
    dispatch(setLoaderState(false))
    console.log(res)

    if (res !== null) {
      Modal.info({
        title: "Info",
        content: "Signed up completely. Please check your email.",
        className: "info-modal",
        okType: "text",
        centered: true,
      })
      // window.location.reload() // fix here
      dispatch(setState(false))
    }
  }

  return (
    <div className="auth-page">
      <Header text="Join us by completing out this form."/>
      <div className="signup-body flex-col">
        <div>
          <Form
            name="normal_signup"
            className="auth-form"
            initialValues={{ remember: true }}
            style={{ fontFamily: "Poppins" }}
            onFinish={handleSignUpByEmail}
            form={form}
          >
            <div className="flex">
              <Form.Item
                name="givenName"
                rules={[
                  { required: true, message: "Please input your given name" },
                ]}
                className="mr-1"
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Given Name"
                />
              </Form.Item>
              <Form.Item
                name="familyName"
                rules={[
                  { required: true, message: "Please input your family name" },
                ]}
                className="ml-1"
              >
                <Input
                  prefix={<TeamOutlined className="site-form-item-icon" />}
                  placeholder="Family Name"
                />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: "email",
                  message: "Email is not valid",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="w-full flex justify-center">
              <div className="primary-button" onClick={() => form.submit()}>
                Sign up
              </div>
            </Form.Item>
            <div className="w-full">
              <span className="cursor-pointer" onClick={handleGoBack}>
                <i className="bi bi-arrow-return-left mr-1.5"/>Back
              </span>
            </div>
          </Form>
        </div>
        <div className="bg-color-border-primary h-px w-full my-6"></div>
        <div
          className="w-full flex justify-center"
          style={{ fontFamily: "Poppins" }}
        >
          <div>
            <span
              className="font-semibold underline cursor-pointer"
              onClick={hanldeGoToSigninView}
            >
              Sign in
            </span>{" "}
            if you already have an account.
          </div>
        </div>
      </div>
    </div>
  )
}
