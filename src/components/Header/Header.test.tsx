import {screen} from "@testing-library/react";
import { Header } from './Header'
import {renderWithStore} from "../../test/renderWithStore.tsx";

describe('Header', () => {
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
  });

  it('В хедере содержится корректная информация', () => {
    renderWithStore(
      <Header/>
    );
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });
});