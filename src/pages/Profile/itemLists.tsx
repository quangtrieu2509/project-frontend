import { ExclamationCircleOutlined, PictureOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import Label from "../../components/Label"
import Activities from "./Activities"
import Trips from "./Trips"
import Reviews from "./Reviews"
import Empty from "./Empty"
import { Skeleton } from "antd"

export const profileTabItems = [
  {
    label: "Activities",
    key: "activities",
    children: <Activities/>,
  },
  {
    label: "Trips",
    key: "trips",
    children: <Trips/>,
  },
  {
    label: "Reviews",
    key: "reviews",
    children: <Reviews/>,
  },
  {
    label: "Travel Map",
    key: "travel_map",
    children: "Content of Travel Map",
  }
]

// export const ownerTabItems = [
//   {
//     label: "Activities",
//     key: "activities",
//     children: <Activities user/>,
//   },
//   {
//     label: "Trips",
//     key: "trips",
//     children: <Trips/>,
//   },
//   {
//     label: "Reviews",
//     key: "reviews",
//     children: <Reviews/>,
//   },
//   {
//     label: "Media",
//     key: "media",
//     children: <Media/>,
//   },
//   {
//     label: "Saved",
//     key: "saved",
//     children: <Saved/>,
//   },
//   {
//     label: "Travel Map",
//     key: "travel_map",
//     children: "Content of Travel Map",
//   }
// ]

const titleStyle = {
  width: "4rem"
}
export const loadingTabItems = [
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "1",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "2",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "3",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "4",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "5",
    children: <Empty/>,
  }
]

export const profileActions = [
  {
    key: "1",
    label: <Label title="Report profile" icon={<ExclamationCircleOutlined/>}/>,
  }
]

export const settingActions = [
  {
    key: "1",
    label: <Label title="Edit your profile" icon={<UserOutlined/>}/>,
  },
  {
    key: "2",
    label: <Label title="Edit profile picture" icon={<PictureOutlined/>}/>,
  },
  {
    key: "3",
    label: <Label title="Settings" icon={<SettingOutlined/>}/>,
  }
]
