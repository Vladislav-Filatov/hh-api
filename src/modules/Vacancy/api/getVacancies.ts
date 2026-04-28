import {vacanciesMock} from "../mocks/vacanciesMock.ts";

export const getVacancies = async ():Promise<Vacancy[]> => {
  // try {
  //   const response = await axios.get(`/api/hh/vacancies`, {
  //     params: {
  //       page,
  //       per_page,
  //     }
  //   });
  //   return response.data.items;
  // } catch {
  //   throw new Error('Ошибка при попытке получить вакансии');
  // }
  await new Promise(resolve => setTimeout(resolve, 500));
  return vacanciesMock;
}