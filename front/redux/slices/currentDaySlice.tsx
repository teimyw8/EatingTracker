import { createSlice } from '@reduxjs/toolkit'
import { DisplayableItem, EatenItem, Meal } from '../../pagesImpl/components/commonTypes'





export interface CurrentDayState {
  list: Array<EatenItem>
}

const initialState= (): CurrentDayState => {
  return {
    list: [],
  }
}

export const currentDaySlice = createSlice({
  name: 'currentDay',
  initialState: initialState(),
  reducers: {
    edit: (state, action) => {

      const { item, index } = action.payload;

      if (index < 0 || index >= state.list.length) {

        throw new Error(`Edit Prospect List : Index ${index} is out of bounds for the list of length ${state.list.length}`);
      } else {

        state.list[index] = item;
      }
    },
    
    add: (state, action) => {

      const item: EatenItem = action.payload.item;
      state.list.push(item);
    },

    del: (state, action) => {

      const index = action.payload.index;
      const toDelete = state.list[index];
      state.list = state.list.filter((item: EatenItem) => item !== toDelete);
    },
  },
})


export const { edit, add, del } = currentDaySlice.actions;

export default currentDaySlice.reducer