import {renderWithStore} from "../../../../test/renderWithStore.tsx";
import {SkillsFilter} from "./SkillsFilter.tsx";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe('SkillsFilter', () => {
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
    renderWithStore(
      <SkillsFilter />
    );

    expect(screen.getByText('Ключевые навыки')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument();
  });

  it('Инпут отображает вводимый навык и очищается после сабмита', async () => {
    const user = userEvent.setup();

    renderWithStore(<SkillsFilter />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'React');
    expect(input).toHaveValue('React');
    await user.click(submitButton);
    expect(input).toHaveValue('');
  });

  it('Навык добавляется в стор и отображается на экране', async () => {
    const user = userEvent.setup();

    const {store} = renderWithStore(
      <SkillsFilter />,
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

    const input = screen.getByPlaceholderText('Навык');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'React');
    await user.click(submitButton);

    expect(store.getState().vacancies.filters.skills).toContain('React');
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('Удаляет навык', async () => {
    const user = userEvent.setup();

    const {store} = renderWithStore(
      <SkillsFilter />,
      {
        vacancies: {
          vacancies: [],
          isLoading: false,
          error: null,
          filters: {
            city: null,
            search: '',
            skills: ['React']
          },
          page: 1,
          per_page: 5,
          pages: 1,
          found: 0,
        },
      }
    );

    await user.click(screen.getByLabelText('Удалить React'));

    expect(store.getState().vacancies.filters.skills).not.toContain('React');
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});