import { bbox, lineString } from "@turf/turf"
import { MapRef } from "react-map-gl"

export const setMapBounds = (mapRef: MapRef|null, marksList: any) => {
  const line = lineString(marksList)
  const [minLng, minLat, maxLng, maxLat] = bbox(line)
  mapRef?.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat]
    ],
    { padding: 60, duration: 50 }
  )
}