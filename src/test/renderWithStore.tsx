import {type RootState} from "../store/store.ts";
import {configureStore} from "@reduxjs/toolkit";
import vacanciesReducer from "../store/vacanciesSlice.ts";
import type {ReactNode} from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {MantineProvider} from "@mantine/core";

const createTestStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: {
      vacancies: vacanciesReducer,
    },
    preloadedState
  });
};

export const renderWithStore = (ui: ReactNode, preloadedState?: RootState) => {
  const store = createTestStore(preloadedState);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MantineProvider>
          {ui}
        </MantineProvider>
      </Provider>
    )
  }
};