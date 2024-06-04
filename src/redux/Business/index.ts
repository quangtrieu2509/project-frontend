import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Booking } from "../../pages/Business/Bookings"

// Define a type for the slice state
interface BusinessState {
  selectedItem?: string
  bookingList: Booking[]
}

// Define the initial state using that type
const initialState: BusinessState = {
  bookingList: []
}

export const businessSlice = createSlice({
  name: "business",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<string>) => {
      state.selectedItem = action.payload
    },
    setBookingList: 
      (state, action: PayloadAction<Booking[]>) => {
        state.bookingList = action.payload
    },
    removeBooking: 
      (state, action: PayloadAction<string>) => {
        state.bookingList = state.bookingList.filter(
          e => e.id !== action.payload
        )
    }
  }
})

export const { 
  setSelectedItem, 
  setBookingList, 
  removeBooking 
} = businessSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.businessReducer

export default businessSlice.reducer
