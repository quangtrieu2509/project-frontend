import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// Define a type for the slice state
interface LoaderState {
  state: boolean
}

// Define the initial state using that type
const initialState: LoaderState = {
  state: false
}

export const loaderSlice = createSlice({
  name: "loader",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoaderState: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload
    }
  }
})

export const { setLoaderState } = loaderSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.loaderReducer

export default loaderSlice.reducer
