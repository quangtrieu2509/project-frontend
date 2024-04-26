import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { privacies } from "../../constants/privacies"
import { Destination } from "../../components/Trip/Destinations"

type DestInfo = {
  text: string
  placeName: string
  coordinates: number[]
}

type Interact = {
  liked: boolean
  likes: number
  saved: boolean
  comments: number
}

// Define a type for the slice state
interface TripState {
  create: {
    privacy: string
    destinations: Destination[]
  }
  edit: {
    privacy: string
    destinations: Destination[]
  }
  destInfo: DestInfo | null
  addedDest: {
    info: DestInfo | null
    position: number
  }
  destHoverInfo: DestInfo | null
  interacts: {
    [id: string] : Interact
  }
}

// Define the initial state using that type
const initialState: TripState = {
  create: {
    privacy: privacies.PUBLIC,
    destinations: [],
  },
  edit: {
    privacy: privacies.PUBLIC,
    destinations: [],
  },
  destInfo: null,
  addedDest: {
    info: null,
    position: 0,
  },
  destHoverInfo: null,
  interacts: {}
}

export const tripSlice = createSlice({
  name: "trip",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCreatePrivacy: (state, action: PayloadAction<string>) => {
      state.create.privacy = action.payload
    },
    setEditPrivacy: (state, action: PayloadAction<string>) => {
      state.edit.privacy = action.payload
    },
    setCreateDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.create.destinations = action.payload
    },
    updateCreateDescription: (
      state, 
      action: PayloadAction<{index: number, content: string}>
    ) => {
      const { index, content } = action.payload
      state.create.destinations[index].description = content
    },
    updateEditDescription: (
      state, 
      action: PayloadAction<{index: number, content: string}>
    ) => {
      const { index, content } = action.payload
      state.edit.destinations[index].description = content
    },
    setEditDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.edit.destinations = action.payload
    },
    setDestInfo: (state, action: PayloadAction<DestInfo | null>) => {
      state.destInfo = action.payload
    },
    setAddedDest: (
      state,
      action: PayloadAction<{ info: DestInfo | null; position: number }>,
    ) => {
      state.addedDest = action.payload
    },
    setDestHoverInfo: (state, action: PayloadAction<DestInfo | null>) => {
      state.destHoverInfo = action.payload
    },
    setInteract: (
      state, 
      action: PayloadAction<{id: string, interact: Interact}>
    ) => {
      state.interacts[action.payload.id] = action.payload.interact
    }
  },
})

export const {
  setEditPrivacy,
  setCreateDestinations,
  setEditDestinations,
  setCreatePrivacy,
  setDestInfo,
  setAddedDest,
  updateCreateDescription,
  updateEditDescription,
  setDestHoverInfo,
  setInteract
} = tripSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.tripReducer

export default tripSlice.reducer
