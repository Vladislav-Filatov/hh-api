import styles from './SkillsFilter.module.scss'
import {Button, Input, Pill} from "@mantine/core";
import { PlusIcon  } from "@phosphor-icons/react";
import {useAppDispatch, useAppSelector} from "../../../../store/redux.ts";
import {type SyntheticEvent, useState} from "react";
import {addSkill, removeSkill} from "../../../../store/vacanciesSlice.ts";

export const SkillsFilter = () => {
  const skills = useAppSelector(state => state.vacancies.filters.skills);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>('');

  const submitFormHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    dispatch(addSkill(inputValue));
    setInputValue('');
  }
  return (
    <div className={styles.container}>
      <h6 className={styles.title}>Ключевые навыки</h6>
      <form className={styles.form} onSubmit={submitFormHandler}>
        <Input
          className={styles.input}
          placeholder="Навык"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className={styles['plus-button']} type="submit">
          <PlusIcon size={16} />
        </Button>
      </form>
      <div>
        <Pill.Group>
          {skills.map((skill, index) => (
            <Pill
              key={index}
              withRemoveButton
              removeButtonProps={{
                'aria-label': `Удалить ${skill}`,
              }}
              onRemove={() => dispatch(removeSkill(skill))}
            >
              {skill}
            </Pill>
          ))}
        </Pill.Group>
      </div>
    </div>
  );
};