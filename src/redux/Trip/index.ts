import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DrawerTrip } from "../../components/Drawer/TripList"
import { SavedItemProps as SavedItem } from "../../components/Item/SavedItem"
import { ItineraryItem } from "../../components/Trip/ItineraryTab"

// Define a type for the slice state
interface TripState {
  tripCreationState: boolean
  tripListState: boolean
  preAddState: boolean
  editState: boolean
  drawerTripsList: DrawerTrip[]
  savesList: SavedItem[]
  itineraryList: Array<Array<ItineraryItem>>
}

// Define the initial state using that type
const initialState: TripState = {
  tripCreationState: false,
  tripListState: false,
  preAddState: false,
  editState: false,
  drawerTripsList: [],
  savesList: [],
  itineraryList: []
}

type ExtraItineraryItem = {
  itineraryItem: ItineraryItem,
  day: number
}

export const tripSlice = createSlice({
  name: "trip",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTripCreationState: (state, action: PayloadAction<boolean>) => {
      state.tripCreationState = action.payload
    },
    setTripListState: (state, action: PayloadAction<boolean>) => {
      state.tripListState = action.payload
    },
    setPreAddState: (state, action: PayloadAction<boolean>) => {
      state.preAddState = action.payload
    },
    setEditState: (state, action: PayloadAction<boolean>) => {
      state.editState = action.payload
    },
    setDrawerTripsList: 
      (state, action: PayloadAction<DrawerTrip[]|DrawerTrip>) => {
        const { payload } = action
        if (Array.isArray(payload)) state.drawerTripsList = payload
        else state.drawerTripsList = [payload, ...state.drawerTripsList]
    },
    setSavesList: 
      (state, action: PayloadAction<SavedItem[]>) => {
        state.savesList = action.payload
    },
    removeSavedItem: 
      (state, action: PayloadAction<string>) => {
        state.savesList = state.savesList.filter(e => e.id !== action.payload)
        state.itineraryList = state.itineraryList.map(subarr =>
          subarr.filter(e => e.savedItemId !== action.payload)
        )
    },
    updateSavesList:
      (state, action: PayloadAction<SavedItem>) => {
        state.savesList = state.savesList.map((e) => {
          if (e.id === action.payload.id) return action.payload
          return e
        })
    },
    updateItineraryList:
    (state, action: PayloadAction<ExtraItineraryItem>) => {
      const { day, itineraryItem } = action.payload
      state.itineraryList[day - 1] = state.itineraryList[day - 1].map((e) => {
        if (e.id === itineraryItem.id) return itineraryItem
        return e
      })
    },
    setItineraryList: 
      (state, action: PayloadAction<
        Array<Array<ItineraryItem>>|ExtraItineraryItem
      >) => {
        const { payload } = action
        if (Array.isArray(payload)) state.itineraryList = payload
        else {
          const { day, itineraryItem } = payload
          state.itineraryList[day - 1].push(itineraryItem)
        }
        console.log(state.itineraryList)
    }
  }
})

export const {
  setTripCreationState,
  setTripListState,
  setDrawerTripsList,
  setSavesList,
  removeSavedItem,
  updateSavesList,
  updateItineraryList,
  setPreAddState,
  setItineraryList,
  setEditState
} = tripSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.tripReducer

export default tripSlice.reducer
