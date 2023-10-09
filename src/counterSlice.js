import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    interator: -1,
    ingredients: [],
    itemCal:[]
  },
  reducers: {
    increment: (state) => {
      state.interator += 1
    },

    
    decrement: (state) => {
      state.value -= 1
    },
    decrementByAmount: (state, action) => {
      state.value -= (action.payload)
    },
    decrementByItem: (state, action) => {
      state.ingredients.pop()
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    incrementByItem: (state, action) => {
      state.ingredients.push(action.payload + "")
    },
    incrementByItemCal: (state, action) => {
      state.itemCal.push(action.payload + "cal " )
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrementByAmount, incrementByAmount, incrementByItem, decrementByItem, incrementByItemCal } = counterSlice.actions

export default counterSlice.reducer