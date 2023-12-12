import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mailService from './mailService';

const initialState = {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isFullLoading: false,
    message: ''
}

// fetch Post
export const fetch = createAsyncThunk(
    'mail/fetch',
    async (thunkAPI) => {
        try {
            return await mailService.fetch();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const mailSlice = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isFullLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetch.pending, (state) => {
            state.isFullLoading = true
        })
        .addCase(fetch.fulfilled, (state, action) => {
            state.isFullLoading = false
            state.isSuccess = true
            state.message = action.payload.message
            state.data = action.payload.data
        })
        .addCase(fetch.rejected, (state, action) => {
            state.isFullLoading = false
            state.isError = true
            state.message = action.payload
            state.data = null
        })
    }
})
export const { reset } = mailSlice.actions;

export default mailSlice.reducer;