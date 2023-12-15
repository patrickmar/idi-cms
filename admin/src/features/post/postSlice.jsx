import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFullLoading: false,
  response: null,
  message: "",
};

// create Post
export const create = createAsyncThunk(
  "post/create",
  async (data, thunkAPI) => {
    try {
      return await postService.create(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch Post
export const fetch = createAsyncThunk("post/fetch", async (thunkAPI) => {
  try {
    return await postService.fetch();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// fetch one Post
export const fetchOne = createAsyncThunk(
  "post/fetchOne",
  async (id, thunkAPI) => {
    try {
      return await postService.fetchOne(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete Post
export const remove = createAsyncThunk("post/remove", async (id, thunkAPI) => {
  try {
    return await postService.remove(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Post
export const update = createAsyncThunk(
  "post/update",
  async (data, thunkAPI) => {
    try {
      return await postService.update(data.id, data.data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create Post
export const createVideo = createAsyncThunk(
  "video/create",
  async (data, thunkAPI) => {
    try {
      return await postService.createVideo(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch Post
export const fetchVideo = createAsyncThunk("video/fetch", async (thunkAPI) => {
  try {
    return await postService.fetchVideo();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isFullLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      .addCase(fetch.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      .addCase(fetchOne.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetchOne.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = null;
        state.response = action.payload.data;
      })
      .addCase(fetchOne.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })

      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
        state.response = null;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })

      .addCase(remove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = null;
      })
      .addCase(remove.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      .addCase(createVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      .addCase(fetchVideo.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      });
  },
});
export const { reset } = postSlice.actions;

export default postSlice.reducer;
