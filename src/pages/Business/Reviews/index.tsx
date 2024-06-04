import { useParams } from "react-router-dom";
import ReviewList from "../../../components/Review/ReviewList";

export default function Reviews() {
  const params = useParams()
  return (
    <div>
      <ReviewList id={params.id ?? ""}/>
    </div>
  )
}