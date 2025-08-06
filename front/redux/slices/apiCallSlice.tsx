import { createSlice } from '@reduxjs/toolkit'
import { ApiCallStatus, DisplayableItem, EatenItem, Meal } from '../../pagesImpl/components/commonTypes'


export interface ApiCallState {
  status: ApiCallStatus;
}

const initialState= (): ApiCallState => {
  return {
    status: ApiCallStatus.IDLE,
  }
}

export const apiCallSlice = createSlice({
  name: 'currentDay',
  initialState: initialState(),

  reducers: {

    edit: (state, action) => {

      const { status } = action.payload;

      state.status = status;
    },
  },
})


export const { edit} = apiCallSlice.actions;

export default apiCallSlice.reducer