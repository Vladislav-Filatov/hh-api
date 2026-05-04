import {userEvent} from "@testing-library/user-event";
import {renderWithStore} from "../../../../test/renderWithStore.tsx";
import {VacanciesSearch} from "./VacanciesSearch.tsx";
import {screen} from "@testing-library/react";

describe('VacanciesSearch', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    globalThis.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('Корректно рендерит стартовое состояние', () => {
    renderWithStore(<VacanciesSearch/>);
    expect(screen.getByPlaceholderText('Должность или название компании')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Найти'})).toBeInTheDocument();
  });

  it('Инпут отображает вводимое значение', async () => {
    const user = userEvent.setup()
    renderWithStore(<VacanciesSearch/>);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Вводимое значение');
    expect(input).toHaveValue('Вводимое значение');
  });

  it('Значение сохраняется в стор после сабмита и остается в инпуте', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(
      <VacanciesSearch/>,
      {
        vacancies: {
          vacancies: [],
          isLoading: false,
          error: null,
          filters: {
            city: null,
            search: '',
            skills: []
          },
          page: 1,
          per_page: 5,
          pages: 1,
          found: 0,
        },
      }
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'Вводимое значение');
    await user.click(submitButton);

    expect(store.getState().vacancies.filters.search).toBe('Вводимое значение');
    expect(input).toHaveValue('Вводимое значение');
  });
})