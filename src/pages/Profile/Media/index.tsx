import Intro from "../../../components/Profile/Intro";
import TitleBar from "../../../components/Profile/TitleBar";

export default function Media() {
  return (
    <div className="profile-subpage flex mb-4">
      <Intro/>
      <div className="profile-content w-full">
        <TitleBar title="Media"/>
      </div>
    </div>
  )
}