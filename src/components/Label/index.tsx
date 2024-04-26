import { ReactNode } from "react"

interface LabelProps {
  title: string
  icon?: ReactNode
  event?: () => void
}
export default function Label({
  title,
  icon = undefined,
  event = undefined
}: LabelProps) {

  return (
    <div onClick={event} className="flex text-sm font-medium px-2.5 py-2">
      {icon ?? <></>}
      <p className="m-0 ml-2">{title}</p>
    </div>
  )
}
