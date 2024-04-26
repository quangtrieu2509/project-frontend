import { useNavigate } from "react-router-dom"

interface LabelProps {
  url?: string
  title: string
  event?: () => void
}
export default function Label({
  url = undefined,
  title,
  event = undefined,
}: LabelProps) {

  const navigate = useNavigate()

  const handleNavigate = () => {
    if (url !== undefined) {
      navigate(url)
    }
  }

  return (
    <div onClick={handleNavigate}>
      <div onClick={event}>
        <p className="text-base text-color-text-primary font-medium m-0 px-2.5 py-2">{title}</p>
      </div>
    </div>
  )
}
