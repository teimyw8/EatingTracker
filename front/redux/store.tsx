import { configureStore } from '@reduxjs/toolkit'
import { prospectListSlice } from './slices/prospectListSlice'

export default configureStore({
  reducer: {
    prospectList : prospectListSlice.reducer,

  },
})