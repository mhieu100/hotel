import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { callFetchAccount } from '../../config/api.auth';

export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async () => {
    const response = await callFetchAccount();
    return response.data;
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: '',
  user: {
    id: '',
    email: '',
    fullname: '',
    address: '',
    phone: '',
    roleName: '',
  },
  activeMenu: 'home',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
      state.user.fullname = action.payload.fullname;
      state.user.address = action.payload.address;
      state.user.phone = action.payload.phone;
      state.user.roleName = action?.payload?.roleName;

    },
    setLogoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = {
        id: '',
        email: '',
        fullname: '',
        centerName: '',
        roleName: '',
      };
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user.id = action.payload.user?.id;
        state.user.email = action.payload.user?.email;
        state.user.fullname = action.payload.user?.fullname;
        state.user.address = action.payload.user?.address;
        state.user.phone = action.payload.user?.phone;
        state.user.roleName = action?.payload?.user?.roleName;
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    });
  },
});

export const {
  setActiveMenu,
  setUserLoginInfo,
  setLogoutAction,
  setRefreshTokenAction,
} = accountSlice.actions;

export default accountSlice.reducer;
