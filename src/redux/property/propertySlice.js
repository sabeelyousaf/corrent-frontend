// slices/propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../store";

const configForm = {
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
};

const configJSON = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// or your defined `server` path

// CREATE
export const createProperty = createAsyncThunk(
  "property/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${server}/property`,
        formData,
        configForm
      );
      return data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET ALL
export const getAllProperties = createAsyncThunk(
  "property/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/property`);
      return data.properties;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET SINGLE
export const getSingleProperty = createAsyncThunk(
  "property/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/property/${id}`);
      return data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// UPDATE
export const updateProperty = createAsyncThunk(
  "property/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${server}/property/${id}`,
        formData,
        configForm
      );
      return data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE
export const deleteProperty = createAsyncThunk(
  "property/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${server}/property/${id}`,
        configJSON
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    property: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearPropertyError: (state) => {
      state.error = null;
    },
    clearPropertyMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
        state.message = "Property created successfully";
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE
      .addCase(getSingleProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(getSingleProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Property updated successfully";
        state.property = action.payload;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // Optional: filter out the deleted property from state
        state.properties = state.properties.filter(
          (p) => p._id !== action.meta.arg
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPropertyError, clearPropertyMessage } =
  propertySlice.actions;
export default propertySlice.reducer;
