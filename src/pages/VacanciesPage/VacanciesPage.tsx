import {VacanciesList} from "../../modules/Vacancy/ui/VacanciesList/VacanciesList.tsx";
import {VacanciesSearch} from "../../modules/Vacancy/ui/VacanciesSearch/VacanciesSearch.tsx";
import styles from "./VacanciesPage.module.scss";
import {SkillsFilter} from "../../modules/Vacancy/ui/SkillsFilter/SkillsFilter.tsx";
import {CityFilter} from "../../modules/Vacancy/ui/CityFilter/CityFilter.tsx";
import {useAppDispatch, useAppSelector} from "../../store/redux.ts";
import {FullScreenLoader} from "../../components/FullScreenLoader/FullScreenLoader.tsx";
import {useEffect} from "react";
import {fetchVacancies} from "../../store/vacanciesSlice.ts";

export const VacanciesPage = () => {
  const isLoading = useAppSelector(state => state.vacancies.isLoading);
  const {vacancies} = useAppSelector(state => state.vacancies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch])

  return (
    <main className={styles.main}>
      {isLoading ? <FullScreenLoader/> :
        <>
          <section className={styles['search-section']}>
            <div>
              <h2 className={styles['title-top']}>Список вакансий</h2>
              <p className={styles['title-bottom']}>по профессии Frontend-разработчик</p>
            </div>
            <VacanciesSearch onSubmit={() => console.log("submit")} />
          </section>

          <section className={styles.content}>
            <aside className={styles.filters}>
              <SkillsFilter/>
              <CityFilter cities={['Москва', 'Санкт-Петербург', 'Казань']} />
            </aside>
            <VacanciesList vacancies={vacancies} />
          </section>
        </>
      }
    </main>
  );
};