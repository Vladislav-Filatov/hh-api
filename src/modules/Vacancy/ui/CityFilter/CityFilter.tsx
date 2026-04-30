import {Select} from "@mantine/core";
import { MapPinIcon } from "@phosphor-icons/react";
import styles from './CityFilter.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../store/redux.ts";
import {setCity} from "../../../../store/vacanciesSlice.ts";

interface CityFilterProps {
  cities: string[]
}

export const CityFilter = ({cities}: CityFilterProps) => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(state => state.vacancies.filters.city);

  return (
    <div className={styles.container}>
      <Select
        value={selectedCity}
        onChange={value => dispatch(setCity(value))}
        placeholder="Все города"
        data={cities}
        leftSection={<MapPinIcon size={16} />}
      />
    </div>
  );
};