import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  caisse: 0,
  categories: [],
  sub_category: [],
  sub_sub_category: [],
  product: [],
  detail: [],
  commands: [],
  commands_validation: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
    recupCateg: (state, { payload }) => {
      if (payload) {
        state.categories = payload;
      }
    },
    recupsub_category: (state, { payload }) => {
      if (payload) {
        state.sub_category = payload;
      }
    },
    recupsub_sub_category: (state, { payload }) => {
      if (payload) {
        state.sub_sub_category = payload;
      }
    },
    recupdetail: (state, { payload }) => {
      if (payload) {
        state.detail = payload;
      }
    },
    recupcaisse: (state, { payload }) => {
      if (payload) {
        state.caisse = payload;
      }
    },
    recupProduct: (state, { payload }) => {
      if (payload) {
        state.product = payload;
        state.product = state.product.sort(function (a, b) {
          var key1 = new Date(a.creation_date);
          var key2 = new Date(b.creation_date);
          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      }
    },
    recupcommands: (state, { payload }) => {
      if (payload) {
        state.commands = payload;
        state.commands = state.commands.sort(function (a, b) {
          var key1 = new Date(a.command_date);
          var key2 = new Date(b.command_date);
          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      }
    },
    recupcommands_validation: (state, { payload }) => {
      if (payload) {
        state.commands_validation = payload;
        state.commands_validation = state.commands_validation.sort(function (
          a,
          b
        ) {
          var key1 = new Date(a.date);
          var key2 = new Date(b.date);
          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      }
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  recupCateg,
  recupsub_category,
  recupsub_sub_category,
  recupProduct,
  recupdetail,
  recupcommands,
  recupcommands_validation,
  recupcaisse,
} = productSlice.actions;
export default productSlice.reducer;
