import { combineReducers } from "@reduxjs/toolkit"
import { prospectListReducer } from "../slices/prospectListSlice"
import { currentDayReducer } from "../slices/currentDaySlice"

const combinedReducer = combineReducers({
  prospectList: prospectListReducer,
  currentDay: currentDayReducer,
})

export type CombinedReducerState = ReturnType<typeof combinedReducer>