import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getVacancies} from "../modules/Vacancy/api/getVacancies.ts";

interface VacanciesState {
  vacancies: Vacancy[]
  isLoading: boolean
  error: string | null
}

const initialState: VacanciesState = {
  vacancies: [],
  isLoading: false,
  error: null,
}

export const fetchVacancies = createAsyncThunk<Vacancy[], undefined, {rejectValue: string}>(
  'vacancies/fetchVacancies',
  async(_, {rejectWithValue}) => {
    try {
      return await getVacancies();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  }
)

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.vacancies = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.error = action.payload ?? 'Неизвестная ошибка';
        state.isLoading = false;
      })
  }
});

export default vacanciesSlice.reducer;