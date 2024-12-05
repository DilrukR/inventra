import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

export interface CounterState {
  qty: number;
}

const initialState: CounterState = {
  qty: 1,
};

export const counter2Slice = createSlice({
  name: 'counter',

  initialState,
  reducers: {
    increment: state => {
      state.qty += 1;
    },
    decrement: state => {
      if (state.qty > 1) {
        state.qty -= 1;
      }
    },

    setcount: (state, action: PayloadAction<number>) => {
      state.qty = action.payload;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.qty += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount, setcount} =
  counter2Slice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counter2Slice.reducer;
