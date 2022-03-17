import { configureStore, createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { modal: false },
  reducers: {
    onModal(state) {
      state.modal = !state.modal;
    },
  },
});

const polygonSlice = createSlice({
  name: 'polygon',
  initialState: { polygon: [] },
  reducers: {
    polygonData(state, action) {
      const poly = action.payload
        .toString()
        .split('_')
        .map((ele) => {
          const [lng, lat] = ele.split(',');
          return { lng, lat };
        });
      state.polygon.push(poly);
    },
    polygonReset(state) {
      state.polygon = [];
    },
  },
});

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { loading: false },
  reducers: {
    onLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    polygon: polygonSlice.reducer,
    loading: loadingSlice.reducer,
  },
});

export const modalActions = modalSlice.actions;
export const polygonActions = polygonSlice.actions;
export const loadingActions = loadingSlice.actions;

export default store;
