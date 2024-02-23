import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://localhost:8000/users/allusers');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error fetching users');
  }
  return data.data;
});
//Async thunk to fetch counts
export const fetchApiCounts = createAsyncThunk('users/fetchApiCounts', async (thunkAPI) => {
  const response = await fetch('http://localhost:8000/users/getcounts');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error fetching API counts');
  }
  return data.data;
});
// Async thunk to update user
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:8000/users/updateprofile/${updatedUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await response.json();

    if (!response.ok) {
      // If the response status is not OK, throw an error with the received message
      throw new Error(data.message || 'Error updating user');
    }

    // Dispatch the action to fetch API counts after a successful update
    thunkAPI.dispatch(fetchApiCounts());

    return updatedUser;
  } catch (error) {
    // Handle errors here
    console.error( error.message);
    throw error; // Rethrow the error to let Redux Toolkit handle the rejected state
  }
});
// Async thunk to delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  const response = await fetch(`http://localhost:8000/users/delete/${userId}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error deleting user');
  }
  return userId;
});

// Define the users slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    apiCounts: { addApiCount: 0, updateApiCount: 0 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.list = state.list.map((user) =>
          user._id === action.payload._id ? { ...user, ...action.payload } : user
        );
      })
      .addCase(updateUser.rejected,(state,action)=>{
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user._id !== action.payload);
      })
      .addCase(fetchApiCounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apiCounts = action.payload;
      })
      .addCase(fetchApiCounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
