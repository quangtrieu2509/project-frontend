import { useSelector } from "react-redux"
import { getState } from "../../../redux/Profile"
import { getMonth, getYear } from "../../../utils/Utils"

export default function Intro() {
  const { introInfo } = useSelector(getState)
  const { createdAt, links } = introInfo
  return (
    <div className="w-60 min-w-[15rem] bg-white rounded-lg px-6 pt-3.5 pb-2 mr-4 text-color-text-primary">
      <div className="font-semibold text-lg mb-3">Intro</div>
      {
        introInfo?.bio &&
        <div className="intro-item mb-3">
          <p className="text-center break-words mt-0">
            {introInfo.bio}
          </p>
          <div className="h-px bg-color-border-secondary"/>
        </div>
      }
      {
        introInfo?.address &&
        <div className="intro-item flex items-center mb-3">
          <i className="bi bi-geo-alt-fill"/>
          <span className="ml-3 min-w-0 break-words">
            {introInfo.address}
          </span>
        </div>
      }
      <div className="intro-item mb-3">
        <i className="bi bi-clock-fill"/>
        <span className="ml-3">
          {`Join on ${getMonth(createdAt)} ${getYear(createdAt)}`}
        </span>
      </div>
      {
        links?.facebook &&
        <div className="intro-item flex items-center mb-3">
          <i className="bi bi-facebook"/>
          <span 
            className="ml-3 min-w-0 hover:underline cursor-pointer break-words"
            onClick={
              () => { window.open(`https://facebook.com/${links.facebook}`) }
            }
          >
            {links.facebook}
          </span>
        </div>
      }
      {
        links?.instagram &&
        <div className="intro-item flex items-center mb-3">
          <i className="bi bi-instagram"/>
          <span 
            className="ml-3 min-w-0 hover:underline cursor-pointer break-words"
            onClick={
              () => { window.open(`https://instagram.com/${links.instagram}`) }
            }
          >
            {links.instagram}
          </span>
        </div>
      }
      {
        links?.twitter &&
        <div className="intro-item flex items-center mb-3">
          <i className="bi bi-twitter"/>
          <span 
            className="ml-3 min-w-0 hover:underline cursor-pointer break-words"
            onClick={
              () => { window.open(`https://twitter.com/${links.twitter}`) }
            }
          >
            {links.twitter}
          </span>
        </div>
      }
      {
        links?.youtube &&
        <div className="intro-item flex items-center mb-3">
          <i className="bi bi-youtube"/>
                  <span 
            className="ml-3 min-w-0 hover:underline cursor-pointer break-words"
            onClick={
              () => { window.open(`https://youtube.com/${links.youtube}`) }
            }
          >
            {links.youtube}
          </span>
        </div>
      }
      {
        links?.tiktok &&
        <div className="intro-item flex items-center mb-3">
          <i className="bi bi-tiktok"/>
                  <span 
            className="ml-3 min-w-0 hover:underline cursor-pointer break-words"
            onClick={
              () => { window.open(`https://tiktok.com/${links.tiktok}`) }
            }
          >
            {links.tiktok}
          </span>
        </div>
      }
    </div>
  )
}