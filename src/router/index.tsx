import { Routes, Route } from "react-router-dom"

import PrivateRoute from "../components/PrivateRoute"
import { PublicRoute, BusinessRoute } from "../components/PublicRoute"
import { ROUTES } from "../constants"
import HomePage from "../pages/Home"
import NotFoundPage from "../pages/Static/NotFound"
import ProfilePage from "../pages/Profile"
import TripsHome from "../pages/Trips"
import TripDetail from "../pages/Trips/TripDetail"
import Tourism from "../pages/Tourism"
import Search from "../pages/Search"
import Dinings from "../pages/Items/Dinings"
import Lodgings from "../pages/Items/Lodgings"
import Attractions from "../pages/Items/Attractions"
import Activities from "../pages/Items/Activities"
import DiningDetail from "../pages/Items/Dinings/Detail"
import LodgingDetail from "../pages/Items/Lodgings/Detail"
import AttractionDetail from "../pages/Items/Attractions/Detail"
import ActivityDetail from "../pages/Items/Activities/Detail"
import Review from "../pages/Review"
import { Spin } from "antd"
import { useSelector } from "react-redux"
import { getState } from "../redux/Loader"
import Success from "../pages/Static/Success"
import Business from "../pages/Business"
import Booking from "../pages/Booking"
import Bookings from "../pages/Bookings"
import NewItem from "../pages/NewItem"
import Admin from "../pages/Admin"

export type RouteType = {
  path: ROUTES | string
  title?: string
  isPrivate?: boolean
  type?: string
  element: () => JSX.Element
}

const routes: RouteType[] = [
  {
    path: ROUTES.ADMIN,
    title: "Admin",
    element: Admin,
    isPrivate: true
  },
  {
    path: ROUTES.HOME,
    title: "Trippie",
    element: HomePage
  },
  {
    path: ROUTES.PROFILE,
    title: "Profile",
    element: ProfilePage
  },
  {
    path: ROUTES.TRIPS_HOME,
    title: "My Trips",
    element: TripsHome
  },
  {
    path: ROUTES.TRIP_DETAIL,
    title: "Trip Detail",
    element: TripDetail
  },
  {
    path: ROUTES.TOURISM,
    title: "Tourism",
    element: Tourism
  },
  {
    path: ROUTES.SEARCH,
    title: "Search",
    element: Search
  },
  {
    path: ROUTES.DININGS,
    title: "Dinings",
    element: Dinings
  },
  {
    path: ROUTES.LODGINGS,
    title: "Lodgings",
    element: Lodgings
  },
  {
    path: ROUTES.ATTRACTIONS,
    title: "Attractions",
    element: Attractions
  },
  {
    path: ROUTES.ACTIVITIES,
    title: "Activities",
    element: Activities
  },
  {
    path: ROUTES.DINING_DETAIL,
    title: "Dining Detail",
    element: DiningDetail
  },
  {
    path: ROUTES.LODGING_DETAIL,
    title: "Lodging Detail",
    element: LodgingDetail
  },
  {
    path: ROUTES.ATTRACTION_DETAIL,
    title: "Attraction Detail",
    element: AttractionDetail
  },
  {
    path: ROUTES.ACTIVITY_DETAIL,
    title: "Activity Detail",
    element: ActivityDetail
  },
  {
    path: ROUTES.REVIEW,
    title: "Review",
    element: Review
  },
  {
    path: ROUTES.BOOKING,
    title: "Booking",
    element: Booking
  },
  {
    path: ROUTES.BOOKINGS,
    title: "Bookings",
    element: Bookings
  },
  {
    path: ROUTES.SUCCESS,
    title: "Success",
    element: Success
  },  
  {
    path: ROUTES.BUSINESS,
    title: "Trippie Business",
    element: Business,
    type: "business"
  },
  {
    path: ROUTES.BUSINESS_DETAIL,
    title: "Trippie Business",
    element: Business,
    type: "business"
  },
  {
    path: ROUTES.NEW_ITEM,
    title: "Add a place",
    element: NewItem
  },
  {
    path: "*",
    title: "Not Found",
    element: NotFoundPage
  }
]
export default function AppRouter() {
  const loaderState = useSelector(getState).state

  return (
    <Routes>
      {routes.map((route) => {
        const { type, isPrivate, element: Component } = route
        let RouteWrapper
        if (isPrivate) RouteWrapper = PrivateRoute
        else if (type === "business") RouteWrapper = BusinessRoute
        else RouteWrapper = PublicRoute
        return (
          <Route
            key={route.path}
            {...route}
            element={
              <RouteWrapper title={route.title}>
                {loaderState && <Spin spinning fullscreen />}
                <Component />
              </RouteWrapper>
            }
          />
        )
      })}
    </Routes>
  )
}
