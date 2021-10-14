import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    background: '',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,  
  reducers: {
    setBackground: (state, action) => {         
        state.background = action.payload;
    },    
  },  
});

export const { setBackground } = weatherSlice.actions;

export const selectBackground = (state) => state.weather.background;

export default weatherSlice.reducer;
