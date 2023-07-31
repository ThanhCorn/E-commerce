import { IUser } from "../@types/custom-types";

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addUserToLocalStorage = (user: IUser) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  if (result) {
    const user = JSON.parse(result);
    return user.token;
  }
};
