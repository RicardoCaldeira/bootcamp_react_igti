import { read } from './httpService';

export async function apiGetAllCities() {
  const cities = await read('/cities');
  return cities;
}