import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { prospectListSlice } from './slices/prospectListSlice'
import { CombinedReducerState } from './root/root.reducer'

export default configureStore({
  reducer: {
    prospectList : prospectListSlice.reducer,

  },
})

export type RootState = CombinedReducerState
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>