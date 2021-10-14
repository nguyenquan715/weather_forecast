import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    backgroundColor: 'white',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,  
  reducers: {
    setBackgroundColor: (state, action) => { 
        console.log(state.backgroundColor); 
        state.backgroundColor = action.payload;
    },    
  },  
});

export const { setBackgroundColor } = weatherSlice.actions;

export const selectBackgroundColor = (state) => state.weather.backgroundColor;

export default weatherSlice.reducer;
