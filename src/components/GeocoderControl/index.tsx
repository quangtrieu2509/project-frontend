import { ReactElement, useState } from "react"
import { useControl, Marker, MarkerProps, ControlPosition } from "react-map-gl"
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder"
// import { useDispatch } from "react-redux"
// import { setDestInfo } from "../../redux/Trip/index copy"

type GeocoderControlProps = Omit<
  GeocoderOptions,
  "accessToken" | "mapboxgl" | "marker"
> & {
  mapboxAccessToken: string
  marker?: boolean | Omit<MarkerProps, "longitude" | "latitude">

  position: ControlPosition

  onLoading: (e: object) => void
  onResults: (e: object) => void
  onResult: (e: object) => void
  onError: (e: object) => void
}

const noop = () => {}

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
}

/* eslint-disable complexity,max-statements */
export default function GeocoderControl(props: GeocoderControlProps) {
  const [marker, setMarker] = useState<ReactElement | null>(null)
  // const dispatch = useDispatch()

  useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      })
      ctrl.on("loading", props.onLoading)
      ctrl.on("results", props.onResults)
      ctrl.on("result", (evt) => {
        props.onResult(evt)

        const { result } = evt
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates))
        if (location && props.marker) {
          setMarker(
            <Marker
              // {...props.marker}
              longitude={location[0]}
              latitude={location[1]}
              style={{ cursor: "pointer" }}
              // onClick={e => {
              //   // If we let the click event propagates to the map, it will immediately close the popup
              //   // with `closeOnClick: true`
              //   e.originalEvent.stopPropagation();
              //   dispatch(setDestInfo({
              //     text: result.text,
              //     placeName: result.place_name,
              //     coordinates: result.geometry.coordinates
              //   }))
              // }}
            />
          )
        } else {
          setMarker(null)
        }
      })
      ctrl.on("error", props.onError)
      return ctrl
    },
    {
      position: props.position,
    },
  )

  return marker
}
