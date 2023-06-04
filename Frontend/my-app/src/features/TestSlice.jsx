import { createSlice } from "@reduxjs/toolkit";
const route= localStorage.getItem('path')!==null?JSON.parse(localStorage.getItem('path')):[];
const initialState = {


  product: [],

  inputItems: [
    {
      sizeIndex: "",
      size: "",
      colorIndex: "",
      color: "",
      extraIndex: "",
      extra: "",
      quantity: "",
    },
  ],

  size: [],
  color: [],
  extraItems: [],
  cart: [],
 
  
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    product: (state, action) => {
      state.product = action.payload;
    },

    userCart: (state, action) => {
      const { payload } = action;
      state.cart = action.payload;
    },
    editCart: (state, action) => {
      const { payload } = action;

      state.cart = state.cart.filter((it) => it.id !== action.payload);
    },
    addSize: (state, action) => {
      state.size.push({ size: "" });
    },
    addColor: (state, action) => {
      state.color.push({ color: "" });
    },

    addExtra: (state, action) => {
      state.extraItems.push({ extra: "" });
    },
    addQuantity: (state, action) => {
      const { index, value } = action.payload;
      state.inputItems[index].quantity = value;
    },
    inputExtra: (state, action) => {
      const { value, index } = action.payload;
      state.extraItems[index].extra = value;

      state.extraItems.map((item, index1) => {
        if (!(item.extra == "")) {
          const ok1 = state.inputItems.find((it) => it.extraIndex == index1);
          if (ok1) {
            ok1.extraIndex = index1;
            ok1.extra = item.extra;
          } else {
            state.inputItems.push({
              sizeIndex: "",
              size: "",
              colorIndex: "",
              color: "",
              extraIndex: index,
              extra: value,
            });
          }

          if (state.size.length > 0) {
            state.size.map((item1, index2) => {
              if (!(item1.size == "")) {
                const ok = state.inputItems.find(
                  (it) => it.extraIndex == index1 && it.sizeIndex == index2
                );
                if (ok) {
                  ok.extraIndex = index1;
                  ok.extra = item.extra;
                  ok.sizeIndex = index2;
                  ok.size = item1.size;
                } else {
                  state.inputItems.push({
                    extraIndex: index1,
                    extra: item.extra,
                    sizeIndex: index2,
                    size: item1.size,
                    colorIndex: "",
                    color: "",
                  });
                }

                state.color.map((item2, index3) => {
                  if (!(item2.color == "")) {
                    const ok2 = state.inputItems.find(
                      (it) =>
                        it.extraIndex == index1 &&
                        it.sizeIndex == index2 &&
                        it.colorIndex == index3
                    );
                    if (ok2) {
                      ok2.extraIndex = index1;
                      ok2.extra = item.extra;
                      ok2.sizeIndex = index2;
                      ok2.size = item1.size;
                      ok2.colorIndex = index3;
                      ok2.color = item2.color;
                    } else {
                      state.inputItems.push({
                        extraIndex: index1,
                        extra: item.extra,
                        sizeIndex: index2,
                        size: item1.size,
                        colorIndex: index3,
                        color: item2.color,
                      });
                    }
                  }
                });
              }
            });
          } else {
            state.color.map((item1, index2) => {
              if (!(item1.color == "")) {
                const ok = state.inputItems.find(
                  (it) => it.extraIndex == index1 && it.colorIndex == index2
                );
                if (ok) {
                  ok.extraIndex = index1;
                  ok.extra = item.extra;
                  ok.colorIndex = index2;
                  ok.color = item1.color;
                } else {
                  state.inputItems.push({
                    extraIndex: index1,
                    extra: item.extra,
                    sizeIndex: "",
                    size: "",
                    colorIndex: index2,
                    color: item1.color,
                  });
                }
              }
            });
          }
        }
      });

      const k = state.extraItems.find((item, ind) => ind > index);
      if (!k) {
        state.extraItems.push({ extra: "" });
      }
    },

    inputSize: (state, action) => {
      const { value, index } = action.payload;

      state.size[index].size = value;

      state.size.map((item, index1) => {
        if (!(item.size == "")) {
          const ok1 = state.inputItems.find((it) => it.sizeIndex == index1);
          if (ok1) {
            ok1.sizeIndex = index1;
            ok1.size = item.size;
          } else {
            state.inputItems.push({
              sizeIndex: index,
              size: value,
              colorIndex: "",
              color: "",
              extraIndex: "",
              extra: "",
            });
          }

          if (state.color.length > 0) {
            state.color.map((item1, index2) => {
              if (!(item1.color == "")) {
                const ok = state.inputItems.find(
                  (it) => it.sizeIndex == index1 && it.colorIndex == index2
                );
                if (ok) {
                  ok.sizeIndex = index1;
                  ok.size = item.size;
                  ok.colorIndex = index2;
                  ok.color = item1.color;
                } else {
                  state.inputItems.push({
                    sizeIndex: index1,
                    size: item.size,
                    colorIndex: index2,
                    color: item1.color,
                    extraIndex: "",
                    extra: "",
                  });
                }

                state.extraItems.map((item2, index3) => {
                  if (!(item2.extra == "")) {
                    const ok2 = state.inputItems.find(
                      (it) =>
                        it.sizeIndex == index1 &&
                        it.colorIndex == index2 &&
                        it.extraIndex == index3
                    );
                    if (ok2) {
                      ok2.sizeIndex = index1;
                      ok2.size = item.size;
                      ok2.colorIndex = index2;
                      ok2.color = item1.color;
                      ok2.extraIndex = index3;
                      ok2.extra = item2.extra;
                    } else {
                      state.inputItems.push({
                        sizeIndex: index1,
                        size: item.size,
                        colorIndex: index2,
                        color: item1.color,
                        extraIndex: index3,
                        extra: item2.extra,
                      });
                    }
                  }
                });
              }
            });
          } else {
            state.extraItems.map((item1, index2) => {
              if (!(item1.extra == "")) {
                const ok = state.inputItems.find(
                  (it) => it.sizeIndex == index1 && it.extraIndex == index2
                );
                if (ok) {
                  ok.extraIndex = index2;
                  ok.extra = item1.extra;
                  ok.sizeIndex = index1;
                  ok.size = item.size;
                } else {
                  state.inputItems.push({
                    extraIndex: index2,
                    extra: item1.extra,
                    sizeIndex: index1,
                    size: item.size,
                    colorIndex: "",
                    color: "",
                  });
                }
              }
            });
          }
        }
      });

      const k = state.size.find((item, ind) => ind > index);
      if (!k) {
        state.size.push({ size: "" });
      }
    },
    inputColor: (state, action) => {
      const { value, index } = action.payload;

      state.color[index].color = value;

      state.color.map((item, index1) => {
        if (!(item.color == "")) {
          const ok1 = state.inputItems.find((it) => it.colorIndex == index1);
          if (ok1) {
            ok1.colorIndex = index1;
            ok1.color = item.color;
          } else {
            state.inputItems.push({
              sizeIndex: "",
              size: "",
              colorIndex: index,
              color: value,
              extraIndex: "",
              extra: "",
            });
          }

          if (state.size.length > 0) {
            state.size.map((item1, index2) => {
              if (!(item1.size == "")) {
                const ok = state.inputItems.find(
                  (it) => it.colorIndex == index1 && it.sizeIndex == index2
                );
                if (ok) {
                  ok.sizeIndex = index2;
                  ok.size = item1.size;
                  ok.colorIndex = index1;
                  ok.color = item.color;
                } else {
                  state.inputItems.push({
                    sizeIndex: index2,
                    size: item1.size,
                    colorIndex: index1,
                    color: item.color,
                    extraIndex: "",
                    extra: "",
                  });
                }

                state.extraItems.map((item2, index3) => {
                  if (!(item2.extra == "")) {
                    const ok2 = state.inputItems.find(
                      (it) =>
                        it.colorIndex == index1 &&
                        it.sizeIndex == index2 &&
                        it.extraIndex == index3
                    );
                    if (ok2) {
                      ok2.sizeIndex = index2;
                      ok2.size = item1.size;
                      ok2.colorIndex = index1;
                      ok2.color = item.color;
                      ok2.extraIndex = index3;
                      ok2.extra = item2.extra;
                    } else {
                      state.inputItems.push({
                        sizeIndex: index2,
                        size: item1.size,
                        colorIndex: index1,
                        color: item.color,
                        extraIndex: index3,
                        extra: item2.extra,
                      });
                    }
                  }
                });
              }
            });
          } else {
            state.extraItems.map((item1, index2) => {
              if (!(item1.extra == "")) {
                const ok = state.inputItems.find(
                  (it) => it.colorIndex == index1 && it.extraIndex == index2
                );
                if (ok) {
                  ok.extraIndex = index2;
                  ok.extra = item1.extra;
                  ok.colorIndex = index1;
                  ok.color = item.color;
                } else {
                  state.inputItems.push({
                    extraIndex: index2,
                    extra: item1.extra,
                    sizeIndex: "",
                    size: "",
                    colorIndex: index1,
                    color: item.color,
                  });
                }
              }
            });
          }
        }
      });

      const k = state.color.find((item, ind) => ind > index);
      if (!k) {
        state.color.push({ color: "" });
      }
    },
  },
});

export const {
  setName,
  getFiles,
  product,
  cfold,
  fold,
  editFold,
  deleteFold,
  foldersFile,
  directory,
  userCart,
  editCart,
  inputItems,
  addSize,
  addColor,
  inputSize,
  inputColor,
  addExtra,
  inputExtra,
  addQuantity,
} = testSlice.actions;
export default testSlice.reducer;
