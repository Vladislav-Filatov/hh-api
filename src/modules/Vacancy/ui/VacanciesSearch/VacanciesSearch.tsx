import {Button, Input} from "@mantine/core";
import type {SyntheticEvent} from "react";
import styles from './VacanciesSearch.module.scss';
import {MagnifyingGlassIcon} from '@phosphor-icons/react';

interface VacanciesSearchProps {
  onSubmit: () => void
}

export const VacanciesSearch = ({onSubmit}: VacanciesSearchProps) => {
   const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
     e.preventDefault();
     onSubmit();
   }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input leftSection={<MagnifyingGlassIcon size={12} />} className={styles.input} placeholder="Должность или название компании"/>
      <Button variant="filled" type="submit" size="sm">Найти</Button>
    </form>
  );
};