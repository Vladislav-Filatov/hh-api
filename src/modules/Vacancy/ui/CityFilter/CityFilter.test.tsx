import {renderWithStore} from "../../../../test/renderWithStore.tsx";
import {CityFilter} from "./CityFilter.tsx";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe('CityFilter', () => {
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


  it('Рендерит селектор со плейсхолдером "Все города"', () => {
    renderWithStore(
      <CityFilter cities={['Все города', 'Москва', 'Санкт-Петербург']}/>
    );
    expect(screen.getByPlaceholderText('Все города')).toBeInTheDocument();
  });

  it('По нажатию на селект отображается список городов', async () => {
    renderWithStore(
      <CityFilter cities={['Все города', 'Москва', 'Санкт-Петербург']}/>
    );

    const user = userEvent.setup();

    await user.click(screen.getByPlaceholderText('Все города'));

    expect(await screen.findByText('Москва')).toBeInTheDocument();
    expect(await screen.findByText('Санкт-Петербург')).toBeInTheDocument();
  });

  it('Отображает выбранный город из store', () => {
    renderWithStore(
      <CityFilter cities={['Все города', 'Москва', 'Санкт-Петербург']} />,
      {
        vacancies: {
          vacancies: [],
          isLoading: false,
          error: null,
          filters: {
            city: 'Москва',
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

    expect(screen.getByText('Москва')).toBeInTheDocument();
  });

  it('Меняет город в store после выбора значения и отображает его в селекте', async () => {
    const user = userEvent.setup();

    const { store } = renderWithStore(
      <CityFilter cities={['Все города', 'Москва', 'Санкт-Петербург']} />
    );

    await user.click(screen.getByPlaceholderText('Все города'));
    await user.click(await screen.findByText('Москва'));

    expect(store.getState().vacancies.filters.city).toBe('Москва');
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });
});