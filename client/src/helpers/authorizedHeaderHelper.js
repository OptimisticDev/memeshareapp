import { LOCAL_STORAGE_JWT_KEY } from "../constants/constants";

export const authorizedHeaderHelper = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_JWT_KEY)}`,
  };
};
