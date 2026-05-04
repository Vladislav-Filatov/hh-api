import {Button, Input} from "@mantine/core";
import {type SyntheticEvent, useState} from "react";
import styles from './VacanciesSearch.module.scss';
import {MagnifyingGlassIcon} from '@phosphor-icons/react';
import {useAppDispatch} from "../../../../store/redux.ts";
import {setSearch} from "../../../../store/vacanciesSlice.ts";

export const VacanciesSearch = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    dispatch(setSearch(inputValue));
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        leftSection={<MagnifyingGlassIcon size={12} />}
        className={styles.input} placeholder="Должность или название компании"
      />
      <Button variant="filled" type="submit" size="sm">Найти</Button>
    </form>
  );
};