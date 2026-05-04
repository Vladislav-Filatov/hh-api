import {vacanciesMock} from "../../modules/Vacancy/mocks/vacanciesMock.ts";
import {renderWithStore} from "../../test/renderWithStore.tsx";
import {VacanciesPage} from "./VacanciesPage.tsx";
import {screen} from "@testing-library/react";

vi.mock('../../store/vacanciesSlice.ts', async () => {
  const actual = await vi.importActual('../../store/vacanciesSlice.ts');

  return {
    ...actual,
    fetchVacancies: vi.fn(() => ({
      type: 'vacancies/fetchVacancies/mock',
    })),
  };
});

vi.mock('../../modules/Vacancy/ui/VacanciesSearch/VacanciesSearch.tsx', () => (
  {
    VacanciesSearch: () => <div>VacanciesSearch</div>,
  }
));

vi.mock('../../modules/Vacancy/ui/SkillsFilter/SkillsFilter.tsx', () => (
  {
    SkillsFilter: () => <div>SkillsFilter</div>,
  }
));

vi.mock('../../modules/Vacancy/ui/CityFilter/CityFilter.tsx', () => (
  {
    CityFilter:() => <div>CityFilter</div>,
  }
));

vi.mock('../../modules/Vacancy/ui/VacanciesList/VacanciesList.tsx', () => (
  {
    VacanciesList: () => <div>VacanciesList</div>,
  }
));

describe('VacanciesPage', () => {
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

  it('Показывает лоадер во время загрузки вакансий', () => {
    renderWithStore(
      <VacanciesPage/>,
      {
        vacancies: {
          vacancies: [],
          isLoading: true,
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

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('Рендерит заголовок страницы, фильтры и список вакансий, если они есть', () => {
    renderWithStore(
      <VacanciesPage />,
      {
        vacancies: {
          vacancies: vacanciesMock,
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

    expect(screen.getByText('Список вакансий')).toBeInTheDocument();
    expect(screen.getByText('по профессии Frontend-разработчик')).toBeInTheDocument();
    expect(screen.getByText('VacanciesSearch')).toBeInTheDocument();
    expect(screen.getByText('SkillsFilter')).toBeInTheDocument();
    expect(screen.getByText('CityFilter')).toBeInTheDocument();
    expect(screen.getByText('VacanciesList')).toBeInTheDocument();
  });

  it('Показывает сообщение, если загрузка завершена и вакансий нет', () => {
    renderWithStore(
      <VacanciesPage />,
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

    expect(screen.getByText('Ничего не найдено')).toBeInTheDocument();
    expect(screen.queryByText(/VacanciesList/)).not.toBeInTheDocument();
  });
});