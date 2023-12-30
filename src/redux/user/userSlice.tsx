// import { auth } from '@/lib/firebase';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// interface Iuser {
//   user: {
//     email: string | null;
//   };
//   isLoading: boolean;
//   isError: boolean;
//   isSuccess: boolean;
//   error: string | undefined;
// }

// const initialState: Iuser = {
//   user: {
//     email: null,
//   },
//   isLoading: false,
//   isError: false,
//   isSuccess: false,
//   error: undefined,
// };

// export const createUser = createAsyncThunk('user/createUser', async () => {
//   const data = await createUserWithEmailAndPassword(auth, 'email', 'password');
//   return data.user.email;
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(createUser.pending, (state, action) => {
//       state.isLoading = true;

//     });
//     builder.addCase(createUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.user.email = action.payload;
//     });
//     builder.addCase(createUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.error = action.error.message;
//     });
//   }
// });

// export default userSlice.reducer;

import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

const userSlice = createSlice({
  name: 'user ',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
