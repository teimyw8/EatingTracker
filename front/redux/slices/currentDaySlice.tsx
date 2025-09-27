import { createSelector, createSlice } from '@reduxjs/toolkit'
import { DisplayableItem, DisplayListType, EatenItem, Meal } from '../../pagesImpl/components/commonTypes'
import { RootState } from '../store';





export interface CurrentDayState {
  list: Array<EatenItem>;
  itemToAdd: IEatenItemActionPayload;
}

export interface IEatenItemActionPayload{
  id: string;
  day: string;
  amm: number;
  type: DisplayListType;
}

const initialState= (): CurrentDayState => {
  return {
    list: [],
    itemToAdd: {id: '', day: '', amm: 0, type: DisplayListType.EMPTY },
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
    addMany: (state, action) => {

      const item: EatenItem[] = action.payload.item;
      state.list.push(...item);
    },
    set: (state, action) => {

      const item: EatenItem[] = action.payload.item;
      state.list=item;  
    },

    del: (state, action) => {

      const index = action.payload.index;
      const toDelete = state.list[index];
      state.list = state.list.filter((item: EatenItem) => item !== toDelete);
    },
    setItemToAdd: (state, action) => {

      const item: IEatenItemActionPayload = action.payload.item;
      state.itemToAdd = item;
    },
    clearItemToAdd: (state) => {

      state.itemToAdd = {id: '', day: '', amm: 0, type: DisplayListType.EMPTY };
    }
  },
})

const currentDay = (state: RootState): CurrentDayState => state.currentDay;

export const selectList = createSelector(currentDay, state => state.list);
export const selectItemToAdd = createSelector(currentDay, state => state.itemToAdd);

export const { edit, add, addMany, set, del, setItemToAdd, clearItemToAdd } = currentDaySlice.actions;

export const currentDayReducer = currentDaySlice.reducer;