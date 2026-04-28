import {Select} from "@mantine/core";
import { MapPinIcon } from "@phosphor-icons/react";
import styles from './CityFilter.module.scss'

interface CityFilterProps {
  cities: string[]
}

export const CityFilter = ({cities}: CityFilterProps) => {
  return (
    <div className={styles.container}>
      <Select
        placeholder="Все города"
        data={cities}
        leftSection={<MapPinIcon size={16} />}
      />
    </div>
  );
};