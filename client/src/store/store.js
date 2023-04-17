import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers';

export const store = configureStore({
    reducer: {
        auth : auth
    }
})