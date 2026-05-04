import {vacanciesMock} from "../../mocks/vacanciesMock.ts";
import {renderWithStore} from "../../../../test/renderWithStore.tsx";
import {VacanciesList} from "./VacanciesList.tsx";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

const vacancy = [
  {
    id: '1',
    name: 'Frontend-разработчик React',
    experience: '1–3 года',
    salary: {
      currency: 'RUR',
      from: 120000,
      gross: false,
      to: 180000,
    },
    employer: {
      name: 'WebTech Studio',
    },
    area: {
      id: '1',
      name: 'Москва',
      url: 'https://api.hh.ru/areas/1',
    },
    schedule: {
      id: 'Office',
      name: 'Офис',
    },
    key_skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Redux'],
  },
]

describe('VacanciesList', () => {
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

  it('Рендерит список вакансий', () => {
    renderWithStore(<VacanciesList vacancies={vacanciesMock} setActivePage={vi.fn()} />);

    expect(screen.getByText('Frontend-разработчик React')).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
  });

  it('Прокидывает данные в VacancyCard', () => {
    renderWithStore(<VacanciesList vacancies={vacancy} setActivePage={vi.fn()} />);

    expect(screen.getByText('Frontend-разработчик React')).toBeInTheDocument();
    expect(screen.getByText('120000 ₽')).toBeInTheDocument();
    expect(screen.getByText('1–3 года')).toBeInTheDocument();
    expect(screen.getByText('WebTech Studio')).toBeInTheDocument();
    expect(screen.getByText('WebTech Studio')).toBeInTheDocument();
    expect(screen.getByText('Офис')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Смотреть вакансию'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Откликнуться'})).toBeInTheDocument();
  });

  it('Рендерит столько карточек, сколько вакансий передано', () => {
    renderWithStore(
      <VacanciesList vacancies={vacancy} setActivePage={vi.fn()} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('Вызывает setActivePage при клике на пагинацию', async () => {
    const user = userEvent.setup();
    const setActivePage = vi.fn()

    renderWithStore(
      <VacanciesList vacancies={vacanciesMock} setActivePage={setActivePage} />,
      {
        vacancies: {
          vacancies: [],
          isLoading: false,
          error: null,
          filters: {
            city: null,
            search: '',
            skills: [],
          },
          page: 1,
          per_page: 5,
          pages: 3,
          found: 12,
        },
      }
    );

    await user.click(screen.getByRole('button', {name: '2'}));
    expect(setActivePage).toHaveBeenCalledWith(2);
  });
})