import { getTokenFromLocalStorage } from './localStorage';

const token = getTokenFromLocalStorage();

export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
};
