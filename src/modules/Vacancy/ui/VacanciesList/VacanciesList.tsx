import {VacancyCard} from "../VacancyCard/VacancyCard.tsx";
import {useAppDispatch, useAppSelector} from "../../../../store/redux.ts";
import {useEffect} from "react";
import {fetchVacancies} from "../../../../store/vacanciesSlice.ts";

export const VacanciesList = () => {
  const {vacancies, isLoading, error} = useAppSelector(state => state.vacancies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch])
  return (
    <section>
      <ul>
        {vacancies?.map(vacancy =>
        <li key={vacancy.id}>
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
