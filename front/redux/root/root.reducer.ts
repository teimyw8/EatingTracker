import { combineReducers } from "@reduxjs/toolkit"
import { prospectListReducer } from "../slices/prospectListSlice"

const combinedReducer = combineReducers({
  prospectList: prospectListReducer
})

export type CombinedReducerState = ReturnType<typeof combinedReducer>