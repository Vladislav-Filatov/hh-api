import {Loader} from "@mantine/core";
import styles from './FullScreenLoader.module.scss'

export const FullScreenLoader = () => {
  return (
    <div className={styles['loader-wrapper']}>
      <Loader color="red" size="xl" />
    </div>
  );
};
