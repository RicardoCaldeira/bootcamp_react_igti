import { read } from './httpService';

export async function apiGetAllCities() {
  const cities = await read('/cities');
  return cities;
}

export async function apiGetAllCandidates() {
  const candidates = await read('/candidates');
  return candidates;
}

export async function apiGetAllElections() {
  const elections = await read('/election');
  return elections;
}