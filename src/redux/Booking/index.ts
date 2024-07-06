import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Booking } from "../../pages/Bookings"

// Define a type for the slice state
interface BookingState {
  bookingList?: Booking[]
}

// Define the initial state using that type
const initialState: BookingState = {
}

export const bookingSlice = createSlice({
  name: "booking",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBookingList: (state, action: PayloadAction<Booking[] | undefined>) => {
      state.bookingList = action.payload
    },
    removeBooking: (state, action: PayloadAction<String>) => {
      if (state.bookingList !== undefined) {
        const id = action.payload
        state.bookingList = state.bookingList.filter(e => e.id !== id)
      }
    }
  }
})

export const { 
  setBookingList,
  removeBooking
} = bookingSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.bookingReducer

export default bookingSlice.reducer
