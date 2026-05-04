import {renderWithStore} from "../../../../test/renderWithStore.tsx";
import {VacancyCard} from "./VacancyCard.tsx";
import {screen} from "@testing-library/react";

const renderCard = () => {
  renderWithStore(
    <VacancyCard
      vacancyName="Frontend-разработчик React"
      salary={120000}
      experience="1–3 года"
      area="Москва"
      employer="WebTech Studio"
      format="Офис"
      formatId="Office"
    />
  );
}

describe('VacancyCard', () => {
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

  it('Рендерит название вакансии', () => {
    renderCard();
    expect(screen.getByText('Frontend-разработчик React')).toBeInTheDocument();
  });

  it('Рендерит зарплату', () => {
    renderCard();
    expect(screen.getByText('120000 ₽')).toBeInTheDocument();
  });

  it('Рендерит опыт работы', () => {
    renderCard();
    expect(screen.getByText('1–3 года')).toBeInTheDocument();
  });

  it('Рендерит работодателя', () => {
    renderCard();
    expect(screen.getByText('WebTech Studio')).toBeInTheDocument();
  });

  it('Рендерит формат работы', () => {
    renderCard();
    expect(screen.getByText('Офис')).toBeInTheDocument();
  });

  it('Рендерит город', () => {
    renderCard();
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });

  it('Рендерит кнопки действий', () => {
    renderCard();
    expect(screen.getByRole('button', { name: 'Смотреть вакансию' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Откликнуться' })).toBeInTheDocument();
  });
})