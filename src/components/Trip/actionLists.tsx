import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Label from "../Label";

export const actions = [
  {
    key: "1",
    label: <Label title="Clone" icon={<CopyOutlined/>}/>,
  },
  {
    key: "2",
    label: <Label title="Report this trip" icon={<ExclamationCircleOutlined/>}/>,
  }
]

export const ownerActions = [
  {
    key: "1",
    label: <Label title="Edit" icon={<EditOutlined/>}/>,
  },
  {
    key: "2",
    label: <Label title="Delete" icon={<DeleteOutlined/>}/>,
  }
]