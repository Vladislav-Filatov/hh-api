import axios from 'axios';

export const getVacancies = async (page=0, per_page=20) => {
  try {
    const response = await axios.get(`/api/hh/vacancies`, {
      params: {
        page,
        per_page,
      }
    });
    return response.data.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('status:', error.response?.status);
      console.log('data:', error.response?.data);
      console.log('params:', error.config?.params);
    }

    throw new Error('Ошибка при попытке получить вакансии');
  }
}