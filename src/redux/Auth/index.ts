import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthView, IUser } from "./types"

// Define a type for the slice state
interface AuthState {
  view: JSX.Element
  state: boolean
  user: IUser | undefined
  GoogleToken: string | undefined
}

// Define the initial state using that type
const initialState: AuthState = {
  view: AuthView.SIGNIN,
  state: false,
  user: undefined,
  GoogleToken: undefined
}

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<JSX.Element>) => {
      state.view = action.payload
    },
    setState: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload
    },
    setUser: (state, action: PayloadAction<IUser | undefined>) => {
      state.user = action.payload
    },
    setGoogleToken: (state, action: PayloadAction<string | undefined>) => {
      state.GoogleToken = action.payload
    }
  }
})

export const { setView, setState, setUser, setGoogleToken } = authSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.authReducer

export default authSlice.reducer
