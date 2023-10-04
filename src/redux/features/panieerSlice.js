import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panier: [],
};

const panieerSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    recupPan: (state, { payload }) => {
      if (payload) {
        state.panier = payload;
      }
    },
    setProductPan: (state, action) => {
      state.panier = [...state.panier, action.payload];
      localStorage.setItem("panier", JSON.stringify(state.panier));
    },
    updateQuantity: (state, { payload }) => {
      state.panier = state.panier.map((val) => {
        if (val.product_id === payload[1]) {
          return {
            ...val,
            product_quantity: payload[0],
            total_price: payload[2],
          };
        }
        return val; // Si ce n'est pas le produit à mettre à jour, retournez-le tel quel
      });
      console.log(state.panier, "panier apre modif");
      localStorage.setItem("panier", JSON.stringify(state.panier));
    },

    deleteProduct: (state, { payload }) => {
      state.panier = state.panier.filter((t) => t.product_id !== payload);
      localStorage.setItem("panier", JSON.stringify(state.panier));
    },

    vider: (state) => {
      state.panier = [];
      localStorage.setItem("panier", []);
    },
    deletepan: (state) => {
      state.panier = [];
      localStorage.removeItem("panier");
    },
  },
});

export const { recupPan, setProductPan, updateQuantity, deleteProduct, vider, deletepan } =
  panieerSlice.actions;
export default panieerSlice.reducer;
