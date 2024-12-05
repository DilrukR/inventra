import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../redux/slices/counterSlice';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import userInventorySlice from './slices/userInventorySlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';
import counter2Reducer from './slices/counter2Slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter2: counter2Reducer,
    auth: authSlice,
    product: productSlice,
    userInventory: userInventorySlice,
    user: userSlice,
    orders: orderSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
