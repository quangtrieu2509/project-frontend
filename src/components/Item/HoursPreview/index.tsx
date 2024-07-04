import { Modal } from "antd"
import { generateHoursPreview } from "../../../utils/Utils"
import { useState } from "react"

interface HoursPreviewProps {
  hours: any[]
}

export default function HoursPreview(props: HoursPreviewProps) {
  const [state, setState] = useState<boolean>(false)
 
  return (
    <>
    <div 
      className="font-normal text-xs underline cursor-pointer hover-button"
      onClick={() => setState(true)}
    >
      {"See all hours"}
    </div>
    <Modal
      open={state}
      onCancel={() => setState(false)}
      title={<span className="flex justify-center">Hours</span>} footer={null}
      centered destroyOnClose
      width={"fit-content"}
    >
      {generateHoursPreview(props.hours)}
    </Modal>
    </>
  )
}