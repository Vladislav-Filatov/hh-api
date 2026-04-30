import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getVacancies} from "../modules/Vacancy/api/getVacancies.ts";
import type {RootState} from "./store.ts";
import type {GetVacanciesResponse} from "../modules/Vacancy/api/getVacancies.ts";

interface FiltersState {
  search: string
  city: string | null
  skills: string[]
}

interface VacanciesState {
  vacancies: Vacancy[]
  isLoading: boolean
  error: string | null
  filters: FiltersState
  page: number
  per_page: number
  pages: number
  found: number
}

const initialState: VacanciesState = {
  vacancies: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    city: null,
    skills: ['TypeScript', 'React', 'Redux']
  },
  page: 1,
  per_page: 5,
  pages: 1,
  found: 0,
}

export const fetchVacancies = createAsyncThunk<GetVacanciesResponse, undefined, {rejectValue: string, state: RootState}>(
  'vacancies/fetchVacancies',
  async(_, {rejectWithValue, getState}) => {
    try {
      const state = getState().vacancies;
      return await getVacancies({
        page: state.page,
        per_page: state.per_page,
        search_field: state.filters.search,
        city: state.filters.city,
        skills: state.filters.skills,
      });
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
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.page = 1;
    },
    setCity(state, action: PayloadAction<string | null>) {
      if (action.payload === 'Все города') {
        state.filters.city = null;
      } else {
        state.filters.city = action.payload;
        state.page = 1;
      }
    },
    addSkill: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) return;
      const isAlreadyExists = state.filters.skills.find(skill => skill.toLowerCase() === action.payload.trim().toLowerCase());
      if (isAlreadyExists) return;
      state.filters.skills.push(action.payload.trim());
      state.page = 1;
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) return;
      state.filters.skills = state.filters.skills.filter(skill => skill.toLowerCase() !== action.payload.trim().toLowerCase());
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.vacancies = action.payload.items;
        state.found = action.payload.found;
        state.page = action.payload.page;
        state.per_page = action.payload.per_page;
        state.pages = action.payload.pages;
        state.isLoading = false;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.error = action.payload ?? 'Неизвестная ошибка';
        state.isLoading = false;
      })
  }
});

export const {setSearch, setCity, addSkill, removeSkill, setPage} = vacanciesSlice.actions;
export default vacanciesSlice.reducer;