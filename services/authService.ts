// authService.ts

import httpService from "./httpService";
import { type AxiosResponse } from "axios";

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  personalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    personalId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface DecodedToken {
  exp: number;
  iat: number;
  __v: number;
  _id: string;
  personalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  _doc?: {
    role?: string[];
  };
  [key: string]: unknown; // For any additional fields
}

const AUTH_ENDPOINTS = {
  signUp: "/api/users/signUp",
  signIn: "/api/users/signIn",
  signOut: "/api/users/signOut",
  refreshToken: "/api/users/getToken",
};

const authService = {
  signUp: (userData: UserData): Promise<AxiosResponse<AuthResponse>> =>
    httpService.post<AuthResponse>(AUTH_ENDPOINTS.signUp, userData),

  signIn: async (credentials: Credentials): Promise<AuthResponse> => {
    const response = await httpService.post<AuthResponse>(
      AUTH_ENDPOINTS.signIn,
      credentials,
    );
    if (response.data && response.data.token) {
      httpService.setToken(response.data.token);
    }
    return response.data;
  },

  signOut: async (personalId: string): Promise<void> => {
    await httpService.delete(
      `${AUTH_ENDPOINTS.signOut}?personalId=${personalId}`,
    );
    httpService.removeToken();
  },

  refreshToken: async (): Promise<void> => {
    const token = httpService.getToken();
    if (token) {
      const decoded = httpService.decodeToken(token) as DecodedToken;
      if (decoded) {
        const { __v, _id, ...refreshData } = decoded;
        const response = await httpService.post<AuthResponse>(
          AUTH_ENDPOINTS.refreshToken,
          refreshData,
        );
        if (response.data && response.data.token) {
          httpService.setToken(response.data.token);
        }
      }
    }
  },

  isAuthorized: (allowedRoles: string[]): boolean => {
    if (allowedRoles.length === 0) return true;

    const token = httpService.getToken();
    if (token) {
      const decoded = httpService.decodeToken(token) as DecodedToken;
      if (
        decoded._doc?.role &&
        Array.isArray(decoded._doc.role) &&
        decoded._doc.role.length > 0
      ) {
        return allowedRoles.includes(decoded._doc.role[0]);
      }
    }
    return false;
  },

  isOnSessionCheck: (): boolean => {
    const token = httpService.getToken();
    if (token) {
      const decoded = httpService.decodeToken(token) as DecodedToken;
      if (decoded) {
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
      }
    }
    return false;
  },

  getDecodedToken: (): DecodedToken | null => {
    const token = httpService.getToken();
    return token ? (httpService.decodeToken(token) as DecodedToken) : null;
  },
};

export default authService;
