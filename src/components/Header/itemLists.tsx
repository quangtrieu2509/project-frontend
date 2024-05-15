import Label from "./Label"
import { ROUTES } from "../../constants"
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
        label: <Label url={ROUTES.HOME} title="Add a place" />,
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
        label: <Label url={ROUTES.HOME} title={"Make a trip"} />,
      },
      {
        key: "2",
        label: <Label url={ROUTES.HOME} title="Guide" />,
      },
    ],
    route: "trips",
  },
  {
    name: "More",
    items: [
      {
        key: "1",
        label: <Label url={ROUTES.HOME} title={"Attractions"} />,
      },
      {
        key: "2",
        label: <Label url={ROUTES.HOME} title={"Accommodations"} />,
      },
      {
        key: "3",
        label: <Label url={ROUTES.HOME} title="Dinings" />,
      },
      {
        key: "4",
        label: <Label url={ROUTES.HOME} title="Activities" />,
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
      label: <Label url={ROUTES.HOME} title="Notifications" />,
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
      key: "4",
      label: <Label url={ROUTES.HOME} title="Bussiness" />,
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
