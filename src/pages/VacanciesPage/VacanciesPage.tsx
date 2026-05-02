import {VacanciesList} from "../../modules/Vacancy/ui/VacanciesList/VacanciesList.tsx";
import {VacanciesSearch} from "../../modules/Vacancy/ui/VacanciesSearch/VacanciesSearch.tsx";
import styles from "./VacanciesPage.module.scss";
import {SkillsFilter} from "../../modules/Vacancy/ui/SkillsFilter/SkillsFilter.tsx";
import {CityFilter} from "../../modules/Vacancy/ui/CityFilter/CityFilter.tsx";
import {useAppDispatch, useAppSelector} from "../../store/redux.ts";
import {useEffect} from "react";
import {fetchVacancies, setPage} from "../../store/vacanciesSlice.ts";
import {Loader} from "@mantine/core";

export const VacanciesPage = () => {
  const isLoading = useAppSelector(state => state.vacancies.isLoading);
  const {vacancies, page, filters} = useAppSelector(state => state.vacancies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch, page, filters])

  return (
    <main className={styles.main}>
      <section className={styles['search-section']}>
        <div>
          <h2 className={styles['title-top']}>Список вакансий</h2>
          <p className={styles['title-bottom']}>по профессии Frontend-разработчик</p>
        </div>
        <VacanciesSearch />
      </section>

      <section className={styles.content}>
        <aside className={styles.filters}>
          <SkillsFilter/>
          <CityFilter cities={['Все города', 'Москва', 'Санкт-Петербург']} />
        </aside>
        {isLoading ?
          <div className={styles.loader}>
            <Loader color='red'/>
        </div> :
          vacancies.length > 0 ?
          <VacanciesList
            vacancies={vacancies}
            setActivePage={(number) => dispatch(setPage(number))}
          /> :
            <p>Ничего не найдено</p>
        }
      </section>
    </main>
  );
};