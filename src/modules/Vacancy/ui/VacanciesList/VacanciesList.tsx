import {VacancyCard} from "../VacancyCard/VacancyCard.tsx";
import styles from './VacanciesList.module.scss'
import {Pagination} from "@mantine/core";
import {useAppSelector} from "../../../../store/redux.ts";

interface VacanciesListProps {
  vacancies: Vacancy[]
  setActivePage: (page: number) => void;
}

export const VacanciesList = ({vacancies, setActivePage}: VacanciesListProps) => {
  const {page, pages} = useAppSelector(state => state.vacancies);
  return (
    <section className={styles.section}>
      <ul className={styles['vacancies-list']}>
        {vacancies?.map(vacancy =>
        <li className={styles.vacancy} key={vacancy.id}>
          <VacancyCard
            vacancyName={vacancy.name}
            salary={vacancy.salary.from}
            experience={vacancy.experience}
            area={vacancy.area.name}
            employer={vacancy.employer.name}
            format={vacancy.schedule.name}
            formatId={vacancy.schedule.id}
          />
        </li>)}
      </ul>
      <Pagination value={page} onChange={(nextPage) => setActivePage(nextPage)} total={pages}/>
    </section>
  );
};
