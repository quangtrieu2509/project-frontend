import { Drawer } from "antd";
import { Map, Marker, NavigationControl, Popup } from "react-map-gl";
import { MAPBOX_API_KEY } from "../../../configs";
import { useDispatch, useSelector } from "react-redux";
import { getState, setMapState } from "../../../redux/Map";
import { Pin } from "../../../utils/Map";
import { useEffect, useState } from "react";
import { itemTypes } from "../../../constants";
import LodgingOverview from "../../Item/LodgingOverview";
import "./index.style.scss"
import DiningOverview from "../../Item/DiningOverview";
import AttractionOverview from "../../Item/AttractionOverview";
import ActivityOverview from "../../Item/ActivityOverview";

interface MapDrawerProps {
  coors: number[]
  list: any[]
}

export default function MapDrawer(props: MapDrawerProps) {
  const { mapState } = useSelector(getState)
  const [popup, setPopup] = useState<any>()
  const dispatch = useDispatch()
  const onMapClose = () => {
    dispatch(setMapState(false))
  }

  useEffect(() => {
    setPopup(undefined)
  }, [props.list])

  const pins = () => {
    return props.list.map(e => (
      !e.coordinates.length
      ? <></>
      : <Marker key={e.id} offset={[0, -15]}
        longitude={e.coordinates[1]} latitude={e.coordinates[0]}
        onClick={ev => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          ev.originalEvent.stopPropagation()
          setPopup(e)
        }}
      >
        <Pin type={e.type}/>
      </Marker>
    ))
  }

  const generatePopup = () => {
    switch (popup.type) {
      case itemTypes.LODGING: return <LodgingOverview {...popup}/>
      case itemTypes.DINING: return <DiningOverview {...popup}/>
      case itemTypes.ATTRACTION: return <AttractionOverview {...popup}/>
      case itemTypes.ACTIVITY: return <ActivityOverview {...popup}/>
      default: return <></>
    }
  }
  return (
    <Drawer
      title="Map" className="map-drawer"
      onClose={onMapClose} destroyOnClose
      open={mapState} width={900} mask={false}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Map
        mapboxAccessToken={MAPBOX_API_KEY}
        initialViewState={{
          longitude: props.coors[1],
          latitude: props.coors[0],
          zoom: 12
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      > 
        <NavigationControl position="bottom-right"/>
        {pins()}
        {popup && <Popup
          className="poppins-font"
          anchor="top"
          longitude={popup.coordinates[1]}
          latitude={popup.coordinates[0]}
          onClose={() => setPopup(undefined)}
        >
          {generatePopup()}
        </Popup>}
      </Map>
    </Drawer>
  )
}