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

type Item = Record<number, Array<any>>
export const separateItemsByDay = (items: any[], tripLength: number) => {
  let result: Array<Array<any>> = Array.from(
    { length: tripLength }, (_v, i) => []
  )
  items.forEach(e => {
    result[e.day - 1].push(e)
  })

  return result
}