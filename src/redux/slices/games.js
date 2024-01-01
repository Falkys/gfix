import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchWheel = createAsyncThunk('games/fetchWheel' , async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/game/wheel');
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchWithdraw = createAsyncThunk('games/fetchWithdraw' , async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/game/withdraw', params);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchRoulette = createAsyncThunk('games/fetchRoulette', async () => {
  const { data } = await axios.get('/game/roulette');
  return data;
});

const initialState = {
  wheel: {
    items: [],
    status: 'loading'
  },
  roulette: {
    items: [],
    status: 'loading'
  },
  withdraw: {
    items: [],
    status: 'loading'
  }
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWheel.pending]: (state) => {
      state.wheel.items = [];
      state.wheel.status = 'loading';
    },
    [fetchWheel.fulfilled]: (state, action) => {
      state.wheel.items = action.payload;
      state.wheel.status = 'loaded';
    },
    [fetchWheel.rejected]: (state, action) => {
      state.wheel.items = [];
      state.wheel.status = 'error';
      state.error = action.payload;
    },
    [fetchWithdraw.pending]: (state) => {
      state.withdraw.items = [];
      state.withdraw.status = 'loading';
    },
    [fetchWithdraw.fulfilled]: (state, action) => {
      state.withdraw.items = action.payload;
      state.withdraw.status = 'loaded';
    },
    [fetchWithdraw.rejected]: (state, action) => {
      state.withdraw.items = [];
      state.withdraw.status = 'error';
      state.withdraw.error = action.payload;
    },
    [fetchRoulette.pending]: (state) => {
      state.roulette.items = [];
      state.roulette.status = 'loading';
    },
    [fetchRoulette.fulfilled]: (state, action) => {
      state.roulette.items = action.payload;
      state.roulette.status = 'loaded';
    },
    [fetchRoulette.rejected]: (state) => {
      state.roulette.items = [];
      state.roulette.status = 'error';
    },
  },
});

export const gamesReducer = gamesSlice.reducer;