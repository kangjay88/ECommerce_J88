// REDUX TOOLKIT: Toolkit reduces the large amount of boiler plate that redux usually needs to setup
import { SatelliteTwoTone } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { //the initial state when opening the app, where you will store the data
    isCartOpen: false,
    cart: [],
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {// where we create our actions
        setItems: (state, action) => {
            state.items = action.payload; //this function changes the items:[] to equal what we are passing into the payload
        },

        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item]; 
            // takes the current state of the cart, whatever new item we are passing into the action, we are updating our cart info
            // possibility of duplicate items (not implemented here)
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id); 
            // we are going to filter out everything not equal to the id we are passing in, 
            // keep all other ids not equal to the id we are passing in
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                    // we have to map through the entire cart, to figure out which count we want to update
                    // once we find it we increase the count
                }
                return item; //otherwise, return item
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                    // we don't want any negative numbers!
                }
                return item; //otherwise, return item
            });
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen; 
            // basically flipping whatever the current cart state is
        }
    }
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;