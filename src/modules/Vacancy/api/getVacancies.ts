import {vacanciesMock} from "../mocks/vacanciesMock.ts";

interface GetVacanciesParams {
  page: number
  per_page: number
  search_field: string
  city: string | null
  skills: string[]
}

export interface GetVacanciesResponse {
  found: number
  items: Vacancy[]
  page: number
  per_page: number
  pages: number
  search_field: string
  city: string | null
  skills: string[]
}

export const getVacancies = async ({
  page=1,
  per_page=5,
  search_field,
  city,
  skills,
}: GetVacanciesParams):Promise<GetVacanciesResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const normalizedSearchParams = search_field.trim().toLowerCase();
  const normalizedCity = city?.trim().toLowerCase() ?? null;

  const filteredVacancies = vacanciesMock.filter(vacancy => {
    const search = !normalizedSearchParams ||
      vacancy.name.toLowerCase().includes(normalizedSearchParams) ||
      vacancy.employer.name.toLowerCase().includes(normalizedSearchParams);
    const city = !normalizedCity ||
      vacancy.area.name.toLowerCase() === normalizedCity;
    const filteredSkills = skills.length === 0 ||
      skills.every(skill => vacancy.key_skills.includes(skill));

    return search && city && filteredSkills;
  });
  const found = filteredVacancies.length;
  const pages = Math.max(1, Math.ceil(found / per_page));
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page;
  const items = filteredVacancies.slice(startIndex, endIndex);

  return {
    found,
    items,
    page,
    per_page,
    pages,
    search_field,
    city,
    skills,
  };
}