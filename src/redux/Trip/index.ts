import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// Define a type for the slice state
interface TripState {
  tripCreationState: boolean
}

// Define the initial state using that type
const initialState: TripState = {
  tripCreationState: false
}

export const tripSlice = createSlice({
  name: "trip",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTripCreationState: (state, action: PayloadAction<boolean>) => {
      state.tripCreationState = action.payload
    }
  },
})

export const {
  setTripCreationState
} = tripSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.tripReducer

export default tripSlice.reducer
