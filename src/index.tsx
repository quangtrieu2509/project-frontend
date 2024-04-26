import { Provider } from "react-redux"

import "./index.css"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./redux/store"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import "mapbox-gl/dist/mapbox-gl.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.scss"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
)
