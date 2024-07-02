import { useNavigate, useParams } from "react-router-dom";
import Intro from "../../../components/Profile/Intro";
import NoResult from "../../../components/Profile/NoResult";
import TitleBar from "../../../components/Profile/TitleBar";
import TripOverview from "../../../components/Trip/TripOverview";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../utils/Auth";
import { ROUTES } from "../../../constants";

export default function Trips() {
  const [results, setResults] = useState<any[]>([undefined])
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getTrips = async () => {
      const res = await apiCaller(tripApi.getProfileTrips(params.id ?? ""))
      
      if (res !== undefined) {
        setResults(res.data)
      }
    }

    getTrips()
  }, [params])

  return (
    <div className="profile-subpage flex mb-4 text-color-text-primary">
      <div className="w-fit"><Intro/></div>
      <div className="profile-content flex-grow min-w-[50rem]">
        <TitleBar title="Trips"/>
        {
          params.id === getLocalStorage("id")
          ? <div className="text-center font-semibold text-base mb-3">
              Looking for your private trips? 
              <span 
                className="ml-1 text-color-object-secondary cursor-pointer hover:underline"
                onClick={() => navigate(ROUTES.TRIPS_HOME)}
              >
                Visit Trips home
              </span>
            </div>
          : <></>  
        }
        <div>
          {
            results.length === 0
            ? <NoResult/>
            : results.map(value => {
              return (
                <TripOverview key={value?.id} trip={value}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}