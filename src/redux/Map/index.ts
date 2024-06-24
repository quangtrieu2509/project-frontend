import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MapPopupItemProps as MapPopupItem } from "../../components/Item/MapPopupItem"
import { ViewState } from "./type"

export const defaultMap = {
  longitude: 105.853333,
  latitude: 21.028333,
  zoom: 8
}

// Define a type for the slice state
interface MapState {
  viewState: ViewState
  popupContent?: MapPopupItem
}

// Define the initial state using that type
const initialState: MapState = {
  viewState: defaultMap
}

export const mapSlice = createSlice({
  name: "map",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setViewState: (state, action: PayloadAction<ViewState>) => {
      state.viewState = action.payload
    },
    setPopupContent: (state, action: PayloadAction<any>) => {
      state.popupContent = action.payload
    }
  }
})

export const {
  setViewState,
  setPopupContent
} = mapSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.mapReducer

export default mapSlice.reducer
