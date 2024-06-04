import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./Auth"
import { headerSlice } from "./Header"
import { tripSlice } from "./Trip"
import { profileSlice } from "./Profile"
import { loaderSlice } from "./Loader"
import { businessSlice } from "./Business"


export default configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    headerReducer: headerSlice.reducer,
    profileReducer: profileSlice.reducer,
    tripReducer: tripSlice.reducer,
    loaderReducer: loaderSlice.reducer,
    businessReducer: businessSlice.reducer
  }
})
