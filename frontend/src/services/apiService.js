import { read } from './httpService';

export async function apiGetChampionshipYearData(year) {
  const data = await read('/' + year);
  return data;
}