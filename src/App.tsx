import '@mantine/core/styles.css';
import './App.scss'
import {MantineProvider} from "@mantine/core";
import {Header} from "./components/Header/Header.tsx";
import {VacanciesPage} from "./pages/VacanciesPage/VacanciesPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

function App() {

  return (
    <MantineProvider>
      <Provider store={store}>
        <Header />
        <VacanciesPage/>
      </Provider>
    </MantineProvider>
  )
}

export default App
