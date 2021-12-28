import { AuthHeaders } from "@/types/auth";

export const getAuthDataFromLocalStorage = (): AuthHeaders => {
  return {
    "access-token": localStorage.getItem("mp-access-token")!,
    client: localStorage.getItem("mp-client")!,
    expiry: localStorage.getItem("mp-expiry")!,
    uid: localStorage.getItem("mp-uid")!,
    "token-type": localStorage.getItem("mp-tokenType")!,
  };
};

export const setAuthDataToLocalStorage = (authData: any): void => {
  localStorage.setItem("mp-access-token", authData["access-token"]);
  localStorage.setItem("mp-client", authData["client"]);
  localStorage.setItem("mp-uid", authData["uid"]);
  localStorage.setItem("mp-expiry", authData["expiry"]);
  localStorage.setItem("mp-token-type", authData["token-type"]);
};

export const removeAuthDataFromLocalStorage = (): void => {
  localStorage.removeItem("mp-access-token");
  localStorage.removeItem("mp-client");
  localStorage.removeItem("mp-uid");
  localStorage.removeItem("mp-expiry");
  localStorage.removeItem("mp-token-type");
};
