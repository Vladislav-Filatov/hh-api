import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getVacancies} from "../modules/Vacancy/api/getVacancies.ts";

interface VacanciesState {
  vacancies: Vacancy[]
  isLoading: boolean
  error: string | null
  skill_set: string[]
}

const initialState: VacanciesState = {
  vacancies: [],
  isLoading: false,
  error: null,
  skill_set: ['TypeScript', 'React', 'Redux']
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
  reducers: {
    addSkill: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) return;
      const isAlreadyExists = state.skill_set.find(skill => skill.toLowerCase() === action.payload.trim().toLowerCase());
      if (isAlreadyExists) return;
      state.skill_set.push(action.payload.trim());
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) return;
      state.skill_set = state.skill_set.filter(skill => skill.toLowerCase() !== action.payload.trim().toLowerCase());
    }
  },
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

export const {addSkill, removeSkill} = vacanciesSlice.actions;
export default vacanciesSlice.reducer;