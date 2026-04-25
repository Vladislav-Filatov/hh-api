import hhLogo from '../../assets/hhLogo.svg';
import {Image, Text, Group} from "@mantine/core";
import styles from './Header.module.scss';
import { UserCircleIcon } from '@phosphor-icons/react';
import clsx from "clsx";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Group gap={10}>
        <Image w={30} src={hhLogo} alt="hh-logo" />
        <Text fw={600}>.FrontEnd</Text>
      </Group>
      <nav className={styles.navigation}>
        <a className={clsx(styles['nav-link'], styles['nav-link--selected'])} href="#">
          Вакансии FE
        </a>
        <a className={styles['nav-link']} href="#">
          <UserCircleIcon size={24} />
          Обо мне
        </a>
      </nav>
    </header>
  );
};
