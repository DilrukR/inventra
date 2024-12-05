import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 1,
};

export const counterSlice = createSlice({
  name: 'counter',

  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      if (state.value > 1) {
        state.value -= 1;
      }
    },

    setcount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount, setcount} =
  counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
