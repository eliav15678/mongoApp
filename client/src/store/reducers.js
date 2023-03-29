import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import actions from './actions';

//create user variable
const user = JSON.stringify(localStorage.getItem('user'));

//initial
const initialState = {
    user: user ? user : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message: ''
}
