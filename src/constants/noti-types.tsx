import { CheckOutlined, CloseOutlined, HeartFilled, UserAddOutlined } from "@ant-design/icons"

export const notiTypes = {
  LIKE: 'like',
  APPROVE: 'approve',
  DECLINE: 'decline'
}

type Item = Record<string, any>
export const notiIcons: Item = {
  'like': <HeartFilled className="text-lg text-color-object-primary"/>,
  'follow': <UserAddOutlined className="text-lg text-yellow-500"/>,
  'approve': <CheckOutlined className="text-lg text-green-600"/>,
  'decline': <CloseOutlined className="text-lg text-red-600"/>
} 
