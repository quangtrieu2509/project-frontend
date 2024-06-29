import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// Define a type for the slice state
interface ItemState {
  selectedId?: string
}

// Define the initial state using that type
const initialState: ItemState = {

}

export const itemSlice = createSlice({
  name: "item",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedId = action.payload
    }
  }
})

export const { 
  setSelectedId
} = itemSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.itemReducer

export default itemSlice.reducer
