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
import Dinings from "../pages/Dinings"
import Detail from "../pages/Dinings/Detail"
import Review from "../pages/Review"
import { Spin } from "antd"
import { useSelector } from "react-redux"
import { getState } from "../redux/Loader"
import Success from "../pages/Static/Success"
import Business from "../pages/Business"
import Booking from "../pages/Booking"
import Bookings from "../pages/Bookings"
import NewItem from "../pages/NewItem"

export type RouteType = {
  path: ROUTES | string
  title?: string
  isPrivate?: boolean
  type?: string
  element: () => JSX.Element
}

const routes: RouteType[] = [
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
    path: ROUTES.DINING_DETAIL,
    title: "Dining Detail",
    element: Detail
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
