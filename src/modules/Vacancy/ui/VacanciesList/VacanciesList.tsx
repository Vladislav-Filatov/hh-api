import {VacancyCard} from "../VacancyCard/VacancyCard.tsx";
import styles from './VacanciesList.module.scss'

interface VacanciesListProps {
  vacancies: Vacancy[]
}

export const VacanciesList = ({vacancies}: VacanciesListProps) => {
  return (
    <section>
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
          />
        </li>)}
      </ul>
    </section>
  );
};
