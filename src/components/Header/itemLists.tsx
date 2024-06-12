import Label from "./Label"
import { ROUTES, pluralItemLabels } from "../../constants"
import { getLocalStorage } from "../../utils/Auth"

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
        label: <Label url={ROUTES.HOME} title="New Feeds" />,
      },
      {
        key: "2",
        label: <Label url={ROUTES.HOME} title="Write a review" />,
      },
      {
        key: "3",
        label: <Label url={ROUTES.NEW_ITEM} title="Add a place" />,
      },
      {
        key: "4",
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
        label: <Label url={ROUTES.TRIPS_HOME} title={"Make a trip"} />,
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
        key: "1",
        label: <Label url={ROUTES.HOME} title={pluralItemLabels.ATTRACTION} />,
      },
      {
        key: "2",
        label: <Label url={ROUTES.HOME} title={pluralItemLabels.LODGING} />,
      },
      {
        key: "3",
        label: <Label url={ROUTES.HOME} title={pluralItemLabels.DINING} />,
      },
      {
        key: "4",
        label: <Label url={ROUTES.HOME} title={pluralItemLabels.ACTIVITY} />,
      },
    ],
    route: "more",
  },
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
      ),
    },
  ],
}

export const businessUserItems = {
  name: "User",
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
      ),
    },
  ],
}
