import { Routes, Route } from "react-router-dom"

import PrivateRoute from "../components/PrivateRoute"
import PublicRoute from "../components/PublicRoute"
import { ROUTES } from "../constants"
import HomePage from "../pages/Home"
import NotFoundPage from "..//pages/NotFound"
import ProfilePage from "../pages/Profile"
import TripsHome from "../pages/Trips"
import TripDetail from "../pages/Trips/TripDetail"
import Tourism from "../pages/Tourism"
import Search from "../pages/Search"
import Dinings from "../pages/Dinings"
import Detail from "../pages/Dinings/Detail"

export type RouteType = {
  path: ROUTES | string
  title?: string
  isPrivate?: boolean
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
    path: "*",
    title: "Not Found",
    element: NotFoundPage
  }
]
export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => {
        const { isPrivate, element: Component } = route
        const RouteWrapper = isPrivate ? PrivateRoute : PublicRoute
        return (
          <Route
            key={route.path}
            {...route}
            element={
              <RouteWrapper title={route.title}>
                <Component />
              </RouteWrapper>
            }
          />
        )
      })}
    </Routes>
  )
}
