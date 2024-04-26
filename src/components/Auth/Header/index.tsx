import { IMAGE_PATH } from "../../../constants";

interface HeaderProps {
  text: string
}

export default function Header({ text }: HeaderProps) {
  return (
    <div className="auth-header">
      <div className="w-full flex justify-center">
        <div className="w-56">
          <img alt="#" src={IMAGE_PATH.FULL_LOGO} className="image w-full" />
        </div>
      </div>
      <p className="text-2xl text-color-text-primary font-semibold mt-3 mb-12">
        {text}
      </p>
    </div>
  )
}