import Label from "./Label"
import { roles, ROUTES } from "../../constants"
import { getLocalStorage } from "../../utils/Auth"
import store from "../../redux/store"
import { setTripCreationState } from "../../redux/Trip"

const admin = getLocalStorage("id") === "0d5392a1987" ?
  [{
    key: "4",
    label: <Label url={ROUTES.ADMIN} title="Admin" />,
  }] : []

export const featureItems = [
  {
    name: "Explore",
    items: [
      {
        key: "1",
        label: (
          <Label url={ROUTES.HOME} title="Extraordinary Places" />
        ),
      },
      {
        key: "2",
        label: (
          <Label url={ROUTES.HOME} title="Travel Blogs" />
        ),
      }
    ],
    route: "explore",
  },
  {
    name: "Community",
    items: [
      {
        key: "1",
        label: <Label url={ROUTES.NEW_FEEDS} title="New Feeds" />,
      },
      {
        key: "2",
        label: <Label url={ROUTES.HOME} title="Write a review" />,
      },
      {
        key: "3",
        label: <Label url={ROUTES.HOME} title="Forum (*)" />,
      }
    ],
    route: "community",
  },
  {
    name: "Trips",
    items: [
      {
        key: "1",
        label: <Label 
          url={ROUTES.TRIPS_HOME} title={"Make a trip"} 
          event={() => store.dispatch(setTripCreationState(true))}
        />,
      },
      {
        key: "2",
        label: <Label url={ROUTES.TRIPS_HOME} title="My trips" />,
      },
    ],
    route: "trips",
  },
  {
    name: "More",
    items: [
      {
        key: "3",
        label: <Label url={ROUTES.NEW_ITEM} title="Add a place" />,
      },
      ...admin
    ],
    route: "more"
  }
]

export const userItems = {
  name: "User",
  items: [
    {
      key: "1",
      label: <Label url={ROUTES.PROFILE_BASE + getLocalStorage("id")} title="Profile" />,
    },
    {
      key: "2",
      label: <Label url={ROUTES.TRIPS_HOME} title="Trips" />,
    },
    {
      key: "3",
      label: <Label url={ROUTES.BOOKINGS} title="Bookings" />,
    },
    {
      key: "4",
      label: <Label url={ROUTES.BUSINESS} title="Business" />,
    },
    {
      key: "5",
      label: <Label url={ROUTES.HOME} title="Settings" />,
    },
    {
      key: "6",
      label: (
        <Label
          title="Sign out"
          event={() => {
            console.log("logout")
            localStorage.clear()
            window.location.href = "/"
          }}
        />
      )
    }
  ]
}

export const businessUserItems = {
  name: "Business",
  items: [
    {
      key: "1",
      label: <Label url={ROUTES.HOME} title="Trips" />,
    },
    {
      key: "2",
      label: <Label url={ROUTES.PROFILE_BASE + getLocalStorage("id")} title="Profile" />,
    },
    {
      key: "3",
      label: <Label url={ROUTES.HOME} title="Settings" />,
    },
    {
      key: "5",
      label: (
        <Label
          title="Sign out"
          event={() => {
            console.log("logout")
            localStorage.removeItem("token")
            window.location.href = "/"
          }}
        />
      )
    }
  ]
}

export const adminItems = {
  name: "Admin",
  items: [
    {
      key: "3",
      label: <Label url={ROUTES.HOME} title="Settings" />,
    },
    {
      key: "5",
      label: (
        <Label
          title="Sign out"
          event={() => {
            console.log("logout")
            localStorage.removeItem("token")
            window.location.href = "/"
          }}
        />
      )
    }
  ]
}
