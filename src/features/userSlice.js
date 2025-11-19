import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load users from API or localStorage
export const loadUsers = createAsyncThunk("users/load", async () => {
  const stored = JSON.parse(localStorage.getItem("users"));
  if (stored && stored.length > 0) return stored;

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  localStorage.setItem("users", JSON.stringify(data));
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.list));
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(u => u.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.list));
    },
    editUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex(u => u.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
        localStorage.setItem("users", JSON.stringify(state.list));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
